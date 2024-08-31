import { Request, Response } from 'express';
import { CreateTaskService } from '../../services/Task/CreateTaskService';

class CreateTaskController {
    async handle(req: Request, res: Response) {
        
        const { description, date, clientId, processId, type, createSecretary,  userId } = req.body

        const createTaskService = new CreateTaskService

        const task = await createTaskService.execute({
            description, date, clientId, processId, type, createSecretary, userId
        })

        return res.json(task)
    }
}

export { CreateTaskController }