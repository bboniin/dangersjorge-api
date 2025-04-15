import { Request, Response } from "express";
import { ListClientsService } from "../../services/Client/ListClientsService";

class ListClientsController {
  async handle(req: Request, res: Response) {
    const { page, all, name } = req.query;

    const listClientsService = new ListClientsService();

    const clients = await listClientsService.execute({
      page: Number(page) > 0 ? Number(page) : 0,
      all: all == "true",
      name: name ? String(name) : "",
    });

    return res.json(clients);
  }
}

export { ListClientsController };
