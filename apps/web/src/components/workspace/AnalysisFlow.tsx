import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Clock, 
  AlertCircle,
  SkipForward,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisFlow as AnalysisFlowType, AnalysisStep } from '@/types/workspace';

interface AnalysisFlowProps {
  flow: AnalysisFlowType;
  onStepChange: (stepId: string) => void;
  onGoBack: () => void;
  onSkip: () => void;
  onRestart: () => void;
  onPause: () => void;
  onResume: () => void;
  isPaused?: boolean;
  className?: string;
}

const AnalysisFlow: React.FC<AnalysisFlowProps> = ({
  flow,
  
  onGoBack,
  onSkip,
  onRestart,
  onPause,
  onResume,
  isPaused = false,
  className = ''
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getStepIcon = (step: AnalysisStep) => {
    switch (step.status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStepColor = (step: AnalysisStep) => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'active':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const handleStepClick = (step: AnalysisStep) => {
    if (step.status === 'completed' || step.status === 'active') {
      setExpandedStep(expandedStep === step.id ? null : step.id);
    }
  };

  return (
    <div className={`analysis-flow ${className}`}>
      {/* 流程头部 */}
      <div className="flow-header">
        <div className="header-left">
          <h3 className="flow-title">分析流程</h3>
          <div className="flow-progress">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${flow.progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="progress-text">{Math.round(flow.progress)}%</span>
          </div>
        </div>

        <div className="header-right">
          <div className="flow-controls">
            {isPaused ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onResume}
                className="control-button"
              >
                <Play className="w-4 h-4 mr-2" />
                继续
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onPause}
                className="control-button"
              >
                <Pause className="w-4 h-4 mr-2" />
                暂停
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onRestart}
              className="control-button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重新开始
            </Button>
          </div>
        </div>
      </div>

      {/* 流程步骤 */}
      <div className="flow-steps">
        {flow.steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flow-step ${getStepColor(step)} ${
              step.status === 'active' ? 'active' : ''
            }`}
            onClick={() => handleStepClick(step)}
          >
            <div className="step-header">
              <div className="step-indicator">
                {getStepIcon(step)}
              </div>

              <div className="step-content">
                <div className="step-title-row">
                  <h4 className="step-title">{step.title}</h4>
                  {step.duration && (
                    <span className="step-duration">
                      {step.duration}ms
                    </span>
                  )}
                </div>
                <p className="step-description">{step.description}</p>
              </div>

              <div className="step-actions">
                {step.status === 'active' && (
                  <div className="active-actions">
                    {step.canGoBack && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onGoBack();
                        }}
                        className="step-action-button"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                    )}
                    
                    {step.canSkip && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSkip();
                        }}
                        className="step-action-button"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}

                {(step.status === 'completed' || step.status === 'active') && (
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform ${
                      expandedStep === step.id ? 'rotate-90' : ''
                    }`} 
                  />
                )}
              </div>
            </div>

            {/* 步骤详情 */}
            <AnimatePresence>
              {expandedStep === step.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="step-details"
                >
                  <div className="details-content">
                    {step.result && (
                      <div className="step-result">
                        <h5 className="result-title">执行结果</h5>
                        <div className="result-content">
                          {typeof step.result === 'string' ? (
                            <p className="result-text">{step.result}</p>
                          ) : (
                            <pre className="result-json">
                              {JSON.stringify(step.result, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    )}

                    {step.status === 'error' && (
                      <div className="step-error">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="error-message">步骤执行失败</span>
                      </div>
                    )}

                    <div className="step-metadata">
                      <div className="metadata-item">
                        <span className="metadata-label">状态:</span>
                        <span className={`metadata-value status-${step.status}`}>
                          {step.status === 'pending' && '等待中'}
                          {step.status === 'active' && '进行中'}
                          {step.status === 'completed' && '已完成'}
                          {step.status === 'error' && '错误'}
                        </span>
                      </div>
                      
                      {step.duration && (
                        <div className="metadata-item">
                          <span className="metadata-label">耗时:</span>
                          <span className="metadata-value">{step.duration}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* 智能建议 */}
      {flow.suggestions.length > 0 && (
        <div className="flow-suggestions">
          <h4 className="suggestions-title">智能建议</h4>
          <div className="suggestions-list">
            {flow.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="suggestion-item"
              >
                <div className="suggestion-icon">ΟΣΒΟΡΝ</div>
                <span className="suggestion-text">{suggestion}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .analysis-flow {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .flow-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .header-left {
          flex: 1;
        }

        .flow-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .flow-progress {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          max-width: 200px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          border-radius: 4px;
        }

        .progress-text {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          min-width: 40px;
        }

        .flow-controls {
          display: flex;
          gap: 8px;
        }

        .control-button {
          font-size: 12px;
          height: 32px;
          padding: 0 12px;
        }

        .flow-steps {
          padding: 20px;
        }

        .flow-step {
          border: 1px solid;
          border-radius: 8px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .flow-step:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .flow-step.active {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .step-header {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 12px;
        }

        .step-indicator {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.8);
        }

        .step-content {
          flex: 1;
        }

        .step-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .step-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .step-duration {
          font-size: 12px;
          color: #6b7280;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .step-description {
          font-size: 14px;
          margin: 0;
          opacity: 0.8;
        }

        .step-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .active-actions {
          display: flex;
          gap: 4px;
        }

        .step-action-button {
          width: 32px;
          height: 32px;
          padding: 0;
        }

        .step-details {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(0, 0, 0, 0.02);
        }

        .details-content {
          padding: 16px;
        }

        .step-result {
          margin-bottom: 16px;
        }

        .result-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .result-content {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 12px;
        }

        .result-text {
          font-size: 13px;
          color: #374151;
          margin: 0;
          line-height: 1.5;
        }

        .result-json {
          font-size: 12px;
          color: #374151;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .step-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .error-message {
          font-size: 13px;
          color: #dc2626;
        }

        .step-metadata {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .metadata-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .metadata-label {
          font-size: 12px;
          color: #6b7280;
        }

        .metadata-value {
          font-size: 12px;
          font-weight: 500;
        }

        .status-pending {
          color: #6b7280;
        }

        .status-active {
          color: #3b82f6;
        }

        .status-completed {
          color: #10b981;
        }

        .status-error {
          color: #dc2626;
        }

        .flow-suggestions {
          padding: 20px;
          border-top: 1px solid #f3f4f6;
          background: #fefce8;
        }

        .suggestions-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
        }

        .suggestion-icon {
          font-size: 16px;
        }

        .suggestion-text {
          font-size: 13px;
          color: #374151;
        }

        @media (max-width: 768px) {
          .flow-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .header-right {
            align-self: flex-end;
          }

          .flow-controls {
            justify-content: flex-end;
          }

          .step-header {
            padding: 12px;
          }

          .step-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .details-content {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnalysisFlow;
