import prismaClient from '../../prisma'

interface ProcessRequest {
    page: number;
    all: boolean;
    number: string;
    clientId: string;
    varaId: string;
}

class ListProcessesService {
    async execute({ page, all, number, clientId, varaId }: ProcessRequest) {

        let filter = {}
        let where = {}

        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }

        if (clientId) {
            where["clientId"] = clientId
        }

        if (varaId) {
            where["varaId"] = varaId
        }

        if (number) {
            where["number"] = {
                contains: number
            }
        }

        filter["where"] = where

        const processesTotal = await prismaClient.process.count()

        const processes = await prismaClient.process.findMany({
            include: {
                client: true,
                lawyer: true,
                vara: true,
                observations: true
            },
            orderBy: {
                createdAt: "desc"
            },
            ...filter
        })

        return ({processes, processesTotal})
    }
}

export { ListProcessesService }