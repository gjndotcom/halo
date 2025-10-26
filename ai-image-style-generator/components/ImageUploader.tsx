
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onFileChange: (file: File) => void;
  previewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-white mb-3">1. Upload Your Image</h2>
      <div 
        className="w-full aspect-video bg-white/10 rounded-2xl border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer hover:border-pink-500 transition-colors duration-300"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-2xl p-2" />
        ) : (
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Click to upload an image</p>
            <p className="text-xs">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
      {previewUrl && (
        <button onClick={handleClick} className="w-full mt-3 text-sm text-center text-pink-400 hover:text-pink-300">
          Change image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
