import { Request, Response } from 'express';
import { DeleteTaskService } from '../../services/Task/DeleteTaskService';

class DeleteTaskController {
    async handle(req: Request, res: Response) {
        
        const { createSecretary } = req.query
        const { taskId } = req.params
        
        const deleteTaskService = new DeleteTaskService

        const task = await deleteTaskService.execute({
            taskId, createSecretary: createSecretary == "true"
        })

        return res.json(task)
    }
}

export { DeleteTaskController }