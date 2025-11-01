export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
      <a href="/" className="hover:text-brand-700 transition">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path stroke="currentColor" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path stroke="currentColor" strokeWidth="2" d="M9 22V12h6v10" />
        </svg>
      </a>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
          {item.href ? (
            <a href={item.href} className="hover:text-brand-700 transition">
              {item.label}
            </a>
          ) : (
            <span className="font-medium text-slate-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
