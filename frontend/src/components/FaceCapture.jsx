import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const FaceCapture = ({ onCapture, title = "Capture Face", buttonText = "Capture" }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      setIsCapturing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      
      // Convert base64 to file
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'face.jpg', { type: 'image/jpeg' });
          onCapture(file);
        })
        .catch(error => {
          console.error('Error converting image:', error);
        })
        .finally(() => {
          setIsCapturing(false);
        });
    }
  }, [onCapture]);

  const retake = () => {
    setCapturedImage(null);
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>
      
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-64 object-cover"
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured face"
            className="w-full h-64 object-cover"
          />
        )}
        
        {!capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-75 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-700">Position your face in the center</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {!capturedImage ? (
          <button
            onClick={capture}
            disabled={isCapturing}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {isCapturing ? 'Capturing...' : buttonText}
          </button>
        ) : (
          <>
            <button
              onClick={retake}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Retake
            </button>
            <div className="text-green-600 font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Captured
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceCapture;
