
import React from 'react';
import type { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-12">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">Your Recent Creations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white/10 p-3 rounded-2xl shadow-lg group">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src={item.generatedImage} 
                alt={`Generated in ${item.styleName} style`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-center text-gray-300 text-sm mt-2 font-medium">{item.styleName} Style</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
