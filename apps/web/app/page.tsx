import LangText from "../components/LangText";

export default async function Page() {
  return (
    <div className="mx-auto max-w-6xl space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-brand-50/30 p-8 shadow-sm sm:p-12">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            <LangText
              en="A simple, beautiful hub for government services"
              ne="सरकारी सेवाहरूका लागि सजिलो र आकर्षक केन्द्र"
            />
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            <LangText
              en="Find offices, submit complaints, and track tenders from one place—fast, modern, and mobile-friendly."
              ne="एकै स्थानबाट कार्यालयहरू खोज्नुहोस्, गुनासो पेश गर्नुहोस्, र बोलपत्रहरू अनुगमन गर्नुहोस्—छिटो, आधुनिक र मोबाइलमैत्री।"
            />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/offices"
              className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
            >
              <LangText en="Browse offices" ne="कार्यालयहरू हेर्नुहोस्" />
            </a>
            <a
              href="/complaint"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <LangText en="Submit a complaint" ne="गुनासो पेश गर्नुहोस्" />
            </a>
            <a
              href="/tenders"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <LangText en="View tenders" ne="बोलपत्रहरू हेर्नुहोस्" />
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">PWA-ready</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">Next.js 14</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">Express API</span>
          </div>
        </div>

        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      </section>

      {/* Features */}
      <section>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            <LangText en="Everything you need, simplified" ne="सबै आवश्यकता, सरल तरिकामा" />
          </h2>
          <p className="mt-2 text-base text-slate-600">
            <LangText en="Designed for clarity, speed, and accessibility." ne="स्पष्टता, छिटोपन, र पहुँचका लागि डिजाइन गरिएको।" />
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-700">26+</div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              <LangText en="Government Offices" ne="सरकारी कार्यालयहरू" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-50 to-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-700">18+</div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              <LangText en="Available Services" ne="उपलब्ध सेवाहरू" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-amber-700">15+</div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              <LangText en="Active Tenders" ne="सक्रिय बोलपत्रहरू" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-purple-50 to-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-700">24/7</div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              <LangText en="Online Access" ne="अनलाइन पहुँच" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              titleEn: 'Multilingual interface',
              titleNe: 'बहुभाषी इन्टरफेस',
              descEn: 'Toggle languages instantly for a wider, inclusive audience.',
              descNe: 'व्यापक र समावेशी पहुँचका लागि भाषा तुरुन्तै परिवर्तन गर्नुहोस्।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700">
                  <path stroke="currentColor" strokeWidth="1.5" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/>
                  <path stroke="currentColor" strokeWidth="1.5" d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
                </svg>
              )
            },
            {
              titleEn: 'Browse government services',
              titleNe: 'सरकारी सेवाहरू ब्राउज गर्नुहोस्',
              descEn: 'Explore available services with requirements and procedures.',
              descNe: 'आवश्यकता र प्रक्रिया सहितका उपलब्ध सेवाहरू अन्वेषण गर्नुहोस्।',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-brand-700">
                  <path stroke="currentColor" strokeWidth="1.5" d="M12 3l2.5 5 5 .7-3.7 3.6.9 5.1L12 15l-4.7 2.4.9-5.1L4.5 8.7l5-.7L12 3Z"/>
                  <path stroke="currentColor" strokeWidth="1.5" d="M8 20h8"/>
                </svg>
              )
            }
          ].map((f, i) => (
            <div key={i} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 transition group-hover:bg-brand-100">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    <LangText en={f.titleEn} ne={f.titleNe} />
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    <LangText en={f.descEn} ne={f.descNe} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
          <LangText en="Ready to get started?" ne="सुरु गर्न तयार हुनुहुन्छ?" />
        </h3>
        <p className="mt-2 text-base text-slate-600">
          <LangText en="Jump into the directory or file a complaint in minutes." ne="डाइरेक्टरीमा जानुहोस् वा केही मिनेटमै गुनासो दर्ता गर्नुहोस्।" />
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="/offices" className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700">
            <LangText en="Browse offices" ne="कार्यालयहरू हेर्नुहोस्" />
          </a>
          <a href="/complaint" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
            <LangText en="Submit a complaint" ne="गुनासो पेश गर्नुहोस्" />
          </a>
        </div>
      </section>
    </div>
  );
}
