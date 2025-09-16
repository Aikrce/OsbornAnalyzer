import React from 'react';

interface SmartSidebarProps {
  mode: string;
  suggestions: any[];
  collaborators: any[];
  relatedCases: any[];
  analysisFlow: any;
  onSuggestionClick: (suggestion: any) => void;
  onCollaboratorClick: (collaborator: any) => void;
  onCaseClick: (caseStudy: any) => void;
  className?: string;
}

const SmartSidebar: React.FC<SmartSidebarProps> = ({
  
  suggestions,
  collaborators,
  relatedCases,
  analysisFlow,
  onSuggestionClick,
  onCollaboratorClick,
  onCaseClick,
  className = ''
}) => {
  return (
    <div className={`smart-sidebar ${className}`}>
      <div className="sidebar-header">
        <h3 className="sidebar-title">智能助手</h3>
      </div>
      
      <div className="sidebar-content">
        <div className="section">
          <h4>智能建议 ({suggestions.length})</h4>
          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="suggestion-item" onClick={() => onSuggestionClick(suggestion)}>
                <h5>{suggestion.title}</h5>
                <p>{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h4>协作者 ({collaborators.length})</h4>
          <div className="collaborators-list">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="collaborator-item" onClick={() => onCollaboratorClick(collaborator)}>
                <h5>{collaborator.name}</h5>
                <p>{collaborator.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h4>相关案例 ({relatedCases.length})</h4>
          <div className="cases-list">
            {relatedCases.map((caseStudy) => (
              <div key={caseStudy.id} className="case-item" onClick={() => onCaseClick(caseStudy)}>
                <h5>{caseStudy.title}</h5>
                <p>{caseStudy.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h4>分析流程</h4>
          <div className="flow-info">
            <p>当前步骤: {analysisFlow.currentStep}</p>
            <p>进度: {analysisFlow.progress}%</p>
          </div>
        </div>
      </div>

      <style>{`
        .smart-sidebar {
          width: 300px;
          background: white;
          border-left: 1px solid #e5e7eb;
          height: 100%;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .sidebar-content {
          padding: 20px;
        }

        .section {
          margin-bottom: 24px;
        }

        .section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .suggestions-list,
        .collaborators-list,
        .cases-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .suggestion-item,
        .collaborator-item,
        .case-item {
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .suggestion-item:hover,
        .collaborator-item:hover,
        .case-item:hover {
          background: #f9fafb;
        }

        .suggestion-item h5,
        .collaborator-item h5,
        .case-item h5 {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .suggestion-item p,
        .collaborator-item p,
        .case-item p {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .flow-info {
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .flow-info p {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 4px 0;
        }
      `}</style>
    </div>
  );
};

export default SmartSidebar;
