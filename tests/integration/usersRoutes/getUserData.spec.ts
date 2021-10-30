import { api, db, mockConsts } from '@tests/utils';

jest.unmock('typeorm');

let token = '';

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
      const result = await api.get('/users');

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when token is invalid', () => {
    it('returns 401', async () => {
      const result = await api
        .get('/users')
        .set('Authorization', 'invalidtoken');

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when token is valid', () => {
    it('returns 200', async () => {
      const result = await api.get('/users').set('Authorization', token);

      expect(result.statusCode).toBe(200);
    });
  });
});
