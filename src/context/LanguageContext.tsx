import React, { createContext, useContext, useState, useEffect } from 'react';
import { uz } from '../locales/uz';
import { ru } from '../locales/ru';

type Language = 'uz' | 'ru';
type Translations = typeof uz;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const locales: Record<Language, Translations> = { uz, ru };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'ru' || saved === 'uz') ? saved : 'uz';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current: any = locales[lang];
    for (const key of keys) {
      if (current[key] === undefined) {
        return keyPath; // fallback
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
