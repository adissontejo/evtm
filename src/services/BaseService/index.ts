import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '~/repositories';

type Repositories = {
  usersRepository?: UsersRepository;
};

class BaseService {
  usersRepository: UsersRepository;

  constructor(repositories: Repositories = {}) {
    this.usersRepository = getCustomRepository(UsersRepository);

    Object.assign(this, repositories);
  }
}

export default BaseService;
