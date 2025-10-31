"use client";

import { useEffect, useState } from 'react';

type Profile = { name?: string; phone?: string; email?: string };

export default function ProfileForm({ onChange }: { onChange?: (p: Profile) => void }) {
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ghaas_profile');
      if (saved) setProfile(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    onChange?.(profile);
  }, [profile]);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    const next = { ...profile, [key]: value };
    setProfile(next);
    localStorage.setItem('ghaas_profile', JSON.stringify(next));
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label>
        Name
        <input value={profile.name || ''} onChange={e => update('name', e.target.value)} style={{ display: 'block', width: '100%' }} />
      </label>
      <label>
        Phone
        <input value={profile.phone || ''} onChange={e => update('phone', e.target.value)} style={{ display: 'block', width: '100%' }} />
      </label>
      <label>
        Email
        <input value={profile.email || ''} onChange={e => update('email', e.target.value)} style={{ display: 'block', width: '100%' }} />
      </label>
    </div>
  );
}
