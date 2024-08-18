import { Request, Response } from 'express';
import { DeleteClientService } from '../../services/Client/DeleteClientService';

class DeleteClientController {
    async handle(req: Request, res: Response) {
        
        const { clientId } = req.params
        
        const deleteClientService = new DeleteClientService

        const client = await deleteClientService.execute({
            clientId
        })

        return res.json(client)
    }
}

export { DeleteClientController }