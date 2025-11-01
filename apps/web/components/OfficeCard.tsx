type Props = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  website?: string;
  hours?: string;
  province?: string;
  district?: string;
  ministry?: string;
};

export default function OfficeCard({ id, name, address, phone, lat, lng, website, hours, province, district, ministry }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:shadow-lg">
      <a href={`/office/${id}`} className="block no-underline text-inherit">
        <h3 className="mt-0 text-lg font-semibold text-slate-900">{name}</h3>
        <div className="my-1 text-slate-600">{address || '—'}</div>
        <div className="my-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          {province && <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">{province}</span>}
          {district && <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">{district}</span>}
          {ministry && <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">{ministry}</span>}
        </div>
        {hours && <div className="my-1 text-xs text-slate-500">Hours: {hours}</div>}
        {phone && <div className="my-1 text-brand-700">{phone}</div>}
      </a>
      {website && (
        <div className="my-1 text-sm">
          <a className="text-brand-700 underline" href={website} target="_blank" rel="noreferrer">Website</a>
        </div>
      )}
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
