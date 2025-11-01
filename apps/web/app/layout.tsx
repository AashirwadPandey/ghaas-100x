import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

export const metadata = {
  title: "GHaaS Prototype",
  description: "Government Hub - as - a - Service prototype",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col bg-slate-50 text-slate-900 antialiased`}> 
        <Header />
        <main className="container mx-auto flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() { navigator.serviceWorker.register('/sw.js').catch(()=>{}); });
          }
        ` }} />
      </body>
    </html>
  );
}
