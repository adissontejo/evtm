import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';

import { GetUserDataService } from '~/services';

jest.mock('typeorm', () => ({
  __esModule: true,
  ...(jest.requireActual('typeorm') as Object),
  getCustomRepository: jest.fn(),
}));

const session = {
  userId: 'userid',
};

const usersRepo = {
  findOne: jest.fn(),
};

describe('Service GetUserData', () => {
  beforeAll(() => {
    mocked(getCustomRepository).mockReturnValue(usersRepo);
  });

  beforeEach(() => {
    session.userId = 'userid';

    mocked(usersRepo.findOne).mockReturnValue({
      id: 'userid',
      name: 'User Name',
      email: 'user@email.com',
      password: 'userhashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  describe('when user is not found', () => {
    it('returns error message', async () => {
      mocked(usersRepo.findOne).mockReturnValue(undefined);

      const service = new GetUserDataService();

      const result = await service.execute(session);

      expect(result).toHaveProperty('error');
    });
  });

  describe('when user is found', () => {
    it('returns user', async () => {
      const service = new GetUserDataService();

      const result = await service.execute(session);

      expect(result).toHaveProperty('user');
    });
  });
});
