import { hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import BaseService from '../BaseService';

type UserData = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService extends BaseService {
  async execute(userData: UserData) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      return {
        error: 'Email has already been used.',
        status: 409,
      };
    }

    const encryptedPassword = hashSync(userData.password, 8);

    const user = await this.usersRepository.save({
      ...userData,
      password: encryptedPassword,
    });

    const token = sign(
      { email: user.email },
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

export default CreateUserService;
