import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { TopicInput } from '../components/TopicInput';

const HomePage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleStartAnalysis = useCallback(async () => {
    if (!topic.trim()) return;
    
    try {
      // 模拟分析过程
      console.log('开始分析:', topic);
      navigate('/analysis');
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  }, [topic, navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          奥斯本创新九问
        </h1>
        <p className="text-lg text-gray-500">
          基于奥斯本检核表法的创新思维分析工具
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>开始分析</CardTitle>
          <CardDescription>
            输入您要分析的主题，我们将从九个维度为您提供创新思路
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TopicInput
            value={topic}
            onChangeText={setTopic}
            placeholder="例如：智能手机、电动汽车、在线教育..."
          />
          <Button
            onClick={handleStartAnalysis}
            disabled={!topic.trim()}
            className="w-full"
            size="lg"
          >
            开始分析
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">九维度分析</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              基于奥斯本检核表法的系统性创新思考框架
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">案例数据库</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              内置75+真实创新案例，提供参考和启发
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI增强</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              集成AI分析，提供深度洞察和智能建议
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
