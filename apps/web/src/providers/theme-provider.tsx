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

    // 清除所有主题类
    root.classList.remove('light', 'dark');
    console.log('Removed existing theme classes');

    let appliedTheme = theme;

    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    // 应用主题类
    root.classList.add(appliedTheme);
    console.log(
      'Theme applied:',
      appliedTheme,
      'HTML classes:',
      root.className
    );

    // 强制应用CSS变量到根元素 - 这是关键修复
    const applyThemeVariables = () => {
      if (appliedTheme === 'dark') {
        // 深色模式变量
        root.style.setProperty('--background', '222.2 84% 4.9%');
        root.style.setProperty('--foreground', '210 40% 98%');
        root.style.setProperty('--card', '222.2 84% 4.9%');
        root.style.setProperty('--card-foreground', '210 40% 98%');
        root.style.setProperty('--popover', '222.2 84% 4.9%');
        root.style.setProperty('--popover-foreground', '210 40% 98%');
        root.style.setProperty('--primary', '217.2 91.2% 59.8%');
        root.style.setProperty('--primary-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--secondary', '217.2 32.6% 17.5%');
        root.style.setProperty('--secondary-foreground', '210 40% 98%');
        root.style.setProperty('--muted', '217.2 32.6% 17.5%');
        root.style.setProperty('--muted-foreground', '215 20.2% 65.1%');
        root.style.setProperty('--accent', '217.2 32.6% 17.5%');
        root.style.setProperty('--accent-foreground', '210 40% 98%');
        root.style.setProperty('--destructive', '0 62.8% 30.6%');
        root.style.setProperty('--destructive-foreground', '210 40% 98%');
        root.style.setProperty('--border', '217.2 32.6% 17.5%');
        root.style.setProperty('--input', '217.2 32.6% 17.5%');
        root.style.setProperty('--ring', '224.3 76.3% 94.1%');
        console.log('Applied dark theme variables directly');
      } else {
        // 浅色模式变量
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '222.2 84% 4.9%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--popover', '0 0% 100%');
        root.style.setProperty('--popover-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--primary', '221.2 83.2% 53.3%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '210 40% 96%');
        root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--muted', '210 40% 96%');
        root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
        root.style.setProperty('--accent', '210 40% 96%');
        root.style.setProperty('--accent-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--destructive', '0 84.2% 60.2%');
        root.style.setProperty('--destructive-foreground', '0 0% 100%');
        root.style.setProperty('--border', '214.3 31.8% 91.4%');
        root.style.setProperty('--input', '214.3 31.8% 91.4%');
        root.style.setProperty('--ring', '221.2 83.2% 53.3%');
        console.log('Applied light theme variables directly');
      }
    };

    // 立即应用CSS变量
    applyThemeVariables();

    // 强制应用样式到body
    const body = document.body;
    if (body) {
      setTimeout(() => {
        const computedStyle = getComputedStyle(root);
        const bgColor = computedStyle.getPropertyValue('--background');
        const fgColor = computedStyle.getPropertyValue('--foreground');

        if (bgColor && fgColor) {
          body.style.backgroundColor = `hsl(${bgColor})`;
          body.style.color = `hsl(${fgColor})`;
          console.log('Force applied styles to body:', { bgColor, fgColor });
        }
      }, 10);
    }

    // 延迟验证
    setTimeout(() => {
      console.log('Final verification:', {
        htmlClasses: root.className,
        background: root.style.getPropertyValue('--background'),
        bodyBg: getComputedStyle(document.body).backgroundColor,
      });
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
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
