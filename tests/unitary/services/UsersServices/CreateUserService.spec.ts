import { mocked } from 'ts-jest/utils';

import { mockConsts, mockUsersRepository } from '@tests/utils';

import { CreateUserService } from '~/services';

let body = mockConsts.createUserBody();

const usersRepo = mockUsersRepository();

describe('Class CreateUserService', () => {
  beforeEach(() => {
    body = mockConsts.createUserBody();
  });

  describe('when user email is found', () => {
    it('does not save user and returns error message', async () => {
      const service = new CreateUserService();

      const result = await service.execute(body.user);

      expect(usersRepo.save).not.toBeCalled();
      expect(result).toHaveProperty('error');
    });
  });

  describe('when user email is not found', () => {
    it('saves and returns user', async () => {
      mocked(usersRepo.findOne).mockReturnValueOnce(undefined);

      const service = new CreateUserService();

      const result = await service.execute(body.user);

      expect(usersRepo.save).toBeCalled();
      expect(result).toHaveProperty('user');
    });
  });
});
