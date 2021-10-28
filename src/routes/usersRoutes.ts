import { Router } from 'express';

import usersValidators from '~/validators/usersValidators';

const usersRouter = Router();

usersRouter.post('/', usersValidators.create, (req, res) =>
  res.status(201).json('OK')
);

export default usersRouter;
