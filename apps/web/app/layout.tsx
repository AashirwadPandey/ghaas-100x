export const metadata = {
  title: "GHaaS Prototype",
  description: "Government Hub - as - a - Service prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif', margin: 0, padding: 16 }}>
        {children}
      </body>
    </html>
  );
}
