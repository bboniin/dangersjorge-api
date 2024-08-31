import { Request, Response } from 'express';
import { CreateVaraService } from '../../services/Vara/CreateVaraService';

class CreateVaraController {
    async handle(req: Request, res: Response) {
        
        const { name, judge } = req.body

        const createVaraService = new CreateVaraService

        const vara = await createVaraService.execute({
            name, judge
        })

        return res.json(vara)
    }
}

export { CreateVaraController }