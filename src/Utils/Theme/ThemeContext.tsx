import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: (newTheme: 'light' | 'dark') => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setTheme(storedTheme as 'light' | 'dark');
        } else {
          setTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme from AsyncStorage:', error);
      }
    };
    loadTheme();
  }, [systemTheme]);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme).catch(error =>
      console.error('Error saving theme to AsyncStorage:', error),
    );
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
