import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ObservationRequest {
    id: string;
}

class RemoveObservationProcessService {
    async execute({ id }: ObservationRequest) {

        const observation = await prismaClient.observation.findUnique({
            where: {
                id: id,
            }
        })

        if (!observation) {
            throw new Error("Observação não encontrada")
        }

        const s3Storage = new S3Storage()

        if(observation.file){
            await s3Storage.deleteFile(observation.file)
        }

        await prismaClient.observation.delete({
            where: {
                id: id,
            },
        })

        return ("Imagem deletada com sucesso")
    }
}

export { RemoveObservationProcessService }