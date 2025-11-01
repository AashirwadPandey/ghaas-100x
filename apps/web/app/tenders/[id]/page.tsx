"use client";
import { useState, useEffect } from "react";
import { MOCK_TENDERS, type Tender } from "../../../lib/mockData";

const TENDER_DOCUMENTS: Record<string, { name: string; version: string; size: string }[]> = {
  't1': [
    { name: 'Tender_Notice.pdf', version: 'v1.2', size: '245 KB' },
    { name: 'Technical_Specifications.pdf', version: 'v1.0', size: '1.2 MB' },
    { name: 'Bill_of_Quantities.xlsx', version: 'v1.1', size: '87 KB' },
    { name: 'Terms_and_Conditions.pdf', version: 'v1.0', size: '156 KB' }
  ],
  default: [
    { name: 'Tender_Notice.pdf', version: 'v1.0', size: '200 KB' },
    { name: 'Terms_and_Conditions.pdf', version: 'v1.0', size: '150 KB' }
  ]
};

const TENDER_REQUIREMENTS: Record<string, string[]> = {
  't1': [
    'Registered construction company with Class A license',
    'Minimum 10 years of experience in similar projects',
    'Financial capacity: Annual turnover of NPR 100 crore or above',
    'Previous experience in multi-story building construction',
    'Valid tax clearance certificate',
    'No pending litigation or legal cases'
  ],
  't2': [
    'Authorized IT equipment supplier or distributor',
    'Minimum 5 years of experience in government supply',
    'ISO 9001 certified company',
    'After-sales service and warranty support capability',
    'Valid tax clearance certificate'
  ],
  default: [
    'Valid business registration certificate',
    'Tax clearance certificate',
    'Bank statement showing financial capacity',
    'Experience in similar projects',
    'No pending legal cases'
  ]
};

const REQUIRED_DOCUMENTS_LIST: Record<string, string[]> = {
  't1': [
    'Company registration certificate',
    'Tax clearance certificate (current fiscal year)',
    'VAT/PAN registration certificate',
    'Class A construction license',
    'Audited financial statements (last 3 years)',
    'Bank solvency certificate',
    'Experience certificates for similar projects',
    'Letter of authorization (if applicable)',
    'Bid security deposit receipt'
  ],
  't2': [
    'Company registration certificate',
    'Tax clearance certificate',
    'VAT/PAN registration certificate',
    'Manufacturer authorization letter',
    'ISO certification',
    'Financial statements (last 2 years)',
    'Experience certificates',
    'Bid security deposit receipt'
  ],
  default: [
    'Company registration certificate',
    'Tax clearance certificate',
    'VAT/PAN registration certificate',
    'Bank statement',
    'Experience certificates',
    'Bid security deposit receipt'
  ]
};

const PAST_WINNERS: Record<string, { year: string; company: string; amount: number }[]> = {
  't1': [
    { year: '2024', company: 'ABC Construction Pvt. Ltd.', amount: 950000 },
    { year: '2023', company: 'XYZ Builders', amount: 890000 }
  ],
  default: []
};

