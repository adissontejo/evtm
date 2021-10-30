import { mockConsts, mockRequestParams } from '@tests/utils';

import { usersValidators } from '~/validators';

const { req, res, next, reset } = mockRequestParams();

describe('userValidator delete', () => {
  beforeEach(() => {
    reset();

    req.body = mockConsts.deleteUserBody();
  });

  describe('when params are missing', () => {
    it('returns error status', async () => {
      delete req.body.user.password;

      usersValidators.delete(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when password is too short', () => {
    it('returns error status', () => {
      req.body.user.password = 'shortp';

      usersValidators.delete(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when all params are valid', () => {
    it('forwards requisition', () => {
      usersValidators.delete(req, res, next);

      expect(next).toBeCalled();
    });
  });
});
