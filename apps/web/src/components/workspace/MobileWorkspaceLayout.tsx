import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  
  
  Home,
  Users,
  BookOpen,
  Settings,
  Search,
  Bell,
  User,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useResponsive';
import { WorkspaceMode } from '@/types/workspace';

interface MobileWorkspaceLayoutProps {
  children: React.ReactNode;
  currentMode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
  className?: string;
}

const MobileWorkspaceLayout: React.FC<MobileWorkspaceLayoutProps> = ({
  children,
  currentMode,
  onModeChange,
  className = ''
}) => {
  const { isMobile } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bottomNavVisible, setBottomNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const modes = [
    { id: 'analysis' as WorkspaceMode, label: '分析', icon: Home },
    { id: 'collaboration' as WorkspaceMode, label: '协作', icon: Users },
    { id: 'library' as WorkspaceMode, label: '案例', icon: BookOpen },
    { id: 'settings' as WorkspaceMode, label: '设置', icon: Settings }
  ];

  // 滚动时隐藏/显示底部导航
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setBottomNavVisible(false);
      } else {
        setBottomNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 移动端优化：自动关闭侧边栏
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      const timer = setTimeout(() => {
        setSidebarOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, sidebarOpen]);
    return () => {}; // 确保所有代码路径都有返回值

  const currentModeConfig = modes.find(mode => mode.id === currentMode);
  const CurrentIcon = currentModeConfig?.icon || Home;

  return (
    <div className={`mobile-workspace-layout ${className}`}>
      {/* 顶部导航栏 */}
      <motion.header 
        className="mobile-header"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="header-content">
          <div className="header-left">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="menu-button"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="app-info">
              <h1 className="app-title">HuiTu</h1>
              <span className="mode-indicator">{currentModeConfig?.label}</span>
            </div>
          </div>

          <div className="header-right">
            <Button variant="ghost" size="sm" className="header-action">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="header-action">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="header-action">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* 侧边栏 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
            
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-sidebar"
            >
              <div className="sidebar-header">
                <div className="sidebar-title">
                  <CurrentIcon className="w-5 h-5" />
                  <span>工作模式</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="close-button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="sidebar-content">
                <div className="mode-list">
                  {modes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = mode.id === currentMode;
                    
                    return (
                      <motion.button
                        key={mode.id}
                        whileTap={{ scale: 0.95 }}
                        className={`mode-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          onModeChange(mode.id);
                          setSidebarOpen(false);
                        }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="mode-label">{mode.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="active-indicator"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="sidebar-footer">
                  <div className="user-info">
                    <div className="user-avatar">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="user-details">
                      <div className="user-name">用户</div>
                      <div className="user-status">在线</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 主内容区域 */}
      <main className="mobile-main">
        <div className="main-content">
          {children}
        </div>
      </main>

      {/* 底部导航栏 */}
      <AnimatePresence>
        {bottomNavVisible && (
          <motion.nav
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            transition={{ duration: 0.3 }}
            className="bottom-navigation"
          >
            <div className="nav-items">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = mode.id === currentMode;
                
                return (
                  <motion.button
                    key={mode.id}
                    whileTap={{ scale: 0.9 }}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => onModeChange(mode.id)}
                  >
                    <div className="nav-icon">
                      <Icon className="w-5 h-5" />
                      {isActive && (
                        <motion.div
                          layoutId="bottomActiveIndicator"
                          className="bottom-active-indicator"
                        />
                      )}
                    </div>
                    <span className="nav-label">{mode.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 浮动操作按钮 */}
      {currentMode === 'analysis' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="floating-action-button"
        >
          <Button
            size="lg"
            className="fab-button"
            onClick={() => {
              // 开始新的分析
              console.log('Start new analysis');
            }}
          >
            <span className="fab-icon">+</span>
          </Button>
        </motion.div>
      )}

      <style>{`
        .mobile-workspace-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
        }

        .mobile-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          height: 56px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .menu-button {
          width: 40px;
          height: 40px;
          padding: 0;
        }

        .app-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .app-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1;
        }

        .mode-indicator {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .header-action {
          width: 36px;
          height: 36px;
          padding: 0;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: white;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          z-index: 45;
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .close-button {
          width: 32px;
          height: 32px;
          padding: 0;
        }

        .sidebar-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .mode-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mode-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          width: 100%;
          text-align: left;
        }

        .mode-item:hover {
          background: #f3f4f6;
        }

        .mode-item.active {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .mode-label {
          font-size: 14px;
          font-weight: 500;
        }

        .active-indicator {
          position: absolute;
          right: 16px;
          width: 6px;
          height: 6px;
          background: #3b82f6;
          border-radius: 50%;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #f3f4f6;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: #e5e7eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .user-status {
          font-size: 12px;
          color: #6b7280;
        }

        .mobile-main {
          flex: 1;
          margin-top: 56px;
          margin-bottom: 80px;
          overflow-y: auto;
        }

        .main-content {
          padding: 16px;
          min-height: calc(100vh - 136px);
        }

        .bottom-navigation {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 30;
          background: white;
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-items {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 8px 0;
          height: 80px;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          min-width: 60px;
        }

        .nav-item:hover {
          background: #f3f4f6;
          border-radius: 8px;
        }

        .nav-item.active {
          color: #3b82f6;
        }

        .nav-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bottom-active-indicator {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 500;
        }

        .floating-action-button {
          position: fixed;
          bottom: 100px;
          right: 20px;
          z-index: 25;
        }

        .fab-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 0;
        }

        .fab-icon {
          font-size: 24px;
          font-weight: 300;
        }

        /* 平板端适配 */
        @media (min-width: 768px) and (max-width: 1023px) {
          .mobile-header {
            height: 64px;
          }

          .header-content {
            height: 64px;
            padding: 16px 24px;
          }

          .mobile-main {
            margin-top: 64px;
          }

          .main-content {
            padding: 24px;
          }

          .bottom-navigation {
            display: none;
          }

          .mobile-main {
            margin-bottom: 0;
          }
        }

        /* 桌面端隐藏移动端布局 */
        @media (min-width: 1024px) {
          .mobile-workspace-layout {
            display: none;
          }
        }

        /* 横屏优化 */
        @media (orientation: landscape) and (max-height: 500px) {
          .mobile-header {
            height: 48px;
          }

          .header-content {
            height: 48px;
            padding: 8px 16px;
          }

          .mobile-main {
            margin-top: 48px;
          }

          .bottom-navigation {
            height: 60px;
          }

          .nav-items {
            height: 60px;
            padding: 4px 0;
          }

          .nav-label {
            display: none;
          }

          .floating-action-button {
            bottom: 80px;
            right: 16px;
          }

          .fab-button {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileWorkspaceLayout;
