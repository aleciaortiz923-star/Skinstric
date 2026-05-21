"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const LocationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState(false);

  const validateLocation = (loc: string) => {
    return loc.trim().length >= 2;
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    setIsLocationValid(validateLocation(newLocation));
  };

  const handleBackClick = () => {
    router.push('/');
  };

  const handleLocationSubmit = async () => {
    if (!isLocationValid) return;

    const nameFromUrl = searchParams.get('name');
    if (!nameFromUrl) return;

    try {
      const response = await fetch('/api/skinstric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameFromUrl, location }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      router.push('/image');
    } catch (error) {
      console.error('API Call Failed:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLocationSubmit();
    }
  };

  return (
    <div className="page-container analysis-page">
      <header className="header analysis-header">
        <div className="header-left">
          <span className="brand-logo">SKINSTRIC</span>
          <span>[ INTRO ]</span>
        </div>
        <p className="analysis-side-text">TO START ANALYSIS</p>
      </header>
      <main className="main-content">
        <div className="center-content">
          <div className="diamond-container">
            <div className="inner-diamond"></div>
            <p className="click-to-type">CLICK TO TYPE</p>
            <input
              type="text"
              className="introduce-yourself"
              placeholder="Where are you from?"
              value={location}
              onChange={handleLocationChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </main>
      <footer className="footer analysis-footer">
        <button className="back-btn" onClick={handleBackClick}>
          <div className="back-arrow"></div>
          <span>BACK</span>
        </button>
        {location && (
          <button className="proceed-btn" onClick={handleLocationSubmit} disabled={!isLocationValid}>
            <Image src="/proceed.svg" alt="Proceed" width={123} height={44} />
          </button>
        )}
      </footer>
    </div>
  );
};

export default LocationPage;
