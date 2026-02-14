
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import LandingPage from './components/LandingPage';
import TravelPage from './components/TravelPage';
import BackgroundHearts from './components/BackgroundHearts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = (page: Page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <BackgroundHearts />
      
      {currentPage === Page.Landing && (
        <LandingPage onNext={() => navigateTo(Page.Travel)} />
      )}
      
      {currentPage === Page.Travel && (
        <TravelPage />
      )}
    </div>
  );
};

export default App;
