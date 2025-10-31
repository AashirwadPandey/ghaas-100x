type Tender = {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
};

async function fetchTender(id: string): Promise<Tender> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/tenders/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load tender');
  return res.json();
}

export default async function TenderDetail({ params }: { params: { id: string } }) {
  const tender = await fetchTender(params.id);
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  return (
    <main>
      <a href="/tenders">← Back</a>
      <h1>{tender.title}</h1>
      {tender.description && <p>{tender.description}</p>}
      {tender.deadline && <p>Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>}
      <h3>Subscribe for updates (mock)</h3>
      <form action={`${base}/api/tenders/subscribe`} method="post">
        <input type="hidden" name="tender_id" value={tender.id} />
        <label>Email
          <input name="email" type="email" />
        </label>
        <label>Phone
          <input name="phone" type="tel" />
        </label>
        <button type="submit">Subscribe</button>
      </form>
    </main>
  );
}
