import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          测试页面
        </h1>
        <p className="text-lg text-gray-600">
          如果你能看到这个页面，说明路由和组件渲染正常工作。
        </p>
      </div>
    </div>
  );
};

export default TestPage;
