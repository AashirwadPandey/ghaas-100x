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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:shadow-lg">
      <a href={`/office/${id}`} className="no-underline text-inherit">
        <h3 className="mt-0 text-lg font-semibold text-slate-900">{name}</h3>
        <p className="my-1 text-slate-600">{address || '—'}</p>
        <p className="my-1 text-brand-700">{phone || ''}</p>
      </a>
      <div className="mt-3 flex gap-2">
        {phone && (
          <a href={`tel:${phone}`} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Call</a>
        )}
        {(lat && lng) ? (
          <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} className="inline-flex items-center rounded-md bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700">Directions</a>
        ) : null}
      </div>
    </div>
  );
}
