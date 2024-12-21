"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTheme } from "next-themes";

interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => null,
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);