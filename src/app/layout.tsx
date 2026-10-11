import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Club des Chantres | Gospel Stream & Academy',
  description: 'Plateforme de streaming, Web TV en direct et Académie de musique chrétienne en Afrique francophone.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
