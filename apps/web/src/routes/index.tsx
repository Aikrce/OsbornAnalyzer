import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// 懒加载页面组件 - 添加预加载提示
const HomePage = lazy(() => import('../pages/HomePage'));
const UserPage = lazy(() => import('../pages/UserPage'));
const OsbornAnalysisPage = lazy(() => import('../pages/OsbornAnalysisPage'));
const DeepAnalysisPage = lazy(() => import('../pages/DeepAnalysisPage'));
const CaseLibraryPage = lazy(() => import('../pages/CaseLibraryPage'));
const CollaborationPage = lazy(() => import('../pages/CollaborationPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

// 优化的加载中组件
const PageLoader = ({ message = "加载中..." }: { message?: string }) => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner message={message} />
        <p className="text-gray-500 mt-4">正在加载页面...</p>
      </div>
    </main>
    <Footer />
  </div>
);

// 简化的布局组件
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route 
        path="/home" 
        element={
          <Suspense fallback={<PageLoader message="加载首页..." />}>
            <Layout>
              <HomePage />
            </Layout>
          </Suspense>
        } 
      />
      <Route 
        path="/osborn-analysis" 
        element={
          <Suspense fallback={<PageLoader message="加载奥斯本分析..." />}>
            <Layout>
              <OsbornAnalysisPage />
            </Layout>
          </Suspense>
        } 
      />
      <Route 
        path="/deep-analysis" 
        element={
          <Suspense fallback={<PageLoader message="加载深度分析..." />}>
            <Layout>
              <DeepAnalysisPage />
            </Layout>
          </Suspense>
        } 
      />
      <Route 
        path="/case-library" 
        element={
          <Suspense fallback={<PageLoader message="加载案例库..." />}>
            <Layout>
              <CaseLibraryPage />
            </Layout>
          </Suspense>
        } 
      />
      <Route 
        path="/collaboration" 
        element={
          <Suspense fallback={<PageLoader message="加载协作页面..." />}>
            <Layout>
              <CollaborationPage />
            </Layout>
          </Suspense>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <Suspense fallback={<PageLoader message="加载设置页面..." />}>
            <Layout>
              <SettingsPage />
            </Layout>
          </Suspense>
        } 
      />
      <Route 
        path="/user" 
        element={
          <Suspense fallback={<PageLoader message="加载用户中心..." />}>
            <Layout>
              <UserPage />
            </Layout>
          </Suspense>
        } 
      />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
