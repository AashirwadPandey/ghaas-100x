import ProfileForm from "../../../components/ProfileForm";

type Service = {
  id: string;
  office_id: string;
  title: string;
  description?: string;
  documents?: string[];
  fee?: number;
  estimated_time?: string;
};

async function fetchService(id: string): Promise<Service> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/services/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load service');
  return res.json();
}

export default async function ServicePage({ params }: { params: { id: string } }) {
  const service = await fetchService(params.id);

  async function generatePdf() {
    'use server';
  }

  return (
    <main>
      <a href="/">← Home</a>
      <h1>{service.title}</h1>
      {service.description && <p>{service.description}</p>}
      {service.documents?.length ? (
        <>
          <h3>Required documents</h3>
          <ul>
            {service.documents.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </>
      ) : null}

      <h3>Your profile</h3>
      <ProfileForm />

      <form action={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/generate-pdf`} method="post">
        <input type="hidden" name="serviceId" value={service.id} />
        <input type="hidden" name="profile" value={typeof window === 'undefined' ? '' : (localStorage.getItem('ghaas_profile') || '')} />
        <button type="submit">Pre-fill and export PDF</button>
      </form>
    </main>
  );
}
