
import React from 'react';
import { SmartphoneIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-gray-700 bg-dark-surface/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center space-x-3">
        <SmartphoneIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-dark-text">
          AI Smartphone Recommender
        </h1>
      </div>
    </header>
  );
};

export default Header;
