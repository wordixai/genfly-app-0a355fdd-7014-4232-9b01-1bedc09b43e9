import { createContext, useState, useContext, ReactNode } from 'react';
import { Currency } from '@/types';

// Available currencies
export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
];

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  currencies: Currency[];
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock exchange rates (in a real app, these would come from an API)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.59,
  CAD: 1.37
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencies[0]);

  const setCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
  };

  const formatCurrency = (amount: number): string => {
    // Convert amount to the selected currency
    const convertedAmount = amount * (exchangeRates[currentCurrency.code] / exchangeRates.USD);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency, 
      setCurrency, 
      currencies,
      formatCurrency
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};