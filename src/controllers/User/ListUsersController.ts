import { Request, Response } from 'express';
import { ListUsersService } from '../../services/User/ListUsersService';

class ListUsersController {
    async handle(req: Request, res: Response) {
        
        const { type, page, all } = req.query

        const listUsersService = new ListUsersService

        const response = await listUsersService.execute({ 
            type: String(type), page: Number(page) > 0 ? Number(page) : 0, all: all == "true"
        })

        response.users.map((item)=>{
            if (item["photo"]) {
                item["photo_url"] = "https://dangersjorge-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(response)
    }
}

export { ListUsersController }