import prismaClient from '../../prisma'
import { format } from 'date-fns';
import * as OneSignal from 'onesignal-node';   

interface TaskRequest {
    description: string;
    date: string;
    title: string;
    clientId: string;
    processId: string;
    type: string;
    userId: string;
    taskId: string;
    createSecretary: boolean;
}

class EditTaskService {
    async execute({ title, description, userId, date, clientId, processId, type, createSecretary, taskId }: TaskRequest) {

        if (!type || !title || !date) {
            throw new Error("Titulo, data e tipo são obrigatórios")
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
                title: title, 
                description: description, 
                date: date, 
                userId: userId,
                clientId: clientId || null,
                processId: processId || null, 
                type: type,
            }
        })

        const message = `${description} ${format(taskExists.date, "dd/MM/yyyy HH:mm") != format(new Date(date), "dd/MM/yyyy HH:mm") ? `foi alterado de ${format(taskExists.date, "dd/MM/yyyy HH:mm")} para ${format(new Date(date), "dd/MM/yyyy HH:mm")}` : "foi alterado"}, clique para sincronizar agenda`

        const client = new OneSignal.Client('950b926d-b06c-4130-a7ee-647d60bd6e22', 'NDZkMWRhYjQtMTU2Mi00OWQ3LWIxNjQtNWY4N2RmMmJkNzFk');

        if(createSecretary && userId){
            await client.createNotification({
                headings: {
                    'en': type+" alterado",
                    'pt': type+" alterado",
                },
                contents: {
                'en': message,
                'pt': message,
                },
                include_external_user_ids: [userId]
            })
        }else{
            await client.createNotification({
                headings: {
                    'en': type+" alterado",
                    'pt': type+" alterado",
                },
                contents: {
                'en': message,
                'pt': message,
                },
                included_segments: ['All'] 
            })
        }
        
        return (task)
    }
}

export { EditTaskService }