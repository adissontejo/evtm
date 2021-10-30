import { api, db, mockConsts } from '@tests/utils';

jest.unmock('typeorm');

let token = '';

const request = (authorization?: string) => {
  if (!authorization) {
    return api.get('/users');
  }

  return api.get('/users').set('Authorization', authorization);
};

describe('GET /users', () => {
  beforeAll(async () => {
    await db.init();

    const result = await api.post('/users').send(mockConsts.createUserBody());

    token = `Bearer ${result.body.token}`;
  });

  afterAll(async () => {
    await db.clear();
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

  describe('when token is valid', () => {
    it('returns 200', async () => {
      const result = await request(token);

      expect(result.statusCode).toBe(200);
    });
  });
});
