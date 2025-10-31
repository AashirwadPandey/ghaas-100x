"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Office = {
  id: number;
  name: string;
  phone: string;
  address: string;
  hours: string;
  lat?: number;
  lng?: number;
};

export default function AdminEditOfficePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string);
  const [office, setOffice] = useState<Office | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const savedKey = localStorage.getItem("ghaas_admin_key") || "";
    setApiKey(savedKey);
  }, []);

  useEffect(() => {
    if (!id) return;
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    fetch(`${base}/api/offices/${id}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setOffice(data))
      .catch(() => setMessage("Failed to load office."));
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!office) return;
    setSaving(true);
    setMessage("");
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    try {
      const res = await fetch(`${base}/api/offices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          name: office.name,
          phone: office.phone,
          address: office.address,
          hours: office.hours,
        }),
      });
      if (res.ok) {
        setMessage("Saved!");
        localStorage.setItem("ghaas_admin_key", apiKey);
      } else {
        const txt = await res.text();
        setMessage(`Save failed: ${txt || res.status}`);
      }
    } catch (err: any) {
      setMessage(`Error: ${err?.message || "unknown"}`);
    } finally {
      setSaving(false);
    }
  };

  if (!id) return <main><h1>Invalid office id</h1></main>;

  return (
    <main>
      <h1>Edit Office #{id}</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <label>
          Admin API Key
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter admin API key"
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={office?.name || ""}
            onChange={(e) => setOffice({ ...(office as Office), name: e.target.value })}
            required
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={office?.phone || ""}
            onChange={(e) => setOffice({ ...(office as Office), phone: e.target.value })}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={office?.address || ""}
            onChange={(e) => setOffice({ ...(office as Office), address: e.target.value })}
            required
          />
        </label>
        <label>
          Hours
          <input
            type="text"
            value={office?.hours || ""}
            onChange={(e) => setOffice({ ...(office as Office), hours: e.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={saving || !office}>
          {saving ? "Saving..." : "Save"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
