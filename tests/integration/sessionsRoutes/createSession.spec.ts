import { api, db, mockConsts } from '@tests/utils';

jest.unmock('typeorm');

let body = mockConsts.createSessionBody();

const request = () => api.post('/sessions').send(body);

describe('POST /sessions', () => {
  beforeAll(async () => {
    await db.init();

    await api.post('/users').send(mockConsts.createUserBody());
  });

  beforeEach(() => {
    body = mockConsts.createSessionBody();
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      delete body.user.email;

      const result = await request();

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when email is invalid', () => {
    it('returns 400', async () => {
      body.user.email = 'invalidemail@';

      const result = await request();

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when password is too short', () => {
    it('returns 400', async () => {
      body.user.password = 'shortp';

      const result = await request();

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when user does not exist', () => {
    it('returns 401', async () => {
      body.user.email = 'inexistinguser@email.com';

      const result = await request();

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when password does not match', () => {
    it('returns 401', async () => {
      body.user.password = 'wrongpassword';

      const result = await request();

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when params are valid', () => {
    it('returns 201', async () => {
      const result = await request();

      expect(result.statusCode).toBe(201);
    });
  });
});
