import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalysis } from '@web-core/hooks';
import { AnalysisCard, LoadingSpinner, ErrorMessage } from '@web-core/components';
import { performOsbornAnalysis } from '@huitu/shared/algorithms';

const AnalysisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';
  const { results, isLoading, error, analyze } = useAnalysis();
  const [activeTab, setActiveTab] = useState('analysis');

  useEffect(() => {
    if (topic && results.length === 0) {
      analyze(topic);
    }
  }, [topic, results.length, analyze]);

  const handleRetry = () => {
    if (topic) {
      analyze(topic);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message="正在分析中，请稍候..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          分析结果
        </h1>
        <p className="text-lg text-gray-600">
          主题：{topic}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">分析结果</TabsTrigger>
          <TabsTrigger value="insights">深度洞察</TabsTrigger>
          <TabsTrigger value="export">导出结果</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid gap-6">
            {results.map((result, index) => (
              <AnalysisCard
                key={`${result.question}-${index}`}
                result={result}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>深度洞察</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                基于分析结果生成的深度洞察和建议将在这里显示。
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>导出结果</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline">导出PDF</Button>
                <Button variant="outline">导出Word</Button>
                <Button variant="outline">导出Excel</Button>
                <Button variant="outline">导出Markdown</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisPage;
