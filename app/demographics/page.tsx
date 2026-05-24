"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import './styles.css';

interface AnalysisResult {
  demographics: {
    age_appearance: { concepts: { name: string; value: number }[] };
    gender_appearance: { concepts: { name: string; value: number }[] };
    multicultural_appearance: { concepts: { name: string; value: number }[] };
  };
}

const DemographicsPage = () => {
  const router = useRouter();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('race');
  const [selectedConcept, setSelectedConcept] = useState<{ name: string; value: number } | null>(null);

  const getTopConcept = (concepts: { name: string; value: number }[] | undefined) => {
    if (!concepts || concepts.length === 0) {
      return null;
    }
    return concepts.reduce((p, c) => (p.value > c.value ? p : c));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnalysisResult(data);
        const topRace = getTopConcept(data?.demographics?.multicultural_appearance?.concepts);
        if (topRace) {
          setSelectedConcept(topRace);
        }
      } catch (err) {
        console.error('Failed to fetch analysis results:', err);
        setError('Failed to fetch analysis results');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSidebarClick = (view: string) => {
    setActiveView(view);
    let topConcept = null;
    if (view === 'race') {
      topConcept = getTopConcept(analysisResult?.demographics?.multicultural_appearance?.concepts);
    } else if (view === 'age') {
      topConcept = getTopConcept(analysisResult?.demographics?.age_appearance?.concepts);
    } else if (view === 'sex') {
      topConcept = getTopConcept(analysisResult?.demographics?.gender_appearance?.concepts);
    }
    setSelectedConcept(topConcept);
  };

  const handleBackClick = () => {
    router.push('/ai-analysis');
  };

  const handleConceptClick = (concept: { name: string; value: number }) => {
    setSelectedConcept(concept);
  };

  const handleRedirectToHome = () => {
    router.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!analysisResult || !analysisResult.demographics || !selectedConcept) {
    return <div>Loading...</div>;
  }

  const raceData = analysisResult.demographics.multicultural_appearance.concepts;
  const ageData = analysisResult.demographics.age_appearance.concepts;
  const genderData = analysisResult.demographics.gender_appearance.concepts;

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
            <span>{raceData.reduce((p, c) => p.value > c.value ? p : c).name}</span>
            <p>RACE</p>
          </div>
          <div className={`sidebar-item ${activeView === 'age' ? 'active' : ''}`} onClick={() => handleSidebarClick('age')}>
            <span>{ageData.reduce((p, c) => p.value > c.value ? p : c).name}</span>
            <p>AGE</p>
          </div>
          <div className={`sidebar-item ${activeView === 'sex' ? 'active' : ''}`} onClick={() => handleSidebarClick('sex')}>
            <span>{genderData[0].name}</span>
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

export default DemographicsPage;
