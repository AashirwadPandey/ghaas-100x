"use client";
import { useEffect, useState } from "react";

export default function LangText(props: { en: string; ne: string }) {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  useEffect(() => {
    const stored = (localStorage.getItem('ghaas_lang') as 'en' | 'ne') || 'en';
    setLang(stored);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ghaas_lang' && (e.newValue === 'en' || e.newValue === 'ne')) {
        setLang(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return <>{lang === 'ne' ? props.ne : props.en}</>;
}
