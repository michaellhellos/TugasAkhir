
import React from 'react';

interface OnboardingVideoProps {
  onClose: () => void;
  userName: string;
}

const OnboardingVideo: React.FC<OnboardingVideoProps> = ({ onClose, userName }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-gray-800 rounded-2xl border border-teal-500/30 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 pb-2 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
            Selamat Datang, {userName}! 🚀
          </h2>
          <p className="text-gray-300 mt-2">
            Sebelum mulai, tonton panduan singkat ini biar makin jago trading.
          </p>
        </div>

        {/* Video Container (16:9 Aspect Ratio) */}
        <div className="relative pt-[56.25%] bg-black mx-6 my-4 rounded-xl overflow-hidden border border-gray-700 shadow-inner">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/93H8c_55xKk?autoplay=1&rel=0" 
            title="Crypto Trading Guide for Beginners"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer / Action Button */}
        <div className="p-6 pt-2 text-center">
          <button 
            onClick={onClose}
            className="w-full md:w-1/2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            Sip, Saya Siap Trading! ⚡
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Video ini hanya simulasi tutorial untuk keperluan prototipe.
          </p>
        </div>

      </div>
    </div>
  );
};

export default OnboardingVideo;
