import { createContext, useState, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Locale } from '@/types';

// Available locales
export const locales: Locale[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

interface LocaleContextType {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  locales: Locale[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<Locale>(
    locales.find(locale => locale.code === i18n.language) || locales[0]
  );

  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale.code);
    setCurrentLocale(locale);
  };

  return (
    <LocaleContext.Provider value={{ currentLocale, setLocale, locales }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};