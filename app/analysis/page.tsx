"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AnalysisPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBackClick = () => {
    router.push('/');
  };

  const handleNameSubmit = async () => {
    if (name.trim().length > 0) {
      router.push(`/location?name=${encodeURIComponent(name)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleNameSubmit();
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
              placeholder="Introduce Yourself"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </main>
      <footer className="footer analysis-footer">
        <button className="back-btn" onClick={handleBackClick}>
          <Image src="/back-button.svg" alt="Back" width={97} height={44} />
        </button>
      </footer>
    </div>
  );
};

export default AnalysisPage;