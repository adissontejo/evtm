import { mocked } from 'ts-jest/utils';

import { mockConsts, mockUsersRepository } from '@tests/utils';

import { GetUserDataService } from '~/services';

let session = mockConsts.localSession();

const usersRepo = mockUsersRepository();

describe('Class GetUserDataService', () => {
  beforeEach(() => {
    session = mockConsts.localSession();
  });

  describe('when user is not found', () => {
    it('returns error message', async () => {
      mocked(usersRepo.findOne).mockReturnValueOnce(undefined);

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
