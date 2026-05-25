import { Suspense } from 'react';
import DemographicsContent from './demographics-content';

const DemographicsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DemographicsContent />
    </Suspense>
  );
};

export default DemographicsPage;
