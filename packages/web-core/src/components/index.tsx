// UI组件导出
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';
export { Button, buttonVariants } from './ui/button';
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './ui/dialog';
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from './ui/select';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

// 创建简单的组件
import React from 'react';

export const AnalysisCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-4 border rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
    {message}
  </div>
);

// AI组件暂时禁用，因为缺少依赖的UI组件
// export { default as AIIntegration } from './ai/AIIntegration';
