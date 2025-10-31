export const metadata = {
  title: "GHaaS Prototype",
  description: "Government Hub - as - a - Service prototype",
};

import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif', margin: 0 }}>
  <Header />
        <main style={{ padding: 16 }}>
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
