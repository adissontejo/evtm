import api from '../api';
import db from '../db';

const defaultUser = {
  name: 'User Name',
  email: 'user@email.com',
  password: 'userpassword',
};

describe('POST /users', () => {
  beforeAll(async () => {
    await db.init();
  });

  afterAll(async () => {
    await db.clear();
  });

  it('should return status code 201 when params are valid', async () => {
    const result = await api.post('/users').send({ user: defaultUser });

    expect(result.statusCode).toBe(201);
  });

  it('should return status code 400 when params are missing', async () => {
    const user = { ...defaultUser };

    delete user.password;

    const result = await api.post('/users').send({ user });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 400 when email is invalid', async () => {
    const result = await api.post('/users').send({
      user: {
        ...defaultUser,
        email: 'invalidemail@',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 400 when password is too short', async () => {
    const result = await api.post('/users').send({
      user: {
        ...defaultUser,
        password: 'short',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 409 when email has already been used', async () => {
    const result = await api.post('/users').send({ user: defaultUser });

    expect(result.statusCode).toBe(409);
  });
});
