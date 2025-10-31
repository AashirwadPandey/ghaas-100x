"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Complaint = {
  ticket_id: string;
  title: string;
  description?: string;
  status: 'received'|'in-progress'|'resolved';
  created_at: string;
};

export default function AdminComplaintStatusPage() {
  const params = useParams();
  const ticketId = Array.isArray(params?.ticketId) ? params?.ticketId[0] : (params?.ticketId as string);
  const [data, setData] = useState<Complaint | null>(null);
  const [status, setStatus] = useState<Complaint['status']>('received');
  const [adminKey, setAdminKey] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('ghaas_admin_key') || '';
    setAdminKey(savedKey);
  }, []);

  useEffect(() => {
    if (!ticketId) return;
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    fetch(`${base}/api/complaints/${ticketId}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((json: Complaint) => { setData(json); setStatus(json.status); })
      .catch(() => setMessage('Failed to load complaint'));
  }, [ticketId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ticketId) return;
    setMessage('');
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/complaints/${ticketId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      localStorage.setItem('ghaas_admin_key', adminKey);
      setMessage('Status updated');
      const updated = await fetch(`${base}/api/complaints/${ticketId}`).then(r=>r.json());
      setData(updated);
    } else {
      const txt = await res.text();
      setMessage(`Failed: ${txt || res.status}`);
    }
  }

  if (!ticketId) return <main><h1>Invalid ticket</h1></main>;

  return (
    <main style={{ maxWidth: 640 }}>
      <h1>Admin: Complaint {ticketId}</h1>
      {data ? (
        <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16 }}>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Current status:</strong> {data.status}</p>
          <p><strong>Created:</strong> {new Date(data.created_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading…</p>
      )}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Admin API Key
          <input type="password" value={adminKey} onChange={(e)=>setAdminKey(e.target.value)} />
        </label>
        <label>
          New Status
          <select value={status} onChange={(e)=>setStatus(e.target.value as Complaint['status'])}>
            <option value="received">received</option>
            <option value="in-progress">in-progress</option>
            <option value="resolved">resolved</option>
          </select>
        </label>
        <button type="submit">Update</button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
