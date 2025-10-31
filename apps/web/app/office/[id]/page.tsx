type Office = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  lat?: number;
  lng?: number;
  website?: string;
  hours?: string;
  services: string[];
};

async function fetchOffice(id: string): Promise<Office> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/offices/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load office');
  return res.json();
}

export default async function OfficeDetail({ params }: { params: { id: string } }) {
  const office = await fetchOffice(params.id);
  return (
    <section>
      <a className="text-sm text-slate-600 hover:text-slate-900" href="/offices">← Back</a>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{office.name}</h1>
      <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <p className="text-slate-700">{office.address}</p>
        {office.phone && <p className="mt-1">Phone: <a className="text-brand-700" href={`tel:${office.phone}`}>{office.phone}</a></p>}
        {office.website && <p className="mt-1">Website: <a className="text-brand-700" target="_blank" rel="noreferrer" href={office.website}>{office.website}</a></p>}
        {office.lat && office.lng && (
          <p className="mt-1"><a className="inline-flex items-center rounded-md bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}>Open in Maps</a></p>
        )}
      </div>
      <h3 className="mt-6 text-lg font-semibold">Services</h3>
      <ul className="mt-2 list-disc pl-5 text-slate-700">
        {office.services?.length ? office.services.map(s => <li key={s}>{s}</li>) : <li>—</li>}
      </ul>
    </section>
  );
}
