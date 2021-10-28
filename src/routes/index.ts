import { Router } from 'express';

import { errors } from '~/middlewares';

import sessionsRouter from './sessionsRoutes';
import usersRouter from './usersRoutes';

const router = Router();

router.use(errors);

router.use('/sessions', sessionsRouter);

router.use('/users', usersRouter);

export default router;
