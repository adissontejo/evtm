import { Router } from 'express';

import { UsersController } from '~/controllers';
import { auth } from '~/middlewares';
import { usersValidators } from '~/validators';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersValidators.create, usersController.create);

usersRouter.delete('/', usersValidators.delete, auth, usersController.delete);

usersRouter.get('/', usersValidators.getData, auth, usersController.getData);

export default usersRouter;
