import { Request, Response } from 'express';
import { RemoveObservationProcessService } from '../../services/Process/RemoveObservationProcessService';

class RemoveObservationProcessController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId

        const removeObservationProcessService = new RemoveObservationProcessService

        const observation = await removeObservationProcessService.execute({
            id
        })

        return res.json(observation)
    }
}

export { RemoveObservationProcessController }