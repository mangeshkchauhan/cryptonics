"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Currency } from "@/types/crypto";
import { getCurrencySymbol } from "@/lib/utils";

interface CurrencyContextType {
  currency: Currency;
  currencySymbol: string;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: React.ReactNode;
  defaultCurrency?: Currency;
}

export function CurrencyProvider({ 
  children, 
  defaultCurrency = "usd" 
}: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency);

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    // Optionally persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-currency", newCurrency);
    }
  }, []);

  // Load currency from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferred-currency") as Currency;
      if (saved && ["usd", "eur", "inr"].includes(saved)) {
        setCurrencyState(saved);
      }
    }
  }, []);

  const currencySymbol = getCurrencySymbol(currency);

  const value: CurrencyContextType = {
    currency,
    currencySymbol,
    setCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
} 