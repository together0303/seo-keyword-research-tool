import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import 'react-tippy/dist/tippy.css';

export const metadata = {
  title: 'Rankulate - Harnessing KD Research and Competitive Analysis Tools',
  description:
    'ankulate offers cutting-edge SEO tools designed to leverage in-depth KD research and competitive analysis, empowering businesses to enhance their online visibility and drive organic traffic. Stay ahead of the competition with Rankulate\'s comprehensive suite of SEO solutions'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        {/* <Analytics /> */}
        {/* <Toast /> */}
      </body>
    </html>
  );
}
