import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "../ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, Calendar, Hash } from "lucide-react";

interface CaseStudy {
  id: string;
  topic: string;
  description: string;
  timestamp: Date;
  category: string;
  tags: string[];
  analysisMode: "ai" | "local";
  totalScore: number;
}

interface CaseBrowserProps {
  cases: CaseStudy[];
  onSelectCase: (caseId: string) => void;
  className?: string;
}

export function CaseBrowser({ cases, onSelectCase, className }: CaseBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

  const categories = Array.from(new Set(cases.map(caseItem => caseItem.category))).filter(Boolean);
  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || caseItem.category === selectedCategory;
    const matchesMode = selectedMode === "all" || caseItem.analysisMode === selectedMode;

    return matchesSearch && matchesCategory && matchesMode;
  });

  return (
    <div className={cn("space-y-6", className)}>
      {/* 搜索和筛选区域 */}
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>案例库</GlassCardTitle>
          <GlassCardDescription>
            浏览历史分析案例，支持搜索和筛选
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索案例主题、描述或标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-input"
              />
            </div>

            {/* 筛选器 */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">分类:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border border-gray-200 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">全部</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">模式:</span>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="bg-transparent border border-gray-200 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">全部</option>
                  <option value="ai">AI分析</option>
                  <option value="local">本地分析</option>
                </select>
              </div>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* 案例列表 */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCases.length === 0 ? (
          <GlassCard>
            <GlassCardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">未找到匹配的案例</p>
              <p className="text-sm text-muted-foreground mt-2">
                尝试调整搜索条件或创建新的分析案例
              </p>
            </GlassCardContent>
          </GlassCard>
        ) : (
          filteredCases.map(caseItem => (
            <GlassCard
              key={caseItem.id}
              className="cursor-pointer hover:scale-[1.02] transition-all duration-300"
              onClick={() => onSelectCase(caseItem.id)}
            >
              <GlassCardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{caseItem.topic}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {caseItem.description}
                    </p>
                  </div>
                  <Badge
                    variant={caseItem.analysisMode === "ai" ? "default" : "secondary"}
                    className="ml-4"
                  >
                    {caseItem.analysisMode === "ai" ? "AI分析" : "本地分析"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {caseItem.timestamp.toLocaleDateString()}
                    </div>
                    
                    {caseItem.category && (
                      <div className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        {caseItem.category}
                      </div>
                    )}

                    {caseItem.totalScore > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-success"></span>
                        评分: {caseItem.totalScore.toFixed(1)}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1">
                    {caseItem.tags.slice(0, 3).map(tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {caseItem.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{caseItem.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>
          ))
        )}
      </div>

      {/* 统计信息 */}
      {filteredCases.length > 0 && (
        <GlassCard>
          <GlassCardContent className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              显示 {filteredCases.length} 个案例（共 {cases.length} 个）
            </p>
          </GlassCardContent>
        </GlassCard>
      )}
    </div>
  );
}