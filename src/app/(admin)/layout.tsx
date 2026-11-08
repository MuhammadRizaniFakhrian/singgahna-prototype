import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/app/globals.css';
import TopMenu from '@/components/molecules/admin/top-menu';
import SideMenu from '@/components/molecules/admin/side-menu';
import { Toaster } from '@/components/atomics/toaster';
import ReduxProvider from '@/providers/redux';

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin']});

export const metadata: Metadata = {
  title: 'singgahna',
  description: 'Temukan Kos Nyaman yang Bikin Betah',
  icons: {
    icon: '/singgahna2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
return (
  <html lang="en">
    <body className={poppins.className}>
      <ReduxProvider>
        <div className="min-h-screen bg-gray-light">
          <div className="container mx-auto flex items-start gap-[30px] p-[30px]">

            <SideMenu />

            <div className="relative min-w-0 flex-1">

              {/* Profile Top Menu */}
              <div className="absolute right-0 top-0 z-30">
                <TopMenu />
              </div>

              {/* Dashboard Content */}
              <div className="pb-[30px]">
                {children}
              </div>

            </div>
          </div>
        </div>

        <Toaster />
      </ReduxProvider>
    </body>
  </html>
)}