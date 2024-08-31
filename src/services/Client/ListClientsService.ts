import prismaClient from '../../prisma'

interface ClientRequest {
    page: number;
    all: boolean;
}

class ListClientsService {
    async execute({ page, all }: ClientRequest) {

        let filter = {}

        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }

        const clientsTotal = await prismaClient.client.count({
            where: {
                visible: true
            }
        })

        const clients = await prismaClient.client.findMany({
            where: {
                visible: true,
                name: {
                    contains: "",
                    mode: "insensitive"
                }
            },
            include: {
                processes: true,
            },
            orderBy: {
                name: "asc",
            },
            ...filter
        })

        return ({clients, clientsTotal})
    }
}

export { ListClientsService }