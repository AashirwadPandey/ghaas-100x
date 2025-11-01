import LangText from "./LangText";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="font-semibold text-slate-900">
              <LangText en="About GHaaS" ne="GHaaS बारे" />
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              <LangText 
                en="Government Hub as a Service - Your one-stop platform for accessing government services, offices, and tenders."
                ne="सरकारी हब सेवा - सरकारी सेवा, कार्यालय र बोलपत्र पहुँचका लागि तपाईंको एक-स्टप प्लेटफर्म।"
              />
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900">
              <LangText en="Quick Links" ne="द्रुत लिङ्कहरू" />
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/offices" className="text-slate-600 hover:text-brand-700">
                  <LangText en="Browse Offices" ne="कार्यालयहरू ब्राउज गर्नुहोस्" />
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-600 hover:text-brand-700">
                  <LangText en="Government Services" ne="सरकारी सेवाहरू" />
                </a>
              </li>
              <li>
                <a href="/tenders" className="text-slate-600 hover:text-brand-700">
                  <LangText en="View Tenders" ne="बोलपत्रहरू हेर्नुहोस्" />
                </a>
              </li>
              <li>
                <a href="/complaint" className="text-slate-600 hover:text-brand-700">
                  <LangText en="Submit Complaint" ne="गुनासो पेश गर्नुहोस्" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-900">
              <LangText en="Support" ne="सहायता" />
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-600 hover:text-brand-700">
                  <LangText en="Help Center" ne="मद्दत केन्द्र" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-brand-700">
                  <LangText en="Contact Us" ne="सम्पर्क गर्नुहोस्" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-brand-700">
                  <LangText en="FAQs" ne="बारम्बार सोधिने प्रश्नहरू" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-brand-700">
                  <LangText en="Privacy Policy" ne="गोपनीयता नीति" />
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-slate-900">
              <LangText en="Features" ne="विशेषताहरू" />
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><LangText en="PWA Ready" ne="PWA तयार" /></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><LangText en="Mobile Friendly" ne="मोबाइल मैत्री" /></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><LangText en="Bilingual" ne="द्विभाषी" /></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><LangText en="Fast & Secure" ne="छिटो र सुरक्षित" /></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-600">
            © 2025 GHaaS - Government Hub as a Service. <LangText en="All rights reserved." ne="सबै अधिकार सुरक्षित।" />
          </p>
          <p className="mt-2 text-xs text-slate-500">
            <LangText 
              en="Built with Next.js 14, Express, and modern web technologies."
              ne="Next.js 14, Express, र आधुनिक वेब प्रविधिसँग निर्मित।"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
