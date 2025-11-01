"use client";
import { useState, useEffect } from "react";
import { MOCK_OFFICES, MOCK_SERVICES, type Office } from "../../../lib/mockData";

// Static services data for each office
const OFFICE_SERVICES: { [key: string]: Array<{ id: string; name: string }> } = {
  "1": [
    { id: "birth-certificate", name: "Birth Certificate" },
    { id: "citizenship", name: "Citizenship Certificate" },
    { id: "marriage-registration", name: "Marriage Registration" },
    { id: "land-registration", name: "Land Registration" },
  ],
  "7": [
    { id: "birth-certificate", name: "Birth Certificate" },
    { id: "citizenship", name: "Citizenship Certificate" },
    { id: "marriage-registration", name: "Marriage Registration" },
    { id: "land-registration", name: "Land Registration" },
    { id: "business-license", name: "Business License" },
  ],
  "8": [
    { id: "birth-certificate", name: "Birth Certificate" },
    { id: "citizenship", name: "Citizenship Certificate" },
    { id: "marriage-registration", name: "Marriage Registration" },
  ],
  "10": [
    { id: "passport-application", name: "Passport Application" },
    { id: "passport-renewal", name: "Passport Renewal" },
    { id: "visa-recommendation", name: "Visa Recommendation" },
  ],
  "11": [
    { id: "driving-license", name: "Driving License" },
    { id: "vehicle-registration", name: "Vehicle Registration" },
    { id: "route-permit", name: "Route Permit" },
  ],
  "default": [
    { id: "birth-certificate", name: "Birth Certificate" },
    { id: "citizenship", name: "Citizenship Certificate" },
    { id: "document-verification", name: "Document Verification" },
  ]
};

// Static tender notices
const TENDER_NOTICES = [
  {
    id: "t1",
    title: "Construction of Office Building",
    deadline: "2025-11-15",
    budget: "NPR 5,00,00,000"
  },
  {
    id: "t2",
    title: "Supply of Office Equipment",
    deadline: "2025-11-10",
    budget: "NPR 25,00,000"
  },
  {
    id: "t3",
    title: "IT Infrastructure Upgrade",
    deadline: "2025-11-20",
    budget: "NPR 75,00,000"
  }
];

export default function OfficeDetail({ params }: { params: { id: string } }) {
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Use mock data instead of API call
    const foundOffice = MOCK_OFFICES.find(o => o.id === params.id);
    setOffice(foundOffice || null);
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className="py-8 text-center text-slate-600">Loading office details...</div>;
  if (!office) return <div className="py-8 text-center text-slate-600">Office not found.</div>;

  const officeServices = OFFICE_SERVICES[params.id] || OFFICE_SERVICES["default"];

  return (
    <section className="space-y-6">
      <a className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900" href="/offices">
        ← Back to Directory
      </a>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{office.name}</h1>
        {office.ministry && (
          <p className="mt-1 text-sm text-slate-600">Ministry: {office.ministry}</p>
        )}
        
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-700">Contact Information</h3>
          <p className="mt-1 text-slate-600">{office.address}</p>
          {office.province && office.district && (
            <p className="text-sm text-slate-500">{office.district}, {office.province}</p>
          )}
          {office.phone && (
            <p className="mt-2">
              <span className="text-sm text-slate-600">Phone:</span>{' '}
              <a className="font-medium text-brand-700 hover:underline" href={`tel:${office.phone}`}>
                {office.phone}
              </a>
            </p>
          )}
          {office.website && (
            <p className="mt-1">
              <span className="text-sm text-slate-600">Website:</span>{' '}
              <a 
                className="font-medium text-brand-700 hover:underline" 
                target="_blank" 
                rel="noreferrer" 
                href={office.website}
              >
                Visit website →
              </a>
            </p>
          )}
          {office.hours && (
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold">Office Hours:</span> {office.hours}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {office.phone && (
            <a
              href={`tel:${office.phone}`}
              className="inline-flex items-center gap-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              📞 Call
            </a>
          )}
          {office.website && (
            <a
              href={office.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              🌐 Website
            </a>
          )}
          {office.lat && office.lng && (
            <button
              onClick={() => setShowMap(!showMap)}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              🗺️ {showMap ? 'Hide' : 'View'} Map
            </button>
          )}
        </div>

        {showMap && office.lat && office.lng && (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <iframe
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${office.lat},${office.lng}&output=embed`}
              allowFullScreen
            />
            <div className="bg-slate-50 p-2 text-center">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-brand-700 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Available Services</h3>
        <p className="mt-1 text-sm text-slate-600">Services offered by this government office</p>
        <ul className="mt-3 space-y-2">
          {officeServices.map((service) => (
            <li key={service.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-brand-600">📋</span>
                <span className="font-medium text-slate-700">{service.name}</span>
              </div>
              <a
                href={`/service/${service.id}`}
                className="text-sm text-brand-700 hover:underline"
              >
                View Details →
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Procurement (Tender) Notices</h3>
        <p className="mt-1 text-sm text-slate-600">Active tender announcements from this office</p>
        <div className="mt-3 space-y-3">
          {TENDER_NOTICES.map((tender) => (
            <div key={tender.id} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{tender.title}</h4>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span>💰 Budget: {tender.budget}</span>
                    <span>📅 Deadline: {new Date(tender.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <a
                  href={`/tenders/${tender.id}`}
                  className="ml-4 whitespace-nowrap rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a
            href="/tenders"
            className="text-sm text-brand-700 hover:underline"
          >
            View All Tenders →
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Public Notices</h3>
        <div className="mt-3 space-y-2">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-sm font-medium text-amber-900">📢 Office will be closed on Nov 5, 2025 for public holiday</p>
            <p className="mt-1 text-xs text-amber-700">Posted: Oct 25, 2025</p>
          </div>
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
            <p className="text-sm font-medium text-blue-900">ℹ️ New online appointment system launched</p>
            <p className="mt-1 text-xs text-blue-700">Posted: Oct 20, 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
