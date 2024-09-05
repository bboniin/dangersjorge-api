import { Request, Response } from 'express';
import { ListTasksService } from '../../services/Task/ListTasksService';
import { addDays } from 'date-fns';

class ListTasksController {
    async handle(req: Request, res: Response) {
        
        const { page, dateEnd, dateStart } = req.query

        const listTasksService = new ListTasksService

        const tasks = await listTasksService.execute({
            page: Number(page) > 0 ? Number(page) : 0, dateEnd: dateEnd ? new Date(String(dateEnd)) : addDays(new Date(),30), dateStart: dateStart ? new Date(String(dateStart)) : new Date()
        })

        return res.json(tasks)
    }
}

export { ListTasksController }