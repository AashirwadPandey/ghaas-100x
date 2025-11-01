"use client";

import { useEffect, useState } from 'react';

// Static sample complaints
const SAMPLE_COMPLAINTS = [
  {
    ticketId: 'CMP-2025-001',
    category: 'Infrastructure',
    title: 'Damaged road near City Hospital',
    description: 'Large pothole causing accidents. Multiple vehicles damaged in past week.',
    status: 'In Progress',
    upvotes: 47,
    createdAt: '2025-10-28',
    location: 'Kathmandu-15, Near City Hospital',
    updates: [
      { date: '2025-10-28', status: 'Submitted', message: 'Complaint received and ticket generated' },
      { date: '2025-10-29', status: 'Acknowledged', message: 'Issue verified by field team' },
      { date: '2025-10-30', status: 'In Progress', message: 'Road repair work scheduled for Nov 5' }
    ]
  },
  {
    ticketId: 'CMP-2025-002',
    category: 'Sanitation',
    title: 'Overflowing garbage bins at Market Square',
    description: 'Garbage bins have not been emptied for 5 days. Creating health hazard.',
    status: 'Pending',
    upvotes: 32,
    createdAt: '2025-10-29',
    location: 'Lalitpur-8, Market Square',
    updates: [
      { date: '2025-10-29', status: 'Submitted', message: 'Complaint received and ticket generated' }
    ]
  },
  {
    ticketId: 'CMP-2025-003',
    category: 'Water Supply',
    title: 'No water supply for 3 days',
    description: 'Ward 12 residents facing severe water shortage. No notice was given.',
    status: 'Resolved',
    upvotes: 18,
    createdAt: '2025-10-25',
    location: 'Bhaktapur-12',
    updates: [
      { date: '2025-10-25', status: 'Submitted', message: 'Complaint received and ticket generated' },
      { date: '2025-10-26', status: 'In Progress', message: 'Pump malfunction identified' },
      { date: '2025-10-27', status: 'Resolved', message: 'Pump repaired, water supply restored' }
    ]
  },
  {
    ticketId: 'CMP-2025-004',
    category: 'Street Lighting',
    title: 'Non-functional street lights',
    description: 'All street lights in the area have been off for 2 weeks. Safety concern.',
    status: 'In Progress',
    upvotes: 25,
    createdAt: '2025-10-27',
    location: 'Pokhara-5, Lake Side Road',
    updates: [
      { date: '2025-10-27', status: 'Submitted', message: 'Complaint received and ticket generated' },
      { date: '2025-10-28', status: 'In Progress', message: 'Electrical team assigned to inspect' }
    ]
  },
  {
    ticketId: 'CMP-2025-005',
    category: 'Public Service',
    title: 'Delayed citizenship certificate',
    description: 'Applied 3 months ago. Still waiting despite meeting all requirements.',
    status: 'Pending',
    upvotes: 41,
    createdAt: '2025-10-26',
    location: 'District Administration Office, Kathmandu',
    updates: [
      { date: '2025-10-26', status: 'Submitted', message: 'Complaint received and ticket generated' }
    ]
  },
  {
    ticketId: 'CMP-2025-006',
    category: 'Traffic',
    title: 'Traffic signal malfunction',
    description: 'Main intersection signal not working. Causing traffic jams daily.',
    status: 'In Progress',
    upvotes: 56,
    createdAt: '2025-10-30',
    location: 'Biratnagar-3, Main Chowk',
    updates: [
      { date: '2025-10-30', status: 'Submitted', message: 'Complaint received and ticket generated' },
      { date: '2025-10-31', status: 'In Progress', message: 'Traffic police deployed temporarily, repair team notified' }
    ]
  },
  {
    ticketId: 'CMP-2025-007',
    category: 'Park & Recreation',
    title: 'Broken playground equipment',
    description: 'Children\'s playground swings and slides are broken and dangerous.',
    status: 'Resolved',
    upvotes: 12,
    createdAt: '2025-10-20',
    location: 'Community Park, Butwal',
    updates: [
      { date: '2025-10-20', status: 'Submitted', message: 'Complaint received and ticket generated' },
      { date: '2025-10-22', status: 'In Progress', message: 'Safety inspection completed' },
      { date: '2025-10-25', status: 'Resolved', message: 'All equipment repaired and inspected' }
    ]
  },
  {
    ticketId: 'CMP-2025-008',
    category: 'Noise Pollution',
    title: 'Construction noise beyond allowed hours',
    description: 'Construction work happening at night, violating noise regulations.',
    status: 'Pending',
    upvotes: 29,
    createdAt: '2025-10-29',
    location: 'Kathmandu-7, Residential Area',
    updates: [
      { date: '2025-10-29', status: 'Submitted', message: 'Complaint received and ticket generated' }
    ]
  }
];

