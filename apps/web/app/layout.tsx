export const metadata = {
  title: "GHaaS Prototype",
  description: "Government Hub - as - a - Service prototype",
};

import "./globals.css";
import Header from "../components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white text-slate-900 antialiased`}> 
        <Header />
        <main className="container py-6">
          {children}
        </main>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() { navigator.serviceWorker.register('/sw.js').catch(()=>{}); });
          }
        ` }} />
      </body>
    </html>
  );
}
