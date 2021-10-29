import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { hashSync } from 'bcryptjs';

import { CreateSessionService } from '~/services';

jest.mock('typeorm', () => ({
  __esModule: true,
  ...(jest.requireActual('typeorm') as Object),
  getCustomRepository: jest.fn(),
}));

const userData = {
  email: 'user@email.com',
  password: 'userpassword',
};

const userReturnedData = {
  id: 'userid',
  password: hashSync('userpassword', 8),
};

const usersRepo = {
  findOne: jest.fn(),
};

describe('Class CreateSessionService', () => {
  beforeAll(() => {
    mocked(getCustomRepository).mockReturnValue(usersRepo);
  });

  beforeEach(() => {
    mocked(usersRepo).findOne.mockReturnValue(userReturnedData);
  });

  describe('when user is not found', () => {
    it('returns error message', async () => {
      mocked(usersRepo.findOne).mockReturnValue(undefined);

      const service = new CreateSessionService();

      const result = await service.execute(userData);

      expect(result).toHaveProperty('error');
    });
  });

  describe('when password does not match', () => {
    it('returns error message', async () => {
      const service = new CreateSessionService();

      const result = await service.execute({
        ...userData,
        password: 'wrongpassword',
      });

      expect(result).toHaveProperty('error');
    });
  });

  describe('when email and password matches', () => {
    it('returns token', async () => {
      const service = new CreateSessionService();

      const result = await service.execute(userData);

      expect(result).toHaveProperty('token');
    });
  });
});