export default function ComplaintDetailPage({ params }: { params: { id: string } }) {
  const [complaint, setComplaint] = useState<any>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const ticketId = params.id;
    const found = SAMPLE_COMPLAINTS.find(c => c.ticketId === ticketId);
    setComplaint(found || null);

    // Check if already voted
    try {
      const raw = localStorage.getItem('ghaas_voted_tickets');
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        setVoted(arr.includes(ticketId));
      }
    } catch {}
  }, [params.id]);

  async function upvote() {
    if (voted || !complaint) return;
    
    // Update local state
    setComplaint((prev: any) => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }));
    setVoted(true);
    
    try {
      const raw = localStorage.getItem('ghaas_voted_tickets');
      const arr: string[] = raw ? JSON.parse(raw) : [];
      arr.push(complaint.ticketId);
      localStorage.setItem('ghaas_voted_tickets', JSON.stringify(arr));
    } catch {}
  }

  if (!complaint) {
    return (
      <section className="mx-auto max-w-4xl space-y-6">
        <a href="/complaint" className="inline-flex items-center text-sm text-brand-700 hover:underline">
          ← Back to Complaints
        </a>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-900">Complaint not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <a href="/complaint" className="inline-flex items-center text-sm text-brand-700 hover:underline">
          ← Back to Complaints
        </a>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700">{complaint.category}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                complaint.status === 'Resolved' ? 'bg-green-100 text-green-700 border border-green-200' :
                complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>{complaint.status}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{complaint.title}</h1>
            <p className="mt-2 text-slate-600">{complaint.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>📍 {complaint.location}</span>
              <span>🎫 {complaint.ticketId}</span>
              <span>📅 {new Date(complaint.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <button
            onClick={upvote}
            disabled={voted}
            className="inline-flex flex-col items-center rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-shrink-0"
            aria-label="Upvote complaint"
          >
            <span className="text-2xl">▲</span>
            <span className="mt-1 font-semibold tabular-nums">{complaint.upvotes || 0}</span>
            <span className="text-xs text-slate-500">{voted ? 'Voted' : 'Upvote'}</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Status Timeline</h2>
        <div className="mt-6 space-y-6">
          {complaint.updates && complaint.updates.map((update: any, idx: number) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  update.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                  update.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  update.status === 'Acknowledged' ? 'bg-purple-100 text-purple-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {update.status === 'Resolved' ? '✓' :
                   update.status === 'In Progress' ? '⟳' :
                   update.status === 'Acknowledged' ? '👁' : '📝'}
                </div>
                {idx < (complaint.updates.length - 1) && (
                  <div className="mt-2 h-full w-0.5 bg-slate-200" style={{ minHeight: '3rem' }} />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-slate-900">{update.status}</h3>
                  <span className="text-xs text-slate-500">{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{update.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ Stay updated:</strong> SMS notifications are sent at each status change. You can share this page URL with others to increase visibility.
        </p>
      </div>
    </section>
  );
}
