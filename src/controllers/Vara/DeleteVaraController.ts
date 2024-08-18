import { Request, Response } from 'express';
import { DeleteVaraService } from '../../services/Vara/DeleteVaraService';

class DeleteVaraController {
    async handle(req: Request, res: Response) {
        
        const { varaId } = req.params
        
        const deleteVaraService = new DeleteVaraService

        const vara = await deleteVaraService.execute({
            varaId
        })

        return res.json(vara)
    }
}

export { DeleteVaraController }