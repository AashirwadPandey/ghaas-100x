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
  const res = await fetch(`${base}/api/offices/${id}`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error('Failed to load office');
  return res.json();
}

export default async function OfficeDetail({ params }: { params: { id: string } }) {
  const office = await fetchOffice(params.id);
  return (
    <main>
      <a href="/offices">← Back</a>
      <h1>{office.name}</h1>
      <p>{office.address}</p>
      {office.phone && <p>Phone: <a href={`tel:${office.phone}`}>{office.phone}</a></p>}
      {office.website && <p>Website: <a target="_blank" rel="noreferrer" href={office.website}>{office.website}</a></p>}
      {office.lat && office.lng && (
        <p><a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}>Open in Maps</a></p>
      )}
      <h3>Services</h3>
      <ul>
        {office.services?.length ? office.services.map(s => <li key={s}>{s}</li>) : <li>—</li>}
      </ul>
    </main>
  );
}
