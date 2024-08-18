import { Request, Response } from 'express';
import { AuthUserService } from '../../services/User/AuthUserService';

class AuthUserController {
    async handle(req: Request, res: Response) {

        const { email, password } = req.body

        const authUserService = new AuthUserService

        const user = await authUserService.execute({
            email, password
        })

        if (user["photo"]) {
            user["photo_url"] = "https://dangersjorge-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }
        
        return res.json(user)
    }
}

export { AuthUserController }