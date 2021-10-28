import { Request, Response } from 'express';

import { CreateUserService } from '~/services';

class UsersController {
  async create(req: Request, res: Response) {
    const { user } = req.body;

    const service = new CreateUserService();

    const result = await service.execute(user);

    return res.status(201).json(result);
  }
}

export default UsersController;
