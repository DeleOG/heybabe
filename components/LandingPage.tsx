
import React, { useState } from 'react';
import { Camera, Heart, Send } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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
      <div className={`relative w-full max-w-4xl transition-all duration-1000 transform ${isOpen ? 'scale-100 h-auto my-12' : 'scale-90 h-[400px]'}`}>
        
        {/* The Realistic Envelope */}
        {!isOpen ? (
          <div className="relative w-full h-full bg-rose-100 rounded-lg shadow-2xl flex items-center justify-center group overflow-hidden border border-rose-200">
             {/* Envelope Flap Front */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-200 border-b border-rose-300 origin-top transform transition-transform duration-700 group-hover:-rotate-x-12" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            
            <button
              onClick={() => setIsOpen(true)}
              className="z-10 bg-white text-rose-500 px-10 py-3 rounded-full font-bold shadow-lg hover:shadow-rose-200 hover:scale-105 transition-all duration-300 border border-rose-100 glow-button font-montserrat tracking-widest uppercase text-sm"
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
          <div className="w-full bg-[#fffcf9] rounded-2xl shadow-[0_20px_50px_rgba(255,182,193,0.3)] p-8 md:p-12 border border-rose-100 animate-in fade-in zoom-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Side - Written Letter */}
              <div className="space-y-6 text-slate-700">
                <div className="flex items-center gap-2 mb-4">
                   <Heart className="text-rose-400 fill-rose-400 w-6 h-6" />
                   <h2 className="font-satisfy text-3xl text-rose-500">My Dearest...</h2>
                </div>
                <div className="font-handwritten text-2xl leading-relaxed space-y-4">
                  <p>Hey Babe,</p>
                  <p>Knowing you is knowing Grace.</p>
                  <p>Ever since we started this love thingy, it has inspired me in many ways and I'm glad I get to do it with you.</p>
                  <p>You’ve pushed me to be the best man I can be.</p>
                  <p>You’re my favorite thug and pookie bear.</p>
                  <p>And I love you just the way you are.</p>
                  <p>Cheers to the many years we get to spend together.</p>
                  <p>Happy Valentine Day.</p>
                </div>
              </div>

              {/* Right Side - Image Area */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative group w-full aspect-[4/5] max-w-[320px] rounded-2xl p-4 bg-white shadow-xl border border-rose-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full rounded-lg overflow-hidden bg-rose-50 relative flex items-center justify-center border border-dashed border-rose-200">
                    {image ? (
                      <img src={image} alt="Our Memories" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-rose-300 flex flex-col items-center">
                        <Camera size={48} strokeWidth={1} />
                        <p className="font-satisfy text-xl mt-2">Our Picture</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Polish frame effects */}
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-rose-500">
                    <Heart size={20} fill="currentColor" />
                  </div>
                </div>

                <label className="cursor-pointer bg-rose-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-rose-600 hover:shadow-rose-200 transition-all flex items-center gap-2 font-montserrat font-bold text-xs uppercase tracking-widest">
                  <Camera size={14} />
                  <span>Update Photo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-16 flex justify-center">
              <button
                onClick={onNext}
                className="group flex items-center gap-3 bg-white border-2 border-rose-400 text-rose-500 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 font-montserrat uppercase tracking-widest text-sm"
              >
                <span>see more</span>
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
