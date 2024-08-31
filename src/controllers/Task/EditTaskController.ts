import { Request, Response } from 'express';
import { EditTaskService } from '../../services/Task/EditTaskService';

class EditTaskController {
    async handle(req: Request, res: Response) {

        const { taskId } = req.params

        const { description, date, clientId, processId, createSecretary, type } = req.body

        const editTaskService = new EditTaskService

        const task = await editTaskService.execute({
            description, date, clientId, processId, type, createSecretary, taskId
        })

        return res.json(task)
    }
}

export { EditTaskController }