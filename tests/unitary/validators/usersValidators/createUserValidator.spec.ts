import { usersValidators } from '~/validators';

import { mockRequestParams } from '../../helpers';

const { req, res, next, reset } = mockRequestParams();

describe('UserValidator create', () => {
  beforeEach(() => {
    reset();

    req.body.user = {
      name: 'User Name',
      email: 'user@email.com',
      password: 'userpassword',
    };
  });

  describe('when params are missing', () => {
    it('returns error status', () => {
      delete req.body.user.name;

      usersValidators.create(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when email is invalid', () => {
    it('returns error status', () => {
      req.body.user.email = 'invalidemail@';

      usersValidators.create(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when password is too short', () => {
    it('returns error status', () => {
      req.body.user.password = 'short';

      usersValidators.create(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when all params are valid', () => {
    it('forwards requisition', () => {
      usersValidators.create(req, res, next);

      expect(next).toBeCalled();
    });
  });
});
