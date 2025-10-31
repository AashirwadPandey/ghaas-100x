import LangText from "../components/LangText";

export default async function Page() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-brand-50 to-white p-8 shadow-card sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            <LangText
              en="A simple, beautiful hub for government services"
              ne="सरकारी सेवाहरूका लागि सजिलो र आकर्षक केन्द्र"
            />
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            <LangText
              en="Find offices, submit complaints, and track tenders from one place—fast, modern, and mobile-friendly."
              ne="एकै स्थानबाट कार्यालयहरू खोज्नुहोस्, गुनासो पेश गर्नुहोस्, र बोलपत्रहरू अनुगमन गर्नुहोस्—छिटो, आधुनिक र मोबाइलमैत्री।"
            />
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/offices"
              className="inline-flex items-center rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
            >
              <LangText en="Browse offices" ne="कार्यालयहरू हेर्नुहोस्" />
            </a>
            <a
              href="/complaint"
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <LangText en="Submit a complaint" ne="गुनासो पेश गर्नुहोस्" />
            </a>
            <a
              href="/tenders"
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <LangText en="View tenders" ne="बोलपत्रहरू हेर्नुहोस्" />
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">PWA-ready</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Next.js 14</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Express API</span>
          </div>
        </div>

        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
      </section>

      {/* Features */}
      <section>
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            <LangText en="Everything you need, simplified" ne="सबै आवश्यकता, सरल तरिकामा" />
          </h2>
          <p className="mt-1 text-slate-600">
            <LangText en="Designed for clarity, speed, and accessibility." ne="स्पष्टता, छिटोपन, र पहुँचका लागि डिजाइन गरिएको।" />
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              titleEn: 'Find nearby offices',
              titleNe: 'नजिकैका कार्यालय खोज्नुहोस्',
              descEn: 'Browse a curated list with addresses, contacts, and directions.',
              descNe: 'ठेगाना, सम्पर्क, दिशानिर्देश सहितको सूचि ब्राउज गर्नुहोस्।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700"><path stroke="currentColor" strokeWidth="1.5" d="M12 21c-4.5-4.5-7-8.1-7-11a7 7 0 1 1 14 0c0 2.9-2.5 6.5-7 11Z"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
              )
            },
            {
              titleEn: 'Generate service PDFs',
              titleNe: 'सेवा PDF तयार गर्नुहोस्',
              descEn: 'Create printable documents for submissions and records.',
              descNe: 'सम्बोधन र रेकर्डका लागि मुद्रणयोग्य कागजात बनाउनुहोस्।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700"><path stroke="currentColor" strokeWidth="1.5" d="M7 3h6l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path stroke="currentColor" strokeWidth="1.5" d="M13 3v5h5"/><path stroke="currentColor" strokeWidth="1.5" d="M8 14h8M8 18h8M8 10h4"/></svg>
              )
            },
            {
              titleEn: 'Submit and track complaints',
              titleNe: 'गुनासो पेश र ट्र्याक गर्नुहोस्',
              descEn: 'Upload photos and get a ticket to check status anytime.',
              descNe: 'फोटो अपलोड गर्नुहोस् र टिकट मार्फत स्थिति जाँच गर्नुहोस्।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700"><path stroke="currentColor" strokeWidth="1.5" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10l-4-2-4 2-4-2-4 2V7Z"/></svg>
              )
            },
            {
              titleEn: 'Tender listings',
              titleNe: 'बोलपत्र सूचि',
              descEn: 'Stay updated on the latest opportunities and subscribe.',
              descNe: 'नयाँ अवसरहरूमा अपडेट रहनुहोस् र सदस्यता लिनुहोस्।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700"><path stroke="currentColor" strokeWidth="1.5" d="M4 5h16M4 12h16M4 19h16"/></svg>
              )
            },
            {
              titleEn: 'Fast and mobile-first',
              titleNe: 'छिटो र मोबाइलमैत्री',
              descEn: 'Built with modern tooling for speed and reliability.',
              descNe: 'छिटोपना र भरपर्दोपनका लागि आधुनिक उपकरणहरूद्वारा निर्मित।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>
              )
            },
            {
              titleEn: 'Offline-friendly PWA',
              titleNe: 'अफलाइनमैत्री PWA',
              descEn: 'Works on spotty connections with smart caching.',
              descNe: 'स्मार्ट क्यासिङसँगै कमजोर जडानमा पनि काम गर्छ।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700"><path stroke="currentColor" strokeWidth="1.5" d="M12 3v18M3 12h18"/></svg>
              )
            }
          ].map((f, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    <LangText en={f.titleEn} ne={f.titleNe} />
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    <LangText en={f.descEn} ne={f.descNe} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card">
        <h3 className="text-lg font-semibold">
          <LangText en="Ready to get started?" ne="सुरु गर्न तयार हुनुहुन्छ?" />
        </h3>
        <p className="mt-1 text-slate-600">
          <LangText en="Jump into the directory or file a complaint in minutes." ne="डाइरेक्टरीमा जानुहोस् वा केही मिनेटमै गुनासो दर्ता गर्नुहोस्।" />
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="/offices" className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700">
            <LangText en="Browse offices" ne="कार्यालयहरू हेर्नुहोस्" />
          </a>
          <a href="/complaint" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <LangText en="Submit a complaint" ne="गुनासो पेश गर्नुहोस्" />
          </a>
        </div>
      </section>
    </div>
  );
}
