import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProcessRequest {
    processId: string;
}

class DeleteProcessService {
    async execute({ processId }: ProcessRequest) {

        const process = await prismaClient.process.findUnique({
            where: {
                id: processId
            },
            include: {
                observations: true
            }
        })

        if(!process){
            throw new Error("Processo não encontrado")
        }

        const s3Storage = new S3Storage()

        process.observations.map( async (item)=>{
            if(item.file){
               await s3Storage.deleteFile(item.file)  
            }
        })

        await prismaClient.process.delete({
            where: {
                id: processId
            },
        })

        return ("Processo deletado com sucesso")
    }
}

export { DeleteProcessService }