import { Request, Response } from 'express';
import { ListProcessesService } from '../../services/Process/ListProcessesService';

class ListProcessesController {
    async handle(req: Request, res: Response) {
        
        const { page, all, varaId, number, clientId } = req.query

        const listProcessesService = new ListProcessesService

        const response = await listProcessesService.execute({
            varaId: varaId ? String(varaId) : "", number: number ? String(number) : "",
            page: Number(page) > 0 ? Number(page) : 0, all: all == "true",
            clientId: clientId ? String(clientId) : "",
        })
        response.processes.map((item)=>{
            item.observations.map((data)=>{
                if (data["file"]) {
                    data["file_url"] = "https://dangersjorge-data.s3.sa-east-1.amazonaws.com/" + data["file"];
                }
            })
        })

        return res.json(response)
    }
}

export { ListProcessesController }