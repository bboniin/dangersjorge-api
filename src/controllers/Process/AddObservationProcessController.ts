import { Request, Response } from 'express';
import { AddObservationProcessService } from '../../services/Process/AddObservationProcessService';

class AddObservationProcessController {
    async handle(req: Request, res: Response) {
        
        const { processId } = req.params

        const { description } = req.body

        let file = ""

        if (req.file) {
            file = req.file.filename
        }

        const addObservationProcessService = new AddObservationProcessService

        const observation = await addObservationProcessService.execute({
            processId, file, description
        })

        return res.json(observation)
    }
}

export { AddObservationProcessController }