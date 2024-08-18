import { Request, Response } from 'express';
import { CreateVaraService } from '../../services/Vara/CreateVaraService';

class CreateVaraController {
    async handle(req: Request, res: Response) {
        
        const { name } = req.body

        const createVaraService = new CreateVaraService

        const vara = await createVaraService.execute({
            name
        })

        return res.json(vara)
    }
}

export { CreateVaraController }