
"use client"
import React from 'react';

const LoadingScreen = ({ message, showCameraIcon = true }: { message: string, showCameraIcon?: boolean }) => {
  return (
    <div className="loading-screen">
      <div className="loading-main">
        <div className="diamond-container loading-diamond">
          <div className="inner-diamond"></div>
          {showCameraIcon && (
            <div className="camera-icon">
              <div className="camera-icon-inner"></div>
            </div>
          )}
          <p className="loading-text">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
