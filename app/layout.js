import './globals.css';
import { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Price Tracker',
  description: 'Track prices of your favorite products',
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={'max-w-10xl'}>
          <AntdRegistry>
            <Navbar/>
            {children}
          </AntdRegistry>
        </main>
      </body>
    </html>
  );
}
