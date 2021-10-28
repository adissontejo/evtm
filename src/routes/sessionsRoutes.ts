import { Router } from 'express';

import { SessionsController } from '~/controllers';
import { sessionsValidator } from '~/validators';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsValidator.create, sessionsController.create);

export default sessionsRouter;
