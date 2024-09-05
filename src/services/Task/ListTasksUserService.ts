import { addDays, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface TaskRequest {
    userId: string;
}

class ListTasksUserService {
    async execute({ userId }: TaskRequest) {

        const tasksTotal = await prismaClient.task.count({
            where: {
                OR: [{
                        userId: userId,
                    },
                    {
                        userId: "",
                    }
                ],
                date: {
                    gte: startOfDay(addDays(new Date(), -3))
                }
            }
        })

        const tasks = await prismaClient.task.findMany({
            where: {
                OR: [{
                        userId: userId,
                    },
                    {
                        userId: "",
                    }
                ],
                date: {
                    gte: startOfDay(addDays(new Date(), -3))
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