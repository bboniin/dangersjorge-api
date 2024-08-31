import { Request, Response } from 'express';
import { EditProcessService } from '../../services/Process/EditProcessService';

class EditProcessController {
    async handle(req: Request, res: Response) {

        const { processId } = req.params

        const { number, clientId, activePole, status, reu, lawyers, lawyerAuthor, action, varaId, value, link } = req.body

        const editProcessService = new EditProcessService

        const process = await editProcessService.execute({
            number, clientId, activePole, status, reu, lawyers, lawyerAuthor, action, varaId, value, link, processId
        })

        return res.json(process)
    }
}

export { EditProcessController }