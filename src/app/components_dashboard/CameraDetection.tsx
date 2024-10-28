"use client"
import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const CameraDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

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

  // Detect objects and draw on the canvas
  useEffect(() => {
    const detectObjects = async () => {
      if (model && isVideoReady && videoRef.current && canvasRef.current) {
        const predictions = await model.detect(videoRef.current);

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
  }, [model, isVideoReady]);

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

export default CameraDetection;



