import { Request, Response } from 'express';
import { CreateClientService } from '../../services/Client/CreateClientService';

class CreateClientController {
    async handle(req: Request, res: Response) {
        
        const { name, email, phoneNumber, type, cpfOrCnpj, observation } = req.body

        const createClientService = new CreateClientService

        const client = await createClientService.execute({
            name, email, phoneNumber, type, cpfOrCnpj, observation
        })

        return res.json(client)
    }
}

export { CreateClientController }