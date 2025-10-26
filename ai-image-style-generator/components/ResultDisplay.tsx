
import React from 'react';

interface ResultDisplayProps {
  imageUrl: string;
  onDownload: () => void;
  onTryAgain: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, onDownload, onTryAgain }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold text-white">Your Masterpiece is Ready!</h2>
      <div className="w-full aspect-square rounded-2xl shadow-2xl overflow-hidden">
        <img src={imageUrl} alt="Generated result" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          <span>⬇️</span> Download Result
        </button>
        <button
          onClick={onTryAgain}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          <span>🔁</span> Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
