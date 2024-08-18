import { Request, Response } from 'express';
import { EditUserService } from '../../services/User/EditUserService';

class EditUserController {
    async handle(req: Request, res: Response) {

        const { password, passwordOld, name, email, role, oab, observation } = req.body

        let { userId } = req.params

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }
        
        let userIdAuth = req.userId

        const editUserService = new EditUserService

        const user = await editUserService.execute({
            password, passwordOld, name, email, role, oab, photo, observation, userId: userId || userIdAuth
        })

        if (user["photo"]) {
            user["photo_url"] = "https://dangersjorge-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }
        
        return res.json(user)
    }
}

export { EditUserController }