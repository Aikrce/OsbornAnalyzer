import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, X, RefreshCw,  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APIState } from '@/types/workspace';

interface APIStatusIndicatorProps {
  state: APIState;
  onRetry: () => void;
  onCancel: () => void;
  onRefresh?: () => void;
  className?: string;
}

const APIStatusIndicator: React.FC<APIStatusIndicatorProps> = ({
  state,
  onRetry,
  onCancel,
  onRefresh,
  className = ''
}) => {
  if (!state.isLoading && !state.isError) return null;

  return (
    <div className={`api-status-indicator ${className}`}>
      <AnimatePresence>
        {state.isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="loading-indicator"
          >
            <div className="indicator-content">
              <div className="progress-container">
                <div className="progress-circle">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                </div>
                <div className="progress-text">{state.progress}%</div>
              </div>
              
              <div className="operation-info">
                <h4 className="operation-title">{state.currentOperation}</h4>
                <p className="operation-description">请稍候，正在处理您的请求...</p>
              </div>
              
              <div className="indicator-actions">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onCancel}
                  className="cancel-button"
                >
                  <X className="w-4 h-4" />
                  取消
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {state.isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="error-indicator"
          >
            <div className="error-content">
              <div className="error-icon">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              
              <div className="error-details">
                <h4 className="error-title">操作失败</h4>
                <p className="error-message">{state.error}</p>
                
                <div className="error-actions">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onRetry}
                    disabled={state.retryCount >= 3}
                    className="retry-button"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重试 ({state.retryCount}/3)
                  </Button>
                  
                  {onRefresh && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onRefresh}
                      className="refresh-button"
                    >
                      刷新页面
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .api-status-indicator {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          max-width: 400px;
        }

        .loading-indicator,
        .error-indicator {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .indicator-content {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 12px;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .progress-circle {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-text {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }

        .operation-info {
          flex: 1;
        }

        .operation-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .operation-description {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .indicator-actions {
          display: flex;
          gap: 8px;
        }

        .error-content {
          display: flex;
          padding: 16px;
          gap: 12px;
        }

        .error-icon {
          flex-shrink: 0;
        }

        .error-details {
          flex: 1;
        }

        .error-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .error-message {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 12px 0;
        }

        .error-actions {
          display: flex;
          gap: 8px;
        }

        .cancel-button,
        .retry-button,
        .refresh-button {
          font-size: 12px;
          height: 32px;
          padding: 0 12px;
        }

        @media (max-width: 768px) {
          .api-status-indicator {
            bottom: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
          }

          .indicator-content,
          .error-content {
            padding: 12px;
          }

          .operation-title,
          .error-title {
            font-size: 13px;
          }

          .operation-description,
          .error-message {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

export default APIStatusIndicator;
