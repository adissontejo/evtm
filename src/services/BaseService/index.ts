import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '~/repositories';

class BaseService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
}

export default BaseService;
