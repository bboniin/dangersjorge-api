import { Request, Response } from 'express';
import { CreateProcessService } from '../../services/Process/CreateProcessService';

class CreateProcessController {
    async handle(req: Request, res: Response) {
        
        const { number, clientId, status, reu, lawyers, lawyerAuthor, action, varaId, value, link } = req.body

        const createProcessService = new CreateProcessService

        const process = await createProcessService.execute({
            number, clientId, status, reu, lawyers, lawyerAuthor, action, varaId, value, link
        })

        return res.json(process)
    }
}

export { CreateProcessController }