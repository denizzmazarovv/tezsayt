import React from 'react';
import { Users, Award, Briefcase } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutProps {
  currentLanguage: Language;
}

const About: React.FC<AboutProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      value: '3+',
      label: t.about.experience
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: '35+',
      label: t.about.projects
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '35+',
      label: t.about.clients
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.about.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.about.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-20 blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;