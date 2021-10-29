import { UsersController } from '~/controllers';
import { CreateUserService } from '~/services';

import { mockRequestParams } from '../helpers';

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

      req.body.user = {
        name: 'User Name',
        email: 'user@email.com',
        password: 'userpassword',
      };

      await controller.create(req, res);

      expect(service).toBeCalledWith(req.body.user);
    });
  });
});
