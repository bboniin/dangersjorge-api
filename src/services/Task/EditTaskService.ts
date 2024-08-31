import prismaClient from '../../prisma'
import { format } from 'date-fns';
import * as OneSignal from 'onesignal-node';   

interface TaskRequest {
    description: string;
    date: string;
    clientId: string;
    processId: string;
    type: string;
    taskId: string;
    createSecretary: boolean;
}

class EditTaskService {
    async execute({ description, date, clientId, processId, type, createSecretary, taskId }: TaskRequest) {

        if (!type || !description || !date) {
            throw new Error("Descrição, data e tipo são obrigatórios")
        }

        const taskExists = await prismaClient.task.findFirst({
            where: {
                id: taskId
            }
        })

        if (!taskExists) {
            throw new Error("Tarefa não encontrada")
        }

        const task = await prismaClient.task.update({
            where: {
                id: taskId,
            },
            data: {
                description: description, 
                date: date, 
                clientId: clientId || null,
                processId: processId || null, 
                type: type,
            }
        })

        if(createSecretary){
            const message = `${description} ${format(taskExists.date, "dd/MM/yyyy HH:mm") != format(new Date(date), "dd/MM/yyyy HH:mm") ? `foi alterado de ${format(taskExists.date, "dd/MM/yyyy HH:mm")} para ${format(new Date(date), "dd/MM/yyyy HH:mm")}` : "foi alterado"}, clique para sincronizar agenda`

            const client = new OneSignal.Client('950b926d-b06c-4130-a7ee-647d60bd6e22', 'NDZkMWRhYjQtMTU2Mi00OWQ3LWIxNjQtNWY4N2RmMmJkNzFk');

            await client.createNotification({
                headings: {
                    'en': type+" alterado",
                    'pt': type+" alterado",
                },
                contents: {
                'en': message,
                'pt': message,
                },
                include_external_user_ids: [taskExists.userId]
            })
        }
        
        return (task)
    }
}

export { EditTaskService }