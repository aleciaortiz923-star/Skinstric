"use client";
import { useRouter } from 'next/navigation';
import { FaMountainSun } from 'react-icons/fa6';

const ResultsPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
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
        <div className="dual-diamond-wrapper">
          <div className="diamond-container">
            <div className="inner-diamond"></div>
            <div className="camera-scan-wrapper">
              <div className="camera-icon"></div>
            </div>
          </div>
          <div className="diamond-container">
            <div className="inner-diamond"></div>
            <div className="gallery-icon-wrapper">
              <div className="icon-in-circle">
                <FaMountainSun className="gallery-icon" />
              </div>
              <div className="gallery-text">
                ALLOW A.I. <br />
                ACSESS TO GALLERY
              </div>
            </div>
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

export default ResultsPage;