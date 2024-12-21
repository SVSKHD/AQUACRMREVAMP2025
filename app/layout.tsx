// app/layout.tsx (no "use client" here)
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeContextProvider } from '@/components/theme/theme-context';
import { StoreProvider } from '@/components/providers/store-provider';
import { Toaster } from '@/components/ui/toaster';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';


const inter = Inter({ subsets: ['latin'] });

// ✅ This is allowed because the layout is a server component (no "use client")
export const metadata: Metadata = {
  title: 'Aquakart Dashboard',
  description: 'Modern Dashboard for Aquakart with Next.js and Radix UI',
  icons: {
    icon: 'https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-192x192_kwyo3d.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeContextProvider>
              <div className="relative min-h-screen bg-background">
                <HeaderWrapper/>
                <main className="flex-1">{children}</main>
                <Toaster />
              </div>
            </ThemeContextProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
