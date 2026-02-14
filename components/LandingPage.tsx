
import React, { useState, useRef } from 'react';
import { Camera, Heart, Send, Upload } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
}

const Polaroid: React.FC<{ 
  image: string | null; 
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  label: string; 
  rotation: string;
  isMain?: boolean;
}> = ({ image, onUpload, label, rotation, isMain }) => (
  <div className={`relative group w-full aspect-[4/5] ${isMain ? 'max-w-[180px] md:max-w-[220px]' : 'max-w-[150px] md:max-w-[180px]'} rounded-lg p-2 pb-8 bg-white shadow-[0_10px_30px_rgba(244,63,94,0.15)] ring-4 ring-rose-100/30 border border-rose-50 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:z-20 ${rotation} ${isMain ? 'polaroid-float' : ''}`}>
    <div className="w-full h-full rounded-sm overflow-hidden bg-rose-50 relative flex items-center justify-center border border-rose-100/30 shadow-inner">
      {image ? (
        <img src={image} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      ) : (
        <div className="text-rose-200 flex flex-col items-center">
          <Camera size={isMain ? 32 : 24} strokeWidth={1} />
          <p className="font-satisfy text-[10px] mt-2 uppercase tracking-widest">{label}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        {!image && <span className="text-rose-400 font-satisfy text-xs">Tap to upload</span>}
      </div>
      <label className="absolute inset-0 cursor-pointer">
        <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
      </label>
    </div>
    <div className="absolute bottom-1 left-0 w-full text-center">
      <span className="font-satisfy text-rose-500 text-sm md:text-base">{label}</span>
    </div>
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/60 backdrop-blur-sm border border-white/40 rounded-sm rotate-2 shadow-sm" />
    <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg text-rose-500 border border-rose-50">
      <Heart size={isMain ? 16 : 12} fill="currentColor" />
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mainInputRef = useRef<HTMLInputElement>(null);
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

  const triggerMainUpload = () => {
    mainInputRef.current?.click();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#fff0f3] to-[#ffe3e8] overflow-hidden">
      {!isOpen && (
        <div className="mb-8 text-center animate-bounce">
          <h1 className="font-satisfy text-4xl md:text-5xl text-rose-500 drop-shadow-sm">
            Theophilus sent you a letter
          </h1>
        </div>
      )}

      <div className={`relative w-full max-w-6xl transition-all duration-1000 transform ${isOpen ? 'scale-100 h-auto my-8' : 'scale-90 h-[400px]'}`}>
        {!isOpen ? (
          <div className="relative w-full h-full bg-rose-100 rounded-lg shadow-2xl flex items-center justify-center group overflow-hidden border border-rose-200 cursor-pointer" onClick={() => setIsOpen(true)}>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-200 border-b border-rose-300 origin-top transform transition-transform duration-700 group-hover:-rotate-x-12" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            <div className="z-10 bg-white text-rose-500 px-10 py-3 rounded-full font-bold shadow-lg hover:shadow-rose-200 hover:scale-105 transition-all duration-300 border border-rose-100 font-montserrat tracking-widest uppercase text-sm glow-button">
              Open Letter
            </div>
            <div className="absolute bottom-4 right-6 text-rose-300 flex items-center gap-2">
              <span className="font-satisfy text-xl">with love...</span>
              <Heart className="fill-rose-300 w-5 h-5" />
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#fffcf9] rounded-3xl shadow-[0_25px_80px_rgba(255,182,193,0.5)] p-6 md:p-12 border border-rose-50 animate-in fade-in zoom-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 items-start">
              <div className="space-y-8 text-slate-700">
                <div className="flex items-center gap-4 mb-4">
                   <div className="bg-rose-100 p-3 rounded-2xl shadow-sm">
                      <Heart className="text-rose-500 fill-rose-500 w-8 h-8" />
                   </div>
                   <h2 className="font-satisfy text-5xl text-rose-500">My Dearest...</h2>
                </div>
                
                <div className="font-handwritten text-xl md:text-2xl leading-relaxed space-y-6 opacity-90 border-l-2 border-rose-100 pl-6">
                  <p>Hey Babe,</p>
                  <p>Knowing you is knowing Grace. Ever since we started this love thingy, it has inspired me in many ways and I'm glad I get to do it with you.</p>
                  <p>You’ve pushed me to be the best man I can be. You’re my favorite thug and pookie bear.</p>
                  <p>And I love you just the way you are. Cheers to the many years we get to spend together.</p>
                  <p className="pt-4 text-rose-600 font-bold text-3xl">Happy Valentine Day.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={mainInputRef} 
                    accept="image/*" 
                    onChange={handleImageUpload(0)} 
                  />
                  <button
                    onClick={triggerMainUpload}
                    className="flex items-center justify-center gap-3 bg-rose-50 text-rose-500 border-2 border-rose-200 px-8 py-4 rounded-2xl font-bold shadow-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 group font-montserrat uppercase tracking-wider text-xs"
                  >
                    <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span>Upload Our Picture</span>
                  </button>
                </div>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff5f7_0%,_transparent_70%)] rounded-3xl -rotate-1 -z-10 scale-110" />
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm lg:max-w-none">
                  <div className="col-span-2 flex justify-center">
                    <Polaroid image={images[0]} onUpload={handleImageUpload(0)} label="Ours Forever" rotation="-rotate-1" isMain={true} />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Polaroid image={images[1]} onUpload={handleImageUpload(1)} label="Sweet Smile" rotation="rotate-6" />
                  </div>
                  <div className="flex justify-start pt-4">
                    <Polaroid image={images[2]} onUpload={handleImageUpload(2)} label="My Pookie" rotation="-rotate-6" />
                  </div>
                </div>
                <div className="mt-12 flex items-center gap-2 font-satisfy text-rose-400 text-lg italic animate-pulse">
                   <span>Captured Moments</span>
                   <Camera size={18} />
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center border-t border-rose-50 pt-12">
              <button
                onClick={onNext}
                className="group relative flex items-center gap-4 bg-white border-2 border-rose-500 text-rose-500 px-12 py-5 rounded-full font-bold shadow-xl hover:bg-rose-500 hover:text-white transition-all duration-500 transform hover:-translate-y-1 font-montserrat uppercase tracking-[0.3em] text-xs overflow-hidden"
              >
                <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                <span>Explore Our Future</span>
                <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
