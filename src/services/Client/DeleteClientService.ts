import prismaClient from '../../prisma'

interface ClientRequest {
    clientId: string;
}

class DeleteClientService {
    async execute({ clientId }: ClientRequest) {

        const clientExists = await prismaClient.client.findFirst({
            where: {
                id: clientId
            }
        })

        if (!clientExists) {
            throw new Error("Cliente não encontrado")
        }

        await prismaClient.client.update({
            data: {
                visible: false
            },
            where: {
                id: clientId
            },
        })

        return ("Cliente deletada com sucesso")
    }
}

export { DeleteClientService }