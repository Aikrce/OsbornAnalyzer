import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useDualAnalysis } from '../hooks/useDualAnalysis';
import { useNavigation } from '../hooks/useNavigation';
import { 
  IconChartPie, 
  IconBrain, 
  IconCheck, 
  IconArrowRight,
  IconSparkles,
  IconClock
} from '@tabler/icons-react';

interface AnalysisProgress {
  osborn: {
    completed: boolean;
    progress: number;
    result?: any;
  };
  deep: {
    completed: boolean;
    progress: number;
    result?: any;
  };
}

const AnalysisProgressPage: React.FC = memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { goHome } = useNavigation();
  const { analyze, results, isLoading, error } = useDualAnalysis();
  
  const topic = searchParams.get('topic') || '';
  const analysisType = searchParams.get('type') || 'local';
  
  const [progress, setProgress] = useState<AnalysisProgress>({
    osborn: { completed: false, progress: 0 },
    deep: { completed: false, progress: 0 }
  });
  
  const [showSelection, setShowSelection] = useState(false);
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'completed' | 'selecting'>('analyzing');

  // 模拟进度更新
  const updateProgress = useCallback((type: 'osborn' | 'deep', progress: number, completed: boolean = false) => {
    setProgress(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        progress: Math.min(100, progress),
        completed
      }
    }));
  }, []);

  // 开始分析
  useEffect(() => {
    if (topic && currentStep === 'analyzing') {
      const startAnalysis = async () => {
        try {
          // 开始奥斯本分析进度
          updateProgress('osborn', 0);
          updateProgress('deep', 0);
          
          // 模拟奥斯本分析进度
          const osbornInterval = setInterval(() => {
            setProgress(prev => {
              const newProgress = prev.osborn.progress + Math.random() * 15;
              if (newProgress >= 100) {
                clearInterval(osbornInterval);
                return {
                  ...prev,
                  osborn: { ...prev.osborn, progress: 100, completed: true }
                };
              }
              return {
                ...prev,
                osborn: { ...prev.osborn, progress: newProgress }
              };
            });
          }, 200);

          // 模拟深度分析进度
          const deepInterval = setInterval(() => {
            setProgress(prev => {
              const newProgress = prev.deep.progress + Math.random() * 10;
              if (newProgress >= 100) {
                clearInterval(deepInterval);
                return {
                  ...prev,
                  deep: { ...prev.deep, progress: 100, completed: true }
                };
              }
              return {
                ...prev,
                deep: { ...prev.deep, progress: newProgress }
              };
            });
          }, 300);

          // 实际执行双重分析 - 确保同时生成奥斯本分析和深度分析结果
          await analyze(topic, { analysisType: analysisType as 'local' | 'api' });

          // 等待所有进度完成
          setTimeout(() => {
            setCurrentStep('completed');
            setTimeout(() => {
              setCurrentStep('selecting');
              setShowSelection(true);
            }, 1000);
          }, 2000);

        } catch (error) {
          console.error('分析失败:', error);
        }
      };

      startAnalysis();
    }
  }, [topic, analysisType, analyze, currentStep, updateProgress]);

  const handleSelectOsborn = useCallback(() => {
    // 跳转到奥斯本分析页面，传递分析类型信息
    navigate(`/osborn-analysis?topic=${encodeURIComponent(topic)}&type=${analysisType}`);
  }, [navigate, topic, analysisType]);

  const handleSelectDeep = useCallback(() => {
    // 跳转到深度分析页面，传递分析类型信息
    navigate(`/deep-analysis?topic=${encodeURIComponent(topic)}&type=${analysisType}`);
  }, [navigate, topic, analysisType]);

  const handleBackToHome = useCallback(() => {
    goHome();
  }, [goHome]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-xl mb-4">分析失败</div>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={handleBackToHome} variant="outline">
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentStep === 'analyzing' && '正在分析中...'}
              {currentStep === 'completed' && '分析完成！'}
              {currentStep === 'selecting' && '选择分析结果'}
            </h1>
            <p className="text-gray-600">
              {currentStep === 'analyzing' && `正在对"${topic}"进行深度分析`}
              {currentStep === 'completed' && '分析已完成，请选择查看结果'}
              {currentStep === 'selecting' && '选择您想要查看的分析结果'}
            </p>
          </div>

          {/* 分析进度 */}
          {currentStep === 'analyzing' && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconSparkles size={24} className="mr-3 text-blue-600" />
                  分析进度
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 奥斯本分析进度 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconChartPie size={20} className="mr-2 text-blue-600" />
                      <span className="font-semibold text-gray-900">奥斯本分析</span>
                    </div>
                    <Badge variant={progress.osborn.completed ? "default" : "secondary"}>
                      {progress.osborn.completed ? '完成' : `${Math.round(progress.osborn.progress)}%`}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress.osborn.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    基于奥斯本九问的创新思维分析
                  </p>
                </div>

                {/* 深度分析进度 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconBrain size={20} className="mr-2 text-purple-600" />
                      <span className="font-semibold text-gray-900">深度分析</span>
                    </div>
                    <Badge variant={progress.deep.completed ? "default" : "secondary"}>
                      {progress.deep.completed ? '完成' : `${Math.round(progress.deep.progress)}%`}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress.deep.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {analysisType === 'api' ? '基于AI模型的智能分析' : '基于本地算法的深度分析'}
                  </p>
                </div>

                {/* 加载指示器 */}
                <div className="flex items-center justify-center pt-4">
                  <LoadingSpinner />
                  <span className="ml-2 text-gray-600">正在处理分析数据...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 分析完成 */}
          {currentStep === 'completed' && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">分析完成！</h2>
                <p className="text-gray-600 mb-6">
                  已成功完成对"{topic}"的奥斯本分析和深度分析
                </p>
                <div className="flex items-center justify-center">
                  <IconCheck size={24} className="text-green-600 mr-2" />
                  <span className="text-green-600 font-semibold">准备就绪</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 选择分析结果 */}
          {currentStep === 'selecting' && showSelection && (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 text-center">
                    选择分析结果
                  </CardTitle>
                  <p className="text-gray-600 text-center">
                    选择您想要查看的分析结果
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 奥斯本分析结果 */}
                    <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">📊</div>
                        <IconChartPie size={32} className="mx-auto mb-4 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">奥斯本分析</h3>
                        <p className="text-gray-600 mb-4">
                          基于奥斯本九问的创新思维分析，提供系统性的创新方向
                          {analysisType === 'api' ? '（AI增强版）' : '（本地算法版）'}
                        </p>
                        <Button 
                          onClick={handleSelectOsborn}
                          className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700"
                        >
                          <IconArrowRight size={16} className="mr-2" />
                          查看奥斯本分析
                        </Button>
                      </CardContent>
                    </Card>

                    {/* 深度分析结果 */}
                    <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">🧠</div>
                        <IconBrain size={32} className="mx-auto mb-4 text-purple-600" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">深度分析</h3>
                        <p className="text-gray-600 mb-4">
                          {analysisType === 'api' 
                            ? '基于AI模型的智能分析，提供深度洞察和建议（AI增强版）'
                            : '基于本地算法的深度分析，提供详细的市场和竞争分析（本地算法版）'
                          }
                        </p>
                        <Button 
                          onClick={handleSelectDeep}
                          className="w-full bg-purple-600 hover:bg-purple-700 group-hover:bg-purple-700"
                        >
                          <IconArrowRight size={16} className="mr-2" />
                          查看深度分析
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 返回首页 */}
                  <div className="text-center mt-6">
                    <Button 
                      onClick={handleBackToHome}
                      variant="outline"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <IconClock size={16} className="mr-2" />
                      返回首页
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

AnalysisProgressPage.displayName = 'AnalysisProgressPage';

export default AnalysisProgressPage;
