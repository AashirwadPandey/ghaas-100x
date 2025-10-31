import OfficeMap from "../components/OfficeMap";

async function fetchOffices() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${base}/api/offices`, { cache: 'no-store' });
    if (!res.ok) return [] as any[];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [] as any[];
  }
}

export default async function Page() {
  const offices = await fetchOffices();
  return (
    <main>
      <h1>GHaaS Prototype</h1>
      <p>Explore nearby government offices and services.</p>
      <div style={{ height: 360, marginTop: 16 }}>
        {/* Client map renders markers when available */}
        {/* @ts-expect-error Server component rendering client child */}
        <OfficeMap pins={(offices || []).map((o: any) => ({ id: String(o.id), name: o.name, lat: o.lat, lng: o.lng }))} />
      </div>
    </main>
  );
}
