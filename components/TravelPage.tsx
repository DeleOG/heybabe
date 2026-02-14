
import React, { useState, useEffect } from 'react';
import { Plane, MapPin, Camera } from 'lucide-react';
import Fireworks from './Fireworks.tsx';
import { DESTINATIONS, Destination } from '../types.ts';

const GlobeMarker: React.FC<{ 
  destination: Destination; 
  isActive: boolean;
  index: number;
}> = ({ destination, isActive, index }) => {
  const totalDestinations = DESTINATIONS.length;
  const angleStart = 150; 
  const angleEnd = 30; 
  const angleRange = angleStart - angleEnd;
  const angle = angleStart - (index * (angleRange / (totalDestinations - 1)));
  const radian = (angle * Math.PI) / 180;
  const radiusX = 40; 
  const radiusY = 30; 
  
  const posX = 50 + radiusX * Math.cos(radian);
  const posY = 45 - radiusY * Math.sin(radian);

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
      <div className={`relative transition-all duration-500 group ${isActive ? 'scale-125' : 'scale-100 opacity-60'}`}>
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-white bg-white overflow-hidden shadow-lg transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
           <div className="w-full h-full bg-rose-100 flex items-center justify-center">
             <Camera className="text-rose-300 w-6 h-6" />
           </div>
        </div>
        <MapPin 
          size={isActive ? 48 : 32} 
          className={`transition-colors duration-500 ${isActive ? 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'text-white'}`}
          fill={isActive ? 'currentColor' : 'none'}
        />
        {isActive && (
          <div className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-20 animate-pulse" />
        )}
      </div>
      <div className={`mt-3 text-center transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
        <p className={`font-satisfy text-xl md:text-3xl whitespace-nowrap transition-colors duration-500
          ${isActive ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'text-white/40'}
        `}>
          {destination.name} {destination.flag}
        </p>
      </div>
    </div>
  );
};

const TravelPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setCurrentIdx(0), 1000));
    DESTINATIONS.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setCurrentIdx(i), 1000 + i * 4000));
      }
    });
    const finishTime = 1000 + DESTINATIONS.length * 4000;
    timers.push(setTimeout(() => setIsFinishing(true), finishTime));
    timers.push(setTimeout(() => setShowFireworks(true), finishTime + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-start overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#321a3e_0%,_#1a1a2e_100%)]" />
      <div className="absolute top-0 w-full h-[60%] border-b border-white/5 bg-white/[0.02] rounded-b-[100%] scale-x-125" />
      <div className="relative z-10 pt-12 text-center px-4">
        <h1 className="font-playfair italic text-white text-4xl md:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] opacity-90">
          Our Future Journey
        </h1>
        <p className="font-montserrat text-rose-300 text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase mt-4">
          Traveling the world with you is my only dream
        </p>
      </div>
      <div className="relative w-full max-w-7xl h-[60vh] md:h-[70vh] mt-8">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
          <path d="M 100 350 Q 500 100 900 350" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="10,10" />
          <path id="arcPath" d="M 100 350 Q 500 100 900 350" fill="none" stroke="url(#arcGradient)" strokeWidth="4" strokeDasharray="10,10"
            className="transition-all duration-1000"
            style={{ 
              strokeDashoffset: currentIdx === -1 ? 1000 : 0, 
              opacity: currentIdx === -1 ? 0 : 0.4,
              transition: 'opacity 1s ease, stroke-dashoffset 4s linear'
            }}
          />
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
        </svg>
        {currentIdx >= 0 && !isFinishing && (
          <div className="absolute z-50 transition-all duration-[3500ms] ease-in-out"
            style={{ left: `${getMarkerPos(currentIdx).x}%`, top: `${getMarkerPos(currentIdx).y}%`, transform: 'translate(-50%, -50%)' }}>
             <div className="relative">
                <Plane className="text-white fill-rose-500 w-12 h-12 md:w-20 md:h-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-rose-400 rounded-full blur-md animate-ping" />
             </div>
          </div>
        )}
        {DESTINATIONS.map((d, i) => (
          <GlobeMarker key={d.name} destination={d} index={i} isActive={currentIdx === i} />
        ))}
      </div>
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
    </div>
  );
};

function getMarkerPos(index: number) {
  const totalDestinations = DESTINATIONS.length;
  const angleStart = 150; 
  const angleEnd = 30;
  const angleRange = angleStart - angleEnd;
  const angle = angleStart - (index * (angleRange / (totalDestinations - 1)));
  const radian = (angle * Math.PI) / 180;
  const radiusX = 40;
  const radiusY = 30;
  return { x: 50 + radiusX * Math.cos(radian), y: 45 - radiusY * Math.sin(radian) };
}

export default TravelPage;
