"use client";

import { useEffect, useRef } from 'react';

type Pin = { id: string; name: string; lat?: number; lng?: number };

export default function OfficeMap({ pins }: { pins: Pin[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    (async () => {
      if (!ref.current) return;
      // Respect low bandwidth mode
      try {
        if (localStorage.getItem('ghaas_low_bw') === '1') {
          return;
        }
      } catch {}
      // Dynamic import leaflet only on client
      try {
        const L = await import('leaflet');
        // @ts-ignore: using global CSS from CDN is acceptable for demo
        await import('leaflet/dist/leaflet.css');
        map = L.map(ref.current).setView([27.7, 85.3], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        pins.filter(p => p.lat && p.lng).forEach(p => {
          L.marker([p.lat as number, p.lng as number]).addTo(map).bindPopup(p.name);
        });
      } catch (e) {
        console.warn('Leaflet not available, rendering placeholder map.', e);
      }
    })();
    return () => { try { map?.remove(); } catch {} };
  }, [pins]);

  return <div ref={ref} className="h-96 w-full rounded-xl border border-slate-200 bg-brand-50" />;
}
