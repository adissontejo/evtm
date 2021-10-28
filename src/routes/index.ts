import { Router } from 'express';

import { errors } from '~/middlewares';

import usersRouter from './usersRoutes';

const router = Router();

router.use(errors);

router.use('/users', usersRouter);

export default router;
