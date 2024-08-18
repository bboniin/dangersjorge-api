import prismaClient from '../../prisma'

interface ClientRequest {
    clientId: string;
}

class DeleteClientService {
    async execute({ clientId }: ClientRequest) {

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