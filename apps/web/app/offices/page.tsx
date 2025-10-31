async function fetchOffices() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/offices?page=1&limit=12`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load offices');
  return res.json();
}

import OfficeCard from "../../components/OfficeCard";

export default async function OfficesPage() {
  const { data } = await fetchOffices();
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Offices</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((o: any) => (
          <div key={o.id}>
            <OfficeCard id={o.id} name={o.name} address={o.address} phone={o.phone} lat={o.lat} lng={o.lng} />
          </div>
        ))}
      </div>
    </section>
  );
}
