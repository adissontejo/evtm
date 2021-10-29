import BaseService from '../BaseService';

type Session = {
  userId: string;
};

class GetUserDataService extends BaseService {
  async execute(session: Session) {
    const user = await this.usersRepository.findOne(session.userId);

    if (!user) {
      return {
        error: 'User does not exist.',
        status: 404,
      };
    }

    delete user.password;

    return { user };
  }
}

export default GetUserDataService;
