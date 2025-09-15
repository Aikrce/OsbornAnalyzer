import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

// 懒加载页面组件
const HomePage = lazy(() => import('../pages/HomePage'));

// 加载中组件
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner message="加载页面中..." />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
