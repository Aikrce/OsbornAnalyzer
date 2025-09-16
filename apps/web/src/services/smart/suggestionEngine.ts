import { 
  SmartSuggestion, 
  WorkspaceMode, 
  AnalysisContext, 
  AnalysisResult,
  CaseStudy,
  Collaborator
} from '@/types/workspace';

interface SuggestionContext {
  mode: WorkspaceMode;
  context: AnalysisContext;
  currentTopic: string;
  analysisResult: AnalysisResult | null;
  collaborators: Collaborator[];
  relatedCases: CaseStudy[];
  userHistory: string[];
  isOnline: boolean;
}

interface SuggestionRule {
  id: string;
  condition: (context: SuggestionContext) => boolean;
  generate: (context: SuggestionContext) => SmartSuggestion;
  priority: 'high' | 'medium' | 'low';
}

class SuggestionEngine {
  private rules: SuggestionRule[] = [];
  private context: SuggestionContext | null = null;

  constructor() {
    this.initializeRules();
  }

  private initializeRules() {
    // 模式切换建议
    this.rules.push({
      id: 'mode_switch_analysis',
      condition: (ctx) => ctx.mode !== 'analysis' && !!ctx.currentTopic && !ctx.analysisResult,
      generate: (_ctx) => ({
        id: 'switch_to_analysis',
        type: 'mode_switch',
        title: '切换到分析模式',
        description: `开始分析"${_ctx.currentTopic}"，使用奥斯本检核表法进行创新思维分析`,
        priority: 'high',
        action: () => {
          // 这里会调用实际的模式切换逻辑
          console.log('切换到分析模式');
        },
        icon: 'Brain',
        metadata: { targetMode: 'analysis' }
      }),
      priority: 'high'
    });

    // AI增强建议
    this.rules.push({
      id: 'ai_enhancement',
      condition: (ctx) => ctx.mode === 'analysis' && ctx.context === 'osborn' && !!ctx.analysisResult,
      generate: (_ctx) => ({
        id: 'ai_enhance',
        type: 'optimization',
        title: 'AI智能增强',
        description: '使用AI对奥斯本分析结果进行深度优化和扩展',
        priority: 'high',
        action: () => {
          console.log('启动AI增强');
        },
        icon: 'Sparkles',
        metadata: { enhancementType: 'ai' }
      }),
      priority: 'high'
    });

    // 协作邀请建议
    this.rules.push({
      id: 'collaboration_invite',
      condition: (ctx) => ctx.mode === 'analysis' && ctx.collaborators.length === 0 && !!ctx.analysisResult,
      generate: (_ctx) => ({
        id: 'invite_collaborators',
        type: 'collaboration',
        title: '邀请协作者',
        description: '邀请团队成员一起完善分析结果，获得更多创新想法',
        priority: 'medium',
        action: () => {
          console.log('打开协作邀请');
        },
        icon: 'Users',
        metadata: { action: 'invite' }
      }),
      priority: 'medium'
    });

    // 案例推荐建议
    this.rules.push({
      id: 'case_recommendation',
      condition: (ctx) => ctx.relatedCases.length > 0 && !!ctx.analysisResult,
      generate: (ctx) => ({
        id: 'view_related_cases',
        type: 'action',
        title: '查看相关案例',
        description: `发现${ctx.relatedCases.length}个相关创新案例，可以学习借鉴`,
        priority: 'medium',
        action: () => {
          console.log('查看相关案例');
        },
        icon: 'BookOpen',
        metadata: { caseCount: ctx.relatedCases.length }
      }),
      priority: 'medium'
    });

    // 离线模式建议
    this.rules.push({
      id: 'offline_mode',
      condition: (ctx) => !ctx.isOnline && ctx.mode === 'analysis',
      generate: (_ctx) => ({
        id: 'enable_offline_mode',
        type: 'optimization',
        title: '启用离线模式',
        description: '网络连接不稳定，建议启用离线模式继续工作',
        priority: 'high',
        action: () => {
          console.log('启用离线模式');
        },
        icon: 'WifiOff',
        metadata: { mode: 'offline' }
      }),
      priority: 'high'
    });

    // 导出分享建议
    this.rules.push({
      id: 'export_share',
      condition: (ctx) => !!ctx.analysisResult && Object.keys(ctx.analysisResult.questions).length > 0,
      generate: (_ctx) => ({
        id: 'export_results',
        type: 'action',
        title: '导出分析结果',
        description: '将分析结果导出为PDF或分享给团队成员',
        priority: 'low',
        action: () => {
          console.log('导出分析结果');
        },
        icon: 'Download',
        metadata: { format: 'pdf' }
      }),
      priority: 'low'
    });

    // 历史记录建议
    this.rules.push({
      id: 'history_suggestion',
      condition: (ctx) => ctx.userHistory.length > 0 && !ctx.currentTopic,
      generate: (ctx) => ({
        id: 'continue_previous',
        type: 'action',
        title: '继续之前的分析',
        description: `继续分析"${ctx.userHistory[0]}"，或开始新的分析`,
        priority: 'low',
        action: () => {
          console.log('继续之前的分析');
        },
        icon: 'History',
        metadata: { previousTopic: ctx.userHistory[0] }
      }),
      priority: 'low'
    });

    // 性能优化建议
    this.rules.push({
      id: 'performance_optimization',
      condition: (ctx) => !!ctx.analysisResult && Object.keys(Object.keys(ctx.analysisResult.questions).length > 0).length > 20,
      generate: (_ctx) => ({
        id: 'optimize_performance',
        type: 'optimization',
        title: '优化显示性能',
        description: '分析结果较多，建议启用虚拟滚动或分页显示',
        priority: 'medium',
        action: () => {
          console.log('优化显示性能');
        },
        icon: 'Zap',
        metadata: { optimization: 'virtual_scroll' }
      }),
      priority: 'medium'
    });
  }

