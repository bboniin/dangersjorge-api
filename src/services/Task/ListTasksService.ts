import { endOfDay, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface TaskRequest {
    page: number;
    userId: string;
    dateStart: Date;
    dateEnd: Date;
}

class ListTasksService {
    async execute({ page, userId, dateStart, dateEnd }: TaskRequest) {

        let filter = {}

        filter["skip"] = page * 30
        filter["take"] = 30

        const tasksTotal = await prismaClient.task.count({
            where: {
                userId: userId,
                date: {
                    gte: startOfDay(dateStart),
                    lte: endOfDay(dateEnd)
                }
            }
        })

        const tasks = await prismaClient.task.findMany({
            where: {
                userId: userId,
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