
import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#fff0f3] to-[#ffe3e8] overflow-hidden">
      {!isOpen && (
        <div className="mb-8 text-center animate-bounce">
          <h1 className="font-satisfy text-4xl md:text-5xl text-rose-500 drop-shadow-sm">
            Theophilus sent you a letter
          </h1>
        </div>
      )}

      <div className={`relative w-full max-w-4xl transition-all duration-1000 transform ${isOpen ? 'scale-100 h-auto my-8' : 'scale-90 h-[400px]'}`}>
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
          <div className="w-full max-w-2xl mx-auto bg-[#fffcf9] rounded-3xl shadow-[0_25px_80px_rgba(255,182,193,0.5)] p-8 md:p-16 border border-rose-50 animate-in fade-in zoom-in duration-700">
            <div className="flex flex-col items-center text-center space-y-10 text-slate-700">
              <div className="flex flex-col items-center gap-4">
                 <div className="bg-rose-100 p-4 rounded-full shadow-sm">
                    <Heart className="text-rose-500 fill-rose-500 w-10 h-10" />
                 </div>
                 <h2 className="font-satisfy text-5xl md:text-6xl text-rose-500">My Dearest...</h2>
              </div>
              
              <div className="font-handwritten text-2xl md:text-3xl leading-relaxed space-y-8 opacity-90 max-w-xl">
                <p>Hey Babe,</p>
                <p>Knowing you is knowing Grace. Ever since we started this love thingy, it has inspired me in many ways and I'm glad I get to do it with you.</p>
                <p>You’ve pushed me to be the best man I can be. You’re my favorite thug and pookie bear.</p>
                <p>And I love you just the way you are. Cheers to the many years we get to spend together.</p>
                <div className="pt-6">
                  <p className="text-rose-600 font-bold text-4xl md:text-5xl">Happy Valentine Day.</p>
                  <p className="font-satisfy text-rose-400 text-2xl mt-4 italic">Forever Yours, Theophilus</p>
                </div>
              </div>

              <div className="w-full pt-12 border-t border-rose-100/50">
                <button
                  onClick={onNext}
                  className="group relative inline-flex items-center gap-4 bg-white border-2 border-rose-500 text-rose-500 px-12 py-5 rounded-full font-bold shadow-xl hover:bg-rose-500 hover:text-white transition-all duration-500 transform hover:-translate-y-1 font-montserrat uppercase tracking-[0.3em] text-xs overflow-hidden"
                >
                  <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                  <span>Explore Our Future</span>
                  <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
