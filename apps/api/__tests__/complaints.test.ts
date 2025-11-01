import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('complaints endpoints', () => {
  it('creates a complaint without files', async () => {
    const res = await request(app)
      .post('/api/complaints')
      .field('title', 'Garbage not collected');
    expect(res.status).toBe(201);
    expect(res.body.ticketId).toMatch(/^GHAAS-/);
  });

  it('returns complaint status', async () => {
    const create = await request(app)
      .post('/api/complaints')
      .field('title', 'Street light broken');
    const ticketId = create.body.ticketId;
    const res = await request(app).get(`/api/complaints/${ticketId}`);
    expect(res.status).toBe(200);
    expect(res.body.ticket_id).toBe(ticketId);
    expect(res.body.status).toBeDefined();
  });
});
