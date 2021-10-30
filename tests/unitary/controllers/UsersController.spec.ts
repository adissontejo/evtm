import { mockRequestParams, mockConsts } from '@tests/utils';

import { UsersController } from '~/controllers';
import {
  CreateUserService,
  DeleteUserService,
  GetUserDataService,
} from '~/services';

jest.mock('~/services');

const controller = new UsersController();

const { res, req, reset } = mockRequestParams();

describe('Class UsersController', () => {
  beforeEach(() => {
    reset();
  });

  describe('method create', () => {
    it('calls CreateUserService', async () => {
      const service = CreateUserService.prototype.execute;

      req.body = mockConsts.createUserBody();

      await controller.create(req, res);

      expect(service).toBeCalledWith(req.body.user);
    });
  });

  describe('method delete', () => {
    it('calls DeleteUserService', async () => {
      const service = DeleteUserService.prototype.execute;

      req.body = mockConsts.deleteUserBody();

      res.locals.session = mockConsts.localSession();

      await controller.delete(req, res);

      expect(service).toBeCalledWith(req.body.user, res.locals.session);
    });
  });

  describe('method getData', () => {
    it('calls GetUserDataService', async () => {
      const service = GetUserDataService.prototype.execute;

      res.locals.session = mockConsts.localSession();

      await controller.getData(req, res);

      expect(service).toBeCalledWith(res.locals.session);
    });
  });
});
