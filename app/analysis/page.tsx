"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AnalysisPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleBackClick = () => {
    router.push('/');
  };

  const handleNameSubmit = async () => {
    if (name.trim() === '') return; // Don't submit empty names

    try {
      const params = new URLSearchParams();
      params.append('name', name);

      const response = await axios.post('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('API Response:', response.data);
      router.push('/location');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error Response:', error.response?.data);
      } else {
        console.error('API Error:', error);
      }
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
              onChange={(e) => setName(e.target.value)}
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
      </footer>
    </div>
  );
};

export default AnalysisPage;