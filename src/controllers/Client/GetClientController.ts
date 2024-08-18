import { Request, Response } from 'express';
import { GetClientService } from '../../services/Client/GetClientService';

class GetClientController {
    async handle(req: Request, res: Response) {

        const { clientId } = req.params

        const getClientService = new GetClientService

        const client = await getClientService.execute({
            clientId
        })


        return res.json(client)
    }
}

export { GetClientController }