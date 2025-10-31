"use client";

import { useState } from 'react';

export default function ComplaintPage() {
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch(`${api}/api/complaints`, { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) setTicket(data.ticketId);
      else alert(data.error || 'Failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Submit a complaint</h1>
      {ticket ? (
        <p>Submitted! Ticket ID: <a href={`/complaint/status/${ticket}`}>{ticket}</a></p>
      ) : (
        <form onSubmit={onSubmit}>
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Description
            <textarea name="description" />
          </label>
          <label>
            Office ID
            <input name="office_id" />
          </label>
          <label>
            Latitude
            <input name="lat" type="number" step="any" />
          </label>
          <label>
            Longitude
            <input name="lng" type="number" step="any" />
          </label>
          <label>
            Photos (PNG/JPG up to 5MB each)
            <input name="files" type="file" accept="image/png,image/jpeg" multiple />
          </label>
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        </form>
      )}
    </main>
  );
}
