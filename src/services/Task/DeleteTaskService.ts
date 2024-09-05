import prismaClient from '../../prisma'
import { format } from 'date-fns';
import * as OneSignal from 'onesignal-node';   

interface TaskRequest {
    taskId: string;
    createSecretary: boolean;
}

class DeleteTaskService {
    async execute({ taskId, createSecretary}: TaskRequest) {

        const taskExists = await prismaClient.task.findFirst({
            where: {
                id: taskId
            }
        })

        if (!taskExists) {
            throw new Error("Tarefa não encontrada")
        }
        
        await prismaClient.task.delete({
            where: {
                id: taskId
            },
        })

        const message = `${taskExists.title} no dia ${format(taskExists.date, "dd/MM/yyyy HH:mm")} foi excluido da sua agenda, clique para sincronizar agenda`

        const client = new OneSignal.Client('950b926d-b06c-4130-a7ee-647d60bd6e22', 'NDZkMWRhYjQtMTU2Mi00OWQ3LWIxNjQtNWY4N2RmMmJkNzFk');

        if(createSecretary && taskExists.userId){
            await client.createNotification({
                headings: {
                    'en': taskExists.type+" deletado",
                    'pt': taskExists.type+" deletado",
                },
                contents: {
                'en': message,
                'pt': message,
                },
                include_external_user_ids: [taskExists.userId]
            })
        }else{
            await client.createNotification({
                headings: {
                    'en': taskExists.type+" deletado",
                    'pt': taskExists.type+" deletado",
                },
                contents: {
                'en': message,
                'pt': message,
                },
                included_segments: ['All']
            })
        }

        return ("Tarefa deletada com sucesso")
    }
}

export { DeleteTaskService }