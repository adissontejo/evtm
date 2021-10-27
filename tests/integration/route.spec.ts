import api from './api';

describe('test API routes', () => {
  it('should return a 200 status', async () => {
    const result = await api.get('/');

    expect(result.statusCode).toBe(200);
  });
});
