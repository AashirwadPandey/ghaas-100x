import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('PUT /api/complaints/:ticketId/status (admin)', () => {
  it('rejects without admin key', async () => {
    const create = await request(app)
      .post('/api/complaints')
      .field('title', 'Water leakage');
    const ticketId = create.body.ticketId;
    const res = await request(app)
      .put(`/api/complaints/${ticketId}/status`)
      .send({ status: 'resolved' });
    expect(res.status).toBe(401);
  });

  it('updates status with valid admin key', async () => {
    process.env.ADMIN_API_KEY = 'test-admin-key';
    const create = await request(app)
      .post('/api/complaints')
      .field('title', 'Street light fix');
    const ticketId = create.body.ticketId;
    const res = await request(app)
      .put(`/api/complaints/${ticketId}/status`)
      .set('x-admin-key', 'test-admin-key')
      .send({ status: 'in-progress' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    const statusRes = await request(app).get(`/api/complaints/${ticketId}`);
    expect(statusRes.body.status).toBe('in-progress');
  });
});
