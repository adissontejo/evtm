import { mocked } from 'ts-jest/utils';

import { mockConsts, mockUsersRepository } from '@tests/utils';

import { DeleteUserService } from '~/services';

let body = mockConsts.deleteUserBody();
let session = mockConsts.localSession();

const usersRepo = mockUsersRepository();

describe('Class DeleteUserService', () => {
  beforeEach(() => {
    body = mockConsts.deleteUserBody();
    session = mockConsts.localSession();
  });

  describe('when user is not found', () => {
    it('does not delete user and returns error message', async () => {
      mocked(usersRepo.findOne).mockReturnValueOnce(undefined);

      const service = new DeleteUserService();

      const result = await service.execute(body.user, session);

      expect(usersRepo.delete).not.toBeCalled();
      expect(result).toHaveProperty('error');
    });
  });

  describe('when password does not match', () => {
    it('returns error message and does not delete user', async () => {
      body.user.password = 'wrongpassword';

      const service = new DeleteUserService();

      const result = await service.execute(body.user, session);

      expect(usersRepo.delete).not.toBeCalled();
      expect(result).toHaveProperty('error');
    });
  });

  describe('when password matches', () => {
    it('deletes user and returns succesful message', async () => {
      const service = new DeleteUserService();

      const result = await service.execute(body.user, session);

      expect(usersRepo.delete).toBeCalled();
      expect(result).toHaveProperty('message');
    });
  });
});
