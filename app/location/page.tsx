"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const LocationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

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

    setIsSubmitting(true);
    const nameFromUrl = searchParams.get('name');
    if (!nameFromUrl) {
      setIsSubmitting(false);
      return;
    }

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

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionComplete(true);
      }, 5000);

    } catch (error) {
      console.error('API Call Failed:', error);
      setIsSubmitting(false);
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
            {!isSubmitting && !submissionComplete && (
              <>
                <p className="click-to-type">CLICK TO TYPE</p>
                <input
                  type="text"
                  className="introduce-yourself"
                  placeholder="Where are you from?"
                  value={location}
                  onChange={handleLocationChange}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}
            {isSubmitting && (
              <div className="submission-processing">
                <p>Submission Processing</p>
                <div className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            {submissionComplete && (
              <p className="submission-success">Thank you! Please proceed to the next step</p>
            )}
          </div>
        </div>
      </main>
      <footer className="footer analysis-footer">
        <button className="back-btn" onClick={handleBackClick}>
          <Image src="/back-button.svg" alt="Back" width={97} height={44} />
        </button>
        {submissionComplete && (
          <button className="proceed-btn" onClick={() => router.push('/image')}>
            <Image src="/proceed.svg" alt="Proceed" width={123} height={44} />
          </button>
        )}
      </footer>
    </div>
  );
};

export default LocationPage;
