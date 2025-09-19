
import React, { useState, useCallback } from 'react';
import { AppState, UserAnswers, Recommendation, Smartphone } from './types';
import { getPhoneRecommendations } from './services/geminiService';
import { phoneDataCSV, parsePhoneData } from './data/phoneData';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Questionnaire from './components/Questionnaire';
import Loader from './components/Loader';
import RecommendationList from './components/RecommendationList';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const phoneDatabase: Smartphone[] = parsePhoneData(phoneDataCSV);

  const handleStart = () => {
    setAppState(AppState.QUIZ);
  };

  const handleQuizComplete = useCallback(async (finalAnswers: UserAnswers) => {
    setAnswers(finalAnswers);
    setAppState(AppState.LOADING);
    setError(null);

    try {
      const result = await getPhoneRecommendations(finalAnswers, phoneDataCSV);
      setRecommendations(result);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('추천 결과를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setAppState(AppState.WELCOME);
    }
  }, []);

  const handleReset = () => {
    setAnswers({});
    setRecommendations([]);
    setError(null);
    setAppState(AppState.WELCOME);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.WELCOME:
        return <Welcome onStart={handleStart} error={error} />;
      case AppState.QUIZ:
        return <Questionnaire onComplete={handleQuizComplete} />;
      case AppState.LOADING:
        return <Loader />;
      case AppState.RESULTS:
        return <RecommendationList recommendations={recommendations} phoneDatabase={phoneDatabase} onReset={handleReset} />;
      default:
        return <Welcome onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg font-sans flex flex-col items-center">
      <Header />
      <main className="w-full max-w-5xl mx-auto p-4 md:p-8 flex-grow flex flex-col justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
