'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const LangContext = createContext({ lang: 'id', setLang: () => {} });
export const useLang = () => useContext(LangContext);

export default function LangProvider({ children }) {
  const [lang, setLangState] = useState('id');

  useEffect(() => {
    setLangState(document.documentElement.dataset.lang === 'en' ? 'en' : 'id');
  }, []);

  const setLang = useCallback(l => {
    document.documentElement.dataset.lang = l;
    document.documentElement.lang = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
    setLangState(l);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
