'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  const toggle = useCallback(() => {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    document.documentElement.classList.toggle('light', next === 'light');
    try { localStorage.setItem('theme', next); } catch (e) {}
    setTheme(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
