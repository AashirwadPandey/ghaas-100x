type Complaint = {
  ticket_id: string;
  title: string;
  status: string;
  created_at: string;
};

async function fetchComplaint(ticketId: string): Promise<Complaint> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/complaints/${ticketId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load complaint');
  return res.json();
}

export default async function ComplaintStatus({ params }: { params: { ticketId: string } }) {
  const c = await fetchComplaint(params.ticketId);
  return (
    <main>
      <h1>Complaint Status</h1>
      <p>Ticket: {c.ticket_id}</p>
      <p>Title: {c.title}</p>
      <p>Status: {c.status}</p>
      <p>Created: {new Date(c.created_at).toLocaleString()}</p>
    </main>
  );
}
