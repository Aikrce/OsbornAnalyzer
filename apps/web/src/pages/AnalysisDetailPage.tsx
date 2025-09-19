import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import { useAnalysisState } from '../hooks/useAnalysisState';
import { useLocalCases } from '../hooks/useLocalCases';
import { unifiedDataManager } from '../services/data/unifiedDataManager';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  IconArrowLeft, 
  IconChartPie, 
  IconBrain,
  IconSparkles,
  IconClock,
  IconCheck
} from '@tabler/icons-react';
import { cleanTextComprehensive, cleanOsbornAnalysis, cleanDeepAnalysis } from '../utils/textCleaner';

// 奥斯本九问维度配置
const OSBORN_ANALYSIS_DIMENSIONS = {
  '能否他用？': { title: '能否他用？', icon: '🎯', color: 'text-red-600' },
  '能否借用？': { title: '能否借用？', icon: '🔧', color: 'text-purple-600' },
  '能否修改？': { title: '能否修改？', icon: '⚡', color: 'text-orange-600' },
  '能否扩大？': { title: '能否扩大？', icon: '📈', color: 'text-green-600' },
  '能否缩小？': { title: '能否缩小？', icon: '📉', color: 'text-blue-600' },
  '能否替代？': { title: '能否替代？', icon: '🔄', color: 'text-indigo-600' },
  '能否调整？': { title: '能否调整？', icon: '🔧', color: 'text-gray-600' },
  '能否颠倒？': { title: '能否颠倒？', icon: '↕️', color: 'text-pink-600' },
  '能否组合？': { title: '能否组合？', icon: '🔗', color: 'text-teal-600' }
};

// 将LocalCase转换为DualAnalysisResult格式
const convertLocalCaseToDualResult = (caseItem: any) => {
  const analysisData = caseItem.analysisData || {};
  
  return {
    analysisId: caseItem.id,
    topic: caseItem.topic,
    timestamp: caseItem.createdAt,
    analysisType: caseItem.id.startsWith('osborn-') ? 'local' : 'api',
    osbornAnalysis: {
      id: caseItem.id,
      title: caseItem.title,
      description: caseItem.description,
      question: caseItem.topic,
      analysis: `基于奥斯本${analysisData.dimension || '九问'}维度的${caseItem.topic}分析`,
      suggestions: analysisData.innovationSchemes || [],
      questions: analysisData.questions || {},
      summary: `${caseItem.topic}的${analysisData.dimension || '奥斯本'}分析，提供了${(analysisData.insights || []).length}个关键洞察和${(analysisData.innovationSchemes || []).length}个创新方案`,
      totalScore: 85,
      quality: 'high' as const,
      timestamp: caseItem.createdAt,
      createdAt: caseItem.createdAt,
      updatedAt: caseItem.updatedAt,
      insights: {
        keyOpportunities: analysisData.insights || [],
        potentialRisks: ['市场竞争', '技术风险', '用户接受度'],
        marketTrends: ['数字化转型', '创新驱动', '用户需求变化'],
        competitiveAdvantages: ['技术领先', '创新思维', '市场洞察']
      },
      recommendations: {
        shortTerm: (analysisData.innovationSchemes || []).slice(0, 2),
        mediumTerm: (analysisData.innovationSchemes || []).slice(2, 4),
        longTerm: (analysisData.innovationSchemes || []).slice(4)
      },
      similarCases: [],
      confidence: 0.9,
      detailedAnalysis: {
        osbornDimensions: [{
          dimension: analysisData.dimension || '奥斯本分析',
          questions: analysisData.questions || [],
          insights: analysisData.insights || [],
          innovationSchemes: analysisData.innovationSchemes || [],
          score: 85,
          recommendations: analysisData.innovationSchemes || []
        }],
        crossIndustryInsights: [],
        innovationPatterns: [],
        implementationRoadmap: []
      }
    },
    deepAnalysis: {
      id: `${caseItem.id}-deep`,
      topic: caseItem.topic,
      analysis: `基于奥斯本${analysisData.dimension || '九问'}维度的${caseItem.topic}深度分析`,
      insights: {
        keyOpportunities: analysisData.insights || [],
        potentialRisks: ['市场竞争', '技术风险', '用户接受度'],
        marketTrends: ['数字化转型', '创新驱动', '用户需求变化'],
        competitiveAdvantages: ['技术领先', '创新思维', '市场洞察']
      },
      recommendations: analysisData.innovationSchemes || [],
      marketAnalysis: {
        marketSize: `${caseItem.topic}市场规模持续增长`,
        growthRate: '年增长率预计15-20%',
        keyPlayers: ['行业领导者A', '创新企业B', '技术公司C'],
        marketTrends: ['数字化转型', '用户需求升级', '技术驱动创新']
      },
      technicalAnalysis: {
        currentTech: '现有技术方案分析',
        emergingTech: '新兴技术趋势',
        implementation: '技术实现路径',
        challenges: '技术挑战和解决方案'
      },
      userAnalysis: {
        targetUsers: `${caseItem.topic}的目标用户群体`,
        userNeeds: '用户核心需求分析',
        userJourney: '用户使用流程',
        painPoints: '用户痛点和解决方案'
      },
      businessModel: {
        valueProposition: ['核心价值主张1', '核心价值主张2', '核心价值主张3'],
        revenueStreams: ['收入来源1', '收入来源2', '收入来源3'],
        costStructure: ['主要成本1', '主要成本2', '主要成本3'],
        keyPartnerships: ['合作伙伴1', '合作伙伴2', '合作伙伴3']
      },
      confidence: 0.9,
      quality: 'high' as const,
      timestamp: caseItem.createdAt
    }
  };
};

