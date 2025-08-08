"use client";
import './globals.css';
import { useState, useEffect } from 'react';

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
    <html lang="en">
      <body>
        {!hydrated ? null : showSplash ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'white'
          }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s" alt="Company Logo" style={{ width: '200px' }} />
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
