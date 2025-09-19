import React, { useState } from 'react';

interface NetworkErrorHandlerProps {
  error: Error;
  onRetry?: () => void;
  onUseLocalMode?: () => void;
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  error,
  onRetry,
  onUseLocalMode
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const isNetworkError = error.message.includes('网络连接失败') || 
                        error.message.includes('Load failed') ||
                        error.message.includes('TypeError');

  if (!isNetworkError) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            网络连接问题
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>AI服务无法连接到网络，这可能是由于以下原因：</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>网络连接问题</li>
              <li>防火墙或代理设置阻止</li>
              <li>DNS解析失败</li>
              <li>企业网络限制</li>
            </ul>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重试连接
              </button>
            )}
            
            {onUseLocalMode && (
              <button
                onClick={onUseLocalMode}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                使用本地模式
              </button>
            )}
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showDetails ? '隐藏详情' : '查看详情'}
            </button>
          </div>
          
          {showDetails && (
            <div className="mt-4 p-4 bg-red-100 rounded-md">
              <h4 className="text-sm font-medium text-red-800 mb-2">错误详情：</h4>
              <pre className="text-xs text-red-700 whitespace-pre-wrap">
                {error.message}
              </pre>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-red-800 mb-2">建议解决方案：</h4>
                <ol className="text-sm text-red-700 list-decimal list-inside space-y-1">
                  <li>检查网络连接是否正常</li>
                  <li>尝试使用VPN或不同的网络环境</li>
                  <li>检查浏览器代理设置</li>
                  <li>检查防火墙和杀毒软件设置</li>
                  <li>尝试使用不同的浏览器</li>
                  <li>联系网络管理员（如果在企业网络中）</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkErrorHandler;
