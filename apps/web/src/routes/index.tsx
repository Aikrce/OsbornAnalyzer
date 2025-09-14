import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@web-core/components';

// 懒加载页面组件
const HomePage = lazy(() => import('../pages/HomePage'));
const AnalysisPage = lazy(() => import('../pages/AnalysisPage'));
const CollaborationPage = lazy(() => import('../pages/CollaborationPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

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
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
