"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import './styles.css';

interface AnalysisResult {
  demographics: {
    age_appearance: { concepts: { name: string; value: number }[], raw: Record<string, number> };
    gender_appearance: { concepts: { name: string; value: number }[], raw: Record<string, number> };
    multicultural_appearance: { concepts: { name: string; value: number }[], raw: Record<string, number> };
  };
}

const DemographicsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const results = searchParams.get('results');

  const analysisResult = useMemo<AnalysisResult | null>(() => {
    if (!results) return null;
    try {
      return JSON.parse(decodeURIComponent(results));
    } catch (error) {
      console.error('Failed to parse analysis results:', error);
      return null;
    }
  }, [results]);

  useEffect(() => {
    console.log("Parsed Demographics results:", analysisResult) ;
  }, [analysisResult]);

  const [activeView, setActiveView] = useState('race');
  const [overriddenConcept, setOverriddenConcept] = useState<{ name: string; value: number } | null>(null);

  const getTopPrediction = (obj: Record<string, number> | undefined): { name: string; value: number } | null => {
    if (!obj) return null;
    const top = Object.entries(obj).sort((a, b) => b[1] - a[1])[0];
    if (!top) return null;
    return { name: top[0], value: top[1] };
  };

  const topAge = useMemo(() => getTopPrediction(analysisResult?.demographics?.age_appearance?.raw), [analysisResult]);
  const topGender = useMemo(() => getTopPrediction(analysisResult?.demographics?.gender_appearance?.raw), [analysisResult]);
  const topRace = useMemo(() => getTopPrediction(analysisResult?.demographics?.multicultural_appearance?.raw), [analysisResult]);

  useEffect(() => {
    console.log("Top age:", topAge);
    console.log("Top gender:", topGender);
    console.log("Top race:", topRace);
  }, [topAge, topGender, topRace]);

  const defaultConcept = useMemo(() => {
    if (activeView === 'race') return topRace || topAge || topGender;
    if (activeView === 'age') return topAge || topRace || topGender;
    if (activeView === 'sex') return topGender || topRace || topAge;
    return topRace || topAge || topGender;
  }, [activeView, topRace, topAge, topGender]);

  const selectedConcept = overriddenConcept || defaultConcept;

  const handleSidebarClick = (view: string) => {
    setActiveView(view);
    setOverriddenConcept(null);
  };

  const handleBackClick = () => {
    router.push('/');
  };

  const handleConceptClick = (concept: { name: string; value: number }) => {
    setOverriddenConcept(concept);
  };

  const handleRedirectToHome = () => {
    router.push('/');
  };

  if (!analysisResult) {
    return <div>Loading...</div>;
  }

  if (!selectedConcept) {
    return <div>No demographic data available for this image.</div>;
  }

  const raceData = analysisResult.demographics?.multicultural_appearance?.concepts ?? [];
  const ageData = analysisResult.demographics?.age_appearance?.concepts ?? [];
  const genderData = analysisResult.demographics?.gender_appearance?.concepts ?? [];

  const renderContent = () => {
    let data, listTitle;
    switch (activeView) {
      case 'age':
        data = ageData;
        listTitle = 'AGE BRACKET';
        break;
      case 'sex':
        data = genderData;
        listTitle = 'SEX';
        break;
      default:
        data = raceData;
        listTitle = 'RACE';
    }

    return (
      <>
        <div className="demographics-sidebar">
          <div className={`sidebar-item ${activeView === 'race' ? 'active' : ''}`} onClick={() => handleSidebarClick('race')}>
            <span>{topRace?.name}</span>
            <p>RACE</p>
          </div>
          <div className={`sidebar-item ${activeView === 'age' ? 'active' : ''}`} onClick={() => handleSidebarClick('age')}>
            <span>{topAge?.name}</span>
            <p>AGE</p>
          </div>
          <div className={`sidebar-item ${activeView === 'sex' ? 'active' : ''}`} onClick={() => handleSidebarClick('sex')}>
            <span>{topGender?.name}</span>
            <p>SEX</p>
          </div>
        </div>
        <div className="demographics-main">
          <h3>{selectedConcept.name}</h3>
          <div className="confidence-chart">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="chart-background" />
              <circle cx="50" cy="50" r="45" className="chart-progress" style={{ strokeDasharray: `${2 * Math.PI * 45 * selectedConcept.value}, ${2 * Math.PI * 45}` }} />
              <text x="50" y="50" className="chart-text">{`${Math.round(selectedConcept.value * 100)}%`}</text>
            </svg>
          </div>
        </div>
        <div className="demographics-aside">
          <div className="race-list">
            <h4>{listTitle}</h4>
            <h4>A.I. CONFIDENCE</h4>
          </div>
          <ul>
            {data.map(concept => (
                <li key={concept.name} className={concept.name === selectedConcept.name ? 'active' : ''} onClick={() => handleConceptClick(concept)}>
                  <span className="race-name">◆ {concept.name}</span>
                  <span>{`${Math.round(concept.value * 100)}%`}</span>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="page-container demographics-page">
      <header className="header demographics-header">
        <div className="header-left">
          <span className="brand-logo">SKINSTRIC</span>
          <span>[ ANALYSIS ]</span>
        </div>
      </header>
      <main className="main-content">
        <div className="demographics-text-container">
          <p className="analysis-subtitle">A. I. ANALYSIS</p>
          <h2 className="analysis-title">DEMOGRAPHICS</h2>
          <p className="analysis-subtitle">PREDICTED RACE & AGE</p>
        </div>
        {renderContent()}
      </main>
      <footer className="footer demographics-footer">
        <button className="back-btn" onClick={handleBackClick}>
          <div className="back-arrow"></div>
          <span>BACK</span>
        </button>
        <div className="footer-buttons">
          <button className="reset-btn" onClick={handleRedirectToHome}>RESET</button>
          <button className="confirm-btn" onClick={handleRedirectToHome}>CONFIRM</button>
        </div>
      </footer>
    </div>
  );
};

export default DemographicsContent;
