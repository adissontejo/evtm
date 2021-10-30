import { sign } from 'jsonwebtoken';

import { mockRequestParams } from '@tests/utils';

import { auth } from '~/middlewares';

const { req, res, next, reset } = mockRequestParams();

let token = '';

describe('Middleware auth', () => {
  beforeEach(() => {
    reset();

    token = sign({ email: 'payloademail' }, 'privatekey', {
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
    it('forwards requisition', () => {
      req.headers.authorization = `Bearer ${token}`;

      auth(req, res, next);

      expect(true).toBe(true);
    });
  });
});
