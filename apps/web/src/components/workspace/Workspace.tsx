import React from 'react';

interface WorkspaceProps {
  children: React.ReactNode;
  className?: string;
}

const Workspace: React.FC<WorkspaceProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`workspace ${className}`}>
      {children}
      
      <style>{`
        .workspace {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f9fafb;
        }
      `}</style>
    </div>
  );
};

export default Workspace;
