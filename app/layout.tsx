import type React from 'react';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Outfit } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

// Configuração da fonte Outfit
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Cliqui',
  description:
    'Crie landing pages profissionais, rápidas e baratas com NextJS. Garantimos seu domínio e oferecemos alta tecnologia para sua presença online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Ícone padrão */}
        <link rel="icon" href="/favicon.ico" />
        {/* Ícones para diferentes tamanhos de tela */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        {/* Ícones para dispositivos Android */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
