import api from '../api';
import getConnection from '../database';

describe('POST /users', () => {
  beforeAll(async () => {
    const connection = await getConnection();
  });

  it('should return status code 201 when params are valid', async () => {
    const user = {
      name: 'User Name',
      email: 'user@email.com',
      password: 'userpassword',
    };

    const result = await api.post('/users').send({ user });

    expect(result.statusCode).toBe(201);
  });

  it('should return status code 400 when params are missing', async () => {
    const user = {
      name: 'User Name',
      email: 'user@email.com',
    };

    const result = await api.post('/users').send({ user });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 400 when email is invalid', async () => {
    const user = {
      name: 'User Name',
      email: 'invalidemail@',
      password: 'userpassword',
    };

    const result = await api.post('/users').send({ user });

    expect(result.statusCode).toBe(400);
  });

  it('should return status code 400 when password is too short', async () => {
    const user = {
      name: 'User Name',
      email: 'user@email.com',
      password: 'short',
    };

    const result = await api.post('/users').send({ user });

    expect(result.statusCode).toBe(400);
  });
});
