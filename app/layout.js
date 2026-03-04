import './globals.css';
import { MovieProvider } from '../context/MovieContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Sinimá — Discover Cinema',
  description: 'A curated movie discovery experience. Find, like, and save films you love.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      </head>
      <body>
        <MovieProvider>
          <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1">{children}</main>
            <Footer/>
          </div>
        </MovieProvider>
      </body>
    </html>
  );
}
