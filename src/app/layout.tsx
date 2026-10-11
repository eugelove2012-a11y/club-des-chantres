import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Club des Chantres | Gospel Stream & Academy',
  description: 'Plateforme de streaming, Web TV en direct et Académie de musique chrétienne en Afrique francophone.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="light scroll-smooth">
      <body className="bg-white text-slate-900 min-h-screen antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
