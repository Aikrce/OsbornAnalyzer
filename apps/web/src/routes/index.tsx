import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

// 懒加载页面组件 - 现在循环依赖已修复，可以恢复所有页面
const HomePage = lazy(() => import('../pages/HomePage'));
const UserPage = lazy(() => import('../pages/UserPage'));
const OsbornAnalysisPage = lazy(() => import('../pages/OsbornAnalysisPage'));
const DeepAnalysisPage = lazy(() => import('../pages/DeepAnalysisPage'));
const AnalysisDetailPage = lazy(() => import('../pages/AnalysisDetailPage'));
const AnalysisProgressPage = lazy(
  () => import('../pages/AnalysisProgressPage')
);
const CaseLibraryPage = lazy(() => import('../pages/CaseLibraryPage'));
const CollaborationPage = lazy(() => import('../pages/CollaborationPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const AIDiagnosticsPage = lazy(() => import('../pages/AIDiagnosticsPage'));
const TestPage = lazy(() => import('../pages/TestPage'));

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
          path='/osborn-analysis'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载奥斯本分析...' />}>
                <OsbornAnalysisPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/deep-analysis'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载深度分析...' />}>
                <DeepAnalysisPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/analysis-detail'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载分析详情...' />}>
                <AnalysisDetailPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/analysis-progress'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='准备分析...' />}>
                <AnalysisProgressPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/case-library'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载案例库...' />}>
                <CaseLibraryPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/collaboration'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载协作页面...' />}>
                <CollaborationPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/settings'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载设置页面...' />}>
                <SettingsPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/ai-diagnostics'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载AI诊断...' />}>
                <AIDiagnosticsPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='/user'
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader message='加载用户中心...' />}>
                <UserPage />
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
