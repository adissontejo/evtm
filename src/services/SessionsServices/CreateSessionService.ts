import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import BaseService from '../BaseService';

type UserData = {
  email: string;
  password: string;
};

class CreateSessionService extends BaseService {
  async execute(userData: UserData) {
    const user = await this.usersRepository.findOne({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      return {
        error: 'Invalid email or password.',
        status: 401,
      };
    }

    const match = compareSync(userData.password, user.password);

    if (!match) {
      return {
        error: 'Invalid email or password.',
        status: 401,
      };
    }

    const token = sign(
      { email: userData.email },
      process.env.JWT_SECRET || 'privatekey',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    delete user.password;

    return { user, token };
  }
}

export default CreateSessionService;
