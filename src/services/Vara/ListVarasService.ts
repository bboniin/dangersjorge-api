import prismaClient from '../../prisma'

interface VaraRequest {
    page: number;
    all: boolean;
}

class ListVarasService {
    async execute({ page, all }: VaraRequest) {

        let filter = {}

        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }

        const varasTotal = await prismaClient.vara.count({
            where: {
                visible: true
            }
        })

        const varas = await prismaClient.vara.findMany({
            where: {
                visible: true,
            },
            orderBy: {
                name: "asc"
            },
            ...filter
        })

        return ({varas, varasTotal})
    }
}

export { ListVarasService }