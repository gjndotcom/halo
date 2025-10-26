
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} AI Image Style Generator. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
