import type { Metadata } from 'next';
import { Space_Grotesk, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/lib/progress/provider';
import { TopNav } from '@/components/chrome/TopNav';
import { TutorProvider } from '@/components/tutor/TutorContext';
import { TutorLauncher } from '@/components/tutor/TutorLauncher';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});
const body = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: { default: 'Invariant', template: '%s · Invariant' },
  description:
    'Personal DSA learning portal — interactive lectures, animations, exercises, AI tutor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <ProgressProvider>
          <TutorProvider>
            <TopNav />
            <main className="min-h-screen">{children}</main>
            <TutorLauncher />
          </TutorProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
