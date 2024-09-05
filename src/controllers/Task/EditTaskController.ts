import { Request, Response } from 'express';
import { EditTaskService } from '../../services/Task/EditTaskService';

class EditTaskController {
    async handle(req: Request, res: Response) {

        const { taskId } = req.params

        const { title, description, date, clientId, processId, createSecretary, type, userId } = req.body

        const editTaskService = new EditTaskService

        const task = await editTaskService.execute({
            title, description, date, clientId, processId, type, userId, createSecretary, taskId
        })

        return res.json(task)
    }
}

export { EditTaskController }