import { Suspense } from 'react';
import LocationContent from './location-content';

const LocationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocationContent />
    </Suspense>
  );
};

export default LocationPage;
