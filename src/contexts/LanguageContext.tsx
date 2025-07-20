
import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  language: string; // Add backward compatibility
  changeLanguage: (lang: string) => void;
  toggleLanguage: () => void; // Add toggle function
  languages: { code: string; name: string; nativeName: string }[];
  t: (key: string) => string; // Add translation function
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' }
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ne' : 'en';
    changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      language: currentLanguage, // Add backward compatibility
      changeLanguage, 
      toggleLanguage,
      languages,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
