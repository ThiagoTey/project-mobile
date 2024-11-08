import React, { createContext, useState, useContext } from "react";
import { themes } from "@/theme/theme";
import { Theme } from "@/theme/themeTypes";

interface ThemeContextType {
    theme : Theme;
    toggleTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
      };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("UseRefresh ser Utilizado dentro de um RefreshProvider");
    }
    return context;
  };