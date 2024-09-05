import { format } from 'date-fns';
import prismaClient from '../../prisma';
import * as OneSignal from 'onesignal-node';   

interface TaskRequest {
    description: string;
    date: string;
    clientId: string;
    processId: string;
    type: string;
    userId: string;
    title: string;
    createSecretary: boolean;
}

class CreateTaskService {
    async execute({ title, description, date, clientId, processId, type, createSecretary, userId }: TaskRequest) {

        if (!type || !title || !date) {
            throw new Error("Titulo, data e tipo são obrigatórios")
        }

        const task = await prismaClient.task.create({
            data: {
                title: title, 
                description: description, 
                date: date, 
                clientId: clientId || null,
                processId: processId || null, 
                type: type,
                userId: userId,
                idNumber: String(Math.random()).substr(2,6)
            }
        })

        const message = `${title} no dia ${format(new Date(date), "dd/MM/yyyy HH:mm")} foi adicionado da sua agenda, clique para sincronizar agenda`

        const client = new OneSignal.Client('950b926d-b06c-4130-a7ee-647d60bd6e22', 'NDZkMWRhYjQtMTU2Mi00OWQ3LWIxNjQtNWY4N2RmMmJkNzFk');

        if(createSecretary && userId){
            await client.createNotification({
                headings: {
                    'en': type+" criado",
                    'pt': type+" criado",
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
                    'en': type+" criado",
                    'pt': type+" criado",
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

export { CreateTaskService }