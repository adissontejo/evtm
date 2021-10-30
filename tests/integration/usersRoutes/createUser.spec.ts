import { api, db, mockConsts } from '@tests/utils';

jest.unmock('typeorm');

let body = mockConsts.createUserBody();

const request = () => api.post('/users').send(body);

describe('POST /users', () => {
  beforeAll(async () => {
    await db.init();
  });

  beforeEach(() => {
    body = mockConsts.createUserBody();
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      delete body.user.password;

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

  describe('when params are valid', () => {
    it('returns 201', async () => {
      const result = await request();

      expect(result.statusCode).toBe(201);
    });
  });

  describe('when email has already been used', () => {
    it('returns 409', async () => {
      const result = await request();

      expect(result.statusCode).toBe(409);
    });
  });
});
