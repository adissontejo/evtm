import { compareSync } from 'bcryptjs';

import BaseService from '../BaseService';

type UserData = {
  password: string;
};

type Session = {
  userId: string;
};

class DeleteUserService extends BaseService {
  async execute(userData: UserData, session: Session) {
    const user = await this.usersRepository.findOne(session.userId);

    if (!user) {
      return {
        error: 'User does not exist.',
        status: 404,
      };
    }

    const match = compareSync(userData.password, user.password);

    if (!match) {
      return {
        error: 'Invalid password.',
        status: 401,
      };
    }

    await this.usersRepository.delete(user.id);

    return {
      message: 'User was succesfully deleted.',
    };
  }
}

export default DeleteUserService;
