import { mockRequestParams } from '@tests/utils';

import { errors } from '~/middlewares';

const { req, res, next, reset } = mockRequestParams();

describe('Middleware errors', () => {
  beforeEach(() => {
    reset();

    errors(req, res, next);
  });

  describe('when a error message and status is sent', () => {
    it('sends error with status', async () => {
      const response = {
        error: 'error message',
        status: 400,
      };

      res.json(response);

      expect(res.status).toBeCalledWith(response.status);
      expect(res.json).toBeCalledWith({ error: response.error });
    });
  });

  describe('when a common json response is sent', () => {
    it('forwards body', async () => {
      const response = {
        name: 'response',
      };

      res.json(response);

      expect(res.status).not.toBeCalled();
      expect(res.json).toBeCalledWith(response);
    });
  });
});
