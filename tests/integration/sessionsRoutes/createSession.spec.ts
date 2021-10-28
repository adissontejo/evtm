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

  it('should return status code 201 when params are valid', async () => {
    const result = await api.post('/sessions').send({ user: defaultBody });

    expect(result.statusCode).toBe(201);
  });

  it('should return status code 400 when params are missing', async () => {
    const user = { ...defaultBody };

    delete user.email;

    const result = await api.post('/sessions').send({ user });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 400 when email is invalid', async () => {
    const result = await api.post('/sessions').send({
      user: {
        ...defaultBody,
        email: 'invalidemail@',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 400 when password is too short', async () => {
    const result = await api.post('/sessions').send({
      user: {
        ...defaultBody,
        password: 'short',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 401 when user does not exist', async () => {
    const result = await api.post('/sessions').send({
      user: {
        ...defaultBody,
        email: 'inexistinguser@email.com',
      },
    });

    expect(result.statusCode).toBe(401);
  });

  it('should return status code 401 when password is wrong', async () => {
    const result = await api.post('/sessions').send({
      user: {
        ...defaultBody,
        password: 'wrongpassword',
      },
    });

    expect(result.statusCode).toBe(401);
  });
});
