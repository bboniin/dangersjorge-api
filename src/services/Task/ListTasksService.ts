import { endOfDay, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface TaskRequest {
    page: number;
    dateStart: Date;
    dateEnd: Date;
}

class ListTasksService {
    async execute({ page, dateStart, dateEnd }: TaskRequest) {

        let filter = {}

        filter["skip"] = page * 30
        filter["take"] = 30

        const tasksTotal = await prismaClient.task.count({
            where: {
                date: {
                    gte: startOfDay(dateStart),
                    lte: endOfDay(dateEnd)
                }
            }
        })

        const tasks = await prismaClient.task.findMany({
            where: {
                date: {
                    gte: startOfDay(dateStart),
                    lte: endOfDay(dateEnd)
                }
            },
            orderBy: {
                date: "asc"
            },
            ...filter
        })

        return ({tasks, tasksTotal})
    }
}

export { ListTasksService }