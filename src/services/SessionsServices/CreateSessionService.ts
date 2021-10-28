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
      select: ['password', 'id'],
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

    const token = sign({ email: userData.email }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
