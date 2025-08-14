import React from 'react';
import { Check, Star } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { pricingPlans } from '../data/initialData';

interface PricingProps {
  currentLanguage: Language;
}

const Pricing: React.FC<PricingProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  // Универсальная функция для скролла к секции
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Секция с id='${sectionId}' не найдена`);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.highlighted
                  ? 'border-purple-500 shadow-xl scale-105'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {t.pricing.popular}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name[currentLanguage]}
                </h3>
                <div className="text-4xl font-bold mb-2">
                  {plan.price[currentLanguage].old && (
                    <span className="line-through text-gray-400 mr-2">
                      {plan.price[currentLanguage].old}
                    </span>
                  )}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    {plan.price[currentLanguage].new}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features[currentLanguage].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('contact')}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.pricing.order}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
