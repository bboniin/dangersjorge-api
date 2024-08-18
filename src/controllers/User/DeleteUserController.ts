import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/User/DeleteUserService';

class DeleteUserController {
    async handle(req: Request, res: Response) {
        
        const { userId } = req.params
        
        const deleteUserService = new DeleteUserService

        const user = await deleteUserService.execute({
            userId
        })

        return res.json(user)
    }
}

export { DeleteUserController }