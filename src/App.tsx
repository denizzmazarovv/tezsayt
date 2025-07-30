import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLanguage } from './hooks/useLanguage';
import { initialProjects } from './data/initialData';
import { Project } from './types';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';


function App() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleUpdateProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
  };

  const MainSite = () => (
    <>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
      />
      
      <main>
        <Hero currentLanguage={currentLanguage} />
        <About currentLanguage={currentLanguage} />
        <Services currentLanguage={currentLanguage} />
        <Portfolio currentLanguage={currentLanguage} projects={projects} />
        <Pricing currentLanguage={currentLanguage} />
        <Contact currentLanguage={currentLanguage} />
      </main>

      <Footer currentLanguage={currentLanguage} />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route 
            path="/wlenteradmin" 
            element={
              <AdminRoute
                currentLanguage={currentLanguage}
                projects={projects}
                onUpdateProjects={handleUpdateProjects}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;