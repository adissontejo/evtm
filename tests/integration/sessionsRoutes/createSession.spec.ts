import { api, db } from '@tests/utils';

jest.unmock('typeorm');

const user = {
  email: 'user@email.com',
  password: 'userpassword',
};

describe('POST /sessions', () => {
  beforeAll(async () => {
    await db.init();

    await api.post('/users').send({
      user: {
        ...user,
        name: 'User Name',
      },
    });
  });

  beforeEach(() => {
    user.email = 'user@email.com';
    user.password = 'userpassword';
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      delete user.email;

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when email is invalid', () => {
    it('returns 400', async () => {
      user.email = 'invalidemail@';

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when password is too short', () => {
    it('returns 400', async () => {
      user.password = 'shortp';

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when user does not exist', () => {
    it('returns 401', async () => {
      user.email = 'inexistinguser@email.com';

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when password does not match', () => {
    it('returns 401', async () => {
      user.password = 'wrongpassword';

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when params are valid', () => {
    it('returns 201', async () => {
      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(201);
    });
  });
});
