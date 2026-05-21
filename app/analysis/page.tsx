"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AnalysisPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const validateName = (name: string) => {
    const nameParts = name.trim().split(' ');
    return nameParts.length >= 2 && nameParts.every(part => part.length > 0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(validateName(newName));
  };

  const handleBackClick = () => {
    router.push('/');
  };

  const handleNameSubmit = async () => {
    if (!isNameValid) return;
    router.push(`/location?name=${encodeURIComponent(name)}`);
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
          <div className="back-arrow"></div>
          <span>BACK</span>
        </button>
        {name && (
          <button className="proceed-btn" onClick={handleNameSubmit} disabled={!isNameValid}>
            <Image src="/proceed.svg" alt="Proceed" width={123} height={44} />
          </button>
        )}
      </footer>
    </div>
  );
};

export default AnalysisPage;