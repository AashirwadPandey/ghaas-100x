"use client";

import { useEffect, useMemo, useState } from 'react';

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
    location: 'Kathmandu-15, Near City Hospital'
  },
  {
    ticketId: 'CMP-2025-002',
    category: 'Sanitation',
    title: 'Overflowing garbage bins at Market Square',
    description: 'Garbage bins have not been emptied for 5 days. Creating health hazard.',
    status: 'Pending',
    upvotes: 32,
    createdAt: '2025-10-29',
    location: 'Lalitpur-8, Market Square'
  },
  {
    ticketId: 'CMP-2025-003',
    category: 'Water Supply',
    title: 'No water supply for 3 days',
    description: 'Ward 12 residents facing severe water shortage. No notice was given.',
    status: 'Resolved',
    upvotes: 18,
    createdAt: '2025-10-25',
    location: 'Bhaktapur-12'
  },
  {
    ticketId: 'CMP-2025-004',
    category: 'Street Lighting',
    title: 'Non-functional street lights',
    description: 'All street lights in the area have been off for 2 weeks. Safety concern.',
    status: 'In Progress',
    upvotes: 25,
    createdAt: '2025-10-27',
    location: 'Pokhara-5, Lake Side Road'
  },
  {
    ticketId: 'CMP-2025-005',
    category: 'Public Service',
    title: 'Delayed citizenship certificate',
    description: 'Applied 3 months ago. Still waiting despite meeting all requirements.',
    status: 'Pending',
    upvotes: 41,
    createdAt: '2025-10-26',
    location: 'District Administration Office, Kathmandu'
  },
  {
    ticketId: 'CMP-2025-006',
    category: 'Traffic',
    title: 'Traffic signal malfunction',
    description: 'Main intersection signal not working. Causing traffic jams daily.',
    status: 'In Progress',
    upvotes: 56,
    createdAt: '2025-10-30',
    location: 'Biratnagar-3, Main Chowk'
  },
  {
    ticketId: 'CMP-2025-007',
    category: 'Park & Recreation',
    title: 'Broken playground equipment',
    description: 'Children\'s playground swings and slides are broken and dangerous.',
    status: 'Resolved',
    upvotes: 12,
    createdAt: '2025-10-20',
    location: 'Community Park, Butwal'
  },
  {
    ticketId: 'CMP-2025-008',
    category: 'Noise Pollution',
    title: 'Construction noise beyond allowed hours',
    description: 'Construction work happening at night, violating noise regulations.',
    status: 'Pending',
    upvotes: 29,
    createdAt: '2025-10-29',
    location: 'Kathmandu-7, Residential Area'
  }
];

export default function ComplaintPage() {
  const [items, setItems] = useState<any[]>([]);
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setItems(SAMPLE_COMPLAINTS);
    try {
      const raw = localStorage.getItem('ghaas_voted_tickets');
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        const map: Record<string, boolean> = {};
        arr.forEach(id => map[id] = true);
        setVoted(map);
      }
    } catch {}
  }, []);

  const votedIds = useMemo(() => Object.keys(voted).filter(k => voted[k]), [voted]);

  async function upvote(ticketId: string) {
    if (voted[ticketId]) return;
    setItems(prev => prev.map(it => 
      it.ticketId === ticketId ? { ...it, upvotes: (it.upvotes || 0) + 1 } : it
    ));
    const next = { ...voted, [ticketId]: true };
    setVoted(next);
    try {
      localStorage.setItem('ghaas_voted_tickets', JSON.stringify(Object.keys(next).filter(k => next[k])));
    } catch {}
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">Community Complaints</span>
            </h1>
            <p className="mt-2 text-slate-600">Browse recent complaints and upvote the ones that matter to you.</p>
          </div>
          <a
            href="/complaint/new"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-brand-700 hover:to-brand-800 hover:shadow-md active:scale-95 sm:w-auto"
          >
            <svg className="h-4 w-4 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            File New Complaint
          </a>
        </div>
        <div className="mt-6 grid gap-3">
          {items.length === 0 ? (
            <div className="rounded-md border border-dashed border-slate-300 p-6 text-center text-slate-600">No complaints yet. Be the first to submit one.</div>
          ) : (
            items.map((c) => (
              <div key={c.ticketId} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-300 sm:flex-row sm:items-start sm:justify-between animate-fade-in">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
                      </svg>
                      {c.category}
                    </span>
                    <span className={`status-badge ${
                      c.status === 'Resolved' ? 'status-resolved' :
                      c.status === 'In Progress' ? 'status-in-progress' :
                      'status-pending'
                    }`}>
                      {c.status === 'Resolved' && (
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      )}
                      {c.status === 'In Progress' && (
                        <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {c.status === 'Pending' && (
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                      )}
                      {c.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-slate-900 hover:text-brand-700 transition-colors">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">{c.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {c.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {c.ticketId}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end">
                  <button
                    onClick={() => upvote(c.ticketId)}
                    disabled={!!voted[c.ticketId]}
                    className="group inline-flex flex-1 flex-col items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-50 hover:border-brand-400 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 sm:flex-initial"
                    aria-label="Upvote complaint"
                  >
                    <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                    </svg>
                    <span className="mt-1 font-semibold tabular-nums">{c.upvotes || 0}</span>
                  </button>
                  <a
                    href={`/complaint/${c.ticketId}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-brand-700 hover:shadow-sm active:scale-95 sm:flex-initial"
                  >
                    <span>View Details</span>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
        {votedIds.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">You upvoted: {votedIds.join(', ')}</p>
        )}
      </div>

      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm">
        <p className="text-sm text-blue-900 flex items-start gap-2">
          <svg className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>How it works:</strong> Your complaint gets a unique ticket ID. You can track status anytime. Upvote similar issues to help prioritize them.
          </span>
        </p>
      </div>
    </section>
  );
}
