"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaMountainSun } from 'react-icons/fa6';
import { useRef, useState, useEffect } from 'react';
import LoadingScreen from './loading';


const ResultsPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showGalleryConfirmation, setShowGalleryConfirmation] = useState(false);
  const [showCameraConfirmation, setShowCameraConfirmation] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleGalleryClick = () => {
    setShowGalleryConfirmation(true);
  };

  const handleCameraClick = () => {
    setShowCameraConfirmation(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleGalleryConfirmation = (confirmed: boolean) => {
    setShowGalleryConfirmation(false);
    if (confirmed) {
      fileInputRef.current?.click();
    }
  };

  const handleCameraConfirmation = async (confirmed: boolean) => {
    setShowCameraConfirmation(false);
    if (confirmed) {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(mediaStream);
          setShowCamera(true);
          setCameraError(null);
        } catch (error) {
          console.error('Error accessing camera:', error);
          setCameraError('Could not access the camera. Please check your browser permissions and ensure a webcam is connected.');
        } finally {
          setIsLoading(false);
        }
      }, 10000); // 10-second delay
    }
  };

  useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  const handleTakePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        setShowCamera(false);
      }
    }
  };

  const handleUseImage = async () => {
    const imageToAnalyze = capturedImage || selectedImage;
    if (imageToAnalyze) {
      setIsAnalyzing(true);
      try {
        const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageToAnalyze }),
        });
        const analysisResult = await response.json();
        router.push(`/ai-analysis?results=${JSON.stringify(analysisResult)}`);
      } catch (error) {
        console.error('Error analyzing image:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }
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
          <div className="diamond-container" onClick={handleCameraClick}>
            <div className="inner-diamond"></div>
            <div className="camera-scan-wrapper">
              <div className="camera-icon"><div className="camera-icon-inner"></div></div>
              <div className="camera-text">
                ALLOW A.I. <br />
                TO SCAN YOUR FACE
              </div>
            </div>
          </div>
          <div className="diamond-container" onClick={handleGalleryClick}>
            <div className="inner-diamond"></div>
            <div className="gallery-icon-wrapper">
              <div className="icon-in-circle">
                <div className="icon-in-circle-hover-target">
                  <FaMountainSun className="gallery-icon" />
                </div>
              </div>
              <div className="gallery-text">
                ALLOW A.I. <br />
                ACSESS TO GALLERY
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        {cameraError && <p className="error-message">{cameraError}</p>}
      </main>
      {isLoading && <LoadingScreen message="SETTING UP CAMERA..." />}
      {showGalleryConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Allow A.I. to access your gallery?</p>
            <div className="confirmation-buttons">
              <button className="allow-button" onClick={() => handleGalleryConfirmation(true)}>Yes</button>
              <button className="deny-button" onClick={() => handleGalleryConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      {isAnalyzing && <LoadingScreen message="PREPARING YOUR ANALYSIS..." showCameraIcon={false} />}

      {selectedImage && (
        <div className="captured-image-view">
          <Image src={selectedImage} alt="Selected" width={600} height={400} />
          <div className="great-shot-caption">
            <p>Great Shot</p>
          </div>
          <div className="captured-image-buttons">
            <button onClick={() => setSelectedImage(null)}>Retake</button>
            <button onClick={handleUseImage}>Use This Image</button>
          </div>
        </div>
      )}
      {showCameraConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>ALLOW A.I. TO ACCESS YOUR CAMERA</p>
            <div className="confirmation-buttons">
              <button className="deny-button" onClick={() => handleCameraConfirmation(false)}>DENY</button>
              <button className="allow-button" onClick={() => handleCameraConfirmation(true)}>ALLOW</button>
            </div>
          </div>
        </div>
      )}
      {showCamera && (
        <div className="camera-view">
          <video ref={videoRef} autoPlay playsInline />
          <div className="camera-back-button-container">
            <button className="back-btn" onClick={handleBackClick}>
              <Image src="/back-button.svg" alt="Back" width={97} height={44} />
            </button>
          </div>
          <div className="camera-take-pic-container">
            <button className="take-pic-btn" onClick={handleTakePicture}>
              <Image src="/take-pic.svg" alt="Take Picture" width={169} height={62} />
            </button>
          </div>
          <div className="camera-footer-text">
            <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
            <ul>
              <li>NEUTRAL EXPRESSION</li>
              <li>FRONTAL POSE</li>
              <li>ADEQUATE LIGHTING</li>
            </ul>
          </div>
        </div>
      )}
      {capturedImage && (
        <div className="captured-image-view">
          <Image src={capturedImage} alt="Captured" width={600} height={400} />
          <div className="great-shot-caption">
            <p>Great Shot</p>
          </div>
          <div className="captured-image-buttons">
            <button onClick={() => { setCapturedImage(null); setShowCamera(true); }}>Retake</button>
            <button onClick={handleUseImage}>Use This Image</button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <footer className="footer analysis-footer">
        <button className="back-btn" onClick={handleBackClick}>
          <Image src="/back-button.svg" alt="Back" width={97} height={44} />
        </button>
      </footer>
    </div>
  );
};

export default ResultsPage;