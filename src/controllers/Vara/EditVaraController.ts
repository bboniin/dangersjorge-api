import { Request, Response } from 'express';
import { EditVaraService } from '../../services/Vara/EditVaraService';

class EditVaraController {
    async handle(req: Request, res: Response) {

        const { varaId } = req.params

        const { name, judge } = req.body

        const editVaraService = new EditVaraService

        const vara = await editVaraService.execute({
            name, judge, varaId
        })

        return res.json(vara)
    }
}

export { EditVaraController }