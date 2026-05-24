
"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import './styles.css';

interface AnalysisResult {
  demographics: {
    age_appearance: { concepts: { name: string; value: number }[] };
    gender_appearance: { concepts: { name: string; value: number }[] };
    multicultural_appearance: { concepts: { name: string; value: number }[] };
  };
}

const AIAnalysisPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const results = searchParams.get('results');
  const analysisResult = useMemo<AnalysisResult | null>(() => {
    if (results) {
      try {
        return JSON.parse(decodeURIComponent(results));
      } catch (e) {
        console.error("Failed to parse analysis results:", e);
        return null;
      }
    }
    return null;
  }, [results]);

  const handleDemographicsClick = () => {
    router.push(`/demographics?results=${encodeURIComponent(JSON.stringify(analysisResult))}`);
  };

  const handleBackClick = () => {
    router.push('/');
  };

  if (!analysisResult) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container analysis-page">
      <header className="header analysis-header">
        <div className="header-left">
          <span className="brand-logo">SKINSTRIC</span>
          <span>[ ANALYSIS ]</span>
        </div>
      </header>
      <div className="analysis-text-container">
        <h2 className="analysis-title">A. I. ANALYSIS</h2>
        <p className="analysis-subtitle">A. I. HAS ESTIMATED THE FOLLOWING.</p>
        <p className="analysis-subtitle">FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </div>
      <main className="main-content">
        <div className="diamond-container">
          <div className="inner-diamond"></div>
          <div className="diamond-grid" onClick={handleDemographicsClick}>
            <div className="diamond-cell top"><span>DEMOGRAPHICS</span></div>
            <div className="diamond-cell left"><span>SKIN TYPE DETAILS</span></div>
            <div className="diamond-cell right"><span>COSMETIC CONCERNS</span></div>
            <div className="diamond-cell bottom"><span>WEATHER</span></div>
          </div>
        </div>
      </main>
      <footer className="footer analysis-footer">
        <button className="back-btn" onClick={handleBackClick}>
          <div className="back-arrow"></div>
          <span>BACK</span>
        </button>
        <button className="proceed-btn" onClick={handleDemographicsClick}>
          <Image src="/get-summary.svg" alt="Get Summary" width={155} height={44} />
        </button>
      </footer>
    </div>
  );
};

export default AIAnalysisPage;
