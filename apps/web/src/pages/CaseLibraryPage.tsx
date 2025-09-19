import React, { useState, useCallback, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLocalCases } from '../hooks/useLocalCases';
import DownloadModal, { DownloadOption } from '../components/DownloadModal';
import { pdfGenerator } from '../services/pdfGenerator';
import { pngGenerator } from '../services/pngGenerator';
import { 
  IconSearch, 
  IconCalendar, 
  IconTag,
  IconTrash,
  IconEye,
  IconDownload,
  IconTrendingUp,
  IconSparkles,
  IconBooks
} from '@tabler/icons-react';

const CaseLibraryPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { 
    cases, 
    statistics, 
    isLoading, 
    searchCases, 
    deleteCase,
    refreshCases 
  } = useLocalCases();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filteredCases, setFilteredCases] = useState(cases);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // 搜索和筛选逻辑
  const applyFilters = useCallback(() => {
    let result = [...cases];

    // 搜索筛选
    if (searchQuery.trim()) {
      result = searchCases(searchQuery.trim());
    }

    // 标签筛选
    if (selectedTag !== 'all') {
      result = result.filter(caseItem => 
        caseItem.tags.includes(selectedTag)
      );
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredCases(result);
  }, [cases, searchQuery, selectedTag, sortBy, searchCases]);

  // 应用筛选
  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // 删除案例
  const handleDeleteCase = useCallback((caseId: string) => {
    console.log('删除案例被调用，案例ID:', caseId);
    if (window.confirm('确定要删除这个案例吗？')) {
      console.log('用户确认删除，开始删除案例');
      deleteCase(caseId);
      refreshCases();
      console.log('案例删除完成');
    } else {
      console.log('用户取消删除');
    }
  }, [deleteCase, refreshCases]);

  // 查看案例详情 - 跳转到分析详情页面
  const handleViewCase = useCallback((caseId: string) => {
    navigate(`/analysis-detail?id=${caseId}`);
  }, [navigate]);

  // 打开下载模态框
  const handleDownloadCase = useCallback((caseItem: any) => {
    console.log('📥 下载按钮被点击，案例:', caseItem.title);
    setSelectedCase(caseItem);
    setShowDownloadModal(true);
  }, []);

  // 处理下载
  const handleDownload = useCallback(async (option: DownloadOption) => {
    console.log('🚀 handleDownload 被调用了！', option);
    
    if (!selectedCase) {
      console.log('❌ 没有选中的案例');
      return;
    }

    setIsDownloading(true);
    
    try {
      // 调试：打印案例数据结构
      console.log('=== 下载调试信息 ===');
      console.log('案例标题:', selectedCase.title);
      console.log('案例数据结构:', {
        hasAnalysisData: !!selectedCase.analysisData,
        hasAnalysisResult: !!selectedCase.analysisResult,
        hasOsbornAnalysis: !!selectedCase.osbornAnalysis,
        hasDeepAnalysis: !!selectedCase.deepAnalysis,
        hasDetailedAnalysis: !!selectedCase.detailedAnalysis,
        analysisDataKeys: selectedCase.analysisData ? Object.keys(selectedCase.analysisData) : [],
        analysisResultLength: selectedCase.analysisResult ? selectedCase.analysisResult.length : 0
      });
      
      // 处理分析数据结构
      let osbornAnalysis = null;
      let deepAnalysis = null;
      
      // 检查是否有analysisData字段（基础案例格式）
      if (selectedCase.analysisData) {
        const data = selectedCase.analysisData;
        console.log('analysisData内容:', data);
        
        // 检查是否有有效的分析数据
        if (data.dimension || data.questions || data.insights || data.innovationSchemes) {
          const questions: Record<string, string[]> = {};
          
          // 处理问题数据
          if (data.questions && Array.isArray(data.questions)) {
            questions[data.dimension || '分析维度'] = data.questions;
          } else if (data.questions && typeof data.questions === 'object') {
            Object.assign(questions, data.questions);
          }
          
          // 处理洞察数据
          const insights = Array.isArray(data.insights) ? data.insights : [];
          
          // 处理建议数据
          const suggestions = Array.isArray(data.innovationSchemes) ? data.innovationSchemes : [];
          
          // 创建分析文本
          let analysisText = '';
          if (insights.length > 0) {
            analysisText = insights.join(' ');
          } else if (data.description) {
            analysisText = data.description;
          } else {
            analysisText = `基于${data.dimension || '奥斯本'}维度的分析`;
          }
          
          osbornAnalysis = {
            analysis: analysisText,
            questions: questions,
            suggestions: suggestions,
            insights: insights,
            examples: []
          };
          
          console.log('从analysisData转换的结果:', osbornAnalysis);
          console.log('转换后的统计:', {
            questionsCount: Object.keys(questions).length,
            insightsCount: insights.length,
            suggestionsCount: suggestions.length
          });
        } else {
          console.log('analysisData存在但内容为空:', data);
        }
      }
      
      // 检查是否有osbornAnalysis和deepAnalysis字段（旧格式或双分析格式）
      if (selectedCase.osbornAnalysis) {
        osbornAnalysis = selectedCase.osbornAnalysis;
      }
      if (selectedCase.deepAnalysis) {
        deepAnalysis = selectedCase.deepAnalysis;
      }
      
      // 检查是否有AI分析结果（可能是数组或对象格式）
      if (selectedCase.analysisResult) {
        if (Array.isArray(selectedCase.analysisResult)) {
          // 数组格式：将AI分析结果数组转换为奥斯本分析格式
          const questions: Record<string, string[]> = {};
          const allInsights: string[] = [];
          const allRecommendations: string[] = [];
          const allExamples: string[] = [];
          
          selectedCase.analysisResult.forEach((item: any) => {
            if (item.title && item.description) {
              questions[item.title] = [item.description];
              if (item.insights) allInsights.push(...item.insights);
              if (item.recommendations) allRecommendations.push(...item.recommendations);
              if (item.examples) allExamples.push(...item.examples);
            }
          });
          
          osbornAnalysis = {
            analysis: allInsights.join(' ') || '基于奥斯本九问的深度分析',
            questions: questions,
            suggestions: allRecommendations,
            insights: allInsights,
            examples: allExamples
          };
        } else if (typeof selectedCase.analysisResult === 'object') {
          // 对象格式：直接使用analysisResult作为奥斯本分析
          const result = selectedCase.analysisResult;
          osbornAnalysis = {
            analysis: result.analysis || result.summary || '基于奥斯本九问的分析',
            questions: result.questions || {},
            suggestions: result.suggestions || result.recommendations || [],
            insights: result.insights || [],
            examples: result.examples || []
          };
        }
      }
      
      // 检查是否有detailedAnalysis.osbornDimensions（智能分析格式）
      if (selectedCase.detailedAnalysis?.osbornDimensions) {
        const questions: Record<string, string[]> = {};
        const allInsights: string[] = [];
        const allRecommendations: string[] = [];
        
        selectedCase.detailedAnalysis.osbornDimensions.forEach((dimension: any) => {
          if (dimension.dimension && dimension.questions) {
            questions[dimension.dimension] = dimension.questions;
            if (dimension.insights) allInsights.push(...dimension.insights);
            if (dimension.recommendations) allRecommendations.push(...dimension.recommendations);
          }
        });
        
        osbornAnalysis = {
          analysis: allInsights.join(' ') || '基于奥斯本九问的智能分析',
          questions: questions,
          suggestions: allRecommendations,
          insights: allInsights,
          examples: []
        };
      }
      
      // 如果没有分析数据，创建一个基本的分析结构
      if (!osbornAnalysis && !deepAnalysis) {
        osbornAnalysis = {
          analysis: '暂无详细分析数据',
          questions: {},
          suggestions: []
        };
      }
      
      // 调试：打印转换后的分析数据
      console.log('转换后的分析数据:', {
        hasOsbornAnalysis: !!osbornAnalysis,
        hasDeepAnalysis: !!deepAnalysis,
        osbornQuestionsCount: osbornAnalysis ? Object.keys(osbornAnalysis.questions || {}).length : 0,
        osbornSuggestionsCount: osbornAnalysis ? (osbornAnalysis.suggestions || []).length : 0,
        osbornInsightsCount: osbornAnalysis ? (osbornAnalysis.insights || []).length : 0
      });

      const downloadOptions = {
        title: selectedCase.title,
        description: selectedCase.description,
        tags: selectedCase.tags || [],
        createdAt: new Date(selectedCase.createdAt).toLocaleString('zh-CN'),
        analysis: {
          osbornAnalysis,
          deepAnalysis
        },
        type: option.type as 'report' | 'card'
      };

      if (option.format === 'pdf') {
        if (option.type === 'report') {
          pdfGenerator.generateReport(downloadOptions);
        } else if (option.type === 'single-card') {
          pdfGenerator.generateSingleCard(downloadOptions, option.dimension);
        } else {
          pdfGenerator.generateCard(downloadOptions);
        }
      } else if (option.format === 'png') {
        if (option.type === 'single-card') {
          await pngGenerator.generateSingleCard(downloadOptions, option.dimension);
        } else {
          await pngGenerator.generateCard(downloadOptions);
        }
      }

      console.log('下载成功:', selectedCase.title, option.name);
      setShowDownloadModal(false);
      
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    } finally {
      setIsDownloading(false);
    }
  }, [selectedCase]);

  // 关闭下载模态框
  const handleCloseDownloadModal = useCallback(() => {
    setShowDownloadModal(false);
    setSelectedCase(null);
  }, []);

  // 开始新分析
  const handleStartAnalysis = useCallback(() => {
    navigate('/osborn-analysis');
  }, [navigate]);

  // 获取所有标签 - 使用useMemo优化性能
  const allTags = useMemo(() => 
    Array.from(new Set(cases.flatMap(c => c.tags))), 
    [cases]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载案例库中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-xl shadow-green-500/20">
            <IconBooks size={28} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            本地案例库
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            管理您的创新分析案例，随时回顾和分享您的分析成果
          </p>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{statistics.totalCases}</div>
              <div className="text-sm text-gray-600">总案例数</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">{statistics.recentCases}</div>
              <div className="text-sm text-gray-600">本周新增</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">{allTags.length}</div>
              <div className="text-sm text-gray-600">标签数量</div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 shadow-xl shadow-gray-200/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 搜索框 */}
            <div className="md:col-span-2">
              <div className="relative">
                <IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索案例标题、描述或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 标签筛选 */}
            <div>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="选择标签" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  <SelectItem value="all">所有标签</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 排序 */}
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  <SelectItem value="newest">最新创建</SelectItem>
                  <SelectItem value="oldest">最早创建</SelectItem>
                  <SelectItem value="title">按标题</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 案例列表 */}
        {filteredCases.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <IconBooks size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {cases.length === 0 ? '暂无案例' : '没有找到匹配的案例'}
            </h3>
            <p className="text-gray-600 mb-6">
              {cases.length === 0 
                ? '开始您的第一个奥斯本分析，创建您的案例库' 
                : '尝试调整搜索条件或筛选器'
              }
            </p>
            <Button 
              onClick={handleStartAnalysis}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl"
            >
              <IconSparkles size={16} className="mr-2" />
              开始新分析
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem) => (
              <Card 
                key={caseItem.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl"
                onClick={() => handleViewCase(caseItem.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {caseItem.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1 ml-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCase(caseItem.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-red-600 hover:text-red-700"
                      >
                        <IconTrash size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {caseItem.description}
                  </p>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {caseItem.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        {tag}
                      </Badge>
                    ))}
                    {caseItem.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{caseItem.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <IconCalendar size={14} className="mr-1" />
                      {new Date(caseItem.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <IconTag size={14} className="mr-1" />
                      {caseItem.industry || '创新分析'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        console.log('👁️ 查看详情按钮被点击了！', caseItem.title);
                        e.preventDefault();
                        e.stopPropagation();
                        handleViewCase(caseItem.id);
                      }}
                      className="rounded-xl"
                    >
                      <IconEye size={14} className="mr-1" />
                      查看详情
                    </Button>
                    
                    <div 
                      className="flex items-center space-x-1"
                      onClick={(e) => {
                        console.log('📦 按钮容器被点击了！', caseItem.title);
                        e.stopPropagation();
                      }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          console.log('🔥 下载按钮被点击了！', caseItem.title);
                          e.preventDefault();
                          e.stopPropagation();
                          handleDownloadCase(caseItem);
                        }}
                        onMouseDown={() => console.log('🖱️ 下载按钮鼠标按下')}
                        onMouseUp={() => console.log('🖱️ 下载按钮鼠标抬起')}
                        className="p-2"
                        title={`下载 ${caseItem.title} 的分析报告`}
                        style={{ pointerEvents: 'auto', zIndex: 10 }}
                      >
                        <IconDownload size={14} className="text-gray-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 热门标签 */}
        {statistics.topTags.length > 0 && (
          <div className="mt-12">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconTrendingUp size={20} className="mr-2 text-green-600" />
                  热门标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {statistics.topTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition-colors duration-200 cursor-pointer"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag} ({statistics.byTag[tag] || 0})
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 下载模态框 */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={handleCloseDownloadModal}
        onDownload={handleDownload}
        caseTitle={selectedCase?.title || ''}
        isLoading={isDownloading}
        analysisData={selectedCase}
      />
    </div>
  );
});

CaseLibraryPage.displayName = 'CaseLibraryPage';

export default CaseLibraryPage;
