import { Request, Response } from 'express';
import { ListClientsService } from '../../services/Client/ListClientsService';

class ListClientsController {
    async handle(req: Request, res: Response) {

        const { page, all } = req.query

        const listClientsService = new ListClientsService

        const clients = await listClientsService.execute({
            page: Number(page) > 0 ? Number(page) : 0, all: all == "true"
        })

        return res.json(clients)
    }
}

export { ListClientsController }