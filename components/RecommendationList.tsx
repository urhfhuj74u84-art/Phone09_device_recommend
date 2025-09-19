
import React from 'react';
import type { Recommendation, Smartphone } from '../types';
import RecommendationCard from './RecommendationCard';

interface RecommendationListProps {
  recommendations: Recommendation[];
  phoneDatabase: Smartphone[];
  onReset: () => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations, phoneDatabase, onReset }) => {
  const detailedRecommendations = recommendations.map(rec => {
    const phoneDetails = phoneDatabase.find(p => p.model === rec.model);
    return { ...rec, details: phoneDetails };
  });

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-dark-text mb-2">Here Are Your Top 3 Picks!</h2>
        <p className="text-lg text-dark-text-secondary">Based on your preferences, we believe these phones are the best fit for you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {detailedRecommendations.map((rec, index) => (
          <RecommendationCard key={rec.model} recommendation={rec} index={index} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-brand-secondary text-white font-bold rounded-full hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default RecommendationList;
