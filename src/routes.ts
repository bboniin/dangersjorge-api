import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

import { AuthUserController } from './controllers/User/AuthUserController'
import { ListVarasController } from './controllers/Vara/ListVarasController'
import { CreateVaraController } from './controllers/Vara/CreateVaraController'
import { EditVaraController } from './controllers/Vara/EditVaraController'
import { DeleteVaraController } from './controllers/Vara/DeleteVaraController'
import { ListClientsController } from './controllers/Client/ListClientsController'
import { CreateClientController } from './controllers/Client/CreateClientController'
import { GetClientController } from './controllers/Client/GetClientController'
import { EditClientController } from './controllers/Client/EditClientController'
import { DeleteClientController } from './controllers/Client/DeleteClientController'
import { ListUsersController } from './controllers/User/ListUsersController'
import { CreateUserController } from './controllers/User/CreateUserController'
import { GetUserController } from './controllers/User/GetUserController'
import { EditUserController } from './controllers/User/EditUserController'
import { DeleteUserController } from './controllers/User/DeleteUserController'
import { AddObservationProcessController } from './controllers/Process/AddObservationProcessController'
import { RemoveObservationProcessController } from './controllers/Process/RemoveObservationProcessController'
import { GetProcessController } from './controllers/Process/GetProcessController'
import { ListProcessesController } from './controllers/Process/ListProcessesController'
import { CreateProcessController } from './controllers/Process/CreateProcessController'
import { EditProcessController } from './controllers/Process/EditProcessController'
import { DeleteProcessController } from './controllers/Process/DeleteProcessController'
import { EditObservationProcessController } from './controllers/Process/EditObservationProcessController'

const upload = multer(uploadConfig)

const router = Router()

router.post('/sessions', new AuthUserController().handle)

router.use(isAuthenticated)

router.get('/varas', new ListVarasController().handle)
router.post('/vara', new CreateVaraController().handle)
router.put('/vara/:varaId', new EditVaraController().handle)
router.delete('/vara/:varaId', new DeleteVaraController().handle)

router.get('/client/:clientId', new GetClientController().handle)
router.get('/clients', new ListClientsController().handle)
router.post('/client', new CreateClientController().handle)
router.put('/client/:clientId', new EditClientController().handle)
router.delete('/client/:clientId', new DeleteClientController().handle)

router.get('/user', new GetUserController().handle)
router.get('/users', new ListUsersController().handle)
router.post('/user', upload.single("file"), new CreateUserController().handle)
router.put('/user/:userId', upload.single("file"), new EditUserController().handle)
router.delete('/user/:userId', new DeleteUserController().handle)

router.get('/process/:processId', new GetProcessController().handle)
router.get('/processes', new ListProcessesController().handle)
router.post('/process', new CreateProcessController().handle)
router.put('/process/:processId', new EditProcessController().handle)
router.delete('/process/:processId', new DeleteProcessController().handle)

router.post('/process/observation/:processId', upload.single("file"), new AddObservationProcessController().handle)
router.put('/process/observation/:id', upload.single("file"), new EditObservationProcessController().handle)
router.delete('/process/observation/:id', new RemoveObservationProcessController().handle)

export { router }