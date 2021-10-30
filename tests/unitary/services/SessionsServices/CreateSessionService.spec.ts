import { mocked } from 'ts-jest/utils';

import { mockConsts, mockUsersRepository } from '@tests/utils';

import { CreateSessionService } from '~/services';

let body = mockConsts.createSessionBody();

const usersRepo = mockUsersRepository();

describe('Class CreateSessionService', () => {
  beforeEach(() => {
    body = mockConsts.createSessionBody();
  });

  describe('when user is not found', () => {
    it('returns error message', async () => {
      mocked(usersRepo.findOne).mockReturnValueOnce(undefined);

      const service = new CreateSessionService();

      const result = await service.execute(body.user);

      expect(result).toHaveProperty('error');
    });
  });

  describe('when password does not match', () => {
    it('returns error message', async () => {
      const service = new CreateSessionService();

      body.user.password = 'wrongpassword';

      const result = await service.execute(body.user);

      expect(result).toHaveProperty('error');
    });
  });

  describe('when email and password matches', () => {
    it('returns token', async () => {
      const service = new CreateSessionService();

      const result = await service.execute(body.user);

      expect(result).toHaveProperty('token');
    });
  });
});
