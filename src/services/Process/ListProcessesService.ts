import prismaClient from '../../prisma'

interface ProcessRequest {
    page: number;
    all: boolean;
}

class ListProcessesService {
    async execute({ page, all }: ProcessRequest) {

        let filter = {}

        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }

        const processesTotal = await prismaClient.process.count()

        const processes = await prismaClient.process.findMany({
            include: {
                client: true,
                lawyer: true,
                vara: true
            },
            ...filter
        })

        return ({processes, processesTotal})
    }
}

export { ListProcessesService }