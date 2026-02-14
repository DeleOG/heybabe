
import React, { useState, useEffect, useRef } from 'react';
import { Plane, Camera, Upload, CheckCircle2, MapPin } from 'lucide-react';
import Fireworks from './Fireworks';
import { DESTINATIONS, Destination } from '../types';

const GlobeMarker: React.FC<{ 
  destination: Destination; 
  isActive: boolean;
  onImageAdd: (url: string) => void;
  savedImage: string | null;
  index: number;
}> = ({ destination, isActive, onImageAdd, savedImage, index }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate position on an arc
  const totalDestinations = DESTINATIONS.length;
  const angleStart = 150; // Degrees
  const angleEnd = 30; // Degrees
  const angleRange = angleStart - angleEnd;
  const angle = angleStart - (index * (angleRange / (totalDestinations - 1)));
  const radian = (angle * Math.PI) / 180;
  const radiusX = 40; // horizontal radius in %
  const radiusY = 30; // vertical radius in %
  
  const posX = 50 + radiusX * Math.cos(radian);
  const posY = 45 - radiusY * Math.sin(radian); // Positioned at top

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => onImageAdd(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onImageAdd(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="absolute transition-all duration-1000 ease-out flex flex-col items-center"
      style={{ 
        left: `${posX}%`, 
        top: `${posY}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 40 : 20
      }}
    >
      {/* Memory Slot (Polaroid style) */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-24 h-24 md:w-32 md:h-32 p-2 bg-white shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden
          ${isActive ? 'scale-110 rotate-0 ring-4 ring-rose-400' : 'scale-90 opacity-40 rotate-3 grayscale-[50%] hover:opacity-70 hover:scale-95'}
          ${isDragging ? 'ring-8 ring-rose-500 scale-125' : ''}
        `}
      >
        <div className="w-full h-full bg-rose-50 flex items-center justify-center overflow-hidden">
          {savedImage ? (
            <img src={savedImage} className="w-full h-full object-cover" alt={destination.name} />
          ) : (
            <div className="flex flex-col items-center text-rose-300">
               {isDragging ? <Upload size={24} className="animate-bounce" /> : <Camera size={24} />}
               <span className="text-[8px] font-montserrat mt-1 text-center">DRAG PHOTO</span>
            </div>
          )}
        </div>
        {savedImage && (
          <div className="absolute top-1 right-1 bg-white/90 rounded-full p-0.5">
             <CheckCircle2 size={12} className="text-emerald-500" />
          </div>
        )}
      </div>

      {/* City Label */}
      <div className={`mt-3 text-center transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
        <p className={`font-satisfy text-xl md:text-2xl whitespace-nowrap drop-shadow-lg transition-colors duration-500
          ${isActive ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'text-white/40'}
        `}>
          {destination.name} {destination.flag}
        </p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
};

const TravelPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [showFireworks, setShowFireworks] = useState(false);
  const [images, setImages] = useState<Record<string, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    // Start sequence
    timers.push(setTimeout(() => setCurrentIdx(0), 1000));
    
    // Navigation sequence
    DESTINATIONS.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setCurrentIdx(i), 1000 + i * 4000));
      }
    });

    // Finish sequence
    const finishTime = 1000 + DESTINATIONS.length * 4000;
    timers.push(setTimeout(() => setIsFinishing(true), finishTime));
    timers.push(setTimeout(() => setShowFireworks(true), finishTime + 500));

    return () => timers.forEach(clearTimeout);
  }, []);

  const updateImage = (name: string, url: string) => {
    setImages(prev => ({ ...prev, [name]: url }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-start overflow-hidden">
      
      {/* Stars/Dust Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#321a3e_0%,_#1a1a2e_100%)]" />
      <div className="absolute top-0 w-full h-[60%] border-b border-white/5 bg-white/[0.02] rounded-b-[100%] scale-x-125" />

      {/* Header Info */}
      <div className="relative z-10 pt-12 text-center px-4">
        <h1 className="font-playfair italic text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] opacity-90">
          Love Story
        </h1>
        <p className="font-montserrat text-rose-300 text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase mt-4">
          The future is me traveling the world with you
        </p>
      </div>

      {/* Globe Arc Container */}
      <div className="relative w-full max-w-7xl h-[60vh] md:h-[70vh] mt-8">
        {/* The Connection Path Arc */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
          <path 
            d="M 100 350 Q 500 100 900 350" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="2" 
            strokeDasharray="10,10" 
          />
          
          {/* Active Trail */}
          <path 
            id="arcPath"
            d="M 100 350 Q 500 100 900 350" 
            fill="none" 
            stroke="url(#arcGradient)" 
            strokeWidth="4" 
            strokeDasharray="10,10"
            className="transition-all duration-1000"
            style={{ 
              strokeDashoffset: currentIdx === -1 ? 1000 : 0,
              opacity: currentIdx === -1 ? 0 : 0.4
            }}
          />

          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Plane Animation */}
        {currentIdx >= 0 && !isFinishing && (
          <div 
            className="absolute z-50 transition-all duration-[3500ms] ease-in-out"
            style={{ 
              left: `${getMarkerPos(currentIdx).x}%`,
              top: `${getMarkerPos(currentIdx).y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
             <div className="relative">
                <Plane className="text-white fill-rose-500 w-10 h-10 md:w-16 md:h-16 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
                {/* Engine Glow */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-rose-400 rounded-full blur-md animate-ping" />
             </div>
          </div>
        )}

        {/* Destination Markers */}
        {DESTINATIONS.map((d, i) => (
          <GlobeMarker 
            key={d.name} 
            destination={d} 
            index={i}
            isActive={currentIdx === i}
            savedImage={images[d.name]}
            onImageAdd={(url) => updateImage(d.name, url)}
          />
        ))}
      </div>

      {/* Final Celebration */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 -mt-20 md:-mt-32 pb-24">
        <div className={`transition-all duration-1000 transform ${isFinishing ? 'scale-110 opacity-100' : 'scale-75 opacity-0'}`}>
            <h2 className="font-cursive text-6xl md:text-9xl text-white drop-shadow-[0_0_40px_rgba(244,63,94,0.8)]">
                Happy Valentine Iyawo Mi ❤️
            </h2>
            <div className="mt-6 flex gap-2 justify-center">
              <div className="w-12 h-1 bg-rose-500 rounded-full animate-pulse" />
              <div className="w-12 h-1 bg-white rounded-full animate-pulse delay-75" />
              <div className="w-12 h-1 bg-rose-500 rounded-full animate-pulse delay-150" />
            </div>
        </div>
      </div>

      {showFireworks && <Fireworks />}

      <style>{`
        .shadow-glow {
            filter: drop-shadow(0 0 15px white);
        }
      `}</style>
    </div>
  );
};

// Helper to get marker positions for plane logic matching the component
function getMarkerPos(index: number) {
  const totalDestinations = 3;
  const angleStart = 150; 
  const angleEnd = 30;
  const angleRange = angleStart - angleEnd;
  const angle = angleStart - (index * (angleRange / (totalDestinations - 1)));
  const radian = (angle * Math.PI) / 180;
  const radiusX = 40;
  const radiusY = 30;
  return {
    x: 50 + radiusX * Math.cos(radian),
    y: 45 - radiusY * Math.sin(radian)
  };
}

export default TravelPage;
