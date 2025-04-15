import { Request, Response } from "express";
import { ListVarasService } from "../../services/Vara/ListVarasService";

class ListVarasController {
  async handle(req: Request, res: Response) {
    const { page, all, name } = req.query;

    const listVarasService = new ListVarasService();

    const varas = await listVarasService.execute({
      page: Number(page) > 0 ? Number(page) : 0,
      all: all == "true",
      name: name ? String(name) : "",
    });

    return res.json(varas);
  }
}

export { ListVarasController };
