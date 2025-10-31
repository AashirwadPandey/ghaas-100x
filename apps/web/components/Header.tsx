"use client";
import LangText from "./LangText";

export default function Header() {
  function toggleLowBandwidth() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghaas_low_bw', localStorage.getItem('ghaas_low_bw') === '1' ? '0' : '1');
      location.reload();
    }
  }
  function toggleLang() {
    if (typeof window !== 'undefined') {
      const next = (localStorage.getItem('ghaas_lang') || 'en') === 'en' ? 'ne' : 'en';
      localStorage.setItem('ghaas_lang', next);
      location.reload();
    }
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="container flex h-14 items-center gap-4">
        <a href="/" className="font-bold text-brand-700 hover:text-brand-800">GHaaS</a>
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600">
          <a className="hover:text-slate-900" href="/offices"><LangText en="Offices" ne="कार्यालयहरू" /></a>
          <a className="hover:text-slate-900" href="/complaint"><LangText en="Complaint" ne="गुनासो" /></a>
          <a className="hover:text-slate-900" href="/tenders"><LangText en="Tenders" ne="बोलपत्र" /></a>
          <a className="hover:text-slate-900/80" href="/admin/edit/1"><LangText en="Admin" ne="व्यवस्थापक" /></a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggleLang} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">EN/NE</button>
          <button onClick={toggleLowBandwidth} className="inline-flex items-center rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700">Low bandwidth</button>
        </div>
      </div>
    </header>
  );
}
