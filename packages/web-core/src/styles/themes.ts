// 主题配置
export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    secondaryDark: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    cardBg: string;
    border: string;
    shadow: string;
  };
  radius: string;
  transition: string;
  font: string;
}

const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: '#3498db',
    primaryDark: '#2980b9',
    secondary: '#2ecc71',
    secondaryDark: '#27ae60',
    accent: '#e74c3c',
    text: '#333333',
    textLight: '#666666',
    background: '#f5f7fa',
    cardBg: '#ffffff',
    border: '#e0e0e0',
    shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  radius: '8px',
  transition: 'all 0.3s ease',
  font: "'PingFang SC', 'Microsoft YaHei', sans-serif",
};

const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    primary: '#5dade2',
    primaryDark: '#3498db',
    secondary: '#58d68d',
    secondaryDark: '#2ecc71',
    accent: '#ec7063',
    text: '#ecf0f1',
    textLight: '#bdc3c7',
    background: '#1a1a1a',
    cardBg: '#2d2d2d',
    border: '#404040',
    shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  radius: '8px',
  transition: 'all 0.3s ease',
  font: "'PingFang SC', 'Microsoft YaHei', sans-serif",
};

export default {
  light: lightTheme,
  dark: darkTheme,
};