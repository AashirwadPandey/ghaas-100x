"use client";
import { useState, useEffect } from "react";
import ProfileForm from "../../../components/ProfileForm";
import { MOCK_SERVICES, type Service } from "../../../lib/mockData";

const PROCEDURES: Record<string, { steps: string[]; quiz?: { q: string; a: string }[] }> = {
  's1': {
    steps: [
      '1. Visit the municipal office with required documents',
      '2. Fill out citizenship application form (Form A)',
      '3. Submit documents at front desk',
      '4. Pay application fee at cashier',
      '5. Get receipt and tracking number',
      '6. Biometric data collection (photo, fingerprints)',
      '7. Wait for 3 working days for processing',
      '8. Collect citizenship certificate with receipt'
    ],
    quiz: [
      { q: 'Are you 16 years or older?', a: 'yes' },
      { q: 'Do you have a birth certificate?', a: 'yes' },
      { q: 'Are both parents Nepali citizens?', a: 'yes' }
    ]
  },
  's2': {
    steps: [
      '1. Visit municipal office within 35 days of birth',
      '2. Bring hospital discharge certificate',
      '3. Fill birth registration form',
      '4. Submit parents\' citizenship copies',
      '5. Pay registration fee (NPR 50)',
      '6. Receive birth certificate same day'
    ],
    quiz: [
      { q: 'Is the birth within 35 days?', a: 'yes' },
      { q: 'Do you have hospital certificate?', a: 'yes' }
    ]
  },
  default: {
    steps: [
      '1. Visit the office during working hours',
      '2. Collect and fill required forms',
      '3. Submit documents and pay fees',
      '4. Wait for processing',
      '5. Collect your document/certificate'
    ]
  }
};

export default function ServicePage({ params }: { params: { id: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [eligible, setEligible] = useState<boolean | null>(null);

  useEffect(() => {
    // Use mock data instead of API call
    const foundService = MOCK_SERVICES.find(s => s.id === params.id);
    setService(foundService || null);
    setLoading(false);
  }, [params.id]);

  const procedure = PROCEDURES[params.id] || PROCEDURES.default;

  const handleQuizSubmit = () => {
    const quiz = procedure.quiz || [];
    const allCorrect = quiz.every((q, idx) => quizAnswers[idx] === q.a);
    setEligible(allCorrect);
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = 0; // Mock data doesn't have document list
  const progress = 0;

  async function handlePdfDownload(e: React.FormEvent) {
    e.preventDefault();
    const profile = localStorage.getItem('ghaas_profile') || '{}';
    const form = new FormData();
    form.append('serviceId', params.id);
    form.append('profile', profile);
    
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', body: form });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${service?.name || 'form'}.pdf`;
        a.click();
      }
    } catch (err) {
      alert('Failed to generate PDF');
    }
  }

  if (loading) return <div className="py-8 text-center text-slate-600">Loading service details...</div>;
  if (!service) return <div className="py-8 text-center text-slate-600">Service not found.</div>;

  return (
    <main className="space-y-6">
      <a className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900" href="/services">
        ← Back to Services
      </a>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{service.name}</h1>
        {service.description && (
          <p className="mt-2 text-slate-600">{service.description}</p>
        )}
        
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-3">
            <p className="text-xs font-medium text-green-700">Application Fee</p>
            <p className="mt-1 text-xl font-bold text-green-900">{service.fee}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xs font-medium text-blue-700">Processing Time</p>
            <p className="mt-1 text-xl font-bold text-blue-900">{service.estimatedTime}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3">
            <p className="text-xs font-medium text-amber-700">Office Visit</p>
            <p className="mt-1 text-xl font-bold text-amber-900">Required</p>
          </div>
        </div>
      </div>

      {procedure.quiz && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">✓ Do I Qualify?</h2>
            <button
              onClick={() => setShowQuiz(!showQuiz)}
              className="text-sm text-brand-700 hover:underline"
            >
              {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
            </button>
          </div>
          {showQuiz && (
            <div className="mt-4 space-y-3">
              {procedure.quiz.map((q, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-3">
                  <p className="font-medium text-slate-700">{q.q}</p>
                  <div className="mt-2 flex gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`quiz-${idx}`}
                        value="yes"
                        onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: 'yes' })}
                        className="form-radio text-brand-600"
                      />
                      <span className="text-sm text-slate-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`quiz-${idx}`}
                        value="no"
                        onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: 'no' })}
                        className="form-radio text-brand-600"
                      />
                      <span className="text-sm text-slate-700">No</span>
                    </label>
                  </div>
                </div>
              ))}
              <button
                onClick={handleQuizSubmit}
                className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Check Eligibility
              </button>
              {eligible !== null && (
                <div className={`mt-3 rounded-lg p-3 ${eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`font-medium ${eligible ? 'text-green-900' : 'text-red-900'}`}>
                    {eligible ? '✓ You appear to be eligible! Proceed below.' : '✗ You may not qualify. Please contact the office for clarification.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">📋 Step-by-Step Procedure</h2>
        <ol className="mt-4 space-y-2">
          {procedure.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-slate-700">{step.replace(/^\d+\.\s*/, '')}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">📄 Documents Checklist</h2>
          <span className="text-sm font-medium text-slate-600">
            {checkedCount} / {totalDocs} ready
          </span>
        </div>
        {totalDocs > 0 && (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-brand-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <p className="mt-2 text-slate-600">Contact office for required documents list (approximately {service.requiredDocs} documents needed).</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">👤 Your Profile (Auto-Fill Helper)</h2>
        <p className="mt-1 text-sm text-slate-600">
          Fill your profile once and auto-fill forms for all services
        </p>
        <ProfileForm />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-slate-900">📥 Download Pre-filled Form</h2>
        <p className="mt-1 text-sm text-slate-600">
          Generate a PDF with your profile data pre-filled. Print and bring to office.
        </p>
        <form onSubmit={handlePdfDownload} className="mt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            📄 Generate PDF
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          <strong>💡 Tip:</strong> Complete the checklist above before visiting the office to avoid multiple trips.
        </p>
      </div>
    </main>
  );
}
