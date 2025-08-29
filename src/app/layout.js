"use client";
import './globals.css';
import { useState, useEffect } from 'react';
import SmoothScroolContainer from '../components/smooth-scrool';
export default function RootLayout({ children }) {
  const [showSplash, setShowSplash] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // Ensure React mounted (hydration fix)

    const splashShown = sessionStorage.getItem('splash-shown');
    if (!splashShown) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splash-shown', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {!hydrated ? null : showSplash ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'white'
          }}>
            <img src="/logo/Invent-Tree logo-05.webp" alt="Company Logo" />
          </div>
        ) : (
          <SmoothScroolContainer>
            {children}
          </SmoothScroolContainer>
        )}
       
      </body>
    </html>
  );
}
