import prismaClient from '../../prisma'

interface ClientRequest {
    name: string;
    clientId: string;
    email: string;
    phoneNumber: string;
    type: string;
    cpfOrCnpj: string;
    observation: string;
}

class EditClientService {
    async execute({ name, email, phoneNumber, type, cpfOrCnpj, observation, clientId }: ClientRequest) {
        
        if (!name || !type) {
            throw new Error("Nome e tipo são obrigatórios")
        }

        const clientExists = await prismaClient.client.findFirst({
            where: {
                id: clientId
            }
        })

        if (!clientExists) {
            throw new Error("Cliente não encontrado")
        }
        
        const clientAlreadyExists = await prismaClient.client.findFirst({
            where: {
                cpfOrCnpj: cpfOrCnpj
            }
        })

        if (clientAlreadyExists) {
            if (clientAlreadyExists.id != clientId) {
                throw new Error("Cliente já cadastrado no sistema")
            }
        }

        const client = await prismaClient.client.update({
            where: {
                id: clientId,
            },
            data: {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                type: type,
                cpfOrCnpj: cpfOrCnpj,
                observation: observation
            }
        })

        return (client)
    }
}

export { EditClientService }