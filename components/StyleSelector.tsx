
import React from 'react';
import type { ImageStyle } from '../types';
import Tooltip from './Tooltip';

interface StyleSelectorProps {
  styles: ImageStyle[];
  selectedStyleId: string | null;
  onStyleSelect: (style: ImageStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyleId, onStyleSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-white mb-3">2. Choose a Style</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {styles.map((style) => (
          <Tooltip key={style.id} text={style.description}>
            <button
              onClick={() => onStyleSelect(style)}
              className={`p-3 text-center rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500
                ${selectedStyleId === style.id 
                  ? 'bg-pink-500 text-white shadow-lg transform scale-105' 
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
            >
              {style.name}
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
