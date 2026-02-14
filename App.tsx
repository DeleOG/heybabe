
import React, { useState } from 'react';
import { Page } from './types.ts';
import LandingPage from './components/LandingPage.tsx';
import TravelPage from './components/TravelPage.tsx';
import BackgroundHearts from './components/BackgroundHearts.tsx';

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
