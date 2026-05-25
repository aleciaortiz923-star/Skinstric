import { Suspense } from 'react';
import AIAnalysisContent from './analysis-content';

const AIAnalysisPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIAnalysisContent />
    </Suspense>
  );
};

export default AIAnalysisPage;
