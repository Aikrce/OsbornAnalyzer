import React, { useState, useCallback, memo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAnalysis } from '../hooks/useAnalysis';
import { useLocalCases } from '../hooks/useLocalCases';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  IconArrowLeft, 
  IconBookmark, 
  IconCheck,
  IconSparkles,
  
  IconTarget,
  
  IconBulb
} from '@tabler/icons-react';

const OsbornAnalysisPage: React.FC = memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = searchParams.get('topic') || '';
  const { results, isLoading, error, analyze } = useAnalysis();
  const { createCaseFromAnalysis } = useLocalCases();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [analysisContext, setAnalysisContext] = useState({
    industry: '',
    targetAudience: '',
    businessModel: '',
    budget: '',
    timeline: '',
    goals: [] as string[],
    constraints: [] as string[]
  });

  const handleGoBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // const handleAnalyze = useCallback(async () => {
  // if (!topic.trim()) return;
    
  // await analyze(topic, analysisContext);
  // }, [topic, analysisContext, analyze]);

  const handleSaveToCases = useCallback(async () => {
    if (results.length === 0) return;

    try {
      setIsSaving(true);
      const result = results[0];
      if (!result) return;
      
      await createCaseFromAnalysis(topic, result, {
        description: `基于奥斯本九问的${topic}创新分析`,
        industry: analysisContext.industry || '创新分析',
        company: '用户分析',
        tags: ['奥斯本九问', '创新思维', topic, analysisContext.industry].filter(Boolean)
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsSaving(false);
    }
  }, [results, topic, analysisContext, createCaseFromAnalysis]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">正在生成奥斯本九问分析...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">分析失败: {error}</p>
            <Button onClick={handleGoBack} variant="outline">
              <IconArrowLeft size={16} className="mr-2" />
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const result = results[0];
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">分析结果加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={handleGoBack} 
              variant="outline" 
              className="rounded-xl"
            >
              <IconArrowLeft size={16} className="mr-2" />
              返回首页
            </Button>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSaveToCases}
                disabled={isSaving}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isSaving ? (
                  <LoadingSpinner />
                ) : saveSuccess ? (
                  <IconCheck size={16} className="mr-2" />
                ) : (
                  <IconBookmark size={16} className="mr-2" />
                )}
                {saveSuccess ? '已保存' : '保存到案例库'}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {topic} - 奥斯本九问分析
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于奥斯本检核表法的创新思维探索，从九个维度全面分析创新可能性
            </p>
          </div>
        </div>

        {/* 分析配置 */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <IconTarget size={20} className="mr-3 text-green-600" />
                分析配置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">行业</label>
                  <Select value={analysisContext.industry} onValueChange={(value) => setAnalysisContext(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="选择行业" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="科技">科技</SelectItem>
                      <SelectItem value="教育">教育</SelectItem>
                      <SelectItem value="医疗">医疗</SelectItem>
                      <SelectItem value="金融">金融</SelectItem>
                      <SelectItem value="零售">零售</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">目标用户</label>
                  <Input
                    placeholder="输入目标用户"
                    value={analysisContext.targetAudience}
                    onChange={(e) => setAnalysisContext(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">商业模式</label>
                  <Input
                    placeholder="输入商业模式"
                    value={analysisContext.businessModel}
                    onChange={(e) => setAnalysisContext(prev => ({ ...prev, businessModel: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 分析结果 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：主要分析内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 奥斯本九问 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <IconSparkles size={24} className="mr-3 text-blue-600" />
                  分析维度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(result.questions || {}).map(([category, questions], categoryIndex) => (
                    <div key={category} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold mr-3">
                          {categoryIndex + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-blue-900">{category}</h3>
                      </div>
                      <ul className="space-y-2">
                        {questions.map((question, qIndex) => (
                          <li key={qIndex} className="text-sm text-blue-800 flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 综合分析 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <IconBulb size={24} className="mr-3 text-purple-600" />
                  综合分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.analysis || '基于奥斯本九问的全面分析，从多个维度探索创新可能性。'}
                </p>
              </CardContent>
            </Card>

            {/* 创新建议 */}
            {result.suggestions && result.suggestions.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <IconTarget size={20} className="mr-3 text-green-600" />
                    创新建议
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-green-800 text-sm leading-relaxed">{suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 右侧：分析统计 */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">分析统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">分析维度</span>
                    <span className="font-bold text-blue-600">
                      {Object.keys(result.questions || {}).length} 个
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">问题总数</span>
                    <span className="font-bold text-green-600">
                      {Object.values(result.questions || {}).flat().length} 个
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">分析评分</span>
                    <span className="font-bold text-purple-600">
                      {result.totalScore || 0}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">分析质量</span>
                    <Badge variant="secondary" className="rounded-full">
                      {result.quality || '未知'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">置信度</span>
                    <span className="font-bold text-orange-600">
                      {Math.round(((result as any).confidence || 0) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});

OsbornAnalysisPage.displayName = 'OsbornAnalysisPage';

export default OsbornAnalysisPage;
