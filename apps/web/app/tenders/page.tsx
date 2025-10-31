type Tender = {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
};

async function fetchTenders() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/tenders`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load tenders');
  return res.json();
}

export default async function TendersPage() {
  const { data } = await fetchTenders();
  return (
    <main>
      <h1>Tenders</h1>
      <ul>
        {data.map((t: Tender) => (
          <li key={t.id}>
            <a href={`/tenders/${t.id}`}>{t.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
