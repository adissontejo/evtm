import { mockRequestParams, mockConsts } from '@tests/utils';

import { sessionsValidator } from '~/validators';

const { req, res, next, reset } = mockRequestParams();

describe('UserValidator create', () => {
  beforeEach(() => {
    reset();

    req.body = mockConsts.createSessionBody();
  });

  describe('when params are missing', () => {
    it('returns error status', () => {
      delete req.body.user.email;

      sessionsValidator.create(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when email is invalid', () => {
    it('returns error status', () => {
      req.body.user.email = 'invalidemail@';

      sessionsValidator.create(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when password is too short', () => {
    it('returns error status', () => {
      req.body.user.password = 'shortp';

      sessionsValidator.create(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(next).not.toBeCalled();
    });
  });

  describe('when all params are valid', () => {
    it('forwards requisition', () => {
      sessionsValidator.create(req, res, next);

      expect(next).toBeCalled();
    });
  });
});
