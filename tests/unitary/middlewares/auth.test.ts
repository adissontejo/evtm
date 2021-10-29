import { sign } from 'jsonwebtoken';

import { auth } from '~/middlewares';

import { mockRequestParams } from '../helpers';

const { req, res, next, reset } = mockRequestParams();

const session = {
  token: sign({ email: 'payloademail' }, 'privatekey', {
    subject: 'userid',
    expiresIn: '1d',
  }),
};

describe('Middleware auth', () => {
  beforeEach(() => {
    reset();

    session.token = sign({ email: 'payloademail' }, 'privatekey', {
      subject: 'userid',
      expiresIn: '1d',
    });
  });

  describe('when token is missing', () => {
    it('sends unauthorized status', () => {
      auth(req, res, next);

      expect(res.status).toBeCalledWith(401);
    });
  });

  describe('when token is invalid', () => {
    it('sends unauthorized status', () => {
      req.headers.authorization = 'invalidtoken';

      auth(req, res, next);

      expect(res.status).toBeCalledWith(401);
    });
  });

  describe('when token is valid', () => {
    it('forwards session', () => {
      req.headers.authorization = `Bearer ${session.token}`;

      auth(req, res, next);

      expect(res.locals).toHaveProperty('session');
    });
  });
});
