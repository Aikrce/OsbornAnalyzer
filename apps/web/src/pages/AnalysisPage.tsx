import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalysis } from '@/hooks/useAnalysis';
import { AnalysisCard, LoadingSpinner, ErrorMessage } from '@web-core/components';

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';
  const { results, isLoading, error, analyze } = useAnalysis();
  const [activeTab, setActiveTab] = useState('analysis');

  useEffect(() => {
    if (topic && results.length === 0) {
      analyze(topic);
    }
  }, [topic, results.length, analyze]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          奥斯本检核表分析
        </h1>
        <p className="text-gray-600">
          基于奥斯本检核表的创新思维分析工具
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analysis">分析结果</TabsTrigger>
          <TabsTrigger value="details">详细信息</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid gap-6">
            {results.map((result) => (
              <AnalysisCard key={result.id} title={result.title}>
                <div className="space-y-4">
                  <p className="text-gray-700">{result.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">分析摘要</h4>
                    <p className="text-sm text-gray-600">{result.summary}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      质量评分: {result.totalScore}/100
                    </span>
                    <span className="text-sm text-gray-500">
                      质量等级: {result.quality}
                    </span>
                  </div>
                </div>
              </AnalysisCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="space-y-6">
            {results.map((result) => (
              <AnalysisCard key={result.id} title={`详细信息 - ${result.title}`}>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">问题分析</h4>
                    <p className="text-gray-700">{result.question}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">分析结果</h4>
                    <p className="text-gray-700">{result.analysis}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">奥斯本九问</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(result.questions).map(([category, questions]) => (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">{category}</h5>
                          <ul className="space-y-1">
                            {questions.map((question, qIndex) => (
                              <li key={qIndex} className="text-sm text-gray-600">
                                • {question}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnalysisCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}