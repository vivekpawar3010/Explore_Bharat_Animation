import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Explore Bharat Safar — India Travel, Treks & Adventures',
  description: 'Explore Bharat Safar is the premier travel & trekking platform for Explorers, Visitors & Trekkers across India. Interactive India map, Himalayan treks, heritage safaris, and custom itineraries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cinzel:wght@600;700;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#060b18] text-slate-100 antialiased selection:bg-orange-500 selection:text-slate-950">
        {children}
        <Footer />
      </body>
    </html>
  );
}
