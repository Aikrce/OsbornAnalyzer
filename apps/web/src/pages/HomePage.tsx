import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLocalCases } from '../hooks/useLocalCases';
import { 
  IconChartPie, 
  IconBrain, 
  IconBooks, 
  IconUsers,
  IconArrowRight,
  IconSparkles,
  IconTrendingUp,
  
  IconTag
} from '@tabler/icons-react';

const features = [
  {
    icon: <IconChartPie size={28} className="text-blue-600" />,
    title: 'Osborn分析',
    description: '基于奥斯本检核表法的系统性创新思考框架，从九个维度全面分析问题',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    path: '/osborn-analysis'
  },
  {
    icon: <IconBrain size={28} className="text-purple-600" />,
    title: '深度分析',
    description: 'AI驱动的深度创新分析，提供智能洞察、多维度对比和优化建议',
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    path: '/deep-analysis'
  },
  {
    icon: <IconBooks size={28} className="text-green-600" />,
    title: '案例库',
    description: '探索真实创新案例，学习成功经验，为您的创新项目提供参考',
    gradient: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    path: '/case-library'
  },
  {
    icon: <IconUsers size={28} className="text-orange-600" />,
    title: '团队协作',
    description: '支持团队协作，多人共同参与创新分析，集思广益',
    gradient: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    path: '/collaboration'
  }
];

const HomePage: React.FC = memo(() => {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();
  const { cases, statistics, isLoading } = useLocalCases();

  const handleStartAnalysis = useCallback(async () => {
    if (!topic.trim()) return;
    
    try {
      console.log('开始分析:', topic);
      navigate(`/osborn-analysis?topic=${encodeURIComponent(topic)}`);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  }, [topic, navigate]);

  const handleQuickStart = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleCaseClick = useCallback(() => {
    navigate('/case-library');
  }, [navigate]);

  // 获取最近的案例作为推荐
  const recentCases = cases.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 主标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-8 shadow-xl shadow-blue-500/20">
            <IconSparkles size={32} className="text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            奥斯本创新九问
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            智能创新分析平台，基于奥斯本检核表法，结合AI技术，为您的创新项目提供深度洞察和智能建议
          </p>

          {/* 快速开始区域 */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">快速开始分析</h2>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="请输入要分析的主题、产品或想法..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-lg py-4 px-6 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleStartAnalysis()}
                />
                <Button 
                  onClick={handleStartAnalysis}
                  disabled={!topic.trim()}
                  className="w-full py-4 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <IconArrowRight size={20} className="mr-2" />
                  开始奥斯本分析
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl"
              onClick={() => handleQuickStart(feature.path)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 推荐案例 */}
        {recentCases.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">最近分析案例</h2>
              <p className="text-gray-600">查看您最近的创新分析案例</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCases.map((caseItem) => (
                <Card 
                  key={caseItem.id} 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl"
                  onClick={handleCaseClick}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {caseItem.title}
                      </CardTitle>
                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
                        {caseItem.industry || '创新分析'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {caseItem.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {new Date(caseItem.createdAt).toLocaleDateString()}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCaseClick();
                        }}
                        className="rounded-xl"
                      >
                        查看详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 实时统计数据 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">平台统计</h2>
            <p className="text-gray-600">实时更新的数据分析</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconChartPie size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
              <div className="text-gray-600">分析维度</div>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconBooks size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {isLoading ? '...' : statistics.totalCases}
              </div>
              <div className="text-gray-600">本地案例</div>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconTrendingUp size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {isLoading ? '...' : statistics.recentCases}
              </div>
              <div className="text-gray-600">本周新增</div>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconTag size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {isLoading ? '...' : statistics.topTags.length}
              </div>
              <div className="text-gray-600">热门标签</div>
            </div>
          </div>

          {/* 热门标签 */}
          {statistics.topTags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">热门分析标签</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {statistics.topTags.slice(0, 8).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                  >
                    {tag} ({1})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
