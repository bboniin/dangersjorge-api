import prismaClient from '../../prisma'

interface ProcessRequest {
    number: string;
    clientId: string;
    status: string;
    reu: string;
    lawyers: string;
    lawyerAuthor: string;
    action: string;
    varaId: string;
    value: number;
    link: string;
    processId: string;
}

class EditProcessService {
    async execute({ number, clientId, status, reu, lawyers, lawyerAuthor, action, varaId, value, link, processId }: ProcessRequest) {

        const processAlreadyExists = await prismaClient.process.findFirst({
            where: {
                number: number
            }
        })

        if (processAlreadyExists) {
            if (processAlreadyExists.id != processId) {
                throw new Error("Processo já cadastrado no sistema")
            }
        }else{
            throw new Error("Processo não encontrado")
        }

        const processEdit = await prismaClient.process.update({
            where: {
                id: processId,
            },
            data: {
                number: number,
                clientId: clientId,
                status: status,
                reu: reu,
                lawyers: lawyers,
                lawyerAuthor: lawyerAuthor,
                action: action,
                varaId: varaId,
                value: value,
                link: link,
            }
        })

        return (processEdit)
    }
}

export { EditProcessService }