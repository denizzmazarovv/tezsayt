import { useState } from 'react';
import { Language } from '../types';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ru');

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return { currentLanguage, changeLanguage };
};