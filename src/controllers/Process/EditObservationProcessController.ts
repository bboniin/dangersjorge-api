import { Request, Response } from 'express';
import { EditObservationProcessService } from '../../services/Process/EditObservationProcessService';

class EditObservationProcessController {
    async handle(req: Request, res: Response) {
        
        const { id } = req.params

        const { description } = req.body

        let file = ""

        if (req.file) {
            file = req.file.filename
        }

        const editObservationProcessService = new EditObservationProcessService

        const observation = await editObservationProcessService.execute({
            id, file, description
        })

        return res.json(observation)
    }
}

export { EditObservationProcessController }