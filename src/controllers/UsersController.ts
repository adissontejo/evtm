import { Request, Response } from 'express';

import { CreateUserService, GetUserDataService } from '~/services';

class UsersController {
  async create(req: Request, res: Response) {
    const { user } = req.body;

    const service = new CreateUserService();

    const result = await service.execute(user);

    return res.status(201).json(result);
  }

  async getData(req: Request, res: Response) {
    const { session } = res.locals;

    const service = new GetUserDataService();

    const result = await service.execute(session);

    return res.status(200).json(result);
  }
}

export default UsersController;
