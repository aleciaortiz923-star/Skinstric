
"use client"
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-main">
        <div className="diamond-container loading-diamond">
          <div className="inner-diamond"></div>
          <div className="camera-icon">
            <div className="camera-icon-inner"></div>
          </div>
          <p className="loading-text">SETTING UP CAMERA...</p>
        </div>
      </div>
      <div className="loading-footer">
        <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <ul>
          <li>NEUTRAL EXPRESSION</li>
          <li>FRONTAL POSE</li>
          <li>ADEQUATE LIGHTING</li>
        </ul>
      </div>
    </div>
  );
};

export default LoadingScreen;
