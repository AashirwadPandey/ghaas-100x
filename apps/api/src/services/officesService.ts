import { OFFICES, Office } from '../db/mockData.js';

export async function getOffices({ page, limit, q, province, district, ministry }: { page: number; limit: number; q?: string; province?: string; district?: string; ministry?: string; }): Promise<{ data: Office[]; total: number; }> {
  let rows = OFFICES;
  if (q) {
    const s = q.toLowerCase();
    rows = rows.filter(o => (
      o.name.toLowerCase().includes(s) ||
      (o.address?.toLowerCase().includes(s) ?? false) ||
      (o.services || []).some(sv => sv.toLowerCase().includes(s))
    ));
  }
  if (province) {
    rows = rows.filter(o => (o.province || '').toLowerCase() === province.toLowerCase());
  }
  if (district) {
    rows = rows.filter(o => (o.district || '').toLowerCase() === district.toLowerCase());
  }
  if (ministry) {
    rows = rows.filter(o => (o.ministry || '').toLowerCase() === ministry.toLowerCase());
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = rows.length;
  const data = rows.slice(start, end);
  return { data, total };
}

export async function getOfficeById(id: string): Promise<Office | undefined> {
  return OFFICES.find(o => o.id === id);
}
