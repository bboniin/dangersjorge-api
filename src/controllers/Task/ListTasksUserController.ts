import { Request, Response } from 'express';
import { ListTasksUserService } from '../../services/Task/ListTasksUserService';

class ListTasksUserController {
    async handle(req: Request, res: Response) {
        
        let userId = req.userId
        
        const listTasksUserService = new ListTasksUserService

        const tasks = await listTasksUserService.execute({
            userId
        })

        return res.json(tasks)
    }
}

export { ListTasksUserController }