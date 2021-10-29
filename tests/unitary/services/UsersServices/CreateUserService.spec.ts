import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';

import { CreateUserService } from '~/services';

jest.mock('typeorm', () => ({
  __esModule: true,
  ...(jest.requireActual('typeorm') as Object),
  getCustomRepository: jest.fn(),
}));

const userData = {
  name: 'User Name',
  email: 'user@email.com',
  password: 'userpassword',
};

const userReturnedData = {
  id: 'userid',
  name: 'User Name',
  email: 'user@email.com',
  created_at: new Date(),
  updated_at: new Date(),
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
    mocked(usersRepo.findOne).mockReturnValue(userReturnedData);
    mocked(usersRepo.save).mockReturnValue(userReturnedData);
  });

  describe('when user email is found', () => {
    it('does not save user and returns error message', async () => {
      const service = new CreateUserService();

      const result = await service.execute(userData);

      expect(usersRepo.save).not.toBeCalled();
      expect(result).toHaveProperty('error');
    });
  });

  describe('when user email is not found', () => {
    it('saves and returns user', async () => {
      mocked(usersRepo.findOne).mockReturnValue(undefined);

      const service = new CreateUserService();

      const result = await service.execute(userData);

      expect(usersRepo.save).toBeCalled();
      expect(result).toHaveProperty('user');
    });
  });
});
