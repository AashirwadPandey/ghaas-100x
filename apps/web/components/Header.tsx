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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 font-bold text-brand-700 transition hover:text-brand-800">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
            <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5Z"/>
            <path fill="white" d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8Z"/>
          </svg>
          <span className="text-xl">GHaaS</span>
        </a>
        
        <nav className="hidden items-center gap-1 md:flex">
          <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900" href="/offices">
            <LangText en="Offices" ne="कार्यालयहरू" />
          </a>
          <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900" href="/services">
            <LangText en="Services" ne="सेवाहरू" />
          </a>
          <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900" href="/tenders">
            <LangText en="Tenders" ne="बोलपत्र" />
          </a>
          <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900" href="/complaint">
            <LangText en="Complaints" ne="गुनासो" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLang} 
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path stroke="currentColor" strokeWidth="2" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/>
              <path stroke="currentColor" strokeWidth="2" d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
            </svg>
            <span className="hidden sm:inline">EN/NE</span>
          </button>
          <button 
            onClick={toggleLowBandwidth} 
            className="hidden items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 sm:inline-flex"
            title="Toggle low bandwidth mode"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path stroke="currentColor" strokeWidth="2" d="M12 3v18M3 12h18"/>
            </svg>
            <span className="hidden md:inline">Low BW</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Shows on smaller screens */}
      <div className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
        <nav className="flex items-center justify-around text-xs">
          <a className="flex flex-col items-center gap-1 py-2 text-slate-600 hover:text-brand-700" href="/offices">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path stroke="currentColor" strokeWidth="1.5" d="M12 21c-4.5-4.5-7-8.1-7-11a7 7 0 1 1 14 0c0 2.9-2.5 6.5-7 11Z"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            <LangText en="Offices" ne="कार्यालय" />
          </a>
          <a className="flex flex-col items-center gap-1 py-2 text-slate-600 hover:text-brand-700" href="/services">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path stroke="currentColor" strokeWidth="1.5" d="M12 3l2.5 5 5 .7-3.7 3.6.9 5.1L12 15l-4.7 2.4.9-5.1L4.5 8.7l5-.7L12 3Z"/></svg>
            <LangText en="Services" ne="सेवा" />
          </a>
          <a className="flex flex-col items-center gap-1 py-2 text-slate-600 hover:text-brand-700" href="/tenders">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path stroke="currentColor" strokeWidth="1.5" d="M4 5h16M4 12h16M4 19h16"/></svg>
            <LangText en="Tenders" ne="बोलपत्र" />
          </a>
          <a className="flex flex-col items-center gap-1 py-2 text-slate-600 hover:text-brand-700" href="/complaint">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path stroke="currentColor" strokeWidth="1.5" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10l-4-2-4 2-4-2-4 2V7Z"/></svg>
            <LangText en="Report" ne="गुनासो" />
          </a>
        </nav>
      </div>
    </header>
  );
}
