"use client";

import { useEffect, useMemo, useState } from "react";
import OfficeCard from "../../components/OfficeCard";

type Office = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  website?: string;
  hours?: string;
  province?: string;
  district?: string;
  ministry?: string;
};

type Facets = {
  provinces: string[];
  districts: string[];
  ministries: string[];
};

// Static office seed data (25 offices, at least 3 per province)
const STATIC_OFFICES: Office[] = [
  // Koshi Province (3 offices)
  {
    id: "1",
    name: "Biratnagar Metropolitan Office",
    address: "Main Road, Biratnagar",
    phone: "+977-21-520000",
    lat: 26.4525,
    lng: 87.2718,
    website: "https://biratnagar.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Koshi",
    district: "Morang",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "2",
    name: "Dharan Sub-Metropolitan Office",
    address: "BP Chowk, Dharan",
    phone: "+977-25-520100",
    lat: 26.8149,
    lng: 87.2824,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Koshi",
    district: "Sunsari",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "3",
    name: "Itahari Sub-Metropolitan Office",
    address: "Itahari-5, Sunsari",
    phone: "+977-25-580000",
    lat: 26.6656,
    lng: 87.2795,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Koshi",
    district: "Sunsari",
    ministry: "Ministry of Home Affairs"
  },
  // Madhesh Province (3 offices)
  {
    id: "4",
    name: "Janakpur Sub-Metropolitan Office",
    address: "Ramanand Chowk, Janakpur",
    phone: "+977-41-520000",
    lat: 26.7288,
    lng: 85.9244,
    website: "https://janakpur.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Madhesh",
    district: "Dhanusha",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "5",
    name: "Birgunj Metropolitan Office",
    address: "Ghantaghar, Birgunj",
    phone: "+977-51-520000",
    lat: 27.0104,
    lng: 84.8800,
    website: "https://birgunjmun.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Madhesh",
    district: "Parsa",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "6",
    name: "Rajbiraj Municipality Office",
    address: "Main Road, Rajbiraj",
    phone: "+977-31-520000",
    lat: 26.5400,
    lng: 86.7470,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Madhesh",
    district: "Saptari",
    ministry: "Ministry of Home Affairs"
  },
  // Bagmati Province (7 offices)
  {
    id: "7",
    name: "Kathmandu Metropolitan Office",
    address: "Babar Mahal, Kathmandu-1",
    phone: "+977-1-4200000",
    lat: 27.7007,
    lng: 85.3170,
    website: "https://kathmandu.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "8",
    name: "Lalitpur Metropolitan Office",
    address: "Pulchowk, Lalitpur",
    phone: "+977-1-5520000",
    lat: 27.6710,
    lng: 85.3220,
    website: "https://lalitpur.gov.np",
    hours: "10:00 AM - 4:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Lalitpur",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "9",
    name: "Bhaktapur Municipality Office",
    address: "Durbar Square, Bhaktapur",
    phone: "+977-1-6610000",
    lat: 27.6720,
    lng: 85.4290,
    website: "https://bhaktapur.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Bhaktapur",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "10",
    name: "Department of Passport",
    address: "Tripureshwor, Kathmandu",
    phone: "+977-1-4200300",
    lat: 27.6950,
    lng: 85.3120,
    website: "https://nepalpassport.gov.np",
    hours: "10:00 AM - 3:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Foreign Affairs"
  },
  {
    id: "11",
    name: "Department of Transport Management",
    address: "Minbhawan, Kathmandu",
    phone: "+977-1-4200500",
    lat: 27.7100,
    lng: 85.3300,
    website: "https://dotm.gov.np",
    hours: "10:00 AM - 4:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Physical Infrastructure and Transport"
  },
  {
    id: "12",
    name: "Kirtipur Municipality Office",
    address: "Kirtipur-1, Kathmandu",
    phone: "+977-1-4330000",
    lat: 27.6788,
    lng: 85.2846,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "13",
    name: "Madhyapur Thimi Municipality Office",
    address: "Thimi, Bhaktapur",
    phone: "+977-1-6630000",
    lat: 27.6813,
    lng: 85.3844,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Bhaktapur",
    ministry: "Ministry of Home Affairs"
  },
  // Gandaki Province (4 offices)
  {
    id: "14",
    name: "Pokhara Metropolitan Office",
    address: "New Road, Pokhara",
    phone: "+977-61-520000",
    lat: 28.2096,
    lng: 83.9856,
    website: "https://pokhara.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Gandaki",
    district: "Kaski",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "15",
    name: "Gorkha District Office",
    address: "Gorkha Bazaar, Gorkha",
    phone: "+977-64-420000",
    lat: 28.0000,
    lng: 84.6333,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Gandaki",
    district: "Gorkha",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "16",
    name: "Baglung Municipality Office",
    address: "Baglung Bazaar, Baglung",
    phone: "+977-68-520000",
    lat: 28.2646,
    lng: 83.5938,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Gandaki",
    district: "Baglung",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "17",
    name: "Beni Municipality Office",
    address: "Beni Bazaar, Myagdi",
    phone: "+977-69-520000",
    lat: 28.3670,
    lng: 83.5670,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Gandaki",
    district: "Myagdi",
    ministry: "Ministry of Home Affairs"
  },
  // Lumbini Province (3 offices)
  {
    id: "18",
    name: "Butwal Sub-Metropolitan Office",
    address: "Traffic Chowk, Butwal",
    phone: "+977-71-540000",
    lat: 27.7000,
    lng: 83.4500,
    website: "https://butwal.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Lumbini",
    district: "Rupandehi",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "19",
    name: "Siddharthanagar Municipality Office",
    address: "Bhairahawa, Rupandehi",
    phone: "+977-71-520000",
    lat: 27.5079,
    lng: 83.4508,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Lumbini",
    district: "Rupandehi",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "20",
    name: "Tansen Municipality Office",
    address: "Tansen Durbar, Palpa",
    phone: "+977-75-520000",
    lat: 27.8667,
    lng: 83.5500,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Lumbini",
    district: "Palpa",
    ministry: "Ministry of Home Affairs"
  },
  // Karnali Province (3 offices)
  {
    id: "21",
    name: "Birendranagar Municipality Office",
    address: "Birendranagar, Surkhet",
    phone: "+977-83-520000",
    lat: 28.6000,
    lng: 81.6167,
    website: "https://birendranagarmun.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Karnali",
    district: "Surkhet",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "22",
    name: "Jumla District Office",
    address: "Khalanga, Jumla",
    phone: "+977-87-520000",
    lat: 29.2747,
    lng: 82.1833,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Karnali",
    district: "Jumla",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "23",
    name: "Dailekh District Office",
    address: "Narayan Municipality, Dailekh",
    phone: "+977-89-520000",
    lat: 28.8500,
    lng: 81.7167,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Karnali",
    district: "Dailekh",
    ministry: "Ministry of Home Affairs"
  },
  // Sudurpashchim Province (3 offices)
  {
    id: "24",
    name: "Dhangadhi Sub-Metropolitan Office",
    address: "Attariya Road, Dhangadhi",
    phone: "+977-91-520000",
    lat: 28.7000,
    lng: 80.5833,
    website: "https://dhangadhimun.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Sudurpashchim",
    district: "Kailali",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "25",
    name: "Mahendranagar Municipality Office",
    address: "Mahendranagar, Kanchanpur",
    phone: "+977-99-520000",
    lat: 28.9644,
    lng: 80.1811,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Sudurpashchim",
    district: "Kanchanpur",
    ministry: "Ministry of Home Affairs"
  },
  {
    id: "26",
    name: "Dipayal Silgadhi Municipality Office",
    address: "Dipayal, Doti",
    phone: "+977-94-520000",
    lat: 29.2667,
    lng: 80.9333,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Sudurpashchim",
    district: "Doti",
    ministry: "Ministry of Home Affairs"
  }
];

