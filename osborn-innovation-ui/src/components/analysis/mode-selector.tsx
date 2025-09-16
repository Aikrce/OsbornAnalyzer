import React from "react";
import { cn } from "@/lib/utils";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "../ui/glass-card";
import { Check, Cpu, Database } from "lucide-react";

interface AnalysisModeSelectorProps {
  mode: "ai" | "local";
  onModeChange: (mode: "ai" | "local") => void;
  className?: string;
}

export function AnalysisModeSelector({
  mode,
  onModeChange,
  className,
}: AnalysisModeSelectorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      <ModeCard
        title="AI智能分析"
        description="调用AI模型进行深度分析"
        icon={<Cpu className="w-6 h-6 text-primary" />}
        features={["实时AI分析", "最新信息", "高精度结果"]}
        selected={mode === "ai"}
        onClick={() => onModeChange("ai")}
      />
      
      <ModeCard
        title="本地案例分析"
        description="基于案例库进行智能匹配分析"
        icon={<Database className="w-6 h-6 text-secondary" />}
        features={["无需API Key", "快速分析", "基于历史案例"]}
        selected={mode === "local"}
        onClick={() => onModeChange("local")}
      />
    </div>
  );
}

interface ModeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  selected: boolean;
  onClick: () => void;
}

function ModeCard({
  title,
  description,
  icon,
  features,
  selected,
  onClick,
}: ModeCardProps) {
  return (
    <GlassCard
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-[1.02]",
        selected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
      )}
      onClick={onClick}
      glow={selected}
    >
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <GlassCardTitle>{title}</GlassCardTitle>
          </div>
          {selected && (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <GlassCardDescription>{description}</GlassCardDescription>
      </GlassCardHeader>
      
      <GlassCardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-success" />
              {feature}
            </li>
          ))}
        </ul>
      </GlassCardContent>
    </GlassCard>
  );
}