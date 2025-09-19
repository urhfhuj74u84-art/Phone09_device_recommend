
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
  error?: string | null;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, error }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center p-6 bg-dark-surface rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
        Find Your Perfect Smartphone
      </h2>
      <p className="text-lg text-dark-text-secondary max-w-2xl mb-8">
        Overwhelmed by choices? Let our AI analyze your needs and recommend the top 3 phones for you. Just answer a few quick questions to get started.
      </p>
      {error && (
        <div className="bg-brand-danger/20 border border-brand-danger text-brand-danger px-4 py-3 rounded-lg relative mb-6" role="alert">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <button
        onClick={onStart}
        className="px-8 py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
