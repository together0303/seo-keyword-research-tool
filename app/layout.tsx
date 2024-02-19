import './globals.css';
import 'reactjs-popup/dist/index.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import Footer from './components/Footer';

export const metadata = {
  title: 'Rankulate - Harnessing KD Research and Competitive Analysis Tools',
  description: 'Rankulate offers cutting-edge SEO tools designed to leverage in-depth KD research and competitive analysis, empowering businesses to enhance their online visibility and drive organic traffic. Stay ahead of the competition with Rankulate\'s comprehensive suite of SEO solutions',
};
// openGraph: {
//   images: '/metadata-preview.png',
// },

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-surface">
      <body className="">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Footer />
        {/* <Analytics /> */}
        {/* <Toast /> */}
      </body>
    </html>
  );
}
