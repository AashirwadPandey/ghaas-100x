"use client";

import { useState, useMemo } from "react";

type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedTime: string;
  fee: string;
  requiredDocs: number;
};

// Static services data
const SERVICES: Service[] = [
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    description: "Official certificate of birth registration",
    category: "Vital Registration",
    estimatedTime: "3-5 days",
    fee: "NPR 100",
    requiredDocs: 4
  },
  {
    id: "citizenship",
    name: "Citizenship Certificate",
    description: "Nepali citizenship certificate for eligible citizens",
    category: "Vital Registration",
    estimatedTime: "7-15 days",
    fee: "NPR 500",
    requiredDocs: 6
  },
  {
    id: "marriage-registration",
    name: "Marriage Registration",
    description: "Legal registration of marriage",
    category: "Vital Registration",
    estimatedTime: "5-7 days",
    fee: "NPR 200",
    requiredDocs: 5
  },
  {
    id: "death-certificate",
    name: "Death Certificate",
    description: "Official certificate of death registration",
    category: "Vital Registration",
    estimatedTime: "2-3 days",
    fee: "NPR 100",
    requiredDocs: 3
  },
  {
    id: "passport-application",
    name: "Passport Application",
    description: "Apply for new Nepali passport",
    category: "Travel Documents",
    estimatedTime: "15-30 days",
    fee: "NPR 5,000",
    requiredDocs: 5
  },
  {
    id: "passport-renewal",
    name: "Passport Renewal",
    description: "Renew expired or expiring passport",
    category: "Travel Documents",
    estimatedTime: "10-20 days",
    fee: "NPR 5,000",
    requiredDocs: 4
  },
  {
    id: "visa-recommendation",
    name: "Visa Recommendation",
    description: "Official recommendation letter for visa application",
    category: "Travel Documents",
    estimatedTime: "3-5 days",
    fee: "NPR 1,000",
    requiredDocs: 3
  },
  {
    id: "driving-license",
    name: "Driving License",
    description: "Apply for or renew driving license",
    category: "Transport",
    estimatedTime: "30-45 days",
    fee: "NPR 3,000",
    requiredDocs: 5
  },
  {
    id: "vehicle-registration",
    name: "Vehicle Registration",
    description: "Register new or transfer vehicle ownership",
    category: "Transport",
    estimatedTime: "7-10 days",
    fee: "Varies",
    requiredDocs: 6
  },
  {
    id: "route-permit",
    name: "Route Permit",
    description: "Commercial vehicle route permit",
    category: "Transport",
    estimatedTime: "5-7 days",
    fee: "NPR 2,000",
    requiredDocs: 4
  },
  {
    id: "business-license",
    name: "Business License",
    description: "License to operate a business",
    category: "Business",
    estimatedTime: "10-15 days",
    fee: "NPR 5,000",
    requiredDocs: 7
  },
  {
    id: "company-registration",
    name: "Company Registration",
    description: "Register a new company or firm",
    category: "Business",
    estimatedTime: "15-30 days",
    fee: "NPR 10,000",
    requiredDocs: 8
  },
  {
    id: "tax-registration",
    name: "Tax Registration (PAN)",
    description: "Permanent Account Number for tax purposes",
    category: "Business",
    estimatedTime: "5-7 days",
    fee: "Free",
    requiredDocs: 3
  },
  {
    id: "land-registration",
    name: "Land Registration",
    description: "Register land ownership or transfer",
    category: "Property",
    estimatedTime: "15-30 days",
    fee: "Varies",
    requiredDocs: 8
  },
  {
    id: "house-registration",
    name: "House Registration",
    description: "Register house ownership or construction",
    category: "Property",
    estimatedTime: "15-30 days",
    fee: "Varies",
    requiredDocs: 7
  },
  {
    id: "building-permit",
    name: "Building Permit",
    description: "Permit for new construction or renovation",
    category: "Property",
    estimatedTime: "20-45 days",
    fee: "Varies",
    requiredDocs: 9
  },
  {
    id: "document-verification",
    name: "Document Verification",
    description: "Official verification of documents",
    category: "General",
    estimatedTime: "1-2 days",
    fee: "NPR 200",
    requiredDocs: 2
  },
  {
    id: "police-clearance",
    name: "Police Clearance Certificate",
    description: "Certificate of no criminal record",
    category: "General",
    estimatedTime: "7-15 days",
    fee: "NPR 500",
    requiredDocs: 4
  }
];

const CATEGORIES = [
  "All Categories",
  "Vital Registration",
  "Travel Documents",
  "Transport",
  "Business",
  "Property",
  "General"
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredServices = useMemo(() => {
    let filtered = [...SERVICES];

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        s => s.name.toLowerCase().includes(query) || 
             s.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Government Services</h1>
        <p className="mt-2 text-base text-slate-600">
          Browse and learn about various government services available to citizens
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-slate-700">Search Services</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name or description..."
            className="form-input rounded-lg border-slate-300 focus:border-brand-500 focus:ring-brand-500"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-slate-700">Category</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="form-select rounded-lg border-slate-300 focus:border-brand-500 focus:ring-brand-500"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); }}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm font-medium text-slate-600">
          Showing <span className="text-slate-900">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <div className="mb-3">
              <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
                {service.category}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">⏱️ Time:</span>
                <span className="font-medium text-slate-700">{service.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">💰 Fee:</span>
                <span className="font-medium text-slate-700">{service.fee}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">📄 Documents:</span>
                <span className="font-medium text-slate-700">{service.requiredDocs} required</span>
              </div>
            </div>

            <div className="mt-4">
              <a
                href={`/service/${service.id}`}
                className="block w-full rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-brand-700"
              >
                View Details →
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
          <p className="text-base text-slate-500">No services found matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); }}
            className="mt-4 text-sm font-medium text-brand-700 hover:underline"
          >
            Clear filters and view all services
          </button>
        </div>
      )}
    </section>
  );
}
