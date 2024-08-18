import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ObservationRequest {
    description: string;
    file: string;
    processId: string;
}

class AddObservationProcessService {
    async execute({ description, file, processId }: ObservationRequest) {

        if (!processId) {
            throw new Error("Envie o id do processo")
        }

        if (!description && !file) {
            throw new Error("Preencha a observação ou envie um arquivo")
        }

        let fileName = ""

        console.log(file, fileName)

        if(file){
            const s3Storage = new S3Storage()

            fileName = file.substring(16, file.length)

            console.log(file, fileName)

            file = await s3Storage.saveFile(file)
        }

        const observation = await prismaClient.observation.create({
            data: {
                processId: processId,
                file: file,
                fileName: fileName,
                description: description
            },
        })

        return (observation)
    }
}

export { AddObservationProcessService }