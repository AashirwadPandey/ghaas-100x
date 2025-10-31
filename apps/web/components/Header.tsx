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
    <header style={{ padding: 12, borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 12, alignItems: 'center' }}>
      <a href="/" style={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>GHaaS</a>
      <nav style={{ display: 'flex', gap: 12 }}>
        <a href="/offices"><LangText en="Offices" ne="कार्यालयहरू" /></a>
        <a href="/complaint"><LangText en="Complaint" ne="गुनासो" /></a>
        <a href="/tenders"><LangText en="Tenders" ne="बोलपत्र" /></a>
        <a href="/admin/edit/1" style={{ opacity: 0.7 }}><LangText en="Admin" ne="व्यवस्थापक" /></a>
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button onClick={toggleLang}>EN/NE</button>
        <button onClick={toggleLowBandwidth}>Low bandwidth</button>
      </div>
    </header>
  );
}
