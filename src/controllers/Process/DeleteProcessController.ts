import { Request, Response } from 'express';
import { DeleteProcessService } from '../../services/Process/DeleteProcessService';

class DeleteProcessController {
    async handle(req: Request, res: Response) {
        
        const { processId } = req.params
        
        const deleteProcessService = new DeleteProcessService

        const process = await deleteProcessService.execute({
            processId
        })

        return res.json(process)
    }
}

export { DeleteProcessController }