import { api, db, mockConsts } from '@tests/utils';

jest.unmock('typeorm');

let body = mockConsts.deleteUserBody();
let token = '';

const request = (authorization?: string) => {
  if (!authorization) {
    return api.delete('/users').send(body);
  }

  return api.delete('/users').send(body).set('Authorization', authorization);
};

describe('DELETE /users', () => {
  beforeAll(async () => {
    await db.init();

    const result = await api.post('/users').send(mockConsts.createUserBody());

    token = `Bearer ${result.body.token}`;
  });

  beforeEach(() => {
    body = mockConsts.deleteUserBody();
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      delete body.user.password;

      const result = await request(token);

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when password is too short', () => {
    it('returns 400', async () => {
      body.user.password = 'shortp';

      const result = await request(token);

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when token is missing', () => {
    it('returns 401', async () => {
      const result = await request();

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when token is invalid', () => {
    it('returns 401', async () => {
      const result = await request('invalidtoken');

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when password does not match', () => {
    it('returns 401', async () => {
      body.user.password = 'wrongpassword';

      const result = await request(token);

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when password matches', () => {
    it('returns 200', async () => {
      const result = await request(token);

      expect(result.statusCode).toBe(200);
    });
  });

  describe('when user is not found', () => {
    it('returns 404', async () => {
      const result = await request(token);

      expect(result.statusCode).toBe(404);
    });
  });
});
