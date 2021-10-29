import api from '../api';
import db from '../db';

const userData = {
  email: 'user@email.com',
  password: 'userpassword',
};

describe('POST /sessions', () => {
  beforeAll(async () => {
    await db.init();

    await api.post('/users').send({
      user: {
        ...userData,
        name: 'User Name',
      },
    });
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      const user = { ...userData };

      delete user.email;

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when email is invalid', () => {
    it('returns 400', async () => {
      const result = await api.post('/sessions').send({
        user: {
          ...userData,
          email: 'invalidemail@',
        },
      });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when password is too short', () => {
    it('returns 400', async () => {
      const result = await api.post('/sessions').send({
        user: {
          ...userData,
          password: 'short',
        },
      });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when user does not exist', () => {
    it('returns 401', async () => {
      const result = await api.post('/sessions').send({
        user: {
          ...userData,
          email: 'inexistinguser@email.com',
        },
      });

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when password does not match', () => {
    it('returns 401', async () => {
      const result = await api.post('/sessions').send({
        user: {
          ...userData,
          password: 'wrongpassword',
        },
      });

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when params are valid', () => {
    it('returns 201', async () => {
      const result = await api.post('/sessions').send({ user: userData });

      expect(result.statusCode).toBe(201);
    });
  });
});
