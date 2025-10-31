async function fetchOffices() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/offices?page=1&limit=12`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error('Failed to load offices');
  return res.json();
}

export default async function OfficesPage() {
  const { data } = await fetchOffices();
  return (
    <main>
      <h1>Offices</h1>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, padding: 0 }}>
        {data.map((o: any) => (
          <li key={o.id} style={{ listStyle: 'none', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <a href={`/office/${o.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ marginTop: 0 }}>{o.name}</h3>
              <p style={{ margin: '4px 0' }}>{o.address || '—'}</p>
              <p style={{ margin: '4px 0', color: '#2563eb' }}>{o.phone || ''}</p>
            </a>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              {o.phone && (
                <a href={`tel:${o.phone}`} style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6 }}>Call</a>
              )}
              {(o.lat && o.lng) ? (
                <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${o.lat},${o.lng}`} style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6 }}>Directions</a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
