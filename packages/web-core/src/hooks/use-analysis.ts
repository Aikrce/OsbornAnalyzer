import { useState, useCallback } from 'react';
import type { 
  DeepAnalysisResult, 
  OsbornAnalysisResult, 
  AnalysisConfig, 
  CaseStudy,
  // AnalysisMode 
} from '@osborn/shared';

interface UseAnalysisReturn {
  deepAnalysis: DeepAnalysisResult | null;
  osbornAnalysis: OsbornAnalysisResult | null;
  loading: boolean;
  error: string | null;
  analyze: (config: AnalysisConfig) => Promise<void>;
  reset: () => void;
}

export default function useAnalysis(): UseAnalysisReturn {
  const [deepAnalysis, setDeepAnalysis] = useState<DeepAnalysisResult | null>(null);
  const [osbornAnalysis, setOsbornAnalysis] = useState<OsbornAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const analyze = useCallback(async (config: AnalysisConfig) => {
    if (!config.topic.trim()) {
      setError('请输入主题');
      return;
    }

    if (config.analysisMode === 'ai' && !config.apiKey?.trim()) {
      setError('AI分析需要API Key');
      return;
    }

    setLoading(true);
    setError(null);
    setDeepAnalysis(null);
    setOsbornAnalysis(null);

    try {
      if (config.analysisMode === 'ai') {
        // AI分析逻辑
        const [deepResult, osbornResult] = await Promise.all([
          performAIDeepAnalysis(config),
          performAIOsbornAnalysis(config)
        ]);
        
        setDeepAnalysis(deepResult);
        setOsbornAnalysis(osbornResult);
      } else {
        // 本地分析逻辑
        const cases = getLocalCases();
        const similarCases = findSimilarCases(config.topic, cases);
        
        if (similarCases.length === 0) {
          setError('案例库中没有找到相似案例，请先进行AI分析积累案例');
          return;
        }
        
        const [deepResult, osbornResult] = await Promise.all([
          performLocalDeepAnalysis(config.topic, similarCases),
          performLocalOsbornAnalysis(config.topic, similarCases)
        ]);
        
        setDeepAnalysis(deepResult);
        setOsbornAnalysis(osbornResult);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '分析失败，请重试';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setDeepAnalysis(null);
    setOsbornAnalysis(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    deepAnalysis,
    osbornAnalysis,
    loading,
    error,
    analyze,
    reset
  };
}

// 工具函数
const getLocalCases = (): CaseStudy[] => {
  return JSON.parse(localStorage.getItem('caseLibrary') || '[]');
};

const findSimilarCases = (topic: string, cases: CaseStudy[]): CaseStudy[] => {
  const topicKeywords = extractKeywords(topic || "");
  const topicDomain = classifyDomain(topic);
  
  return cases
    .map(caseItem => {
      const caseKeywords = extractKeywords(caseItem.topic || "");
      const keywordMatch = topicKeywords.filter(k => 
        caseKeywords.some(ck => ck.includes(k) || k.includes(ck))
      ).length / topicKeywords.length;
      
      const domainMatch = caseItem.domain === topicDomain ? 1 : 0;
      const totalScore = keywordMatch * 0.7 + domainMatch * 0.3;
      
      return { caseItem, score: totalScore };
    })
    .filter(item => item.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.caseItem);
};

const extractKeywords = (text: string): string[] => {
  return text.split(/[\s,，。！？]/).filter(word => word.length > 1);
};

const classifyDomain = (text: string): string => {
  if (text.includes('科技') || text.includes('技术') || text.includes('AI')) return '科技';
  if (text.includes('教育') || text.includes('学习')) return '教育';
  if (text.includes('医疗') || text.includes('健康')) return '医疗';
  if (text.includes('金融') || text.includes('投资')) return '金融';
  return '其他';
};

// 模拟AI分析函数
const performAIDeepAnalysis = async (config: AnalysisConfig): Promise<DeepAnalysisResult> => {
  // 这里应该调用实际的AI API
  await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟API调用
  
  return {
    topic: config.topic,
    analysisMode: 'ai',
    results: [
      { type: "keyword-analysis", id: "keyword-analysis", title: "关键词分析", description: "核心概念提取", insights: [`${config.topic}的核心概念分析`], score: 85 },
      { type: "domain-insights", id: "domain-insights", title: "领域洞察", description: "行业特点分析", insights: [`${config.topic}领域的特点分析`], score: 78 },
      { type: "market-trends", id: "market-trends", title: "市场趋势", description: "市场发展趋势", insights: [`${config.topic}市场趋势分析`], score: 92 },
      { type: "technology-development", id: "technology-development", title: "技术发展", description: "技术发展趋势", insights: [`${config.topic}技术发展分析`], score: 88 },
      { type: "user-needs", id: "user-needs", title: "用户需求", description: "用户需求分析", insights: [`${config.topic}用户需求分析`], score: 75 },
      { type: "competition-analysis", id: "competition-analysis", title: "竞争分析", description: "竞争格局分析", insights: [`${config.topic}竞争分析`], score: 82 },
      { type: "innovation-opportunities", id: "innovation-opportunities", title: "创新机会", description: "创新机会识别", insights: [`${config.topic}创新机会分析`], score: 90 },
      { type: "risk-assessment", id: "risk-assessment", title: "风险评估", description: "风险识别评估", insights: [`${config.topic}风险评估`], score: 73 },
      { type: "implementation-suggestions", id: "implementation-suggestions", title: "实施建议", description: "实施路径建议", insights: [`${config.topic}实施建议`], score: 87 }
    ]
  };
};

const performAIOsbornAnalysis = async (config: AnalysisConfig): Promise<OsbornAnalysisResult> => {
  // 这里应该调用实际的AI API
  await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟API调用
  
  return {
    topic: config.topic,
    analysisMode: 'ai',
    results: [
      { type: "other-uses", id: "other-uses", title: "其他用途", description: "跨界应用分析", insights: [`${config.topic}的其他用途分析`], score: 88 },
      { type: "adapt", id: "adapt", title: "借用", description: "借鉴经验分析", insights: [`${config.topic}的借用分析`], score: 85 },
      { type: "modify", id: "modify", title: "改变", description: "形态改变分析", insights: [`${config.topic}的改变分析`], score: 82 },
      { type: "magnify", id: "magnify", title: "扩大", description: "功能扩展分析", insights: [`${config.topic}的扩大分析`], score: 90 },
      { type: "minify", id: "minify", title: "缩小", description: "精简优化分析", insights: [`${config.topic}的缩小分析`], score: 78 },
      { type: "substitute", id: "substitute", title: "替代", description: "材料替代分析", insights: [`${config.topic}的替代分析`], score: 85 },
      { type: "rearrange", id: "rearrange", title: "重新安排", description: "流程重组分析", insights: [`${config.topic}的重新安排分析`], score: 87 },
      { type: "reverse", id: "reverse", title: "颠倒", description: "反向思考分析", insights: [`${config.topic}的颠倒分析`], score: 83 },
      { type: "combine", id: "combine", title: "组合", description: "功能组合分析", insights: [`${config.topic}的组合分析`], score: 92 }
    ]
  };
};

// 本地分析函数
const performLocalDeepAnalysis = (topic: string, similarCases: CaseStudy[]): DeepAnalysisResult => {
  return {
    topic,
    analysisMode: 'local',
    results: [
      { type: "keyword-analysis", id: "keyword-analysis", title: "关键词分析", description: "基于案例库的关键词匹配", insights: [`基于${similarCases.length}个相似案例的关键词分析`], score: 75 },
      { type: "domain-insights", id: "domain-insights", title: "领域洞察", description: "基于相似案例的领域分析", insights: [`基于案例库的${topic}领域分析`], score: 72 },
      { type: "market-trends", id: "market-trends", title: "市场趋势", description: "基于案例库的市场趋势", insights: [`基于历史案例的${topic}市场趋势`], score: 78 },
      { type: "technology-development", id: "technology-development", title: "技术发展", description: "基于案例库的技术发展", insights: [`基于案例的${topic}技术发展分析`], score: 80 },
      { type: "user-needs", id: "user-needs", title: "用户需求", description: "基于案例库的用户需求", insights: [`基于案例的${topic}用户需求分析`], score: 73 },
      { type: "competition-analysis", id: "competition-analysis", title: "竞争分析", description: "基于案例库的竞争分析", insights: [`基于案例的${topic}竞争分析`], score: 76 },
      { type: "innovation-opportunities", id: "innovation-opportunities", title: "创新机会", description: "基于案例库的创新机会", insights: [`基于案例的${topic}创新机会分析`], score: 82 },
      { type: "risk-assessment", id: "risk-assessment", title: "风险评估", description: "基于案例库的风险评估", insights: [`基于案例的${topic}风险评估`], score: 70 },
      { type: "implementation-suggestions", id: "implementation-suggestions", title: "实施建议", description: "基于案例库的实施建议", insights: [`基于案例的${topic}实施建议`], score: 79 }
    ],
    sourceCases: similarCases.map(caseItem => ({
      id: caseItem.id,
      topic: caseItem.topic || "",
      similarity: 0.8,
      matchTypes: ['keyword', 'domain']
    }))
  };
};

const performLocalOsbornAnalysis = (topic: string, similarCases: CaseStudy[]): OsbornAnalysisResult => {
  return {
    topic,
    analysisMode: 'local',
    results: [
      { type: "other-uses", id: "other-uses", title: "其他用途", description: "基于案例库的其他用途", insights: [`基于案例的${topic}其他用途分析`], score: 80 },
      { type: "adapt", id: "adapt", title: "借用", description: "基于案例库的借用", insights: [`基于案例的${topic}借用分析`], score: 78 },
      { type: "modify", id: "modify", title: "改变", description: "基于案例库的改变", insights: [`基于案例的${topic}改变分析`], score: 75 },
      { type: "magnify", id: "magnify", title: "扩大", description: "基于案例库的扩大", insights: [`基于案例的${topic}扩大分析`], score: 82 },
      { type: "minify", id: "minify", title: "缩小", description: "基于案例库的缩小", insights: [`基于案例的${topic}缩小分析`], score: 76 },
      { type: "substitute", id: "substitute", title: "替代", description: "基于案例库的替代", insights: [`基于案例的${topic}替代分析`], score: 79 },
      { type: "rearrange", id: "rearrange", title: "重新安排", description: "基于案例库的重新安排", insights: [`基于案例的${topic}重新安排分析`], score: 81 },
      { type: "reverse", id: "reverse", title: "颠倒", description: "基于案例库的颠倒", insights: [`基于案例的${topic}颠倒分析`], score: 77 },
      { type: "combine", id: "combine", title: "组合", description: "基于案例库的组合", insights: [`基于案例的${topic}组合分析`], score: 85 }
    ],
    sourceCases: similarCases.map(caseItem => ({
      id: caseItem.id,
      topic: caseItem.topic || "",
      similarity: 0.8,
      matchTypes: ['keyword', 'domain']
    }))
  };
};
