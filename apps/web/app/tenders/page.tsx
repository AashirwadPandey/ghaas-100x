"use client";

import { useState, useMemo, useEffect } from "react";

type Tender = {
  id: string;
  title: string;
  description: string;
  organization: string;
  category: string;
  budget: string;
  deadline: string;
  publishedDate: string;
  status: "Open" | "Closing Soon" | "Closed";
};

// Static tender data
const STATIC_TENDERS: Tender[] = [
  {
    id: "t1",
    title: "Construction of Multi-Purpose Building",
    description: "Construction of 5-story multi-purpose administrative building with modern facilities",
    organization: "Kathmandu Metropolitan Office",
    category: "Construction",
    budget: "NPR 50,00,00,000",
    deadline: "2025-11-15",
    publishedDate: "2025-10-15",
    status: "Open"
  },
  {
    id: "t2",
    title: "Supply of IT Equipment and Hardware",
    description: "Procurement of computers, printers, servers and networking equipment for district offices",
    organization: "Department of Transport Management",
    category: "IT & Technology",
    budget: "NPR 2,50,00,000",
    deadline: "2025-11-10",
    publishedDate: "2025-10-20",
    status: "Closing Soon"
  },
  {
    id: "t3",
    title: "Road Maintenance and Repair Services",
    description: "Annual maintenance contract for district road network covering 150km",
    organization: "Lalitpur Metropolitan Office",
    category: "Infrastructure",
    budget: "NPR 15,00,00,000",
    deadline: "2025-11-20",
    publishedDate: "2025-10-10",
    status: "Open"
  },
  {
    id: "t4",
    title: "Medical Equipment Supply",
    description: "Supply and installation of medical equipment for government health facilities",
    organization: "Ministry of Health",
    category: "Healthcare",
    budget: "NPR 8,00,00,000",
    deadline: "2025-11-08",
    publishedDate: "2025-10-12",
    status: "Closing Soon"
  },
  {
    id: "t5",
    title: "School Furniture and Supplies",
    description: "Supply of desks, chairs, boards and educational materials for 50 schools",
    organization: "Ministry of Education",
    category: "Education",
    budget: "NPR 3,00,00,000",
    deadline: "2025-11-25",
    publishedDate: "2025-10-18",
    status: "Open"
  },
  {
    id: "t6",
    title: "Water Supply System Upgrade",
    description: "Upgrading water supply infrastructure for urban areas",
    organization: "Pokhara Metropolitan Office",
    category: "Infrastructure",
    budget: "NPR 12,00,00,000",
    deadline: "2025-11-30",
    publishedDate: "2025-10-05",
    status: "Open"
  },
  {
    id: "t7",
    title: "Waste Management Services",
    description: "3-year contract for municipal solid waste collection and disposal",
    organization: "Biratnagar Metropolitan Office",
    category: "Environment",
    budget: "NPR 6,00,00,000",
    deadline: "2025-11-12",
    publishedDate: "2025-10-22",
    status: "Open"
  },
  {
    id: "t8",
    title: "Security Services for Government Buildings",
    description: "Annual security guard services for 20 government office buildings",
    organization: "Ministry of Home Affairs",
    category: "Services",
    budget: "NPR 4,00,00,000",
    deadline: "2025-11-05",
    publishedDate: "2025-10-08",
    status: "Closing Soon"
  },
  {
    id: "t9",
    title: "Street Lighting Installation Project",
    description: "Installation of LED street lights across 15km of main roads",
    organization: "Bhaktapur Municipality Office",
    category: "Infrastructure",
    budget: "NPR 5,50,00,000",
    deadline: "2025-10-25",
    publishedDate: "2025-09-20",
    status: "Closed"
  },
  {
    id: "t10",
    title: "Landscaping and Park Development",
    description: "Development of public parks and green spaces in municipal area",
    organization: "Pokhara Metropolitan Office",
    category: "Environment",
    budget: "NPR 3,50,00,000",
    deadline: "2025-10-28",
    publishedDate: "2025-09-25",
    status: "Closed"
  },
  {
    id: "t11",
    title: "Government Building Renovation",
    description: "Renovation and modernization of historical government building",
    organization: "Kathmandu Metropolitan Office",
    category: "Construction",
    budget: "NPR 8,00,00,000",
    deadline: "2025-11-18",
    publishedDate: "2025-10-10",
    status: "Open"
  },
  {
    id: "t12",
    title: "Disaster Management Equipment",
    description: "Procurement of emergency response and disaster management equipment",
    organization: "Ministry of Home Affairs",
    category: "Services",
    budget: "NPR 4,50,00,000",
    deadline: "2025-11-22",
    publishedDate: "2025-10-15",
    status: "Open"
  },
  {
    id: "t13",
    title: "Public Transport Bus Fleet",
    description: "Supply of electric buses for public transportation system",
    organization: "Department of Transport Management",
    category: "Transport",
    budget: "NPR 35,00,00,000",
    deadline: "2025-12-01",
    publishedDate: "2025-10-20",
    status: "Open"
  },
  {
    id: "t14",
    title: "Solar Panel Installation",
    description: "Solar power system installation for government buildings",
    organization: "Ministry of Energy",
    category: "Energy",
    budget: "NPR 7,00,00,000",
    deadline: "2025-10-30",
    publishedDate: "2025-09-28",
    status: "Closed"
  },
  {
    id: "t15",
    title: "CCTV Surveillance System",
    description: "Installation of city-wide CCTV surveillance network",
    organization: "Lalitpur Metropolitan Office",
    category: "IT & Technology",
    budget: "NPR 6,50,00,000",
    deadline: "2025-11-07",
    publishedDate: "2025-10-12",
    status: "Closing Soon"
  }
];

