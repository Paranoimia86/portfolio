import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CurrencyContext = createContext(null);

const ratesFromEur = {
  EUR: 1,
  USD: 1.09,
  CZK: 24.8,
  CHF: 0.96,
};

const localesByCurrency = {
  EUR: "sk-SK",
  USD: "en-US",
  CZK: "cs-CZ",
  CHF: "de-CH",
};

const symbolsByCurrency = {
  EUR: "€",
  USD: "$",
  CZK: "Kc",
  CHF: "CHF",
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "EUR",
  );

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const value = useMemo(() => {
    const convertFromEur = (amount) => Number(amount || 0) * (ratesFromEur[currency] || 1);

    const formatPrice = (amount) => {
      const converted = convertFromEur(amount);
      return new Intl.NumberFormat(localesByCurrency[currency] || "en-US", {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
      }).format(converted);
    };

    return {
      currency,
      currencySymbol: symbolsByCurrency[currency] || currency,
      setCurrency,
      formatPrice,
      convertFromEur,
      supportedCurrencies: ["EUR", "USD", "CZK", "CHF"],
      symbolsByCurrency,
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
