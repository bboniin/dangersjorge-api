import { addDays, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface TaskRequest {
    userId: string;
}

class ListTasksUserService {
    async execute({ userId }: TaskRequest) {

        const tasksTotal = await prismaClient.task.count({
            where: {
                userId: userId,
                date: {
                    gte: startOfDay(addDays(new Date(), -10))
                }
            }
        })

        const tasks = await prismaClient.task.findMany({
            where: {
                userId: userId,
                date: {
                    gte: startOfDay(addDays(new Date(), -10))
                }
            },
            orderBy: {
                date: "asc"
            },
            include: {
                process: true,
                client: true
            }
        })

        return ({tasks, tasksTotal})
    }
}

export { ListTasksUserService }