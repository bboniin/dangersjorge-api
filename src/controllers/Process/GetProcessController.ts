import { Request, Response } from 'express';
import { GetProcessService } from '../../services/Process/GetProcessService';

class GetProcessController {
    async handle(req: Request, res: Response) {

        const { processId } = req.params

        const getProcessService = new GetProcessService

        const process = await getProcessService.execute({
            processId
        })

        process.observations.map((item)=>{
            if (item["file"]) {
                item["file_url"] = "https://dangersjorge-data.s3.sa-east-1.amazonaws.com/" + item["file"];
            }
        })
        
        return res.json(process)
    }
}

export { GetProcessController }