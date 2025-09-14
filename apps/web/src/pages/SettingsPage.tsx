import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">设置</h1>
      <Card>
        <CardHeader>
          <CardTitle>应用设置</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">设置功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
