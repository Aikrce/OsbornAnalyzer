import React, { useState } from "react";
import { ConfigurationPage } from "@/pages/configuration-page";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function App() {
  const { toast } = useToast();

  const handleAnalyze = async (config: any, mode: "ai" | "local") => {
        // 模拟分析过程
    toast({
      title: "分析开始",
      description: `正在使用${mode === "ai" ? "AI" : "本地"}模式分析主题: ${config.topic}`,
    });

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 这里会调用实际的API或本地分析算法
    if (mode === "ai") {
      // 调用AI分析API
          } else {
      // 执行本地分析算法
          }

    toast({
      title: "分析完成",
      description: "分析结果已生成，正在跳转到结果页面...",
    });
  };

  return (
    <div className="App">
      <ConfigurationPage onAnalyze={handleAnalyze} />
      <Toaster />
    </div>
  );
}

export default App;