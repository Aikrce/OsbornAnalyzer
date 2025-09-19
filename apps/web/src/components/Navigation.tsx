import React, { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAnalysisNavigation } from '../hooks/useAnalysisNavigation';
import { 
  IconHome, 
  IconChartPie, 
  IconBrain, 
  IconBooks, 
  IconUsers, 
  IconSettings,
  IconUser,
  IconBug
} from '@tabler/icons-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigationState, switchToOsbornAnalysis, switchToDeepAnalysis, goHomeAndClear, isInAnalysisPage } = useAnalysisNavigation();

  const navItems = [
    { path: '/', label: '首页', icon: IconHome, color: 'text-orange-500' },
    { path: '/osborn-analysis', label: 'Osborn分析', icon: IconChartPie, color: 'text-blue-500' },
    { path: '/deep-analysis', label: '深度分析', icon: IconBrain, color: 'text-purple-500' },
    { path: '/case-library', label: '本地案例库', icon: IconBooks, color: 'text-green-500' },
    { path: '/collaboration', label: '团队', icon: IconUsers, color: 'text-indigo-500' },
    { path: '/settings', label: '设置', icon: IconSettings, color: 'text-gray-500' },
    { path: '/ai-diagnostics', label: 'AI诊断', icon: IconBug, color: 'text-red-500' },
    { path: '/user', label: '用户中心', icon: IconUser, color: 'text-pink-500' },
  ];

  // 预加载路由
  const preloadRoute = useCallback((path: string) => {
    if (path !== location.pathname) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      document.head.appendChild(link);
      
      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }, 5000);
    }
  }, [location.pathname]);

  // 优化的导航处理
  const handleNavigation = useCallback((path: string) => {
    setIsMobileMenuOpen(false);
    
    // 如果在分析页面之间切换，保持分析结果
    if (isInAnalysisPage() && navigationState.hasResults) {
      if (path === '/osborn-analysis') {
        switchToOsbornAnalysis();
        return;
      } else if (path === '/deep-analysis') {
        switchToDeepAnalysis();
        return;
      } else if (path === '/') {
        goHomeAndClear();
        return;
      }
    }
    
    navigate(path);
  }, [navigate, isInAnalysisPage, navigationState.hasResults, switchToOsbornAnalysis, switchToDeepAnalysis, goHomeAndClear]);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-[10px] tracking-tight">ΟΣΒΟΡΝ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                奥斯本创新九问
              </span>
              <p className="text-xs text-gray-500 mt-0.5">智能创新分析平台</p>
            </div>
          </Link>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                  onMouseEnter={() => preloadRoute(item.path)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-100' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <IconComponent 
                        size={18} 
                        className={`transition-colors duration-200 ${
                          isActive ? 'text-blue-600' : item.color
                        }`} 
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {/* 活跃状态指示器 */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>


          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent 
                        size={20} 
                        className={isActive ? 'text-blue-600' : item.color} 
                      />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
