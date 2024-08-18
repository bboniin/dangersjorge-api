import { Request, Response } from 'express';
import { EditClientService } from '../../services/Client/EditClientService';

class EditClientController {
    async handle(req: Request, res: Response) {
        
        const { clientId } = req.params

        const { name, email, phoneNumber, type, cpfOrCnpj, observation } = req.body

        const editClientService = new EditClientService

        const client = await editClientService.execute({
            name, email, phoneNumber, type, cpfOrCnpj, observation, clientId 
        })

        return res.json(client)
    }
}

export { EditClientController }