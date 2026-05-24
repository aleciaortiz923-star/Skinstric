"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  // MOCK DATA - This is temporary to show the UI
  const mockAnalysisResult = {
    demographics: {
      multicultural_appearance: {
        concepts: [
          { name: 'East Asian', value: 0.96 },
          { name: 'White', value: 0.03 },
          { name: 'South Asian', value: 0.02 },
          { name: 'Black', value: 0.00 },
          { name: 'Latino Hispanic', value: 0.00 },
          { name: 'South East Asian', value: 0.00 },
          { name: 'Middle Eastern', value: 0.00 }
        ]
      },
      age_appearance: {
        concepts: [
          { name: '0-9', value: 0.00 },
          { name: '10-19', value: 0.04 },
          { name: '20-29', value: 0.96 },
          { name: '30-39', value: 0.02 },
          { name: '40-49', value: 0.00 },
          { name: '50-59', value: 0.00 },
          { name: '60-69', value: 0.00 },
          { name: '70+', value: 0.00 }
        ]
      },
      gender_appearance: {
        concepts: [
          { name: 'female', value: 0.98 },
          { name: 'male', value: 0.02 }
        ]
      }
    }
  };

  const analysisResult: AnalysisResult | null = mockAnalysisResult;

  const [activeView, setActiveView] = useState('race');
  const [selectedConcept, setSelectedConcept] = useState(() => {
    return analysisResult.demographics.multicultural_appearance.concepts.reduce(
      (prev, current) => (prev.value > current.value ? prev : current)
    );
  });

  const handleBackClick = () => {
    router.push(`/ai-analysis?results=${JSON.stringify(analysisResult)}`);
  };

  const handleSidebarClick = (view: string) => {
    setActiveView(view);
    let topConcept;
    if (view === 'race') {
      topConcept = analysisResult.demographics.multicultural_appearance.concepts.reduce(
        (prev, current) => (prev.value > current.value ? prev : current)
      );
    } else if (view === 'age') {
      topConcept = analysisResult.demographics.age_appearance.concepts.reduce(
        (prev, current) => (prev.value > current.value ? prev : current)
      );
    } else if (view === 'sex') {
      topConcept = analysisResult.demographics.gender_appearance.concepts.reduce(
        (prev, current) => (prev.value > current.value ? prev : current)
      );
    }
    if (topConcept) {
      setSelectedConcept(topConcept);
    }
  };

  const handleConceptClick = (concept: { name: string; value: number }) => {
    setSelectedConcept(concept);
  };

  if (!analysisResult || !analysisResult.demographics) {
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
          <button className="reset-btn">RESET</button>
          <button className="confirm-btn">CONFIRM</button>
        </div>
      </footer>
    </div>
  );
};

export default DemographicsPage;
