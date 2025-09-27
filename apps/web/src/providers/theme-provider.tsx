import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme;
      console.log('ThemeProvider init - stored theme:', stored);
      return stored || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    console.log('ThemeProvider useEffect triggered with theme:', theme);
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    console.log('Removed existing theme classes');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      console.log(
        'Theme applied (system):',
        systemTheme,
        'HTML classes:',
        root.className
      );
      return;
    }

    root.classList.add(theme);
    console.log('Theme applied:', theme, 'HTML classes:', root.className);

    // 测试CSS变量是否生效
    const computedStyle = getComputedStyle(root);
    const bgColor = computedStyle.getPropertyValue('--background');
    console.log('CSS --background variable:', bgColor);

    // 强制应用样式到body
    const body = document.body;
    if (body) {
      body.style.backgroundColor = `hsl(${bgColor})`;
      body.style.color = `hsl(${computedStyle.getPropertyValue('--foreground')})`;
      console.log('Force applied styles to body');
    }

    // 强制触发重新渲染
    setTimeout(() => {
      console.log('Final HTML classes after timeout:', root.className);
      console.log(
        'Final CSS --background:',
        getComputedStyle(root).getPropertyValue('--background')
      );
    }, 100);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      console.log('ThemeProvider setTheme called with:', newTheme);
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <div className='min-h-screen bg-background text-foreground'>
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
