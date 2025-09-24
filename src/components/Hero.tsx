import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLanguage: Language;
}

const Hero: React.FC<HeroProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with images */}
      <div className="absolute inset-0">
        {/* Desktop image */}
        <img
          src="/images/header_pc"
          alt="Hero desktop"
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Mobile image */}
        <img
          src="/images/header_mb"
          alt="Hero mobile"
          className="block md:hidden w-full h-full object-cover"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        {/* Заголовок и описание по центру */}
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Кнопки снизу */}
        <div className="pb-20 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToPortfolio}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
          >
            {t.hero.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={scrollToContact}
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t.hero.contact}
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
