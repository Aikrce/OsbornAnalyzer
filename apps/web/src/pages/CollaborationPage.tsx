import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CollaborationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">协作功能</h1>
      <Card>
        <CardHeader>
          <CardTitle>团队协作</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">协作功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationPage;
