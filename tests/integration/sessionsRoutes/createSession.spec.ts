import api from '../api';
import db from '../db';

const defaultBody = {
  email: 'user@email.com',
  password: 'userpassword',
};

describe('POST /sessions', () => {
  beforeAll(async () => {
    await db.init();

    await api.post('/users').send({
      user: {
        ...defaultBody,
        name: 'User Name',
      },
    });
  });

  afterAll(async () => {
    await db.clear();
  });

  describe('when params are valid', () => {
    it('returns 201', async () => {
      const result = await api.post('/sessions').send({ user: defaultBody });

      expect(result.statusCode).toBe(201);
    });
  });

  describe('when params are missing', () => {
    it('returns 400', async () => {
      const user = { ...defaultBody };

      delete user.email;

      const result = await api.post('/sessions').send({ user });

      expect(result.statusCode).toBe(400);
    });
  });

  describe('when email is invalid', () => {
    it('returns 400', async () => {
      const result = await api.post('/sessions').send({
        user: {
          ...defaultBody,
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
          ...defaultBody,
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
          ...defaultBody,
          email: 'inexistinguser@email.com',
        },
      });

      expect(result.statusCode).toBe(401);
    });
  });

  describe('when password is wrong', () => {
    it('returns 401', async () => {
      const result = await api.post('/sessions').send({
        user: {
          ...defaultBody,
          password: 'wrongpassword',
        },
      });

      expect(result.statusCode).toBe(401);
    });
  });
});
