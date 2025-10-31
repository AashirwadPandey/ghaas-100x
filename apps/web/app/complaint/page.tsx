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
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Submit a complaint</h1>
      {ticket ? (
        <p className="mt-3 text-slate-700">Submitted! Ticket ID: <a className="text-brand-700 underline" href={`/complaint/status/${ticket}`}>{ticket}</a></p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card sm:max-w-2xl">
          <label className="grid gap-1 text-sm">
            <span className="text-slate-700">Title</span>
            <input className="form-input rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500" name="title" required />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-slate-700">Description</span>
            <textarea className="form-textarea rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500" name="description" />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="grid gap-1 text-sm">
              <span className="text-slate-700">Office ID</span>
              <input className="form-input rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500" name="office_id" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-700">Latitude</span>
              <input className="form-input rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500" name="lat" type="number" step="any" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-700">Longitude</span>
              <input className="form-input rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500" name="lng" type="number" step="any" />
            </label>
          </div>
          <label className="grid gap-1 text-sm">
            <span className="text-slate-700">Photos (PNG/JPG up to 5MB each)</span>
            <input className="file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-brand-700" name="files" type="file" accept="image/png,image/jpeg" multiple />
          </label>
          <div className="flex justify-end">
            <button type="submit" disabled={submitting} className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit'}</button>
          </div>
        </form>
      )}
    </section>
  );
}
