import { EntityRepository, Repository } from 'typeorm';

import { User } from '~/models';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export default UsersRepository;
