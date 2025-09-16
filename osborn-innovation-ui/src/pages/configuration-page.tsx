import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { AnalysisModeSelector } from "@/components/analysis/mode-selector";
import { InputForm } from "@/components/configuration/input-form";
import { CaseBrowser } from "@/components/case-library/case-browser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Database, Play } from "lucide-react";

interface ConfigurationPageProps {
  onAnalyze: (config: any, mode: "ai" | "local") => void;
  loading?: boolean;
}

export function ConfigurationPage({ onAnalyze, loading = false }: ConfigurationPageProps) {
  const [mode, setMode] = useState<"ai" | "local">("ai");
  const [config, setConfig] = useState({
    topic: "",
    apiKey: "",
    aiModel: "deepseek",
    language: "zh"
  });

  const [mockCases] = useState([
    {
      id: "1",
      topic: "智能家居产品的创新机会",
      description: "分析智能家居市场趋势和产品创新方向",
      timestamp: new Date("2024-01-15"),
      category: "智能家居",
      tags: ["物联网", "AI", "用户体验"],
      analysisMode: "ai" as const,
      totalScore: 8.7
    },
    {
      id: "2",
      topic: "新能源汽车充电解决方案",
      description: "探索新能源汽车充电基础设施的创新模式",
      timestamp: new Date("2024-01-10"),
      category: "新能源汽车",
      tags: ["充电技术", "基础设施", "可持续"],
      analysisMode: "local" as const,
      totalScore: 7.9
    },
    {
      id: "3",
      topic: "远程办公软件功能优化",
      description: "基于用户反馈的远程办公工具功能改进分析",
      timestamp: new Date("2024-01-05"),
      category: "软件工具",
      tags: ["协作", "用户体验", "效率"],
      analysisMode: "ai" as const,
      totalScore: 9.1
    }
  ]);

  const handleConfigChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleAnalyze = () => {
    onAnalyze(config, mode);
  };

  const handleSelectCase = (caseId: string) => {
    const selectedCase = mockCases.find(c => c.id === caseId);
    if (selectedCase) {
      setConfig(prev => ({ ...prev, topic: selectedCase.topic }));
    }
  };

  return (
    <MainLayout className="py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            奥斯本创新分析器
          </h1>
          <p className="text-muted-foreground">
            使用奥斯本创新九问方法，深度分析您的创新主题
          </p>
        </div>

        {/* 分析模式选择器 */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">选择分析模式</h2>
          <AnalysisModeSelector
            mode={mode}
            onModeChange={setMode}
          />
        </div>

        {/* 标签页内容 */}
        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              配置分析
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              案例库
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configuration">
            <InputForm
              mode={mode}
              config={config}
              onConfigChange={handleConfigChange}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="cases">
            <CaseBrowser
              cases={mockCases}
              onSelectCase={handleSelectCase}
            />
          </TabsContent>
        </Tabs>

        {/* 快速操作按钮 */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleAnalyze}
            disabled={!config.topic.trim() || (mode === "ai" && !config.apiKey.trim()) || loading}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg glow-effect transition-all duration-300"
          >
            <Play className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}