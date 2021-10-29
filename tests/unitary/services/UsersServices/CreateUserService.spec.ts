import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';

import { CreateUserService } from '~/services';

jest.mock('typeorm');

const user = {
  name: 'User Name',
  email: 'user@email.com',
  password: 'userpassword',
};

const userReturnedData = {
  ...user,
  id: 'userid',
  password: 'userhashedpassword',
  createdAt: new Date(),
  updatedAat: new Date(),
};

const usersRepo = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('Class CreateUserService', () => {
  beforeAll(() => {
    mocked(getCustomRepository).mockReturnValue(usersRepo);
  });

  beforeEach(() => {
    user.name = 'User Name';
    user.email = 'user@email.com';
    user.password = 'userpassword';

    mocked(usersRepo.findOne).mockReturnValue(userReturnedData);
    mocked(usersRepo.save).mockReturnValue(userReturnedData);
  });

  describe('when user email is found', () => {
    it('does not save user and returns error message', async () => {
      const service = new CreateUserService();

      const result = await service.execute(user);

      expect(usersRepo.save).not.toBeCalled();
      expect(result).toHaveProperty('error');
    });
  });

  describe('when user email is not found', () => {
    it('saves and returns user', async () => {
      mocked(usersRepo.findOne).mockReturnValue(undefined);

      const service = new CreateUserService();

      const result = await service.execute(user);

      expect(usersRepo.save).toBeCalled();
      expect(result).toHaveProperty('user');
    });
  });
});
