import { Request, Response } from 'express';
import { CreateUserService } from '../../services/User/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { password, name, email, role, oab, observation } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createUserService = new CreateUserService

        const user = await createUserService.execute({
            name, email, password, role, oab, photo, observation
        })

        if (user["photo"]) {
            user["photo_url"] = "https://dangersjorge-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { CreateUserController }