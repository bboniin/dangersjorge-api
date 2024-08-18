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
}

class CreateProcessService {
    async execute({ number, clientId, status, reu, lawyers, lawyerAuthor, action, varaId, value, link }: ProcessRequest) {

        if (!number || !clientId || !status || !reu || !lawyerAuthor || !action || !varaId) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        const processAlreadyExists = await prismaClient.process.findFirst({
            where: {
                number: number
            }
        })

        if (processAlreadyExists) {
            throw new Error("Processo já cadastrado no sistema")
        }

        console.log({
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
        })

        const process = await prismaClient.process.create({
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

        console.log(process)

        return (process)
    }
}

export { CreateProcessService }