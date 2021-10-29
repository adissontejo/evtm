import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { hashSync } from 'bcryptjs';

import { CreateSessionService } from '~/services';

jest.mock('typeorm', () => ({
  __esModule: true,
  ...(jest.requireActual('typeorm') as Object),
  getCustomRepository: jest.fn(),
}));

const user = {
  email: 'user@email.com',
  password: 'userpassword',
};

const usersRepo = {
  findOne: jest.fn(),
};

describe('Class CreateSessionService', () => {
  beforeAll(() => {
    mocked(getCustomRepository).mockReturnValue(usersRepo);
  });

  beforeEach(() => {
    user.email = 'user@email.com';
    user.password = 'userpassword';

    mocked(usersRepo).findOne.mockReturnValue({
      id: 'userid',
      name: 'User Name',
      email: user.email,
      password: hashSync('userpassword', 8),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  describe('when user is not found', () => {
    it('returns error message', async () => {
      mocked(usersRepo.findOne).mockReturnValue(undefined);

      const service = new CreateSessionService();

      const result = await service.execute(user);

      expect(result).toHaveProperty('error');
    });
  });

  describe('when password does not match', () => {
    it('returns error message', async () => {
      const service = new CreateSessionService();

      user.password = 'wrongpassword';

      const result = await service.execute(user);

      expect(result).toHaveProperty('error');
    });
  });

  describe('when email and password matches', () => {
    it('returns token', async () => {
      const service = new CreateSessionService();

      const result = await service.execute(user);

      expect(result).toHaveProperty('token');
    });
  });
});
