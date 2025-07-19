import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const languages = [
    { code: 'ru' as Language, name: 'RU', flag: '🇷🇺' },
    { code: 'en' as Language, name: 'EN', flag: '🇺🇸' },
    { code: 'uz' as Language, name: 'UZ', flag: '🇺🇿' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
        <Globe size={16} />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
      </button>
      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
              currentLanguage === lang.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;