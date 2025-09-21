import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

// 懒加载页面组件 - 逐步恢复，避免循环依赖
const TestPage = lazy(() => import('../pages/TestPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
// 暂时注释掉可能有问题的页面
// const UserPage = lazy(() => import('../pages/UserPage'));
// const OsbornAnalysisPage = lazy(() => import('../pages/OsbornAnalysisPage'));
// const DeepAnalysisPage = lazy(() => import('../pages/DeepAnalysisPage'));
// const AnalysisDetailPage = lazy(() => import('../pages/AnalysisDetailPage'));
// const AnalysisProgressPage = lazy(() => import('../pages/AnalysisProgressPage'));
// const CaseLibraryPage = lazy(() => import('../pages/CaseLibraryPage'));
// const CollaborationPage = lazy(() => import('../pages/CollaborationPage'));
// const SettingsPage = lazy(() => import('../pages/SettingsPage'));
// const AIDiagnosticsPage = lazy(() => import('../pages/AIDiagnosticsPage'));

// 优化的加载中组件
const PageLoader = ({ message = '加载中...' }: { message?: string }) => (
  <div className='min-h-screen flex flex-col'>
    <Navigation />
    <main className='flex-1 flex items-center justify-center'>
      <div className='text-center'>
        <LoadingSpinner message={message} />
        <p className='text-gray-500 mt-4'>正在加载页面...</p>
      </div>
    </main>
    <Footer />
  </div>
);

// 简化的布局组件
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Navigation />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载首页...' />}>
                <HomePage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/test'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载测试页面...' />}>
                <TestPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
