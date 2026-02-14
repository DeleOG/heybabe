
import React, { useState } from 'react';
import { Camera, Heart, Send } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
}

interface PolaroidProps {
  image: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  rotation: string;
}

const Polaroid: React.FC<{ 
  image: string | null; 
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  label: string; 
  rotation: string;
}> = ({ image, onUpload, label, rotation }) => (
  <div className={`relative group w-full aspect-[4/5] max-w-[180px] md:max-w-[200px] rounded-lg p-2 pb-8 bg-white shadow-xl border border-rose-50 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-20 ${rotation}`}>
    <div className="w-full h-full rounded-sm overflow-hidden bg-rose-50 relative flex items-center justify-center border border-rose-100/30">
      {image ? (
        <img src={image} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="text-rose-200 flex flex-col items-center">
          <Camera size={28} strokeWidth={1} />
          <p className="font-satisfy text-[10px] mt-1 uppercase tracking-widest">{label}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <label className="absolute inset-0 cursor-pointer">
        <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
      </label>
    </div>
    
    {/* Label at bottom of Polaroid */}
    <div className="absolute bottom-1 left-0 w-full text-center">
      <span className="font-satisfy text-rose-400 text-sm">{label}</span>
    </div>

    {/* Decorative Tape/Heart */}
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/40 backdrop-blur-sm border border-white/20 rounded-sm rotate-3 shadow-sm" />
    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md text-rose-500">
      <Heart size={14} fill="currentColor" />
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State for the 3 collage photos
  const [images, setImages] = useState<(string | null)[]>([
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Theophilus&backgroundColor=ffcdd2", 
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Love&backgroundColor=f8bbd0", 
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Pookie&backgroundColor=f48fb1"
  ]);

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#fff0f3] to-[#ffe3e8]">
      {/* Header Text */}
      {!isOpen && (
        <div className="mb-8 text-center animate-bounce">
          <h1 className="font-satisfy text-4xl md:text-5xl text-rose-500 drop-shadow-sm">
            Theophilus sent you a letter
          </h1>
        </div>
      )}

      {/* Envelope Container */}
      <div className={`relative w-full max-w-6xl transition-all duration-1000 transform ${isOpen ? 'scale-100 h-auto my-8' : 'scale-90 h-[400px]'}`}>
        
        {/* The Realistic Envelope */}
        {!isOpen ? (
          <div className="relative w-full h-full bg-rose-100 rounded-lg shadow-2xl flex items-center justify-center group overflow-hidden border border-rose-200">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-200 border-b border-rose-300 origin-top transform transition-transform duration-700 group-hover:-rotate-x-12" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            
            <button
              onClick={() => setIsOpen(true)}
              className="z-10 bg-white text-rose-500 px-10 py-3 rounded-full font-bold shadow-lg hover:shadow-rose-200 hover:scale-105 transition-all duration-300 border border-rose-100 font-montserrat tracking-widest uppercase text-sm"
            >
              Open Letter
            </button>
            
            <div className="absolute bottom-4 right-6 text-rose-300 flex items-center gap-2">
              <span className="font-satisfy text-xl">with love...</span>
              <Heart className="fill-rose-300 w-5 h-5" />
            </div>
          </div>
        ) : (
          /* Revealed Content */
          <div className="w-full bg-[#fffcf9] rounded-2xl shadow-[0_25px_60px_rgba(255,182,193,0.4)] p-6 md:p-12 border border-rose-100 animate-in fade-in zoom-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 items-center">
              
              {/* Left Side - Written Letter */}
              <div className="space-y-8 text-slate-700">
                <div className="flex items-center gap-3 mb-6">
                   <Heart className="text-rose-400 fill-rose-400 w-8 h-8" />
                   <h2 className="font-satisfy text-4xl text-rose-500">My Dearest...</h2>
                </div>
                <div className="font-handwritten text-2xl md:text-3xl leading-relaxed space-y-6 opacity-90">
                  <p>Hey Babe,</p>
                  <p>Knowing you is knowing Grace.</p>
                  <p>Ever since we started this love thingy, it has inspired me in many ways and I'm glad I get to do it with you.</p>
                  <p>You’ve pushed me to be the best man I can be.</p>
                  <p>You’re my favorite thug and pookie bear.</p>
                  <p>And I love you just the way you are.</p>
                  <p>Cheers to the many years we get to spend together.</p>
                  <p className="pt-4 text-rose-500 font-bold">Happy Valentine Day.</p>
                </div>
              </div>

              {/* Right Side - Scrapbook Collage */}
              <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 bg-rose-50/50 rounded-3xl -rotate-1 -z-10 scale-105 border border-rose-100/50" />
                
                <div className="grid grid-cols-2 gap-x-2 gap-y-8 w-full">
                  <div className="col-span-2 flex justify-center pb-4">
                    <Polaroid 
                      image={images[0]} 
                      onUpload={handleImageUpload(0)} 
                      label="Ours Forever" 
                      rotation="-rotate-2" 
                    />
                  </div>
                  <div className="flex justify-end pr-2">
                    <Polaroid 
                      image={images[1]} 
                      onUpload={handleImageUpload(1)} 
                      label="Sweet Smile" 
                      rotation="rotate-6" 
                    />
                  </div>
                  <div className="flex justify-start pl-2">
                    <Polaroid 
                      image={images[2]} 
                      onUpload={handleImageUpload(2)} 
                      label="My Pookie" 
                      rotation="-rotate-6" 
                    />
                  </div>
                </div>
                
                <p className="mt-12 font-satisfy text-rose-400 text-lg italic animate-pulse">
                  Our special memories...
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-16 flex justify-center">
              <button
                onClick={onNext}
                className="group flex items-center gap-3 bg-white border-2 border-rose-400 text-rose-500 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 font-montserrat uppercase tracking-[0.2em] text-xs"
              >
                <span>Discover Our Journey</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
