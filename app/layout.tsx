import { Authprovider } from '@/contexts/Authcontext';
import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LWT',
  description: 'Learn with texts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='dark' lang='en'>
      <body className={inter.className}>
        <Authprovider>
          <Sidebar>{children}</Sidebar>
        </Authprovider>
      </body>
    </html>
  );
}
