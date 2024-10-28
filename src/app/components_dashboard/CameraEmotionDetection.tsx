"use client";
import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const EmotionDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [lastDetectedObject, setLastDetectedObject] = useState<string | null>(null); // Track the last detected object

  // Load COCO-SSD model and access camera
  useEffect(() => {
    async function loadModel() {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    }

    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Ensure video dimensions are available
          videoRef.current.onloadedmetadata = () => {
            setIsVideoReady(true);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    loadModel();
    getCamera();
  }, []);

  // Function to read detected object aloud
  const speakDetectedObject = (object: string) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Detected ${object}.`;
    speech.lang = 'en';
    window.speechSynthesis.speak(speech);
  };

  // Detect objects and draw on the canvas
  useEffect(() => {
    const detectObjects = async () => {
      if (model && isVideoReady && videoRef.current && canvasRef.current) {
        const predictions = await model.detect(videoRef.current);

        if (predictions.length > 0) {
          const currentDetectedObject = predictions[0].class; // Get the class of the first detected object
          const currentPredictionScore = predictions[0].score; // Get the score of the first detected object

          // Check if the detected object is different from the last detected object and has a high enough score
         
        }

        const ctx = canvasRef.current.getContext('2d');
        if (ctx && videoRef.current) {
          // Set canvas dimensions to match video
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;

          // Clear previous drawings
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          // Draw bounding boxes for each detected object
          predictions.forEach((prediction) => {
            ctx.beginPath();
            ctx.rect(...prediction.bbox);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.stroke();
            ctx.fillText(
              `${prediction.class} (${(prediction.score * 100).toFixed(2)}%)`,
              prediction.bbox[0],
              prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
            );
          });
        }
      }

      // Continue detection
      requestAnimationFrame(detectObjects);
    };

    if (model && isVideoReady) {
      detectObjects();
    }
  }, [isVideoReady]); // Include lastDetectedObject in the dependency array

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: 'auto' }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EmotionDetection;




























