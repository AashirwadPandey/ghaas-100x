import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('PUT /api/offices/:id (admin)', () => {
  it('rejects without api key', async () => {
    const res = await request(app)
      .put('/api/offices/1')
      .send({ name: 'New Name' });
    expect(res.status).toBe(401);
  });

  it('updates when key is valid', async () => {
    process.env.ADMIN_API_KEY = 'test-key';
    const res = await request(app)
      .put('/api/offices/1')
      .set('x-api-key', 'test-key')
      .send({ name: 'New Name' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('New Name');
  });
});