  updateContext(context: SuggestionContext) {
    this.context = context;
  }

  generateSuggestions(): SmartSuggestion[] {
    if (!this.context) {
      return [];
    }

    const suggestions: SmartSuggestion[] = [];

    // 按优先级排序规则
    const sortedRules = this.rules.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // 生成建议
    for (const rule of sortedRules) {
      try {
        if (rule.condition(this.context)) {
          const suggestion = rule.generate(this.context);
          suggestions.push(suggestion);
        }
      } catch (error) {
        console.warn(`Error generating suggestion for rule ${rule.id}:`, error);
      }
    }

    // 限制建议数量，避免界面过于拥挤
    return suggestions.slice(0, 5);
  }

  // 根据用户行为动态调整建议
  adjustSuggestionsBasedOnBehavior(behavior: string, metadata?: any) {
    // 这里可以实现基于用户行为的建议调整逻辑
    console.log('User behavior:', behavior, metadata);
  }

  // 获取特定类型的建议
  getSuggestionsByType(type: string): SmartSuggestion[] {
    return this.generateSuggestions().filter(s => s.type === type);
  }

  // 获取高优先级建议
  getHighPrioritySuggestions(): SmartSuggestion[] {
    return this.generateSuggestions().filter(s => s.priority === 'high');
  }

  // 清除过期建议
  clearExpiredSuggestions(suggestions: SmartSuggestion[]): SmartSuggestion[] {
    const now = Date.now();
    return suggestions.filter(suggestion => {
      const expiry = suggestion.metadata?.expiry;
      return !expiry || expiry > now;
    });
  }

  // 添加自定义建议规则
  addCustomRule(rule: SuggestionRule) {
    this.rules.push(rule);
  }

  // 移除建议规则
  removeRule(ruleId: string) {
    this.rules = this.rules.filter(rule => rule.id !== ruleId);
  }

  // 获取建议统计信息
  getSuggestionStats() {
    const suggestions = this.generateSuggestions();
    return {
      total: suggestions.length,
      byType: suggestions.reduce((acc, s) => {
        acc[s.type] = (acc[s.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byPriority: suggestions.reduce((acc, s) => {
        acc[s.priority] = (acc[s.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

// 创建单例实例
export const suggestionEngine = new SuggestionEngine();

// 导出类型和类
export type { SuggestionContext, SuggestionRule };
export { SuggestionEngine };
