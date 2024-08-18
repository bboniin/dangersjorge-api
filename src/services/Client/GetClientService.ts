import prismaClient from '../../prisma'

interface ClientRequest {
    clientId: string;
}

class GetClientService {
    async execute({ clientId }: ClientRequest) {
        
        const clientAlreadyExists = await prismaClient.client.findFirst({
            where: {
                id: clientId
            }
        })

        if (!clientAlreadyExists) {
            throw new Error("Cliente não encontrado")
        }

        const client = await prismaClient.client.findUnique({
            where: {
                id: clientId,
            },
            include: {
                processes: {
                    include: {
                        client: true,
                        vara: true,
                        lawyer: true
                    }
                }
            }
        })

        return (client)
    }
}

export { GetClientService }