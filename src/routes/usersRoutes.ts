import { Router } from 'express';

import { UsersController } from '~/controllers';
import { usersValidators } from '~/validators';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersValidators.create, usersController.create);

export default usersRouter;
