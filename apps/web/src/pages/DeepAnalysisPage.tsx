import React, { useState, useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useDualAnalysis } from '../hooks/useDualAnalysis';
import { useLocalCases } from '../hooks/useLocalCases';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  IconArrowLeft, 
  IconBookmark, 
  IconCheck,
  IconSparkles,
  IconTrendingUp,
  IconTarget,
  IconChartBar,
  IconBulb
} from '@tabler/icons-react';

const DeepAnalysisPage: React.FC = memo(() => {
  const [searchParams] = useSearchParams();
  const { goHome } = useNavigation();
  const topic = searchParams.get('topic') || '';
  const analysisType = searchParams.get('type') || 'local';
  const { results, isLoading, error, analyze } = useDualAnalysis();
  const { createCaseFromAnalysis } = useLocalCases();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [analysisContext, setAnalysisContext] = useState({
    industry: '',
    targetAudience: '',
    businessModel: ''
  });

  // 自动分析
  React.useEffect(() => {
    if (topic && results.length === 0) {
      console.log('开始深度分析:', topic, analysisContext);
      analyze(topic, { ...analysisContext, analysisType: analysisType as 'local' | 'api' });
    }
  }, [topic, results.length, analyze, analysisType]);

  // 保存到本地案例库
  const handleSaveToLibrary = useCallback(async () => {
    if (results.length === 0) return;

    try {
      setIsSaving(true);
      const dualResult = results[0];
      const result = dualResult?.deepAnalysis;
      
      if (!result) {
        throw new Error('没有可用的分析结果');
      }
      
      await createCaseFromAnalysis(topic, result, {
        description: `基于深度分析的${topic}创新分析`,
        industry: analysisContext.industry || '创新分析',
        company: '用户分析',
        tags: ['深度分析', '创新思维', topic, analysisContext.industry].filter(Boolean)
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save case:', err);
    } finally {
      setIsSaving(false);
    }
  }, [topic, results, createCaseFromAnalysis, analysisContext]);

  // 重新分析
  const handleReanalyze = useCallback(() => {
    if (topic) {
      analyze(topic, { ...analysisContext, analysisType: analysisType as 'local' | 'api' });
    }
  }, [topic, analyze, analysisContext, analysisType]);

  // 返回首页
  const handleGoBack = useCallback(() => {
    goHome();
  }, [goHome]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">正在进行深度分析，请稍候...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">深度分析失败</div>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleGoBack} variant="outline">
            <IconArrowLeft size={16} className="mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">暂无分析结果</div>
          <Button onClick={handleGoBack} variant="outline">
            <IconArrowLeft size={16} className="mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  const dualResult = results[0];
  const result = dualResult?.deepAnalysis;
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">暂无分析结果</div>
          <Button onClick={handleGoBack} variant="outline">
            <IconArrowLeft size={16} className="mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-end mb-6">
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleSaveToLibrary}
                disabled={isSaving}
                className={`rounded-xl ${
                  saveSuccess 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {isSaving ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">保存中...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <IconCheck size={16} className="mr-2" />
                    已保存
                  </>
                ) : (
                  <>
                    <IconBookmark size={16} className="mr-2" />
                    保存到案例库
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleReanalyze}
                variant="outline" 
                className="rounded-xl"
              >
                <IconSparkles size={16} className="mr-2" />
                重新分析
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-xl shadow-purple-500/20">
              <IconSparkles size={28} className="text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI深度分析
            </h1>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg shadow-gray-200/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{topic}</h2>
              <p className="text-gray-600">
                AI驱动的深度创新分析，提供智能洞察、多维度对比和优化建议
              </p>
            </div>
          </div>
        </div>

        {/* 分析上下文设置 */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">分析上下文</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">行业</label>
                  <Select value={analysisContext.industry} onValueChange={(value) => setAnalysisContext(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="选择行业" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
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
                  {result.analysis}
                </p>
              </CardContent>
            </Card>

            {/* 市场分析 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconChartBar size={20} className="mr-3 text-blue-600" />
                  市场分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-2">市场规模</h4>
                    <p className="text-blue-800">{result.marketAnalysis?.marketSize || '暂无数据'}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-900 mb-2">增长率</h4>
                    <p className="text-green-800">{result.marketAnalysis?.growthRate || '暂无数据'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">主要参与者</h4>
                  <div className="flex flex-wrap gap-2">
                    {(result.marketAnalysis?.keyPlayers || []).map((player: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                        {player}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SWOT分析 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconTarget size={20} className="mr-3 text-green-600" />
                  SWOT分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-900 mb-2">优势 (Strengths)</h4>
                    <ul className="text-green-800 space-y-1">
                      {(result.swotAnalysis?.strengths || []).map((strength: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-red-900 mb-2">劣势 (Weaknesses)</h4>
                    <ul className="text-red-800 space-y-1">
                      {(result.swotAnalysis?.weaknesses || []).map((weakness: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-2">机会 (Opportunities)</h4>
                    <ul className="text-blue-800 space-y-1">
                      {(result.swotAnalysis?.opportunities || []).map((opportunity: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-orange-900 mb-2">威胁 (Threats)</h4>
                    <ul className="text-orange-800 space-y-1">
                      {(result.swotAnalysis?.threats || []).map((threat: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：洞察和建议 */}
          <div className="space-y-6">
            {/* 关键洞察 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconTrendingUp size={20} className="mr-3 text-purple-600" />
                  关键洞察
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">关键机会</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.insights?.keyOpportunities?.map((opportunity: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">潜在风险</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.insights?.potentialRisks?.map((risk: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 实施建议 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconTarget size={20} className="mr-3 text-blue-600" />
                  实施建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">短期 (1-3个月)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.recommendations?.shortTerm?.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">中期 (3-12个月)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.recommendations?.mediumTerm?.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">长期 (1-3年)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.recommendations?.longTerm?.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 分析质量 */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50 shadow-xl shadow-purple-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-900">分析质量</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-800">分析分数</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {result.totalScore}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-800">质量评级</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {result.quality}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-800">置信度</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {Math.round(result.confidence * 100)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-800">相似案例</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {result.similarCases?.length || 0} 个
                    </Badge>
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

DeepAnalysisPage.displayName = 'DeepAnalysisPage';

export default DeepAnalysisPage;
