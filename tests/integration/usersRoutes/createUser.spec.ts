import api from '../api';
import db from '../db';

const user = {
  name: 'User Name',
  email: 'user@email.com',
  password: 'userpassword',
};

describe('POST /users', () => {
  beforeAll(async () => {
    await db.init();
  });

  beforeEach(() => {
    user.name = 'User Name';
    user.email = 'user@email.com';
    user.password = 'userpassword';
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      delete user.password;

      const result = await api.post('/users').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when email is invalid', () => {
    it('returns 400', async () => {
      user.email = 'invalidemail@';

      const result = await api.post('/users').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when password is too short', () => {
    it('returns 400', async () => {
      user.password = 'shortp';

      const result = await api.post('/users').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when params are valid', () => {
    it('returns 201', async () => {
      const result = await api.post('/users').send({ user });

      expect(result.statusCode).toBe(201);
    });
  });

  describe('when email has already been used', () => {
    it('returns 409', async () => {
      const result = await api.post('/users').send({ user });

      expect(result.statusCode).toBe(409);
    });
  });
});
