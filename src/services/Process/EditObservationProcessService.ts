import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ObservationRequest {
    description: string;
    file: string;
    id: string;
}

class EditObservationProcessService {
    async execute({ description, file, id }: ObservationRequest) {

        if (!id) {
            throw new Error("Envie o id do processo")
        }

        if (!description && !file) {
            throw new Error("Preencha a observação ou envie um arquivo")
        }

        const observationAlreadyExists = await prismaClient.observation.findFirst({
            where: {
                id: id
            }
        })

        if (!observationAlreadyExists) {
            throw new Error("Observação não encontrada")
        }

        let fileName = ""

        if(file){
            fileName = file.substring(33, file.length)

            const s3Storage = new S3Storage()

            file = await s3Storage.saveFile(file)

            if(observationAlreadyExists.file){
                await s3Storage.deleteFile(observationAlreadyExists.file)
            }
        }

        const observation = await prismaClient.observation.update({
            where: {
                id: id,
            },
            data: {
                file: file || observationAlreadyExists.file,
                fileName: fileName || observationAlreadyExists.fileName,
                description: description
            },
        })

        return (observation)
    }
}

export { EditObservationProcessService }