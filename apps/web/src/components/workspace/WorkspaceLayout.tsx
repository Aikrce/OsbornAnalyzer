import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Maximize2, 
  Minimize2,
  
  Bell,
  User,
  Search,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModeSelector from './ModeSelector';
import APIStatusIndicator from './APIStatusIndicator';
import { useWorkspace } from '@/hooks/workspace/useWorkspace';
import { WorkspaceMode } from '@/types/workspace';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
  className = ''
}) => {
  const { state, actions } = useWorkspace();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications] = useState<any[]>([]);

  // 监听全屏状态
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleModeChange = (mode: WorkspaceMode) => {
    actions.setMode(mode);
    
    // 根据模式调整布局
    if (mode === 'collaboration') {
      setSidebarOpen(true);
    } else if (mode === 'library') {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`workspace-layout ${className} ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* 顶部导航栏 */}
      <header className="workspace-header">
        <div className="header-left">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="logo-section">
            <h1 className="app-title">HuiTu 创新思维工具</h1>
            <span className="app-subtitle">奥斯本检核表法分析平台</span>
          </div>
        </div>

        <div className="header-center">
          <ModeSelector
            currentMode={state.mode}
            onModeChange={handleModeChange}
          />
        </div>

        <div className="header-right">
          <div className="header-actions">
            <Button variant="ghost" size="sm" className="action-button">
              <Search className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="action-button">
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="action-button">
              <HelpCircle className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="action-button">
              <User className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="action-button"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* 侧边栏 */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="workspace-sidebar"
          >
            <div className="sidebar-header">
              <h3 className="sidebar-title">工作面板</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="sidebar-close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="sidebar-content">
              {/* 分析流程 */}
              <div className="sidebar-section">
                <h4 className="section-title">分析流程</h4>
                <div className="flow-steps">
                  {state.analysisFlow.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flow-step ${step.status}`}
                    >
                      <div className="step-indicator">
                        {step.status === 'completed' ? (
                          <div className="step-completed">✓</div>
                        ) : step.status === 'active' ? (
                          <div className="step-active">{index + 1}</div>
                        ) : (
                          <div className="step-pending">{index + 1}</div>
                        )}
                      </div>
                      <div className="step-content">
                        <div className="step-title">{step.title}</div>
                        <div className="step-description">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 协作者 */}
              {state.mode === 'collaboration' && (
                <div className="sidebar-section">
                  <h4 className="section-title">协作者 ({state.collaborators.length})</h4>
                  <div className="collaborators-list">
                    {state.collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="collaborator-item">
                        <div className="collaborator-avatar">
                          <div 
                            className="avatar-circle"
                            style={{ backgroundColor: collaborator.color }}
                          >
                            {collaborator.name.charAt(0)}
                          </div>
                          <div className={`status-indicator ${collaborator.status}`} />
                        </div>
                        <div className="collaborator-info">
                          <div className="collaborator-name">{collaborator.name}</div>
                          <div className="collaborator-role">{collaborator.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 智能建议 */}
              {state.smartSuggestions.length > 0 && (
                <div className="sidebar-section">
                  <h4 className="section-title">智能建议</h4>
                  <div className="suggestions-list">
                    {state.smartSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="suggestion-item">
                        <div className="suggestion-content">
                          <div className="suggestion-title">{suggestion.title}</div>
                          <div className="suggestion-description">{suggestion.description}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={suggestion.action}
                          className="suggestion-action"
                        >
                          执行
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 主内容区域 */}
      <main className={`workspace-main ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="main-content">
          {children}
        </div>
      </main>

      {/* API状态指示器 */}
      <APIStatusIndicator
        state={state.apiState}
        onRetry={() => {}}
        onCancel={() => {}}
      />

      <style>{`
        .workspace-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #f8fafc;
          position: relative;
        }

        .workspace-layout.fullscreen {
          height: 100vh;
        }

        .workspace-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 64px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          z-index: 40;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo-section {
          display: flex;
          flex-direction: column;
        }

        .app-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }

        .app-subtitle {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .header-center {
          flex: 1;
          display: flex;
          justify-content: center;
          max-width: 400px;
        }

        .header-right {
          display: flex;
          align-items: center;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-button {
          position: relative;
          width: 40px;
          height: 40px;
          padding: 0;
        }

        .notification-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .workspace-sidebar {
          position: fixed;
          top: 64px;
          left: 0;
          width: 300px;
          height: calc(100vh - 64px);
          background: white;
          border-right: 1px solid #e5e7eb;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          z-index: 30;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
        }

        .sidebar-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .sidebar-content {
          padding: 20px;
        }

        .sidebar-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 12px 0;
        }

        .flow-steps {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .flow-step {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .flow-step.active {
          background: #eff6ff;
        }

        .flow-step.completed {
          background: #f0fdf4;
        }

        .step-indicator {
          flex-shrink: 0;
        }

        .step-completed,
        .step-active,
        .step-pending {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .step-completed {
          background: #10b981;
          color: white;
        }

        .step-active {
          background: #3b82f6;
          color: white;
        }

        .step-pending {
          background: #e5e7eb;
          color: #6b7280;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-size: 13px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 2px;
        }

        .step-description {
          font-size: 11px;
          color: #6b7280;
        }

        .collaborators-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .collaborator-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 6px;
          background: #f9fafb;
        }

        .collaborator-avatar {
          position: relative;
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .status-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .status-indicator.online {
          background: #10b981;
        }

        .status-indicator.offline {
          background: #6b7280;
        }

        .status-indicator.away {
          background: #f59e0b;
        }

        .collaborator-info {
          flex: 1;
        }

        .collaborator-name {
          font-size: 13px;
          font-weight: 500;
          color: #111827;
        }

        .collaborator-role {
          font-size: 11px;
          color: #6b7280;
        }

        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fefce8;
        }

        .suggestion-content {
          flex: 1;
        }

        .suggestion-title {
          font-size: 13px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 2px;
        }

        .suggestion-description {
          font-size: 11px;
          color: #6b7280;
        }

        .workspace-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s ease;
        }

        .workspace-main.with-sidebar {
          margin-left: 300px;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .workspace-header {
            padding: 0 16px;
          }

          .header-center {
            display: none;
          }

          .workspace-sidebar {
            width: 280px;
          }

          .workspace-main.with-sidebar {
            margin-left: 0;
          }

          .main-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default WorkspaceLayout;