const STATIC_FACETS: Facets = {
  provinces: ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"],
  districts: ["Morang", "Sunsari", "Dhanusha", "Parsa", "Saptari", "Kathmandu", "Lalitpur", "Bhaktapur", "Kaski", "Gorkha", "Baglung", "Myagdi", "Rupandehi", "Palpa", "Surkhet", "Jumla", "Dailekh", "Kailali", "Kanchanpur", "Doti"],
  ministries: [
    "Ministry of Home Affairs",
    "Ministry of Foreign Affairs",
    "Ministry of Physical Infrastructure and Transport"
  ]
};

export default function OfficesPage() {
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ministry, setMinistry] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Filter offices based on search and filters
  const filteredOffices = useMemo(() => {
    let filtered = [...STATIC_OFFICES];
    
    if (q.trim()) {
      const query = q.trim().toLowerCase();
      filtered = filtered.filter(o => 
        o.name.toLowerCase().includes(query) || 
        o.address?.toLowerCase().includes(query) ||
        o.district?.toLowerCase().includes(query)
      );
    }
    if (province) filtered = filtered.filter(o => o.province === province);
    if (district) filtered = filtered.filter(o => o.district === district);
    if (ministry) filtered = filtered.filter(o => o.ministry === ministry);
    
    return filtered;
  }, [q, province, district, ministry]);

  // Paginate filtered results
  const paginatedOffices = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOffices.slice(startIndex, endIndex);
  }, [filteredOffices, page]);

  const totalPages = Math.ceil(filteredOffices.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [q, province, district, ministry]);

  const resetFilters = () => {
    setQ(""); setProvince(""); setDistrict(""); setMinistry(""); setPage(1);
  };

  const districtOptions = useMemo(() => {
    const all = STATIC_FACETS.districts || [];
    if (!province) return all;
    // Filter districts by selected province - simplified for now
    return all;
  }, [province]);

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">Government Offices</span>
          </h1>
          <p className="mt-2 text-base text-slate-600">Search and filter by location or ministry.</p>
        </div>
        <button onClick={resetFilters} className="group inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95">
          <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Filters
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-2 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </span>
          <input 
            value={q} 
            onChange={e => setQ(e.target.value)} 
            placeholder="Search by name or address..." 
            className="form-input rounded-lg border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500" 
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Province
          </span>
          <select 
            value={province} 
            onChange={e => setProvince(e.target.value)} 
            className="form-select rounded-lg border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
          >
            <option value="">All Provinces</option>
            {STATIC_FACETS.provinces.map((p: string) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            District
          </span>
          <select 
            value={district} 
            onChange={e => setDistrict(e.target.value)} 
            className="form-select rounded-lg border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
          >
            <option value="">All Districts</option>
            {districtOptions.map((d: string) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Ministry
          </span>
          <select 
            value={ministry} 
            onChange={e => setMinistry(e.target.value)} 
            className="form-select rounded-lg border-slate-300 shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
          >
            <option value="">All Ministries</option>
            {STATIC_FACETS.ministries.map((m: string) => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm sm:flex-row sm:items-center">
        <p className="flex items-center gap-2 font-medium">
          <svg className="h-4 w-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Showing <span className="text-slate-900">{paginatedOffices.length}</span> of <span className="text-slate-900">{filteredOffices.length}</span> office{filteredOffices.length !== 1 ? 's' : ''}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
            >
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedOffices.map((o: Office, idx: number) => (
          <div key={o.id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
            <OfficeCard id={o.id} name={o.name} address={o.address} phone={o.phone} lat={o.lat} lng={o.lng} website={o.website} hours={o.hours} province={o.province} district={o.district} ministry={o.ministry} />
          </div>
        ))}
      </div>

      {filteredOffices.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-base text-slate-500">No offices found matching your criteria.</p>
          <button 
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition hover:text-brand-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear filters and view all offices
          </button>
        </div>
      )}
    </section>
  );
}
