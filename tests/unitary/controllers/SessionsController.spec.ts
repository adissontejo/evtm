import { mockRequestParams, mockConsts } from '@tests/utils';

import { SessionsController } from '~/controllers';
import { CreateSessionService } from '~/services';

jest.mock('~/services');

const controller = new SessionsController();

const { req, res, reset } = mockRequestParams();

describe('Class SessionsController', () => {
  beforeEach(() => {
    reset();
  });

  describe('method create', () => {
    it('calls CreateSessionService', async () => {
      const service = CreateSessionService.prototype.execute;

      req.body = mockConsts.createSessionBody();

      await controller.create(req, res);

      expect(service).toBeCalledWith(req.body.user);
    });
  });
});
