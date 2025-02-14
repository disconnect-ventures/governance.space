"use client";

import React, { createContext } from "react";
import { getDictionary } from "~/config/dictionaries";

type TranslationContextType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

type TranslationProviderProps = {
  children: React.ReactNode;
  value: TranslationContextType;
};

export function TranslationProvider({
  children,
  value,
}: TranslationProviderProps) {
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export { TranslationContext };
