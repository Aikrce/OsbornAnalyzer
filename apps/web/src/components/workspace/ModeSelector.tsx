import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Users, 
  BookOpen, 
  Settings, 
  ChevronDown, 
  Check,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkspaceMode, ModeConfig } from '@/types/workspace';

interface ModeSelectorProps {
  currentMode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
  className?: string;
}

const modeConfigs: ModeConfig[] = [
  {
    id: 'analysis',
    label: '智能分析',
    description: '使用奥斯本检核表法进行创新思维分析',
    icon: 'Brain',
    color: 'blue',
    features: ['九维度分析', 'AI增强', '智能建议', '案例匹配'],
    requirements: ['输入分析主题']
  },
  {
    id: 'collaboration',
    label: '协作工作',
    description: '与团队成员实时协作分析',
    icon: 'Users',
    color: 'green',
    features: ['实时协作', '版本控制', '评论系统', '权限管理'],
    requirements: ['邀请协作者', '网络连接']
  },
  {
    id: 'library',
    label: '案例库',
    description: '浏览和学习创新案例',
    icon: 'BookOpen',
    color: 'purple',
    features: ['案例浏览', '分类筛选', '收藏夹', '学习笔记'],
    requirements: []
  },
  {
    id: 'settings',
    label: '设置中心',
    description: '个性化配置和系统设置',
    icon: 'Settings',
    color: 'gray',
    features: ['AI配置', '主题设置', '语言选择', '数据管理'],
    requirements: []
  }
];

const iconMap = {
  Brain,
  Users,
  BookOpen,
  Settings
};

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
  green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
  purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
  gray: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
};

const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMode, setHoveredMode] = useState<WorkspaceMode | null>(null);

  const currentConfig = modeConfigs.find(config => config.id === currentMode);
  const CurrentIcon = currentConfig ? iconMap[currentConfig.icon as keyof typeof iconMap] : Brain;

  const handleModeSelect = (mode: WorkspaceMode) => {
    onModeChange(mode);
    setIsOpen(false);
  };

  return (
    <div className={`mode-selector ${className}`}>
      {/* 当前模式按钮 */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="current-mode-button"
      >
        <CurrentIcon className="w-5 h-5 mr-2" />
        <span className="mode-label">{currentConfig?.label}</span>
        <ChevronDown 
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

      {/* 模式选择面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mode-panel"
          >
            <div className="panel-header">
              <h3 className="panel-title">选择工作模式</h3>
              <p className="panel-description">选择最适合您当前任务的工作模式</p>
            </div>

            <div className="mode-grid">
              {modeConfigs.map((config) => {
                const Icon = iconMap[config.icon as keyof typeof iconMap];
                const isSelected = config.id === currentMode;
                const isHovered = hoveredMode === config.id;

                return (
                  <motion.div
                    key={config.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mode-card ${colorClasses[config.color as keyof typeof colorClasses]} ${
                      isSelected ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleModeSelect(config.id)}
                    onMouseEnter={() => setHoveredMode(config.id)}
                    onMouseLeave={() => setHoveredMode(null)}
                  >
                    <div className="card-header">
                      <div className="icon-container">
                        <Icon className="w-6 h-6" />
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="selected-indicator"
                          >
                            <Check className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                      <h4 className="card-title">{config.label}</h4>
                    </div>

                    <p className="card-description">{config.description}</p>

                    <div className="card-features">
                      <div className="features-header">
                        <Sparkles className="w-4 h-4" />
                        <span>核心功能</span>
                      </div>
                      <ul className="features-list">
                        {config.features.map((feature, index) => (
                          <li key={index} className="feature-item">
                            <Zap className="w-3 h-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {config.requirements && config.requirements.length > 0 && (
                      <div className="card-requirements">
                        <div className="requirements-header">
                          <span>使用要求</span>
                        </div>
                        <ul className="requirements-list">
                          {config.requirements?.map((requirement, index) => (
                            <li key={index} className="requirement-item">
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover-overlay"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="panel-footer">
              <p className="footer-text">
                提示：您可以在任何时候切换工作模式，系统会自动保存您的工作进度
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mode-selector {
          position: relative;
          display: inline-block;
        }

        .current-mode-button {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.2s ease;
          min-width: 160px;
          justify-content: space-between;
        }

        .mode-panel {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 8px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          z-index: 50;
          min-width: 400px;
          max-width: 500px;
        }

        .panel-header {
          padding: 20px 20px 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .panel-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .panel-description {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .mode-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 16px 20px;
        }

        .mode-card {
          position: relative;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.5);
        }

        .selected-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .card-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }

        .card-description {
          font-size: 12px;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .card-features {
          margin-bottom: 12px;
        }

        .features-header {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          margin-bottom: 3px;
        }

        .card-requirements {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          padding-top: 8px;
        }

        .requirements-header {
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #6b7280;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .requirement-item {
          font-size: 10px;
          color: #6b7280;
          margin-bottom: 2px;
        }

        .hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(59, 130, 246, 0.05);
          pointer-events: none;
        }

        .panel-footer {
          padding: 12px 20px 16px;
          border-top: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .footer-text {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .mode-panel {
            min-width: 320px;
            max-width: 90vw;
          }

          .mode-grid {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 12px 16px;
          }

          .mode-card {
            padding: 12px;
          }

          .panel-header {
            padding: 16px 16px 12px;
          }

          .panel-footer {
            padding: 8px 16px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ModeSelector;
