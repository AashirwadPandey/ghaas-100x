import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('GET /api/offices', () => {
  it('returns paginated offices', async () => {
    const res = await request(app).get('/api/offices?page=1&limit=5');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('limit', 5);
    expect(res.body).toHaveProperty('total');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    const office = res.body.data[0];
    expect(office).toHaveProperty('id');
    expect(office).toHaveProperty('name');
    expect(office).toHaveProperty('services');
  });
});

describe('GET /api/offices/:id', () => {
  it('returns a single office or 404', async () => {
    const list = await request(app).get('/api/offices?page=1&limit=1');
    const firstId = list.body.data[0].id;
    const ok = await request(app).get(`/api/offices/${firstId}`);
    expect(ok.status).toBe(200);
    expect(ok.body).toHaveProperty('id', firstId);

    const notFound = await request(app).get('/api/offices/does-not-exist');
    expect(notFound.status).toBe(404);
  });
});