const AnalysisDetailPage: React.FC = memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { goHome } = useNavigation();
  const { results, isLoading, error } = useAnalysisState();
  const { cases } = useLocalCases();
  
  const analysisId = searchParams.get('id') || '';
  const [currentResult, setCurrentResult] = useState<any>(null);

  // 获取当前分析结果
  useEffect(() => {
    console.log('查找分析结果:', { analysisId, resultsCount: results.length, casesCount: cases.length });
    
    // 首先从分析结果中查找
    let result = results.find(r => r.analysisId === analysisId);
    
    // 如果没找到，从案例库中查找
    if (!result) {
      const caseItem = cases.find(c => c.id === analysisId);
      if (caseItem) {
        // 将LocalCase转换为DualAnalysisResult格式
        result = convertLocalCaseToDualResult(caseItem);
        console.log('从案例库找到并转换的结果:', result);
      }
    }
    
    console.log('最终找到的结果:', result);
    setCurrentResult(result || null);
  }, [results, cases, analysisId]);

  const handleBack = useCallback(() => {
    navigate('/case-library');
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">加载分析详情中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">加载失败</div>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleBack} variant="outline">
            <IconArrowLeft size={16} className="mr-2" />
            返回案例库
          </Button>
        </div>
      </div>
    );
  }

  if (!currentResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">未找到分析结果</h2>
          <p className="text-gray-600 mb-6">分析ID: {analysisId}</p>
          <p className="text-gray-500 mb-6">可能的原因：分析结果不存在或已被删除</p>
          <div className="space-x-4">
            <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
              <IconArrowLeft size={16} className="mr-2" />
              返回首页
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              刷新页面
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const analysisType = currentResult.analysisId.startsWith('api') ? 'API分析' : '本地分析';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <IconArrowLeft size={20} className="mr-2" />
              返回案例库
            </Button>
            
            <div className="flex items-center space-x-3">
              <Badge 
                variant={currentResult.analysisId.startsWith('api') ? 'secondary' : 'default'}
                className={currentResult.analysisId.startsWith('api') ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}
              >
                {analysisType}
              </Badge>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentResult.topic}</h1>
            <p className="text-xl text-gray-600 mb-6">
              {currentResult.analysisId.startsWith('api') ? '基于AI模型的深度分析结果' : '基于本地算法和案例库的分析结果'}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <IconClock size={16} className="mr-1" />
                {new Date(currentResult.timestamp).toLocaleString()}
              </div>
              <div className="flex items-center">
                <IconCheck size={16} className="mr-1" />
                分析完成
              </div>
            </div>
          </div>
        </div>

        {/* 分析结果标签页 */}
        <Tabs defaultValue="osborn" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="osborn" className="flex items-center">
              <IconChartPie size={16} className="mr-2" />
              奥斯本九问分析
            </TabsTrigger>
            <TabsTrigger value="deep" className="flex items-center">
              <IconBrain size={16} className="mr-2" />
              深度分析
            </TabsTrigger>
          </TabsList>

          {/* 奥斯本分析结果 */}
          <TabsContent value="osborn" className="space-y-6">
            {currentResult.osbornAnalysis && currentResult.osbornAnalysis.questions ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(currentResult.osbornAnalysis.questions).map(([category, questions]: [string, any]) => {
                  const dimension = OSBORN_ANALYSIS_DIMENSIONS[category as keyof typeof OSBORN_ANALYSIS_DIMENSIONS];
                  return (
                    <Card key={category} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <span className="text-2xl mr-3">{dimension?.icon || '📋'}</span>
                          <span className={dimension?.color || 'text-gray-600'}>
                            {dimension?.title || category}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Array.isArray(questions) ? questions.map((question: string, index: number) => (
                            <div key={index} className="text-sm text-gray-700 leading-relaxed">
                              <div className="flex items-start">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{cleanTextComprehensive(question)}</span>
                              </div>
                            </div>
                          )) : (
                            <div className="text-sm text-gray-700 leading-relaxed">
                              <div className="flex items-start">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{cleanTextComprehensive(questions)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <IconChartPie size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">暂无奥斯本分析结果</h3>
                  <p className="text-gray-500">该分析可能未包含奥斯本九问分析内容</p>
                </CardContent>
              </Card>
            )}

            {/* 奥斯本分析建议 */}
            {currentResult.osbornAnalysis && currentResult.osbornAnalysis.suggestions && currentResult.osbornAnalysis.suggestions.length > 0 && (
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 shadow-xl shadow-blue-200/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-900 flex items-center">
                    <IconSparkles size={24} className="mr-3 text-blue-600" />
                    创新建议
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentResult.osbornAnalysis.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-blue-800">{cleanTextComprehensive(suggestion)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 深度分析结果 */}
          <TabsContent value="deep" className="space-y-6">
            {currentResult.deepAnalysis ? (
              <div className="space-y-6">
                {/* 分析摘要 */}
                {currentResult.deepAnalysis.analysis && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <IconBrain size={24} className="mr-3 text-purple-600" />
                        分析摘要
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {cleanTextComprehensive(currentResult.deepAnalysis.analysis)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 关键洞察 */}
                {currentResult.deepAnalysis.insights && currentResult.deepAnalysis.insights.length > 0 && (
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 shadow-xl shadow-purple-200/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-purple-900 flex items-center">
                        <IconSparkles size={24} className="mr-3 text-purple-600" />
                        关键洞察
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentResult.deepAnalysis.insights.map((insight: string, index: number) => (
                          <div key={index} className="bg-white/60 p-4 rounded-lg border border-purple-200/30">
                            <div className="flex items-start">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-purple-800 text-sm leading-relaxed">{cleanTextComprehensive(insight)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 行动建议 */}
                {currentResult.deepAnalysis.recommendations && currentResult.deepAnalysis.recommendations.length > 0 && (
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 shadow-xl shadow-green-200/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-green-900 flex items-center">
                        <IconCheck size={24} className="mr-3 text-green-600" />
                        行动建议
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {currentResult.deepAnalysis.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-green-800">{cleanTextComprehensive(recommendation)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <IconBrain size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">暂无深度分析结果</h3>
                  <p className="text-gray-500">该分析可能未包含深度分析内容</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});

AnalysisDetailPage.displayName = 'AnalysisDetailPage';

export default AnalysisDetailPage;
