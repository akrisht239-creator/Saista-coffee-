import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SAISTA COFFEE — From Nature, To Your Cup.',
  description: 'A cinematic coffee journey from origin to ritual.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
