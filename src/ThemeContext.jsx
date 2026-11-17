import { createContext, useContext, useEffect, useState } from 'react';

// Both designs live in this project. To ship only one, keep just that
// name in this list (for example ['aero']). The toggle button hides itself.
export const THEMES = ['regular','aero];

const STORAGE_KEY = 'site-theme';
const ThemeContext = createContext(null);

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : THEMES[0];
  } catch {
    return THEMES[0];
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readSavedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked. The theme still works for this visit.
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
