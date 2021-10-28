import { Request, Response } from 'express';

import { CreateSessionService } from '~/services/';

class SessionsController {
  async create(req: Request, res: Response) {
    const { user } = req.body;

    const service = new CreateSessionService();

    const result = await service.execute(user);

    return res.status(201).json(result);
  }
}

export default SessionsController;