export default function TenderDetail({ params }: { params: { id: string } }) {
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Use mock data instead of API call
    const foundTender = MOCK_TENDERS.find(t => t.id === params.id);
    setTender(foundTender || null);
    setLoading(false);
  }, [params.id]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('tender_id', params.id);
    if (email) form.append('email', email);
    if (phone) form.append('phone', phone);
    
    try {
      const res = await fetch('/api/tenders/subscribe', { method: 'POST', body: form });
      if (res.ok) {
        setSubscribed(true);
      }
    } catch {}
  };

  if (loading) return <div className="py-8 text-center text-slate-600">Loading tender details...</div>;
  if (!tender) return <div className="py-8 text-center text-slate-600">Tender not found.</div>;

  const documents = TENDER_DOCUMENTS[params.id] || TENDER_DOCUMENTS.default;
  const requirements = TENDER_REQUIREMENTS[params.id] || TENDER_REQUIREMENTS.default;
  const requiredDocsList = REQUIRED_DOCUMENTS_LIST[params.id] || REQUIRED_DOCUMENTS_LIST.default;
  const pastWinners = PAST_WINNERS[params.id] || PAST_WINNERS.default;
  const daysLeft = tender.deadline ? Math.max(0, Math.ceil((new Date(tender.deadline).getTime() - Date.now()) / 86400000)) : null;

  return (
    <main className="space-y-6">
      <a className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900" href="/tenders">
        ← Back to Tenders
      </a>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{tender.title}</h1>
            {tender.description && (
              <p className="mt-2 text-slate-600">{tender.description}</p>
            )}
          </div>
          {daysLeft !== null && daysLeft <= 7 && (
            <span className="flex-shrink-0 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
              {daysLeft === 0 ? 'Due Today!' : `${daysLeft} days left`}
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-xs font-medium text-green-700">Estimated Budget</p>
            <p className="mt-1 text-2xl font-bold text-green-900">{tender.budget}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-xs font-medium text-blue-700">Published</p>
            <p className="mt-1 text-lg font-bold text-blue-900">
              {new Date(tender.publishedDate).toLocaleDateString()}
            </p>
          </div>
          {tender.deadline && (
            <div className={`rounded-lg p-4 ${daysLeft !== null && daysLeft <= 3 ? 'bg-red-50' : 'bg-amber-50'}`}>
              <p className={`text-xs font-medium ${daysLeft !== null && daysLeft <= 3 ? 'text-red-700' : 'text-amber-700'}`}>
                Submission Deadline
              </p>
              <p className={`mt-1 text-lg font-bold ${daysLeft !== null && daysLeft <= 3 ? 'text-red-900' : 'text-amber-900'}`}>
                {new Date(tender.deadline).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-700">Contact Person</h3>
          <p className="mt-1 text-slate-600">Procurement Officer: Rajesh Kumar Shrestha</p>
          <p className="text-sm text-slate-500">Email: procurement@example.gov.np | Phone: +977-1-4100000</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">✅ Eligibility Requirements</h2>
        <p className="mt-1 text-sm text-slate-600">Bidders must meet the following criteria to be eligible</p>
        <ul className="mt-4 space-y-2">
          {requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">✓</span>
              <span className="text-slate-700">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">📋 Required Documents</h2>
        <p className="mt-1 text-sm text-slate-600">Documents that must be submitted with your bid</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {requiredDocsList.map((doc, idx) => (
            <div key={idx} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="text-brand-600">📄</span>
              <span className="text-sm text-slate-700">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">📂 Tender Documents</h2>
        <p className="mt-1 text-sm text-slate-600">Download official tender documents and specifications</p>
        <div className="mt-4 space-y-2">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-medium text-slate-900">{doc.name}</p>
                  <p className="text-xs text-slate-500">Version {doc.version} • {doc.size}</p>
                </div>
              </div>
              <button className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700">
                Download
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border-2 border-brand-200 bg-brand-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌐</span>
            <div className="flex-1">
              <h3 className="font-semibold text-brand-900">Apply on Official Portal</h3>
              <p className="mt-1 text-sm text-brand-700">
                Submit your bid officially through the Government e-Procurement System
              </p>
              <a
                href={`https://bolpatra.gov.np/egp/tender/${params.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                View & Apply on Bolpatra.gov.np →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">📊 Project Timeline Tracker</h2>
        <div className="mt-4 space-y-3">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">✓</div>
              <div className="h-full w-0.5 bg-green-600"></div>
            </div>
            <div className="pb-6">
              <p className="font-medium text-slate-900">Tender Published</p>
              <p className="text-sm text-slate-500">
                {new Date(tender.publishedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white">⏳</div>
              <div className="h-full w-0.5 bg-slate-300"></div>
            </div>
            <div className="pb-6">
              <p className="font-medium text-slate-900">Submission Deadline</p>
              <p className="text-sm text-slate-500">
                {tender.deadline ? new Date(tender.deadline).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-slate-600">3</div>
              <div className="h-full w-0.5 bg-slate-300"></div>
            </div>
            <div className="pb-6">
              <p className="font-medium text-slate-500">Evaluation Period</p>
              <p className="text-sm text-slate-400">7-14 days after deadline</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-slate-600">4</div>
            </div>
            <div>
              <p className="font-medium text-slate-500">Winner Announcement</p>
              <p className="text-sm text-slate-400">TBD</p>
            </div>
          </div>
        </div>
      </div>

      {pastWinners.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">🏆 Past Winners (Similar Projects)</h2>
          <div className="mt-4 space-y-2">
            {pastWinners.map((winner, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{winner.company}</p>
                    <p className="text-sm text-slate-500">{winner.year}</p>
                  </div>
                  <p className="text-lg font-bold text-green-700">NPR {winner.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">🔔 Subscribe for Alerts</h2>
        <p className="mt-1 text-sm text-slate-600">
          Get notified about updates, deadline reminders, and winner announcements
        </p>
        {subscribed ? (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="font-medium text-green-900">✓ You're subscribed!</p>
            <p className="mt-1 text-sm text-green-700">
              We'll send you alerts via {email && 'email'}
              {email && phone && ' and '}
              {phone && 'SMS'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone (for SMS alerts)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                placeholder="+977-98XXXXXXXX"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              disabled={!email && !phone}
            >
              🔔 Subscribe to Updates
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
