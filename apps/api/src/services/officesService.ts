import { OFFICES, Office } from '../db/mockData.js';

export async function getOffices({ page, limit }: { page: number; limit: number; }): Promise<{ data: Office[]; total: number; }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = OFFICES.length;
  const data = OFFICES.slice(start, end);
  return { data, total };
}

export async function getOfficeById(id: string): Promise<Office | undefined> {
  return OFFICES.find(o => o.id === id);
}
