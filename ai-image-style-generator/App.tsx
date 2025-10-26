
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import LoadingSpinner from './components/LoadingSpinner';
import ResultDisplay from './components/ResultDisplay';
import History from './components/History';
import { generateStyledImage } from './services/geminiService';
import { STYLES, MAX_HISTORY_ITEMS } from './constants';
import type { ImageStyle, HistoryItem } from './types';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('imageGenHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('imageGenHistory');
    }
  }, []);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleStyleSelect = (style: ImageStyle) => {
    setSelectedStyle(style);
  };
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError('Please upload an image first.');
      return;
    }
    if (!selectedStyle) {
      setError('Please choose a style.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setResultImage(null);

    try {
        const base64Image = await fileToBase64(selectedFile);
        const generatedImage = await generateStyledImage(base64Image, selectedStyle.prompt);
        setResultImage(generatedImage);
        updateHistory(base64Image, generatedImage, selectedStyle.name);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateHistory = (originalImage: string, generatedImage: string, styleName: string) => {
      const newItem: HistoryItem = {
          id: Date.now().toString(),
          originalImage,
          generatedImage,
          styleName,
          timestamp: Date.now()
      };

      const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      setHistory(updatedHistory);
      localStorage.setItem('imageGenHistory', JSON.stringify(updatedHistory));
  };

  const handleTryAgain = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedStyle(null);
    setResultImage(null);
    setError(null);
  };
  
  const handleDownload = () => {
      if (!resultImage) return;
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (resultImage) {
      return <ResultDisplay imageUrl={resultImage} onDownload={handleDownload} onTryAgain={handleTryAgain} />;
    }
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
        <ImageUploader onFileChange={handleFileChange} previewUrl={previewUrl} />
        <StyleSelector styles={STYLES} selectedStyleId={selectedStyle?.id || null} onStyleSelect={handleStyleSelect} />
        {error && <div className="bg-red-500/30 text-red-200 p-3 rounded-lg text-center w-full">{error}</div>}
        <button
          onClick={handleGenerate}
          disabled={!selectedFile || !selectedStyle}
          className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700"
        >
          ✨ Generate Image
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-10">
          {renderContent()}
        </main>
        <History items={history} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
