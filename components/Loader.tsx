
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Consulting with tech experts...",
  "Analyzing specs and features...",
  "Comparing camera capabilities...",
  "Checking battery performance...",
  "Finding the perfect match for you...",
  "Finalizing recommendations...",
];

const Loader: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-brand-primary/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-brand-primary border-r-brand-primary/30 border-b-brand-primary/30 border-l-brand-primary/30 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-2">Generating Your Recommendations</h2>
            <p className="text-dark-text-secondary transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
        </div>
    );
};

export default Loader;
