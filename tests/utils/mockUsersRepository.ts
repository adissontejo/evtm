import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';

import { hashSync } from 'bcryptjs';
import { User } from '~/models';

const user: User = {
  id: 'userid',
  name: 'User Name',
  email: 'user@email.com',
  password: hashSync('userpassword', 8),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUsersRepository = () => {
  const usersRepository = {
    delete: jest.fn(),
    find: jest.fn(() => [user]),
    findOne: jest.fn(() => user),
    save: jest.fn(() => user),
    update: jest.fn(),
  };

  mocked(getCustomRepository).mockReturnValue(usersRepository);

  return usersRepository;
};

export default mockUsersRepository;
