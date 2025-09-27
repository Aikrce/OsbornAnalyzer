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

    // 直接设置CSS变量到根元素 - 这是关键修复
    if (appliedTheme === 'dark') {
      root.style.setProperty('--background', '222.2 84% 4.9%');
      root.style.setProperty('--foreground', '210 40% 98%');
      root.style.setProperty('--card', '222.2 84% 4.9%');
      root.style.setProperty('--card-foreground', '210 40% 98%');
      console.log('Applied dark theme variables directly');
    } else {
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222.2 84% 4.9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '222.2 84% 4.9%');
      console.log('Applied light theme variables directly');
    }

    // 强制应用样式到body
    const body = document.body;
    if (body) {
      const bgColor = root.style.getPropertyValue('--background');
      const fgColor = root.style.getPropertyValue('--foreground');
      body.style.backgroundColor = `hsl(${bgColor})`;
      body.style.color = `hsl(${fgColor})`;
      console.log('Force applied styles to body:', { bgColor, fgColor });
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
