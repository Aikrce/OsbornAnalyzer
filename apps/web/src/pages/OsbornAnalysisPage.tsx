import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useDualAnalysis } from '../hooks/useDualAnalysis';
import { useLocalCases } from '../hooks/useLocalCases';
import { useAnalysisState } from '../hooks/useAnalysisState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  IconArrowLeft, 
  IconBookmark, 
  IconShare,
  IconCheck,
  IconSparkles
} from '@tabler/icons-react';

const OsbornAnalysisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { goHome } = useNavigation();
  const navigate = useNavigate();
  const topic = searchParams.get('topic') || '';
  const analysisType = searchParams.get('type') || 'local';
  const { results, isLoading, error, analyze } = useDualAnalysis();
  const { createCaseFromAnalysis, statistics } = useLocalCases();
  const { results: allResults, loadResults } = useAnalysisState();
  // const [activeTab, setActiveTab] = useState('analysis');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // 自动分析
  useEffect(() => {
    if (topic && results.length === 0) {
      analyze(topic, { analysisType: analysisType as 'local' | 'api' });
    }
  }, [topic, results.length, analyze, analysisType]);

  // 加载历史记录
  useEffect(() => {
    loadResults();
  }, [loadResults]);

  // 保存到本地案例库
  const handleSaveToLibrary = useCallback(async () => {
    if (results.length === 0) return;

    try {
      setIsSaving(true);
      const dualResult = results[0]; // 取第一个结果
      const result = dualResult?.osbornAnalysis;
      
      await createCaseFromAnalysis(topic, result, {
        description: `基于奥斯本九问的${topic}创新分析`,
        industry: '创新分析',
        company: '用户分析',
        tags: ['奥斯本分析', '创新思维', topic]
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save case:', err);
    } finally {
      setIsSaving(false);
    }
  }, [topic, results, createCaseFromAnalysis]);

  // 返回首页（现在通过导航栏处理）
  const handleGoBack = useCallback(() => {
    goHome();
  }, [goHome]);

  // 切换到深度分析
  const handleSwitchToDeep = useCallback(() => {
    navigate(`/deep-analysis?topic=${encodeURIComponent(topic)}&type=${analysisType}`);
  }, [navigate, topic, analysisType]);

  // 查看详情
  const handleViewDetails = useCallback(() => {
    setShowHistory(true);
  }, []);

  // 关闭历史记录
  const handleCloseHistory = useCallback(() => {
    setShowHistory(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">正在分析中，请稍候...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">分析失败</div>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
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
  const result = dualResult?.osbornAnalysis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
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
                    : 'bg-blue-500 hover:bg-blue-600'
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
                onClick={handleViewDetails}
                variant="outline"
                className="rounded-xl"
              >
                <IconBookmark size={16} className="mr-2" />
                查看详情
              </Button>
              
              <Button
                onClick={handleSwitchToDeep}
                variant="outline"
                className="rounded-xl bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
              >
                <IconSparkles size={16} className="mr-2" />
                深度分析
              </Button>
              
              <Button variant="outline" className="rounded-xl">
                <IconShare size={16} className="mr-2" />
                分享
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl shadow-blue-500/20">
              <IconSparkles size={28} className="text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              奥斯本检核表分析
            </h1>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg shadow-gray-200/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{topic}</h2>
              <p className="text-gray-600">
                基于奥斯本检核表法的系统性创新思考框架，从九个维度全面分析问题
              </p>
            </div>
          </div>
        </div>

        {/* 奥斯本九问分析结果 - 3x3网格布局 */}
        <div className="w-full">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <IconSparkles size={24} className="mr-3 text-blue-600" />
                奥斯本创新九问分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 3x3网格布局 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result?.questions && Object.entries(result.questions).map(([category, analysis], categoryIndex) => (
                  <div key={category} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* 维度标题 */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold mr-3">
                        {categoryIndex + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-blue-900">{category}</h3>
                    </div>
                    
                    {/* 详细分析内容 */}
                    <div className="text-sm text-blue-800 leading-relaxed">
                      <p className="whitespace-pre-line">{analysis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息栏 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            {/* 创新建议和统计 */}
            <div className="space-y-6">

              {/* 创新建议 */}
              {result?.suggestions && result.suggestions.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">创新建议</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result?.suggestions?.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* 统计信息 */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 shadow-xl shadow-blue-200/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-900">分析统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800">分析维度</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {result?.questions ? Object.keys(result.questions).length : 0} 个
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800">问题总数</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {result?.questions ? Object.values(result.questions).flat().length : 0} 个
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800">本地案例</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {statistics.totalCases} 个
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* 历史记录查看模态框 */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">分析历史记录</h2>
              <Button
                onClick={handleCloseHistory}
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                <IconArrowLeft size={16} className="mr-2" />
                关闭
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {allResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">暂无历史记录</div>
                  <p className="text-gray-400">开始您的第一次分析吧！</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allResults.map((result) => (
                    <Card key={result.analysisId} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold text-blue-600">
                            {result.topic}
                          </CardTitle>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            创新分析
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          基于API分析的{result.topic}创新分析
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {new Date(result.timestamp).toLocaleDateString('zh-CN')}
                          </span>
                          <Button
                            onClick={() => {
                              // 跳转到分析详情页面，使用分析ID
                              navigate(`/analysis-detail?id=${result.analysisId}`);
                              handleCloseHistory();
                            }}
                            size="sm"
                            className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                          >
                            查看详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OsbornAnalysisPage;
