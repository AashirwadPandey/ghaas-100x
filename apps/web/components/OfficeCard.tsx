type Props = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
};

export default function OfficeCard({ id, name, address, phone, lat, lng }: Props) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <a href={`/office/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={{ marginTop: 0 }}>{name}</h3>
        <p style={{ margin: '4px 0' }}>{address || '—'}</p>
        <p style={{ margin: '4px 0', color: '#2563eb' }}>{phone || ''}</p>
      </a>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        {phone && (
          <a href={`tel:${phone}`} style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6 }}>Call</a>
        )}
        {(lat && lng) ? (
          <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6 }}>Directions</a>
        ) : null}
      </div>
    </div>
  );
}
