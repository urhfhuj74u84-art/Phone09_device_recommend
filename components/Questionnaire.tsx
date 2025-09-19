
import React, { useState } from 'react';
import type { UserAnswers } from '../types';

interface QuestionnaireProps {
  onComplete: (answers: UserAnswers) => void;
}

const questions = [
  {
    key: 'priorities',
    text: 'What do you value most in a phone? (Select up to 3)',
    type: 'multiple-choice',
    options: ['Camera Quality', 'Battery Life', 'Gaming Performance', 'Value for Money', 'Design & Premium Feel', 'Ease of Use'],
  },
  {
    key: 'previousBrand',
    text: 'What was your previous phone brand?',
    type: 'single-choice',
    options: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Other / First Smartphone'],
  },
  {
    key: 'budget',
    text: 'What is your approximate budget?',
    type: 'single-choice',
    options: ['Entry-level (Under 500,000 KRW)', 'Mid-range (500,000 - 1,000,000 KRW)', 'High-end (1,000,000 - 1,500,000 KRW)', 'Premium (Over 1,500,000 KRW)'],
  },
  {
    key: 'storage',
    text: 'How much storage do you typically need?',
    type: 'single-choice',
    options: ['128GB is enough', '256GB is comfortable', '512GB or more for power users'],
  },
  {
    key: 'screenSize',
    text: 'What screen size do you prefer?',
    type: 'single-choice',
    options: ['Compact (Under 6.3 inches)', 'Standard (6.3 - 6.7 inches)', 'Large (Over 6.7 inches)'],
  },
];

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  const handleAnswer = (key: keyof UserAnswers, value: string) => {
    if (key === 'priorities') {
      const currentPriorities = answers.priorities || [];
      const newPriorities = currentPriorities.includes(value)
        ? currentPriorities.filter(p => p !== value)
        : [...currentPriorities, value];
      
      if (newPriorities.length <= 3) {
        setAnswers(prev => ({ ...prev, priorities: newPriorities }));
      }
    } else {
      setAnswers(prev => ({ ...prev, [key]: value }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-surface p-8 rounded-2xl shadow-2xl animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-brand-primary">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-brand-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-dark-text">{currentQuestion.text}</h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map(option => {
          const isSelected = currentQuestion.type === 'multiple-choice'
            ? (answers.priorities || []).includes(option)
            : answers[currentQuestion.key as keyof Omit<UserAnswers, 'priorities'>] === option;

          return (
            <button
              key={option}
              onClick={() => handleAnswer(currentQuestion.key as keyof UserAnswers, option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected ? 'bg-brand-primary/20 border-brand-primary' : 'bg-gray-700/50 border-gray-600 hover:border-brand-primary/50'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextQuestion}
          className="px-6 py-2 bg-brand-primary text-white font-bold rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Get Recommendations' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
