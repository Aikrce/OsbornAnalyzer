import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TestPage from '../pages/TestPage';

// 简化的路由配置，只包含测试页面

// 简化的路由组件
const AppRoutes: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Routes>
        <Route path='/' element={<TestPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
