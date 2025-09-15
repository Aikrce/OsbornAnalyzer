import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "加载中..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
};

export { LoadingSpinner };
