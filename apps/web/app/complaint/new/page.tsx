"use client";

import { useState } from 'react';

export default function NewComplaintPage() {
  const [ticket, setTicket] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeoLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert('Location access denied')
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const previews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) setPhotoPreview(previews);
      };
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    
    // Add geolocation if captured
    if (geoLocation) {
      fd.set('lat', geoLocation.lat.toString());
      fd.set('lng', geoLocation.lng.toString());
    }
    
    try {
      const res = await fetch(`/api/complaints`, { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setTicket(data.ticketId);
        form.reset();
        setPhotoPreview([]);
        setGeoLocation(null);
      }
      else alert(data.error || 'Failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <a href="/complaint" className="inline-flex items-center text-sm text-brand-700 hover:underline">
          ← Back to Complaints
        </a>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">📝 File a New Complaint</h1>
        <p className="mt-1 text-slate-600">Submit your complaint with photo evidence and location</p>
      </div>

      {ticket ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✓</span>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Complaint Submitted Successfully!</h3>
              <p className="mt-1 text-green-800">
                Your ticket ID is: <a className="font-mono font-bold underline" href={`/complaint/${ticket}`}>{ticket}</a>
              </p>
              <p className="mt-2 text-sm text-green-700">
                You'll receive SMS updates at each stage. Track your complaint anytime using the ticket ID.
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setTicket(null)}
                  className="text-sm text-green-700 hover:underline"
                >
                  File another complaint
                </button>
                <a href="/complaint" className="text-sm text-green-700 hover:underline">
                  View all complaints
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Complaint Title *</label>
            <input 
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500" 
              name="title" 
              required 
              placeholder="e.g., Garbage not collected for 3 days"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea 
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500" 
              name="description" 
              rows={4}
              placeholder="Provide more details about the issue..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Related Office (optional)</label>
            <input 
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500" 
              name="office_id" 
              placeholder="Enter office ID if known"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Location</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <input 
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus:border-brand-500 focus:ring-brand-500" 
                name="lat" 
                type="text" 
                value={geoLocation?.lat || ''}
                onChange={(e) => setGeoLocation(prev => ({ ...prev!, lat: parseFloat(e.target.value) || 0 }))}
                placeholder="Latitude"
              />
              <input 
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus:border-brand-500 focus:ring-brand-500" 
                name="lng" 
                type="text"
                value={geoLocation?.lng || ''}
                onChange={(e) => setGeoLocation(prev => ({ ...prev!, lng: parseFloat(e.target.value) || 0 }))}
                placeholder="Longitude"
              />
            </div>
            <button
              type="button"
              onClick={handleGetLocation}
              className="mt-2 inline-flex items-center text-sm text-brand-700 hover:underline"
            >
              📍 Use my current location
            </button>
            {geoLocation && (
              <p className="mt-1 text-xs text-green-600">✓ Location captured: {geoLocation.lat.toFixed(4)}, {geoLocation.lng.toFixed(4)}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Photo Evidence (PNG/JPG, max 5MB each)</label>
            <input 
              className="mt-1 w-full rounded-md border border-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-brand-700" 
              name="files" 
              type="file" 
              accept="image/png,image/jpeg" 
              multiple
              onChange={handleFileChange}
            />
            {photoPreview.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {photoPreview.map((src, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-lg border border-slate-200">
                    <img src={src} alt={`Preview ${idx + 1}`} className="h-24 w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              📱 You'll receive SMS updates (mocked for demo)
            </p>
            <button 
              type="submit" 
              disabled={submitting} 
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? 'Submitting...' : '📤 Submit Complaint'}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ How it works:</strong> Your complaint gets a unique ticket ID. You can track status anytime. SMS notifications keep you updated (demo uses mock alerts).
        </p>
      </div>
    </section>
  );
}
