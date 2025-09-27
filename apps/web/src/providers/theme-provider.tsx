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

    // 移除内联样式，让CSS类生效
    root.style.removeProperty('--background');
    root.style.removeProperty('--foreground');
    root.style.removeProperty('--card');
    root.style.removeProperty('--card-foreground');
    console.log('Removed inline CSS variables to let CSS classes work');

    // 强制应用样式到body - 使用计算后的样式
    const body = document.body;
    if (body) {
      // 等待CSS类应用后再获取计算后的样式
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
