
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        AI Image Style Generator
      </h1>
      <p className="text-center text-gray-400 mt-2">
        Transform your photos with the magic of AI
      </p>
    </header>
  );
};

export default Header;
