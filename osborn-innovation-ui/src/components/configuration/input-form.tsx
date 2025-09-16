import React from "react";
import { cn } from "@/lib/utils";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "../ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Loader2 } from "lucide-react";

interface InputFormProps {
  mode: "ai" | "local";
  config: {
    topic: string;
    apiKey: string;
    aiModel: string;
    language: string;
  };
  onConfigChange: (key: string, value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  className?: string;
}

export function InputForm({
  mode,
  config,
  onConfigChange,
  onAnalyze,
  loading,
  className,
}: InputFormProps) {
  const isFormValid = config.topic.trim() && (mode === "local" || config.apiKey.trim());

  return (
    <div className={cn("space-y-6", className)}>
      {/* 主题配置区域 */}
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>分析主题配置</GlassCardTitle>
          <GlassCardDescription>
            请输入您想要分析的主题或问题
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">分析主题</Label>
              <Input
                id="topic"
                placeholder="例如：智能家居产品的创新机会"
                value={config.topic}
                onChange={(e) => onConfigChange("topic", e.target.value)}
                className="glass-input"
              />
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* AI配置区域 */}
      {mode === "ai" && (
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>AI配置</GlassCardTitle>
            <GlassCardDescription>
              配置AI分析所需的参数
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="请输入您的API密钥"
                  value={config.apiKey}
                  onChange={(e) => onConfigChange("apiKey", e.target.value)}
                  className="glass-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aiModel">AI模型</Label>
                  <Select
                    value={config.aiModel}
                    onValueChange={(value) => onConfigChange("aiModel", value)}
                  >
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="选择AI模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepseek">DeepSeek</SelectItem>
                      <SelectItem value="kimi">Kimi</SelectItem>
                      <SelectItem value="zhipu">智谱AI</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">语言设置</Label>
                  <Select
                    value={config.language}
                    onValueChange={(value) => onConfigChange("language", value)}
                  >
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      )}

      {/* 操作按钮区域 */}
      <GlassCard>
        <GlassCardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onAnalyze}
              disabled={!isFormValid || loading}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  分析中...
                </>
              ) : (
                `开始${mode === "ai" ? "AI" : "本地"}分析`
              )}
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={() => {
                onConfigChange("topic", "");
                onConfigChange("apiKey", "");
              }}
            >
              重置
            </Button>
          </div>

          {mode === "ai" && !config.apiKey && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
              <p className="text-sm text-warning">
                请填写API Key以使用AI分析功能
              </p>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}