const CATEGORIES = ["All Categories", "Construction", "IT & Technology", "Infrastructure", "Healthcare", "Education", "Environment", "Services", "Transport", "Energy"];
const STATUSES = ["All Status", "Open", "Closing Soon", "Closed"];

export default function TendersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTenders = useMemo(() => {
    let filtered = [...STATIC_TENDERS];

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        t => t.title.toLowerCase().includes(query) || 
             t.description.toLowerCase().includes(query) ||
             t.organization.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (selectedStatus !== "All Status") {
      filtered = filtered.filter(t => t.status === selectedStatus);
    }

    // Sort by deadline (earliest first)
    filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus]);

  // Paginate filtered results
  const paginatedTenders = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTenders.slice(startIndex, endIndex);
  }, [filteredTenders, page]);

  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, selectedStatus]);

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-green-100 text-green-800 ring-1 ring-green-200";
      case "Closing Soon": return "bg-amber-100 text-amber-800 ring-1 ring-amber-200";
      case "Closed": return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
      default: return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">Government Tenders</span>
        </h1>
        <p className="mt-2 text-slate-600">
          Browse and track procurement opportunities from government organizations
        </p>
      </div>

      {/* Subscription CTA */}
      <div className="rounded-xl border-2 border-brand-200 bg-gradient-to-r from-brand-50 via-blue-50 to-indigo-50 p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-900">Never Miss a Tender Opportunity</h3>
            <p className="mt-1 text-slate-600">
              Subscribe to receive instant notifications about new tenders matching your interests. Get alerts via email and SMS for deadlines, updates, and bid results.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-brand-700 hover:to-brand-800 hover:shadow-md active:scale-95">
                <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribe for Email Alerts
              </button>
              <button className="group inline-flex items-center gap-2 rounded-md border-2 border-brand-600 bg-white px-6 py-2.5 text-sm font-medium text-brand-700 shadow-sm transition-all hover:bg-brand-50 hover:shadow-md active:scale-95">
                <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Premium Features
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Deadline reminders
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Category filters
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Winner announcements
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Custom alerts
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Tenders
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, description..."
            className="form-input rounded-md border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
          />
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Category
          </span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="form-select rounded-md border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Status
          </span>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="form-select rounded-md border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
          >
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); setSelectedStatus("All Status"); }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95"
          >
            <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
        <p className="flex items-center gap-2 font-medium">
          <svg className="h-4 w-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Showing {paginatedTenders.length} of {filteredTenders.length} tender{filteredTenders.length !== 1 ? 's' : ''}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50 hover:shadow-md active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50 hover:shadow-md active:scale-95"
            >
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {paginatedTenders.map((tender, idx) => {
          const daysRemaining = getDaysRemaining(tender.deadline);
          return (
            <div
              key={tender.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-300 animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`status-badge ${getStatusColor(tender.status)}`}>
                      {tender.status === "Open" && (
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {tender.status === "Closing Soon" && (
                        <svg className="h-3.5 w-3.5 animate-pulse-subtle" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                      )}
                      {tender.status === "Closed" && (
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      )}
                      {tender.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-brand-200">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
                      </svg>
                      {tender.category}
                    </span>
                    {daysRemaining >= 0 && daysRemaining <= 7 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-200 animate-pulse-subtle">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 hover:text-brand-700 transition-colors">{tender.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{tender.description}</p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{tender.organization}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{tender.budget}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Deadline: {new Date(tender.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`/tenders/${tender.id}`}
                  className="group shrink-0 inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md active:scale-95"
                >
                  View Details
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTenders.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-4 text-slate-500">No tenders found matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); setSelectedStatus("All Status"); }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition hover:text-brand-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear filters and view all tenders
          </button>
        </div>
      )}
    </section>
  );
}
