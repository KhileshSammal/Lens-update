import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "latitude_theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return (stored as Theme) === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  // Function to set theme state & persist to localStorage + custom event
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
      window.dispatchEvent(new CustomEvent("latitude_theme_change", { detail: newTheme }));
    } catch (e) {
      console.error("Failed to persist theme setting:", e);
    }
  }, []);

  // Function to toggle between dark and light mode
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
        window.dispatchEvent(new CustomEvent("latitude_theme_change", { detail: nextTheme }));
      } catch (e) {
        console.error("Failed to persist theme setting:", e);
      }
      return nextTheme;
    });
  }, []);

  // Sync DOM document root element class whenever theme state changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  // Synchronize theme across multiple browser windows/tabs or custom events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        if (e.newValue === "dark" || e.newValue === "light") {
          setThemeState(e.newValue);
        }
      }
    };

    const handleCustomThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      if (customEvent.detail && (customEvent.detail === "dark" || customEvent.detail === "light")) {
        setThemeState(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("latitude_theme_change", handleCustomThemeChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("latitude_theme_change", handleCustomThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
