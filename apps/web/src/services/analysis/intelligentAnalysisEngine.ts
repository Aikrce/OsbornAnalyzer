import { localCaseService, LocalCase } from '../localCaseService';
import { osbornAnalyzer } from '@huitu/shared';

// 分析上下文
export interface AnalysisContext {
  topic: string;
  industry?: string;
  targetAudience?: string;
  businessModel?: string;
  budget?: string;
  timeline?: string;
  goals?: string[];
  constraints?: string[];
  useAI?: boolean;
}

// 智能分析结果
export interface IntelligentAnalysisResult {
  id: string;
  title: string;
  description: string;
  question: string;
  analysis: string;
  suggestions: string[];
  questions: Record<string, string[]>;
  summary: string;
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
  insights: {
    keyOpportunities: string[];
    potentialRisks: string[];
    marketTrends: string[];
    competitiveAdvantages: string[];
  };
  recommendations: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  similarCases: LocalCase[];
  confidence: number;
  // 增强的分析维度
  detailedAnalysis: {
    osbornDimensions: Array<{
      dimension: string;
      questions: string[];
      insights: string[];
      innovationSchemes: string[];
      score: number;
      recommendations: string[];
    }>;
    crossIndustryInsights: string[];
    innovationPatterns: string[];
    implementationRoadmap: {
      phase: string;
      timeline: string;
      actions: string[];
      dependencies: string[];
    }[];
  };
}

// 行业知识库 - 增强本地分析能力
const INDUSTRY_KNOWLEDGE = {
  '科技': {
    trends: ['人工智能集成', '云计算应用', '物联网连接', '区块链技术', '边缘计算'],
    challenges: ['技术更新快', '人才短缺', '安全风险', '标准不统一'],
    opportunities: ['数字化转型', '智能化升级', '数据驱动决策', '远程协作']
  },
  '教育': {
    trends: ['在线学习', '个性化教育', '游戏化学习', '混合式教学', '终身学习'],
    challenges: ['数字鸿沟', '教学质量保证', '教师培训', '内容更新'],
    opportunities: ['教育公平', '技能提升', '全球教育', '定制化学习']
  },
  '医疗': {
    trends: ['远程医疗', '精准医疗', '数字健康', 'AI诊断', '可穿戴设备'],
    challenges: ['数据隐私', '法规限制', '技术门槛', '成本控制'],
    opportunities: ['预防医学', '个性化治疗', '医疗可及性', '健康管理']
  },
  '零售': {
    trends: ['全渠道零售', '社交电商', '直播带货', '个性化推荐', '无人零售'],
    challenges: ['库存管理', '物流效率', '用户体验', '竞争激烈'],
    opportunities: ['新零售模式', '数据驱动运营', '会员经济', '场景化营销']
  },
  '金融': {
    trends: ['金融科技', '数字支付', '智能投顾', '区块链金融', '开放银行'],
    challenges: ['监管合规', '风险控制', '数据安全', '用户信任'],
    opportunities: ['普惠金融', '金融服务创新', '跨境支付', '智能风控']
  }
};

// 创新模式库 (unused but kept for future reference)
/*
const INNOVATION_PATTERNS = [
  {
    name: '平台化',
    description: '构建连接多方参与者的平台生态系统',
    examples: ['电商平台', '社交媒体', '共享经济'],
    benefits: ['网络效应', '规模经济', '数据积累']
  },
  {
    name: '订阅制',
    description: '从一次性交易转向持续性的订阅服务',
    examples: ['SaaS服务', '内容订阅', '会员制度'],
    benefits: ['稳定收入', '用户粘性', '持续价值']
  },
  {
    name: '个性化',
    description: '基于用户数据和偏好提供定制化服务',
    examples: ['推荐系统', '定制产品', '个性化体验'],
    benefits: ['用户满意度', '差异化竞争', '数据价值']
  },
  {
    name: '去中介化',
    description: '去除中间环节，直接连接生产者和消费者',
    examples: ['直销模式', 'P2P交易', '去中心化应用'],
    benefits: ['成本降低', '效率提升', '透明度增加']
  }
];
*/

// 奥斯本九问模板 - 增强版（每个维度提供3个具体创新方案）
const OSBORN_TEMPLATES = {
  '能否他用？': {
    questions: [
      '这个产品/服务还能在哪些其他领域使用？',
      '能否将现有功能扩展到新的应用场景？',
      '如何将解决方案应用到不同的行业？'
    ],
    insights: [
      '探索跨领域应用的可能性',
      '寻找新的市场机会',
      '扩大目标用户群体'
    ],
    innovationSchemes: [
      '跨行业应用：将核心功能移植到3个不同行业',
      '场景扩展：开发5个新的使用场景原型',
      '用户群体多元化：针对3类新用户群体定制化'
    ]
  },
  '能否借用？': {
    questions: [
      '其他行业有哪些成功的做法可以借鉴？',
      '能否借用其他产品的优秀功能？',
      '如何学习成功企业的经验？'
    ],
    insights: [
      '学习最佳实践',
      '借鉴成功模式',
      '避免重复造轮子'
    ],
    innovationSchemes: [
      '行业标杆研究：分析3个领先企业的成功模式',
      '功能移植：引入2个跨行业的优秀功能特性',
      '方法论借鉴：采用3种已验证的创新方法论'
    ]
  },
  '能否修改？': {
    questions: [
      '如何改进现有功能？',
      '能否优化用户体验？',
      '如何降低成本提高效率？'
    ],
    insights: [
      '持续改进产品',
      '提升用户满意度',
      '优化运营效率'
    ],
    innovationSchemes: [
      '功能迭代：基于用户反馈进行3轮功能优化',
      '体验升级：实施5项用户体验改进措施',
      '效率提升：通过流程优化降低20%运营成本'
    ]
  },
  '能否扩大？': {
    questions: [
      '如何扩大目标市场？',
      '能否增加功能特性？',
      '如何扩大服务范围？'
    ],
    insights: [
      '市场扩张策略',
      '功能增强计划',
      '服务范围扩展'
    ],
    innovationSchemes: [
      '市场拓展：进入3个新的区域市场',
      '功能增强：增加5个核心功能模块',
      '服务延伸：提供3种增值服务选项'
    ]
  },
  '能否缩小？': {
    questions: [
      '如何简化功能？',
      '能否聚焦特定用户群体？',
      '如何降低使用门槛？'
    ],
    insights: [
      '产品简化策略',
      '精准定位用户',
      '降低使用成本'
    ],
    innovationSchemes: [
      '功能精简：移除3个非核心功能，专注核心价值',
      '用户聚焦：深度服务2个高价值用户群体',
      '门槛降低：推出3种简化版本降低使用难度'
    ]
  },
  '能否替代？': {
    questions: [
      '能否用更便宜的材料？',
      '如何用新技术替代旧方案？',
      '能否改变服务模式？'
    ],
    insights: [
      '成本优化方案',
      '技术升级路径',
      '模式创新机会'
    ],
    innovationSchemes: [
      '材料替代：采用3种低成本替代材料降低30%成本',
      '技术升级：引入2项前沿技术提升产品性能',
      '模式创新：开发3种新的服务交付模式'
    ]
  },
  '能否调整？': {
    questions: [
      '如何调整时间安排？',
      '能否优化空间布局？',
      '如何调整工作流程？'
    ],
    insights: [
      '时间管理优化',
      '空间利用效率',
      '流程改进方案'
    ],
    innovationSchemes: [
      '时间优化：重新设计3个关键流程的时间分配',
      '空间重组：优化2个工作区域的布局提升效率',
      '流程再造：实施5项流程改进措施减少浪费'
    ]
  },
  '能否颠倒？': {
    questions: [
      '能否改变角色关系？',
      '如何颠倒传统流程？',
      '能否从不同角度思考？'
    ],
    insights: [
      '角色重新定义',
      '流程逆向思考',
      '视角转换创新'
    ],
    innovationSchemes: [
      '角色反转：尝试3种不同的用户-服务提供者关系模式',
      '流程逆向：从结果倒推设计2个创新业务流程',
      '视角转换：采用4种不同视角重新审视问题'
    ]
  },
  '能否组合？': {
    questions: [
      '如何组合不同功能？',
      '能否整合多种技术？',
      '如何组合服务内容？'
    ],
    insights: [
      '功能组合创新',
      '技术集成方案',
      '服务打包策略'
    ],
    innovationSchemes: [
      '功能融合：将3个独立功能组合成1个综合解决方案',
      '技术集成：整合4种相关技术创建协同效应',
      '服务打包：设计5种不同价位的服务套餐组合'
    ]
  }
};

class IntelligentAnalysisEngine {
  // 生成智能分析（兼容旧版本）
  generateAnalysis(topic: string, context: Partial<AnalysisContext> = {}): IntelligentAnalysisResult {
    // 使用完善的奥斯本分析器
    const osbornResult = osbornAnalyzer.analyze(topic, { useAI: context.industry ? true : false });
    
    // 转换为智能分析结果格式
    return this.convertOsbornToIntelligentResult(osbornResult, context);
  }

  // 生成增强版智能分析（支持异步和性能优化）
  async generateEnhancedAnalysis(topic: string, context: Partial<AnalysisContext> = {}): Promise<IntelligentAnalysisResult> {
    const fullContext: AnalysisContext = { topic, ...context };
    
    // 检查是否使用AI分析
    if (fullContext.useAI) {
      return await this.generateAIAnalysis(topic, fullContext);
    }
    
    // 使用本地算法生成分析
    return await this.generateLocalAnalysis(topic, fullContext);
  }

  // 生成AI分析
  private async generateAIAnalysis(topic: string, context: AnalysisContext): Promise<IntelligentAnalysisResult> {
    try {
      // 动态导入AI服务
      const aiServiceModule = await import('../ai/aiService');
      const aiService = aiServiceModule.default;
      
      if (!aiService.isConfigured()) {
        console.warn('AI服务未配置，回退到本地分析');
        return await this.generateLocalAnalysis(topic, context);
      }

      // 构建AI分析请求
      const aiRequest = {
        topic,
        context: JSON.stringify({
          industry: context.industry,
          targetAudience: context.targetAudience,
          businessModel: context.businessModel,
          goals: context.goals,
          constraints: context.constraints
        }),
        previousResults: []
      };

      // 调用AI服务进行奥斯本分析
      const aiResponse = await aiService.performEnhancedAnalysis(aiRequest);
      
      // 将AI响应转换为IntelligentAnalysisResult格式
      return this.convertAIResponseToIntelligentResult(topic, aiResponse, context);
      
    } catch (error) {
      console.error('AI分析失败，回退到本地分析:', error);
      return await this.generateLocalAnalysis(topic, context);
    }
  }

  // 生成本地分析
  private async generateLocalAnalysis(topic: string, context: AnalysisContext): Promise<IntelligentAnalysisResult> {
    // 生成奥斯本九问
    const questions = this.generateOsbornQuestions(topic, context);
    
    // 生成奥斯本维度详细分析
    const dimensionAnalysis = this.generateOsbornDimensionAnalysis(topic, context);
    
    // 生成分析洞察
    const insights = this.generateInsights(topic, context);
    
    // 生成建议
    const recommendations = this.generateRecommendations(topic, context);
    
    // 查找相似案例（已移至并行执行）
    
    // 并行生成详细分析和查找相似案例（性能优化）
    const [detailedAnalysis, similarCases] = await Promise.all([
      this.generateDetailedAnalysisAsync(topic, context),
      this.findSimilarCasesAsync(topic, context)
    ]);
    
    // 生成综合分析（包含详细分析数据）
    const analysis = this.generateComprehensiveAnalysis(topic, context, insights, similarCases, detailedAnalysis);
    
    // 计算评分
    const totalScore = this.calculateScore(insights, recommendations, similarCases, detailedAnalysis);
    const quality = this.assessQuality(totalScore);
    const confidence = this.calculateConfidence(context, similarCases);
    
    const now = new Date();
    
    return {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${topic} - 奥斯本创新分析`,
      description: `基于奥斯本检核表法的${topic}深度创新分析`,
      question: topic,
      analysis,
      suggestions: recommendations.shortTerm.concat(recommendations.mediumTerm, recommendations.longTerm),
      questions: this.convertAnalysisToQuestions(dimensionAnalysis), // 转换详细分析为问题格式
      summary: this.generateSummary(topic, insights, recommendations, detailedAnalysis),
      totalScore,
      quality,
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      insights,
      recommendations,
      similarCases,
      confidence,
      detailedAnalysis
    };
  }

  // 生成奥斯本九问
  private generateOsbornQuestions(topic: string, _context: AnalysisContext): Record<string, string[]> {
    const questions: Record<string, string[]> = {};
    
    Object.entries(OSBORN_TEMPLATES).forEach(([category, template]) => {
      questions[category] = template.questions.map(q => 
        q.replace('这个产品/服务', topic).replace('现有功能', `${topic}的功能`)
      );
    });
    
    return questions;
  }

  // 生成奥斯本维度详细分析 - 改进版
  private generateOsbornDimensionAnalysis(topic: string, context: AnalysisContext): Record<string, string> {
    const dimensionAnalysis: Record<string, string> = {};
    
    // 分析主题特征，为个性化分析提供基础
    const topicCharacteristics = this.analyzeTopicCharacteristics(topic, context);
    
    // 为每个维度生成个性化分析
    Object.keys(OSBORN_TEMPLATES).forEach(dimension => {
      dimensionAnalysis[dimension] = this.generatePersonalizedDimensionAnalysis(
        topic, 
        dimension, 
        context, 
        topicCharacteristics
      );
    });

    return dimensionAnalysis;
  }

  // 分析主题特征
  private analyzeTopicCharacteristics(topic: string, context: AnalysisContext) {
    const characteristics = {
      isTechnology: this.isTechnologyRelated(topic),
      isService: this.isServiceRelated(topic),
      isProduct: this.isProductRelated(topic),
      industry: context.industry || this.inferIndustry(topic),
      complexity: this.assessComplexity(topic),
      marketMaturity: this.assessMarketMaturity(topic, context.industry),
      innovationPotential: this.assessInnovationPotential(topic)
    };
    
    return characteristics;
  }

  // 判断是否与技术相关
  private isTechnologyRelated(topic: string): boolean {
    const techKeywords = ['技术', '科技', 'AI', '人工智能', '软件', '系统', '平台', '算法', '数据', '数字化', '智能', '自动化', '云计算', '物联网', '区块链'];
    return techKeywords.some(keyword => topic.includes(keyword));
  }

  // 判断是否与服务相关
  private isServiceRelated(topic: string): boolean {
    const serviceKeywords = ['服务', '咨询', '培训', '教育', '医疗', '金融', '保险', '物流', '营销', '运营', '管理'];
    return serviceKeywords.some(keyword => topic.includes(keyword));
  }

  // 判断是否与产品相关
  private isProductRelated(topic: string): boolean {
    const productKeywords = ['产品', '应用', '工具', '设备', '机器', '硬件', '软件', 'APP', '网站', '平台'];
    return productKeywords.some(keyword => topic.includes(keyword));
  }

  // 推断行业
  private inferIndustry(topic: string): string {
    const industryMap = {
      '教育': ['教育', '学习', '培训', '教学', '课程', '学校', '大学'],
      '医疗': ['医疗', '健康', '医院', '医生', '诊断', '治疗', '药物'],
      '金融': ['金融', '银行', '支付', '投资', '理财', '保险', '贷款'],
      '科技': ['技术', '科技', 'AI', '软件', '系统', '数据', '智能'],
      '零售': ['零售', '电商', '购物', '销售', '商品', '店铺', '商业'],
      '娱乐': ['娱乐', '游戏', '音乐', '视频', '内容', '社交', '直播']
    };

    for (const [industry, keywords] of Object.entries(industryMap)) {
      if (keywords.some(keyword => topic.includes(keyword))) {
        return industry;
      }
    }
    return '通用';
  }

  // 评估复杂度
  private assessComplexity(topic: string): 'low' | 'medium' | 'high' {
    const complexKeywords = ['系统', '平台', '生态', '架构', '集成', '综合', '复杂'];
    const simpleKeywords = ['工具', '应用', '简单', '基础', '单一'];
    
    if (complexKeywords.some(keyword => topic.includes(keyword))) return 'high';
    if (simpleKeywords.some(keyword => topic.includes(keyword))) return 'low';
    return 'medium';
  }

  // 评估市场成熟度
  private assessMarketMaturity(topic: string, industry?: string): 'emerging' | 'growing' | 'mature' {
    const emergingKeywords = ['AI', '人工智能', '区块链', '元宇宙', 'Web3', '量子'];
    const matureKeywords = ['传统', '经典', '成熟', '标准'];
    
    if (emergingKeywords.some(keyword => topic.includes(keyword))) return 'emerging';
    if (matureKeywords.some(keyword => topic.includes(keyword))) return 'mature';
    return 'growing';
  }

  // 评估创新潜力
  private assessInnovationPotential(topic: string): 'low' | 'medium' | 'high' {
    const highInnovationKeywords = ['创新', '突破', '颠覆', '革命', '变革', '新', '前沿'];
    const lowInnovationKeywords = ['传统', '经典', '成熟', '标准', '常规'];
    
    if (highInnovationKeywords.some(keyword => topic.includes(keyword))) return 'high';
    if (lowInnovationKeywords.some(keyword => topic.includes(keyword))) return 'low';
    return 'medium';
  }

  // 生成个性化维度分析
  private generatePersonalizedDimensionAnalysis(
    topic: string, 
    dimension: string, 
    context: AnalysisContext, 
    characteristics: any
  ): string {
    const baseAnalysis = this.getBaseDimensionAnalysis(dimension, topic, characteristics);
    const contextualInsights = this.generateContextualInsights(topic, dimension, context, characteristics);
    const specificRecommendations = this.generateSpecificRecommendations(topic, dimension, characteristics);
    
    return `${baseAnalysis}\n\n${contextualInsights}\n\n${specificRecommendations}`;
  }

  // 生成具体创新案例 - 能否他用
  private generateOtherUsesAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteOtherUsesExamples(topic, characteristics);
    return `针对"${topic}"的他用性分析，我们发现了以下具体的跨领域应用机会：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

这些应用方案不仅扩展了${topic}的使用场景，还为不同行业带来了创新价值，创造了新的商业机会和用户价值。`;
  }

  // 获取具体的他用性案例
  private getConcreteOtherUsesExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '跨行业技术移植',
          description: `将${topic}的核心技术移植到制造业，开发智能生产线管理系统，实现生产过程的自动化和智能化控制，提升生产效率30%以上。`
        },
        {
          title: '教育领域应用',
          description: `将${topic}技术应用于在线教育平台，开发个性化学习系统，根据学生特点提供定制化学习路径，提升学习效果。`
        },
        {
          title: '医疗健康创新',
          description: `结合${topic}技术开发远程医疗诊断系统，让偏远地区患者也能享受到优质医疗服务，解决医疗资源分布不均问题。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '服务模式扩展',
          description: `将${topic}的服务模式扩展到企业培训领域，为企业提供定制化的员工技能提升方案，帮助企业建立学习型组织。`
        },
        {
          title: '社区服务创新',
          description: `基于${topic}的服务理念，开发社区互助平台，连接邻里资源，提供便民服务，构建和谐社区生态。`
        },
        {
          title: '文化旅游融合',
          description: `将${topic}服务与文化旅游结合，开发沉浸式体验项目，让游客深度了解当地文化，提升旅游体验价值。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '功能模块化应用',
          description: `将${topic}的核心功能模块化，开发轻量级版本应用于移动端，满足用户随时随地使用的需求。`
        },
        {
          title: '行业定制化方案',
          description: `针对不同行业特点，开发${topic}的行业定制版本，如教育版、企业版、个人版，满足不同用户群体的特定需求。`
        },
        {
          title: '生态链整合',
          description: `将${topic}与相关产品整合，形成完整的解决方案生态链，为用户提供一站式服务体验。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '终身学习平台',
        description: `将${topic}扩展为终身学习平台，为不同年龄段用户提供持续学习支持，构建学习型社会。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '预防医学应用',
        description: `将${topic}应用于预防医学领域，开发健康监测和预警系统，帮助用户提前发现健康风险。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '开源社区建设',
        description: `将${topic}开源化，建立开发者社区，吸引全球开发者参与，形成技术创新的良性循环。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否借用
  private generateBorrowingAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteBorrowingExamples(topic, characteristics);
    return `针对"${topic}"的借用性分析，我们识别了以下可借鉴的成功经验和最佳实践：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过借鉴这些成功经验，我们可以为${topic}的发展提供新的思路和方法，避免重复造轮子，加速创新进程。`;
  }

  // 获取具体的借用性案例 - 智能匹配版本
  private getConcreteBorrowingExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    // 智能识别主题类型
    const topicType = this.identifyTopicType(topic);
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题类型和特征生成相关案例
    if (topicType === '文创' || topic.includes('文化') || topic.includes('创意')) {
      examples.push(
        {
          title: '博物馆数字化展示',
          description: `借鉴故宫博物院、大英博物馆的数字化展示技术，将${topic}通过VR/AR技术实现沉浸式体验，让传统文化以现代科技方式呈现，提升用户参与度和文化传播效果。`
        },
        {
          title: '迪士尼IP运营模式',
          description: `学习迪士尼的IP开发和运营策略，将${topic}打造成具有故事性和情感连接的文化IP，通过多媒介、多场景的IP授权和衍生品开发，实现文化价值的商业化变现。`
        },
        {
          title: '日本动漫文化输出',
          description: `借鉴日本动漫产业的文化输出模式，将${topic}通过动画、漫画、游戏等年轻人喜爱的形式进行包装和传播，实现传统文化的年轻化和国际化。`
        },
        {
          title: '韩国K-POP文化营销',
          description: `学习韩国K-POP的全球化营销策略，将${topic}与现代流行文化元素结合，通过社交媒体、短视频等平台进行病毒式传播，扩大文化影响力。`
        },
        {
          title: '北欧设计美学理念',
          description: `借鉴北欧设计的简约美学和人性化理念，将${topic}的设计风格现代化，注重功能性与美观性的平衡，提升产品的现代感和国际接受度。`
        }
      );
    } else if (topicType === '教育' || topic.includes('教育') || topic.includes('学习')) {
      examples.push(
        {
          title: '芬兰教育创新模式',
          description: `借鉴芬兰教育的"寓教于乐"理念，将${topic}设计为游戏化学习体验，通过互动、探索、发现的方式激发学习兴趣，提升教育效果。`
        },
        {
          title: '新加坡STEM教育体系',
          description: `学习新加坡STEM教育的跨学科整合方法，将${topic}与科学、技术、工程、数学等学科结合，培养学习者的综合思维和创新能力。`
        },
        {
          title: '美国项目式学习',
          description: `借鉴美国项目式学习的实践导向理念，将${topic}设计为基于真实问题的学习项目，让学习者在解决实际问题中掌握知识和技能。`
        },
        {
          title: '德国双元制职业教育',
          description: `学习德国双元制职业教育的校企合作模式，将${topic}与企业实际需求结合，提供理论与实践并重的教育体验。`
        },
        {
          title: '日本终身学习理念',
          description: `借鉴日本终身学习的社会文化，将${topic}设计为适合不同年龄段、不同职业背景的学习者，构建持续学习的生态系统。`
        }
      );
    } else if (topicType === '科技' || topic.includes('技术') || topic.includes('AI')) {
      examples.push(
        {
          title: '苹果用户体验设计',
          description: `借鉴苹果"以用户为中心"的设计理念，将${topic}的用户界面设计得简洁直观，注重用户体验的每一个细节，提升产品的易用性和满意度。`
        },
        {
          title: '谷歌数据驱动决策',
          description: `学习谷歌基于数据分析的决策模式，为${topic}建立完善的数据收集和分析体系，通过数据洞察优化产品功能和用户体验。`
        },
        {
          title: '特斯拉创新迭代模式',
          description: `借鉴特斯拉的快速迭代和持续创新模式，将${topic}设计为可快速更新和升级的系统，保持技术领先性和市场竞争力。`
        },
        {
          title: '亚马逊平台生态思维',
          description: `学习亚马逊构建平台生态的战略思维，将${topic}打造成开放的技术平台，吸引第三方开发者参与生态建设，实现网络效应。`
        },
        {
          title: '微软企业级服务理念',
          description: `借鉴微软企业级服务的专业理念，为${topic}提供企业级的稳定性、安全性和可扩展性，满足大型组织的复杂需求。`
        }
      );
    } else {
      // 通用智能匹配
      const relevantCases = this.selectRelevantBorrowingCases(topic, characteristics);
      examples.push(...relevantCases);
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 智能识别主题类型
  private identifyTopicType(topic: string): string {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('文化') || topicLower.includes('创意') || topicLower.includes('文创') || 
        topicLower.includes('传统') || topicLower.includes('艺术') || topicLower.includes('设计')) {
      return '文创';
    } else if (topicLower.includes('教育') || topicLower.includes('学习') || topicLower.includes('培训') || 
               topicLower.includes('教学') || topicLower.includes('课程')) {
      return '教育';
    } else if (topicLower.includes('技术') || topicLower.includes('科技') || topicLower.includes('ai') || 
               topicLower.includes('软件') || topicLower.includes('系统') || topicLower.includes('平台')) {
      return '科技';
    } else if (topicLower.includes('医疗') || topicLower.includes('健康') || topicLower.includes('医院') || 
               topicLower.includes('医生') || topicLower.includes('诊断')) {
      return '医疗';
    } else if (topicLower.includes('金融') || topicLower.includes('银行') || topicLower.includes('支付') || 
               topicLower.includes('投资') || topicLower.includes('理财')) {
      return '金融';
    } else if (topicLower.includes('零售') || topicLower.includes('电商') || topicLower.includes('购物') || 
               topicLower.includes('销售') || topicLower.includes('商品')) {
      return '零售';
    } else if (topicLower.includes('咖啡') || topicLower.includes('茶') || topicLower.includes('酒') || 
               topicLower.includes('食品') || topicLower.includes('农产品') || topicLower.includes('水果') || 
               topicLower.includes('蔬菜') || topicLower.includes('粮食') || topicLower.includes('肉类') || 
               topicLower.includes('海鲜') || topicLower.includes('调料') || topicLower.includes('零食')) {
      return '食品';
    } else if (topicLower.includes('汽车') || topicLower.includes('车') || topicLower.includes('飞机') || 
               topicLower.includes('船') || topicLower.includes('火车') || topicLower.includes('自行车')) {
      return '交通';
    } else if (topicLower.includes('手机') || topicLower.includes('电脑') || topicLower.includes('电视') || 
               topicLower.includes('音响') || topicLower.includes('相机') || topicLower.includes('游戏机')) {
      return '电子';
    } else if (topicLower.includes('服装') || topicLower.includes('鞋') || topicLower.includes('包') || 
               topicLower.includes('首饰') || topicLower.includes('化妆品') || topicLower.includes('香水')) {
      return '时尚';
    }
    
    return '通用';
  }

  // 智能选择相关的借用案例
  private selectRelevantBorrowingCases(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const allCases = [
      {
        title: '制造业精益生产方法',
        description: `借鉴丰田生产系统的精益管理理念，将持续改进、消除浪费的思想应用到${topic}的开发流程中，建立敏捷开发体系，提升开发效率和质量。`,
        keywords: ['生产', '制造', '流程', '效率', '质量']
      },
      {
        title: '服务业用户体验设计',
        description: `学习苹果、星巴克等优秀服务企业的用户体验设计理念，将"以用户为中心"的设计思维融入到${topic}的产品设计中，提升用户满意度和粘性。`,
        keywords: ['用户', '体验', '服务', '设计', '满意度']
      },
      {
        title: '金融业风控模型',
        description: `借鉴银行和保险业的风险评估模型，为${topic}建立完善的风险识别和预警机制，确保系统稳定性和数据安全性。`,
        keywords: ['风险', '安全', '评估', '控制', '稳定']
      },
      {
        title: '游戏化激励机制',
        description: `学习游戏行业的用户激励机制，将积分、等级、成就等元素融入到${topic}中，提升用户参与度和活跃度。`,
        keywords: ['激励', '参与', '活跃', '游戏', '互动']
      },
      {
        title: '电商平台推荐算法',
        description: `借鉴亚马逊、淘宝等电商平台的个性化推荐算法，为${topic}开发智能推荐系统，提升用户体验和转化率。`,
        keywords: ['推荐', '个性化', '智能', '转化', '算法']
      }
    ];

    // 计算相关性得分
    const scoredCases = allCases.map(caseItem => {
      let score = 0;
      const topicWords = topic.toLowerCase().split(/[\s\-_]+/);
      
      caseItem.keywords.forEach(keyword => {
        if (topicWords.some(word => word.includes(keyword) || keyword.includes(word))) {
          score += 2;
        }
      });
      
      // 基于特征加分
      if (characteristics.isTechnology && caseItem.title.includes('技术')) score += 1;
      if (characteristics.isService && caseItem.title.includes('服务')) score += 1;
      if (characteristics.industry && caseItem.description.includes(characteristics.industry)) score += 1;
      
      return { ...caseItem, score };
    });

    // 按得分排序并返回前5个
    return scoredCases
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => ({ title: item.title, description: item.description }));
  }

  // 生成具体创新案例 - 能否修改
  private generateModificationAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteModificationExamples(topic, characteristics);
    return `针对"${topic}"的修改性分析，我们提出了以下具体的改进和优化方案：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过这些改进措施，我们可以显著提升${topic}的性能、用户体验和市场竞争力，实现持续的价值创造。`;
  }

  // 获取具体的修改性案例
  private getConcreteModificationExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '性能优化升级',
          description: `采用最新的技术架构和算法优化${topic}的性能，包括数据库查询优化、缓存机制改进、并发处理能力提升等，使系统响应速度提升50%以上，支持更大规模的用户访问。`
        },
        {
          title: '用户体验重构',
          description: `重新设计${topic}的用户界面和交互流程，采用现代化的设计语言和交互模式，简化操作步骤，提升用户操作的直观性和便捷性，降低学习成本。`
        },
        {
          title: '功能模块增强',
          description: `在现有功能基础上增加智能推荐、个性化定制、数据分析等高级功能，使${topic}从基础工具升级为智能化的综合解决方案，提升产品价值。`
        },
        {
          title: '安全性加固',
          description: `加强${topic}的安全防护措施，包括数据加密、身份认证、访问控制、安全审计等，确保用户数据安全和系统稳定运行，符合行业安全标准。`
        },
        {
          title: '可扩展性改进',
          description: `采用微服务架构和云原生技术重构${topic}，提升系统的可扩展性和可维护性，支持快速迭代和功能扩展，适应业务快速发展需求。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '服务流程优化',
          description: `重新设计${topic}的服务流程，消除冗余环节，优化服务路径，建立标准化的服务规范，提升服务效率和质量一致性，缩短服务交付时间。`
        },
        {
          title: '服务质量提升',
          description: `建立完善的服务质量监控体系，包括客户满意度调查、服务质量评估、持续改进机制等，确保${topic}服务质量的持续提升。`
        },
        {
          title: '服务个性化定制',
          description: `基于客户需求分析，为${topic}开发个性化服务方案，提供定制化的服务内容和交付方式，提升客户满意度和服务价值。`
        },
        {
          title: '服务渠道多元化',
          description: `扩展${topic}的服务渠道，包括线上平台、移动应用、线下服务中心等，为客户提供多渠道、全方位的服务体验。`
        },
        {
          title: '服务团队专业化',
          description: `加强${topic}服务团队的专业培训，提升服务人员的专业技能和服务意识，建立专业化的服务团队，确保服务质量。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '产品功能迭代',
          description: `基于用户反馈和市场调研，对${topic}进行功能迭代升级，增加新功能，优化现有功能，修复已知问题，提升产品整体性能和用户体验。`
        },
        {
          title: '设计美学升级',
          description: `重新设计${topic}的外观和界面，采用现代化的设计理念和美学标准，提升产品的视觉吸引力和品牌形象，增强市场竞争力。`
        },
        {
          title: '材料工艺改进',
          description: `采用更优质的材料和更先进的工艺技术改进${topic}，提升产品的耐用性、环保性和制造精度，降低生产成本，提高产品质量。`
        },
        {
          title: '智能化升级',
          description: `为${topic}增加智能化功能，如自动控制、远程监控、数据分析等，使产品从传统工具升级为智能设备，提升产品附加值。`
        },
        {
          title: '生态化整合',
          description: `将${topic}与其他相关产品和服务进行生态化整合，形成完整的解决方案，提供一站式服务，增强用户粘性和市场竞争力。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '教学方法创新',
        description: `结合现代教育理念和技术手段，创新${topic}的教学方法，采用互动式、体验式、项目式等教学方法，提升教学效果和学习体验。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '诊疗技术升级',
        description: `引入先进的医疗技术和设备，升级${topic}的诊疗能力，提高诊断准确率和治疗效果，为患者提供更好的医疗服务。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '技术架构现代化',
        description: `采用最新的技术架构和开发框架，对${topic}进行技术升级，提升系统的稳定性、性能和可维护性，保持技术领先性。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否扩大
  private generateExpansionAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteExpansionExamples(topic, characteristics);
    return `针对"${topic}"的扩大性分析，我们制定了以下具体的扩张策略和实施方案：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过这些扩张策略，我们可以显著扩大${topic}的市场影响力和商业价值，实现规模化发展和持续增长。`;
  }

  // 获取具体的扩大性案例
  private getConcreteExpansionExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '技术平台化扩张',
          description: `将${topic}从单一产品扩展为技术平台，开放API接口，吸引第三方开发者参与生态建设，形成技术生态圈，实现指数级增长和网络效应。`
        },
        {
          title: '垂直行业渗透',
          description: `针对不同垂直行业（如金融、医疗、教育、制造等）开发专业版本，深入行业场景，提供定制化解决方案，扩大市场覆盖面和用户基础。`
        },
        {
          title: '国际化市场拓展',
          description: `制定国际化扩张策略，包括产品本地化、合规适配、本地化运营等，将${topic}推广到海外市场，实现全球化发展。`
        },
        {
          title: '功能生态扩展',
          description: `围绕${topic}核心功能，开发配套工具、插件、扩展等，形成完整的功能生态，提升用户粘性和产品价值，扩大用户使用场景。`
        },
        {
          title: '企业级市场开拓',
          description: `开发企业级版本，增加企业级功能（如权限管理、数据安全、集成能力等），开拓B2B市场，获得更大的商业价值和市场空间。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '服务网络扩张',
          description: `建立全国性的服务网络，包括直营中心、加盟网点、合作伙伴等，扩大服务覆盖范围，提升服务可达性和便利性。`
        },
        {
          title: '服务内容多元化',
          description: `在${topic}核心服务基础上，增加相关增值服务，如咨询、培训、维护、升级等，形成服务产品矩阵，提升客户价值和收入来源。`
        },
        {
          title: '客户群体扩展',
          description: `从现有客户群体扩展到新的细分市场，如中小企业、个人用户、政府机构等，扩大客户基础，实现规模化增长。`
        },
        {
          title: '服务模式创新',
          description: `创新服务模式，如订阅制、按需服务、共享服务等，适应不同客户需求，扩大服务覆盖面和市场接受度。`
        },
        {
          title: '品牌影响力建设',
          description: `通过品牌建设、市场推广、口碑营销等方式，提升${topic}的品牌知名度和影响力，扩大市场认知度和用户基础。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '产品线扩展',
          description: `基于${topic}的成功经验，开发相关产品线，如高端版本、入门版本、专业版本等，满足不同用户需求，扩大市场覆盖。`
        },
        {
          title: '渠道网络建设',
          description: `建立多元化的销售渠道，包括线上电商、线下零售、代理商、直销等，扩大销售覆盖面和市场渗透率。`
        },
        {
          title: '应用场景拓展',
          description: `将${topic}的应用场景从现有领域扩展到新的使用场景，如家庭、办公、户外、专业等，扩大产品适用范围。`
        },
        {
          title: '用户群体细分',
          description: `针对不同用户群体（如年龄、性别、职业、收入等）开发定制化产品，扩大用户基础，提升市场占有率。`
        },
        {
          title: '区域市场开发',
          description: `制定区域市场开发策略，从一线城市扩展到二三线城市，从发达地区扩展到发展中地区，扩大地理覆盖范围。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '教育生态建设',
        description: `围绕${topic}构建完整的教育生态，包括内容提供商、技术平台、服务商等，形成教育产业链，扩大影响力和商业价值。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '医疗网络扩张',
        description: `建立医疗网络，包括医院、诊所、医生、患者等，将${topic}推广到整个医疗体系，扩大服务覆盖和影响力。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '技术标准制定',
        description: `参与行业技术标准制定，将${topic}的技术方案推广为行业标准，扩大技术影响力和市场地位。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否缩小
  private generateReductionAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteReductionExamples(topic, characteristics);
    return `针对"${topic}"的缩小性分析，我们提出了以下具体的精简和聚焦策略：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过精简和聚焦，我们可以提升${topic}的专业性和效率，专注于核心价值创造，实现更精准的市场定位和更高效的价值传递。`;
  }

  // 获取具体的缩小性案例
  private getConcreteReductionExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '核心功能聚焦',
          description: `将${topic}的功能精简为核心功能模块，去除冗余和复杂的功能，专注于解决用户的核心痛点，提升产品易用性和性能表现。`
        },
        {
          title: '轻量级版本开发',
          description: `开发${topic}的轻量级版本，减少系统资源占用，降低使用门槛，满足对性能和资源有特殊要求的用户群体需求。`
        },
        {
          title: '专业化定制',
          description: `针对特定行业或用户群体，开发专业化的${topic}版本，去除通用功能，专注于特定场景的深度优化。`
        },
        {
          title: '模块化精简',
          description: `将${topic}设计为模块化架构，用户可以根据需求选择必要的功能模块，避免功能冗余，提升系统效率。`
        },
        {
          title: 'MVP快速验证',
          description: `开发${topic}的最小可行产品（MVP），快速验证核心概念和市场接受度，避免过度开发，降低风险和成本。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '服务范围聚焦',
          description: `将${topic}的服务范围聚焦到核心领域，提供专业化的深度服务，避免服务范围过广导致的专业性不足问题。`
        },
        {
          title: '目标客户细分',
          description: `明确${topic}的目标客户群体，专注于服务特定类型的客户，提供更精准和专业的服务体验。`
        },
        {
          title: '服务流程简化',
          description: `简化${topic}的服务流程，去除不必要的环节，提升服务效率，降低服务成本，提高客户满意度。`
        },
        {
          title: '服务内容精简',
          description: `精简${topic}的服务内容，专注于核心服务项目，提供高质量的专业服务，避免服务内容过于庞杂。`
        },
        {
          title: '服务模式聚焦',
          description: `选择最适合的服务模式，如在线服务、上门服务、咨询服务等，专注于一种或少数几种服务模式，提升服务质量。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '产品功能精简',
          description: `精简${topic}的功能设计，去除非核心功能，专注于核心价值，提升产品的易用性和可靠性。`
        },
        {
          title: '设计风格简化',
          description: `采用简约的设计风格，去除复杂的装饰元素，专注于功能性设计，提升产品的美观性和实用性。`
        },
        {
          title: '使用场景聚焦',
          description: `明确${topic}的主要使用场景，针对特定场景进行优化设计，提升产品在目标场景下的表现。`
        },
        {
          title: '用户群体细分',
          description: `明确${topic}的目标用户群体，针对特定用户群体的需求进行产品设计，提供更精准的产品体验。`
        },
        {
          title: '成本结构优化',
          description: `优化${topic}的成本结构，去除不必要的成本项目，专注于核心价值创造，提升产品的性价比。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '教学内容聚焦',
        description: `将${topic}的教学内容聚焦到核心知识点，去除边缘内容，专注于最重要的学习目标，提升教学效果。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '诊疗范围专业化',
        description: `将${topic}的诊疗范围聚焦到特定疾病或症状，提供专业化的医疗服务，提升诊疗质量和效率。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '技术栈精简',
        description: `精简${topic}的技术栈，选择最适合的技术方案，避免技术复杂度过高，提升系统的稳定性和可维护性。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否替代
  private generateSubstitutionAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteSubstitutionExamples(topic, characteristics);
    return `针对"${topic}"的替代性分析，我们识别了以下具体的替代方案和优化策略：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过这些替代方案，我们可以提升${topic}的竞争力、降低成本、提高效率，实现更好的商业价值和用户体验。`;
  }

  // 获取具体的替代性案例
  private getConcreteSubstitutionExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '技术栈现代化替代',
          description: `将${topic}的传统技术栈替换为现代化的技术方案，如从传统数据库迁移到云数据库，从单体架构升级到微服务架构，提升系统性能和可扩展性。`
        },
        {
          title: '开源方案替代',
          description: `用开源技术方案替代商业软件，如使用开源数据库替代商业数据库，使用开源框架替代商业框架，降低技术成本，提升技术自主性。`
        },
        {
          title: '云服务替代本地部署',
          description: `将${topic}从本地部署迁移到云服务，利用云计算的弹性、可扩展性和成本优势，提升系统稳定性和运维效率。`
        },
        {
          title: 'AI技术集成替代',
          description: `集成人工智能技术替代传统的人工处理方式，如使用机器学习算法替代规则引擎，使用自然语言处理替代关键词匹配，提升智能化水平。`
        },
        {
          title: '移动端替代桌面端',
          description: `开发${topic}的移动端版本，替代或补充桌面端功能，满足用户移动办公和随时随地使用的需求，扩大用户覆盖范围。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '数字化服务替代传统服务',
          description: `将${topic}的传统服务方式升级为数字化服务，如在线咨询替代线下咨询，远程服务替代上门服务，提升服务效率和覆盖范围。`
        },
        {
          title: '自助服务替代人工服务',
          description: `开发${topic}的自助服务平台，让用户可以通过在线工具、FAQ、智能客服等方式自主解决问题，减少人工服务成本。`
        },
        {
          title: '标准化服务替代定制化服务',
          description: `将${topic}的定制化服务标准化，开发标准化的服务产品和流程，提高服务效率，降低服务成本，扩大服务规模。`
        },
        {
          title: '平台化服务替代单一服务',
          description: `将${topic}从单一服务提供商转型为服务平台，连接多个服务提供商，提供更丰富的服务选择，提升服务价值。`
        },
        {
          title: '订阅制替代一次性付费',
          description: `将${topic}的收费模式从一次性付费改为订阅制，提供持续的服务价值，建立稳定的客户关系，提升客户生命周期价值。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '材料替代优化',
          description: `用更优质、更环保、更经济的材料替代${topic}的现有材料，如使用可回收材料替代不可回收材料，使用轻量化材料替代重型材料，提升产品性能。`
        },
        {
          title: '生产工艺替代',
          description: `采用更先进的生产工艺替代传统工艺，如使用3D打印替代传统制造，使用自动化生产替代手工生产，提升生产效率和产品质量。`
        },
        {
          title: '能源替代方案',
          description: `用清洁能源替代传统能源，如使用太阳能、风能等可再生能源为${topic}提供动力，降低环境影响，提升可持续性。`
        },
        {
          title: '包装材料替代',
          description: `用环保包装材料替代传统包装，如使用可降解材料替代塑料包装，使用简约包装替代复杂包装，提升环保形象。`
        },
        {
          title: '销售渠道替代',
          description: `用新的销售渠道替代传统渠道，如用电商平台替代实体店销售，用直播带货替代传统广告，提升销售效率和覆盖面。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '在线教育替代传统教育',
        description: `将${topic}从传统线下教育模式升级为在线教育模式，利用互联网技术扩大教育覆盖范围，提升教育效率和质量。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '远程医疗替代传统诊疗',
        description: `将${topic}的诊疗方式从传统面对面诊疗升级为远程医疗，利用视频通话、远程监测等技术，提升医疗服务的可及性。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '边缘计算替代云计算',
        description: `将${topic}的计算模式从集中式云计算改为分布式边缘计算，降低延迟，提升响应速度，适应实时性要求高的应用场景。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否调整
  private generateAdjustmentAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteAdjustmentExamples(topic, characteristics);
    return `针对"${topic}"的调整性分析，我们提出了以下具体的调整和优化策略：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过这些调整策略，我们可以优化${topic}的流程、结构和资源配置，提升整体效率和效果，实现更好的运营表现。`;
  }

  // 获取具体的调整性案例
  private getConcreteAdjustmentExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '开发流程敏捷化调整',
          description: `将${topic}的开发流程从传统的瀑布模型调整为敏捷开发模式，采用迭代开发、持续集成、快速反馈的方式，提升开发效率和产品质量。`
        },
        {
          title: '技术架构微服务化',
          description: `将${topic}的单一架构调整为微服务架构，将系统拆分为多个独立的服务模块，提升系统的可扩展性、可维护性和部署灵活性。`
        },
        {
          title: '团队组织扁平化',
          description: `调整${topic}的开发团队组织结构，采用扁平化管理模式，减少管理层级，提升沟通效率，加快决策速度，增强团队协作。`
        },
        {
          title: '资源配置弹性化',
          description: `调整${topic}的资源分配策略，采用弹性资源配置，根据项目需求和市场变化动态调整人力、技术、资金等资源投入。`
        },
        {
          title: '工作模式远程化',
          description: `调整${topic}的工作模式，支持远程办公、分布式团队协作，利用数字化工具提升工作效率，适应新的工作环境需求。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '服务流程标准化调整',
          description: `调整${topic}的服务流程，建立标准化的服务规范和操作流程，提升服务效率和质量一致性，减少服务差异。`
        },
        {
          title: '服务时间灵活化',
          description: `调整${topic}的服务时间安排，提供7×24小时服务、预约服务、紧急服务等多种时间模式，满足不同客户的时间需求。`
        },
        {
          title: '服务团队专业化',
          description: `调整${topic}的服务团队结构，建立专业化的服务团队，包括技术专家、客户经理、项目经理等，提升服务专业水平。`
        },
        {
          title: '服务渠道多元化',
          description: `调整${topic}的服务渠道配置，建立线上、线下、电话、邮件等多种服务渠道，为客户提供便捷的服务接入方式。`
        },
        {
          title: '服务质量监控化',
          description: `调整${topic}的质量管理方式，建立实时服务质量监控体系，通过客户反馈、服务指标、质量评估等方式持续改进服务质量。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '生产流程优化调整',
          description: `调整${topic}的生产流程，采用精益生产、智能制造等先进生产方式，优化生产环节，提升生产效率和产品质量。`
        },
        {
          title: '供应链管理调整',
          description: `调整${topic}的供应链管理策略，建立供应商多元化、库存优化、物流效率提升等机制，降低供应链风险，提升供应效率。`
        },
        {
          title: '销售策略调整',
          description: `调整${topic}的销售策略，包括定价策略、渠道策略、促销策略等，适应市场变化，提升销售效果和市场竞争力。`
        },
        {
          title: '组织架构调整',
          description: `调整${topic}的组织架构，优化部门设置、岗位配置、职责分工等，提升组织效率和协作效果。`
        },
        {
          title: '运营模式调整',
          description: `调整${topic}的运营模式，采用数字化运营、数据驱动决策、智能化管理等现代运营方式，提升运营效率和效果。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '教学模式混合化调整',
        description: `调整${topic}的教学模式，采用线上线下混合式教学，结合传统教学和数字化教学的优势，提升教学效果和学习体验。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '诊疗流程优化调整',
        description: `调整${topic}的诊疗流程，优化患者就诊流程、医生诊疗流程、检查检验流程等，提升诊疗效率和患者满意度。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '研发模式开放化调整',
        description: `调整${topic}的研发模式，采用开放式创新、众包研发、产学研合作等方式，提升研发效率和创新能力。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否颠倒
  private generateReversalAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteReversalExamples(topic, characteristics);
    return `针对"${topic}"的颠倒性分析，我们提出了以下具体的逆向思维创新方案：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过逆向思维和颠覆性创新，我们可以为${topic}发现全新的发展机会和解决方案，实现突破性的价值创造。`;
  }

  // 获取具体的颠倒性案例
  private getConcreteReversalExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '用户驱动开发模式',
          description: `颠覆传统的技术驱动开发模式，采用用户驱动的开发方式，让用户参与产品设计和开发过程，从用户需求出发倒推技术实现方案。`
        },
        {
          title: '免费增值商业模式',
          description: `颠覆传统的付费软件模式，采用免费增值模式，基础功能免费提供，高级功能付费使用，通过用户规模实现商业价值。`
        },
        {
          title: '开源商业化策略',
          description: `颠覆传统的闭源保护模式，采用开源策略，通过开源获得社区支持和生态建设，通过服务和支持实现商业化。`
        },
        {
          title: '移动优先设计理念',
          description: `颠覆传统的桌面优先设计理念，采用移动优先的设计方式，优先考虑移动端用户体验，然后适配到桌面端。`
        },
        {
          title: 'API优先架构设计',
          description: `颠覆传统的应用优先架构，采用API优先的设计理念，先设计API接口，再开发应用，提升系统的灵活性和可扩展性。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '客户共创服务模式',
          description: `颠覆传统的服务提供模式，采用客户共创模式，让客户参与服务设计和改进过程，从被动接受服务转向主动参与创造。`
        },
        {
          title: '按效果付费模式',
          description: `颠覆传统的按时间或按项目付费模式，采用按效果付费的方式，根据服务效果和客户满意度来收费，实现风险共担。`
        },
        {
          title: '自助服务优先策略',
          description: `颠覆传统的依赖人工服务模式，优先发展自助服务能力，让客户能够自主解决问题，减少对人工服务的依赖。`
        },
        {
          title: '社区驱动服务生态',
          description: `颠覆传统的中心化服务模式，建立社区驱动的服务生态，让用户之间相互帮助，形成自组织的服务网络。`
        },
        {
          title: '预防性服务理念',
          description: `颠覆传统的被动响应服务模式，采用预防性服务理念，主动识别和预防问题，而不是等问题发生后再解决。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '用户定制化生产',
          description: `颠覆传统的大规模标准化生产模式，采用用户定制化生产，根据用户个性化需求进行小批量定制生产。`
        },
        {
          title: '共享经济模式',
          description: `颠覆传统的所有权模式，采用共享经济模式，让用户共享使用产品而不是拥有产品，提高资源利用效率。`
        },
        {
          title: '循环经济设计',
          description: `颠覆传统的线性经济模式，采用循环经济设计理念，设计可回收、可再利用的产品，实现资源的循环利用。`
        },
        {
          title: '订阅制产品服务',
          description: `颠覆传统的一次性购买模式，采用订阅制服务模式，用户按月或按年订阅产品使用权，获得持续的产品更新和服务。`
        },
        {
          title: '众包设计创新',
          description: `颠覆传统的内部设计模式，采用众包设计方式，让用户和外部设计师参与产品设计过程，获得更丰富的创意和设计。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '学生主导学习模式',
        description: `颠覆传统的教师主导教学模式，采用学生主导的学习方式，让学生自主选择学习内容和学习方式，教师作为学习指导者。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '预防医学优先策略',
        description: `颠覆传统的治疗医学模式，采用预防医学优先策略，重点关注疾病预防和健康管理，而不是疾病治疗。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '失败快速迭代策略',
        description: `颠覆传统的追求完美策略，采用快速失败、快速迭代的方式，通过快速试错来发现最佳解决方案。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 生成具体创新案例 - 能否组合
  private generateCombinationAnalysis(topic: string, characteristics: any): string {
    const examples = this.getConcreteCombinationExamples(topic, characteristics);
    return `针对"${topic}"的组合性分析，我们提出了以下具体的整合和协同创新方案：

${examples.map((example, index) => `${index + 1}. ${example.title}：${example.description}`).join('\n\n')}

通过组合和整合，我们可以为${topic}创造更大的价值，实现协同效应和规模效应，构建完整的解决方案生态。`;
  }

  // 获取具体的组合性案例
  private getConcreteCombinationExamples(topic: string, characteristics: any): Array<{title: string, description: string}> {
    const examples: Array<{title: string, description: string}> = [];
    
    // 基于主题特征生成具体案例
    if (characteristics.isTechnology) {
      examples.push(
        {
          title: '技术栈融合创新',
          description: `将${topic}与人工智能、大数据、云计算、物联网等前沿技术进行深度融合，构建智能化的技术生态，提升产品的智能化水平和竞争力。`
        },
        {
          title: '跨平台整合方案',
          description: `将${topic}整合到多个平台生态中，如移动端、桌面端、云端、边缘端等，提供跨平台的一致体验和功能协同。`
        },
        {
          title: 'API生态建设',
          description: `围绕${topic}构建开放的API生态，连接第三方服务、开发者工具、数据源等，形成丰富的功能组合和扩展能力。`
        },
        {
          title: '微服务架构组合',
          description: `将${topic}设计为微服务架构，每个服务专注于特定功能，通过服务组合实现复杂业务逻辑，提升系统的灵活性和可扩展性。`
        },
        {
          title: '数据驱动智能组合',
          description: `将${topic}与数据分析、机器学习、预测分析等技术组合，实现数据驱动的智能决策和自动化运营，提升产品智能化水平。`
        }
      );
    } else if (characteristics.isService) {
      examples.push(
        {
          title: '一站式服务整合',
          description: `将${topic}与相关服务进行整合，提供一站式解决方案，包括咨询、设计、实施、维护、培训等全流程服务，提升客户价值。`
        },
        {
          title: '多服务商协同',
          description: `建立${topic}的服务商网络，整合多个专业服务提供商，为客户提供更专业、更全面的服务选择和质量保障。`
        },
        {
          title: '线上线下服务融合',
          description: `将${topic}的线上服务和线下服务进行深度融合，提供无缝的服务体验，满足客户在不同场景下的服务需求。`
        },
        {
          title: '服务产品组合',
          description: `将${topic}与相关服务产品进行组合，形成服务套餐和解决方案，为客户提供更丰富的服务选择和更优惠的价格。`
        },
        {
          title: '客户生态圈建设',
          description: `围绕${topic}构建客户生态圈，连接客户、合作伙伴、供应商等，形成互利共赢的服务生态，提升客户粘性和价值。`
        }
      );
    } else {
      // 通用产品案例
      examples.push(
        {
          title: '产品线组合策略',
          description: `将${topic}与相关产品进行组合，形成产品线组合，满足不同用户需求，提升产品覆盖面和市场竞争力。`
        },
        {
          title: '功能模块化组合',
          description: `将${topic}设计为模块化产品，用户可以根据需求选择不同的功能模块进行组合，实现个性化定制和灵活配置。`
        },
        {
          title: '产业链整合',
          description: `将${topic}整合到完整的产业链中，包括上游供应商、下游客户、相关服务商等，形成产业链协同和价值链整合。`
        },
        {
          title: '品牌联合营销',
          description: `将${topic}与其他品牌进行联合营销，通过品牌组合和协同推广，扩大品牌影响力和市场覆盖范围。`
        },
        {
          title: '渠道组合优化',
          description: `将${topic}的销售渠道进行组合优化，包括线上渠道、线下渠道、代理商渠道等，形成多渠道协同的销售网络。`
        }
      );
    }

    // 基于行业特征添加特定案例
    if (characteristics.industry === '教育') {
      examples.push({
        title: '教育生态整合',
        description: `将${topic}整合到完整的教育生态中，包括内容提供商、技术平台、教育机构、学习者等，形成协同的教育生态系统。`
      });
    } else if (characteristics.industry === '医疗') {
      examples.push({
        title: '医疗健康生态',
        description: `将${topic}整合到医疗健康生态中，包括医院、医生、患者、药企、保险公司等，形成完整的医疗健康服务生态。`
      });
    } else if (characteristics.industry === '科技') {
      examples.push({
        title: '科技创新生态',
        description: `将${topic}整合到科技创新生态中，包括高校、科研院所、企业、投资机构等，形成协同的科技创新生态系统。`
      });
    }

    return examples.slice(0, 5); // 限制为5个案例
  }

  // 获取基础维度分析
  private getBaseDimensionAnalysis(dimension: string, topic: string, characteristics: any): string {
    const dimensionAnalyses = {
      '能否他用？': this.generateOtherUsesAnalysis(topic, characteristics),

      '能否借用？': this.generateBorrowingAnalysis(topic, characteristics),

      '能否修改？': this.generateModificationAnalysis(topic, characteristics),

      '能否扩大？': this.generateExpansionAnalysis(topic, characteristics),

      '能否缩小？': this.generateReductionAnalysis(topic, characteristics),

      '能否替代？': this.generateSubstitutionAnalysis(topic, characteristics),

      '能否调整？': this.generateAdjustmentAnalysis(topic, characteristics),

      '能否颠倒？': this.generateReversalAnalysis(topic, characteristics),

      '能否组合？': this.generateCombinationAnalysis(topic, characteristics)
    };

    return (dimensionAnalyses as any)[dimension] || `针对"${topic}"的${dimension}分析，我们需要深入探索其创新可能性。通过系统性的思考和分析，我们可以发现新的机会和改进空间，为${topic}的发展提供有价值的建议和方向。`;
  }

  // 生成上下文洞察
  private generateContextualInsights(topic: string, dimension: string, context: AnalysisContext, characteristics: any): string {
    const insights: string[] = [];

    // 基于行业特征的洞察
    if (characteristics.industry !== '通用') {
      const industryKnowledge = (INDUSTRY_KNOWLEDGE as Record<string, any>)[characteristics.industry];
      if (industryKnowledge) {
        insights.push(`在${characteristics.industry}行业背景下，${dimension}维度具有特殊的重要性。该行业当前面临${industryKnowledge.challenges.join('、')}等挑战，同时存在${industryKnowledge.opportunities.join('、')}等机会。`);
      }
    }

    // 基于市场成熟度的洞察
    if (characteristics.marketMaturity === 'emerging') {
      insights.push(`作为新兴市场主题，${topic}在${dimension}维度具有较高的创新自由度，可以探索前沿的应用模式和技术方案。`);
    } else if (characteristics.marketMaturity === 'mature') {
      insights.push(`在成熟市场中，${topic}的${dimension}分析需要更加注重差异化竞争和成本优化。`);
    }

    // 基于复杂度的洞察
    if (characteristics.complexity === 'high') {
      insights.push(`考虑到${topic}的复杂性，在${dimension}维度需要采用系统性的方法，注重模块化和可扩展性。`);
    } else if (characteristics.complexity === 'low') {
      insights.push(`对于相对简单的${topic}，在${dimension}维度可以专注于核心功能的优化和用户体验的提升。`);
    }

    // 基于创新潜力的洞察
    if (characteristics.innovationPotential === 'high') {
      insights.push(`${topic}具有较高的创新潜力，在${dimension}维度可以探索突破性的解决方案和颠覆性的应用模式。`);
    }

    return insights.length > 0 ? `深度洞察：${insights.join(' ')}` : '';
  }

  // 生成具体建议
  private generateSpecificRecommendations(topic: string, dimension: string, characteristics: any): string {
    const recommendations: string[] = [];

    // 基于维度的具体建议
    const dimensionRecommendations = {
      '能否他用？': [
        `开展${topic}的跨行业应用调研，识别3-5个潜在的应用领域`,
        `建立跨行业合作伙伴关系，探索技术转移和商业化机会`,
        `开发${topic}的模块化版本，便于在不同场景中快速适配`
      ],
      '能否借用？': [
        `研究${characteristics.industry}行业的最佳实践案例，提取可借鉴的成功要素`,
        `建立跨行业学习机制，定期组织行业交流和技术分享`,
        `引入其他行业的专业人才，带来新的思维和方法`
      ],
      '能否修改？': [
        `建立用户反馈收集机制，持续优化${topic}的功能和体验`,
        `采用敏捷开发方法，通过快速迭代实现持续改进`,
        `建立技术债务管理机制，确保代码质量和系统稳定性`
      ],
      '能否扩大？': [
        `制定分阶段的市场扩张计划，从核心市场向周边市场扩展`,
        `开发${topic}的标准化版本，支持快速复制和规模化部署`,
        `建立本地化团队，确保扩张过程中的文化适应和服务质量`
      ],
      '能否缩小？': [
        `采用MVP方法，先推出${topic}的核心功能版本`,
        `建立用户价值评估体系，确保精简不会影响核心价值`,
        `开发轻量级版本，满足不同用户群体的需求`
      ],
      '能否替代？': [
        `建立替代方案评估体系，包括技术可行性、成本效益和风险评估`,
        `建立供应商多元化策略，降低对单一供应商的依赖`,
        `建立备选方案库，确保在主要方案出现问题时能够快速切换`
      ],
      '能否调整？': [
        `采用渐进式调整方法，避免大规模变动带来的风险`,
        `建立调整效果评估体系，及时监控调整效果并进行优化`,
        `建立变更管理机制，确保调整过程中的平稳过渡`
      ],
      '能否颠倒？': [
        `建立创新思维训练机制，鼓励团队进行逆向思考`,
        `建立假设验证体系，通过实验来验证颠倒性想法的可行性`,
        `建立风险控制机制，确保颠倒性创新不会带来过大的风险`
      ],
      '能否组合？': [
        `建立组合创新评估体系，包括技术兼容性、市场接受度和实施难度`,
        `建立合作伙伴评估机制，选择优质的合作伙伴`,
        `建立组合效果监控体系，及时调整组合策略`
      ]
    };

    const specificRecs = (dimensionRecommendations as any)[dimension] || [];
    recommendations.push(...specificRecs);

    // 基于特征的具体建议
    if (characteristics.isTechnology) {
      recommendations.push(`建立技术研发团队，持续跟踪前沿技术发展趋势`);
    }
    if (characteristics.isService) {
      recommendations.push(`建立服务质量监控体系，确保服务标准化和一致性`);
    }
    if (characteristics.complexity === 'high') {
      recommendations.push(`建立项目管理体系，确保复杂项目的顺利实施`);
    }

    return recommendations.length > 0 ? `具体建议：${recommendations.map((rec, index) => `${index + 1}. ${rec}`).join(' ')}` : '';
  }

  // 将详细分析转换为问题格式（用于兼容现有接口）
  private convertAnalysisToQuestions(dimensionAnalysis: Record<string, string>): Record<string, string[]> {
    const questions: Record<string, string[]> = {};
    
    Object.entries(dimensionAnalysis).forEach(([dimension, analysis]) => {
      // 将详细分析按段落分割，每个段落作为一个"问题"
      const paragraphs = analysis.split('\n\n').filter(p => p.trim().length > 0);
      questions[dimension] = paragraphs.map(paragraph => paragraph.trim());
    });
    
    return questions;
  }

  // 生成洞察 - 增强版
  private generateInsights(topic: string, context: AnalysisContext) {
    const allInsights: string[] = [];
    
    Object.values(OSBORN_TEMPLATES).forEach(template => {
      allInsights.push(...template.insights);
    });
    
    // 基于行业知识的洞察
    const industryInsights = this.generateIndustryInsights(context.industry, topic);
    
    // 基于案例库的洞察
    const caseInsights = this.generateCaseBasedInsights(topic, context);
    
    return {
      keyOpportunities: [
        ...allInsights.filter(insight => 
          insight.includes('机会') || insight.includes('扩张') || insight.includes('创新')
        ).slice(0, 2),
        ...industryInsights.opportunities.slice(0, 2),
        ...caseInsights.opportunities.slice(0, 1)
      ],
      potentialRisks: [
        '市场竞争加剧',
        '技术更新换代',
        '用户需求变化',
        ...industryInsights.challenges.slice(0, 2),
        ...caseInsights.risks.slice(0, 1)
      ],
      marketTrends: [
        '数字化转型加速',
        '用户体验要求提升',
        '个性化需求增长',
        ...industryInsights.trends.slice(0, 2)
      ],
      competitiveAdvantages: [
        ...allInsights.filter(insight => 
          insight.includes('优势') || insight.includes('创新') || insight.includes('优化')
        ).slice(0, 2),
        ...industryInsights.opportunities.slice(2, 4),
        ...caseInsights.advantages.slice(0, 1)
      ]
    };
  }

  // 生成行业特定洞察
  private generateIndustryInsights(industry: string | undefined, topic: string) {
    if (!industry || !(INDUSTRY_KNOWLEDGE as Record<string, any>)[industry]) {
      return {
        trends: ['行业趋势不明确，建议进行市场调研'],
        challenges: ['行业挑战需要进一步分析'],
        opportunities: [`${topic}在相关行业可能有创新机会`]
      };
    }
    
    const knowledge = (INDUSTRY_KNOWLEDGE as Record<string, any>)[industry];
    return {
      trends: knowledge.trends.map((trend: string) => `${industry}行业趋势：${trend}`),
      challenges: knowledge.challenges.map((challenge: string) => `${industry}行业挑战：${challenge}`),
      opportunities: knowledge.opportunities.map((opportunity: string) => 
        `${topic}在${industry}行业的机会：${opportunity}`
      )
    };
  }

  // 基于案例库生成洞察
  private generateCaseBasedInsights(topic: string, context: AnalysisContext) {
    const similarCases = this.findSimilarCases(topic, context);
    const insights = {
      opportunities: [] as string[],
      risks: [] as string[],
      advantages: [] as string[]
    };

    similarCases.forEach(caseItem => {
      // 从相似案例标题和描述中提取洞察
      insights.opportunities.push(
        `借鉴案例"${caseItem.title}"：${caseItem.description}`
      );
      
      // 添加基于案例主题的通用风险提示
      insights.risks.push(
        `案例"${caseItem.title}"的通用风险：市场竞争、技术更新、用户需求变化`
      );
    });

    return insights;
  }

  // 生成建议
  private generateRecommendations(topic: string, _context: AnalysisContext) {
    return {
      shortTerm: [
        `对${topic}进行详细的市场调研`,
        '制定初步的产品/服务规划',
        '建立核心团队'
      ],
      mediumTerm: [
        `开发${topic}的MVP版本`,
        '建立合作伙伴关系',
        '优化产品功能'
      ],
      longTerm: [
        '扩大市场份额',
        '建立品牌影响力',
        '考虑多元化发展'
      ]
    };
  }

  // 异步查找相似案例（性能优化）
  private async findSimilarCasesAsync(topic: string, context: AnalysisContext): Promise<LocalCase[]> {
    return new Promise((resolve) => {
      // 使用 setTimeout 让出控制权，避免阻塞主线程
      setTimeout(() => {
        resolve(this.findSimilarCases(topic, context));
      }, 0);
    });
  }

  // 异步生成详细分析（性能优化）
  private async generateDetailedAnalysisAsync(topic: string, context: AnalysisContext): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const similarCases = this.findSimilarCases(topic, context);
        resolve(this.generateDetailedAnalysis(topic, context, similarCases));
      }, 0);
    });
  }

  // 查找相似案例 - 增强版
  private findSimilarCases(topic: string, context: AnalysisContext): LocalCase[] {
    const allCases = localCaseService.getAllCases();
    
    if (allCases.length === 0) {
      return [];
    }

    // 多维度相似度匹配
    const scoredCases = allCases.map(caseItem => {
      let score = 0;
      
      // 主题相似度
      const topicSimilarity = this.calculateTopicSimilarity(topic, caseItem.topic);
      score += topicSimilarity * 0.4;
      
      // 行业匹配
      if (context.industry && caseItem.industry === context.industry) {
        score += 0.3;
      }
      
      // 标签匹配
      if (context.industry && caseItem.tags.includes(context.industry)) {
        score += 0.2;
      }
      
      // 案例质量加分
      if (caseItem.rating && caseItem.rating > 4) {
        score += 0.1;
      }
      
      return { case: caseItem, score };
    });

    return scoredCases
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0.2) // 最低相似度阈值
      .slice(0, 5)
      .map(item => item.case);
  }

  // 计算主题相似度 - 增强版
  private calculateTopicSimilarity(topic1: string, topic2: string): number {
    // 基础词汇相似度
    const words1 = new Set(topic1.toLowerCase().split(/[\s\-_]+/));
    const words2 = new Set(topic2.toLowerCase().split(/[\s\-_]+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    const basicSimilarity = union.size === 0 ? 0 : intersection.size / union.size;
    
    // 语义相似度增强
    const semanticSimilarity = this.calculateSemanticSimilarity(topic1, topic2);
    
    // 行业关键词匹配
    const industrySimilarity = this.calculateIndustrySimilarity(topic1, topic2);
    
    // 综合评分
    return (basicSimilarity * 0.4 + semanticSimilarity * 0.4 + industrySimilarity * 0.2);
  }

  // 计算语义相似度
  private calculateSemanticSimilarity(topic1: string, topic2: string): number {
    // 定义同义词组
    const synonymGroups = [
      ['创新', '革新', '变革', '突破'],
      ['技术', '科技', '技术', '数字化'],
      ['产品', '服务', '解决方案', '应用'],
      ['市场', '商业', '营销', '销售'],
      ['用户', '客户', '消费者', '顾客'],
      ['平台', '系统', '工具', '软件'],
      ['数据', '信息', '内容', '资源'],
      ['智能', 'AI', '人工智能', '自动化'],
      ['移动', '手机', 'APP', '应用'],
      ['在线', '网络', '互联网', '云端']
    ];
    
    let similarity = 0;
    const words1 = topic1.toLowerCase().split(/[\s\-_]+/);
    const words2 = topic2.toLowerCase().split(/[\s\-_]+/);
    
    words1.forEach(word1 => {
      words2.forEach(word2 => {
        // 直接匹配
        if (word1 === word2) {
          similarity += 1;
        } else {
          // 同义词匹配
          synonymGroups.forEach(group => {
            if (group.includes(word1) && group.includes(word2)) {
              similarity += 0.7;
            }
          });
        }
      });
    });
    
    return Math.min(similarity / Math.max(words1.length, words2.length), 1);
  }

  // 计算行业相似度
  private calculateIndustrySimilarity(topic1: string, topic2: string, _industry?: string): number {
    const industryKeywords = {
      '科技': ['技术', '软件', 'AI', '数据', '算法', '系统', '平台'],
      '教育': ['学习', '教学', '培训', '知识', '课程', '学生', '老师'],
      '医疗': ['健康', '医疗', '诊断', '治疗', '药物', '医院', '医生'],
      '金融': ['支付', '银行', '投资', '理财', '保险', '贷款', '交易'],
      '零售': ['购物', '商品', '销售', '库存', '物流', '电商', '店铺'],
      '娱乐': ['游戏', '音乐', '视频', '内容', '娱乐', '社交', '直播']
    };
    
    let similarity = 0;
    Object.entries(industryKeywords).forEach(([, keywords]) => {
      const topic1HasKeywords = keywords.some(keyword => topic1.includes(keyword));
      const topic2HasKeywords = keywords.some(keyword => topic2.includes(keyword));
      
      if (topic1HasKeywords && topic2HasKeywords) {
        similarity += 0.3;
      }
    });
    
    return Math.min(similarity, 1);
  }

  // 生成综合分析 - 增强版
  private generateComprehensiveAnalysis(
    topic: string, 
    context: AnalysisContext, 
    insights: any, 
    similarCases: LocalCase[],
    detailedAnalysis?: any
  ): string {
    let analysis = `# ${topic} - 深度创新分析报告\n\n`;
    
    analysis += `## 1. 创新机会评估\n`;
    analysis += `基于奥斯本九问的系统性分析，发现了${insights.keyOpportunities.length}个核心创新机会：\n`;
    insights.keyOpportunities.forEach((opp: string, index: number) => {
      analysis += `${index + 1}. ${opp}\n`;
    });
    analysis += `\n`;
    
    analysis += `## 2. 行业趋势分析\n`;
    analysis += `在${context.industry || '相关'}行业背景下，${topic}面临以下趋势：\n`;
    insights.marketTrends.forEach((trend: string, index: number) => {
      analysis += `${index + 1}. ${trend}\n`;
    });
    analysis += `\n`;
    
    analysis += `## 3. 风险评估\n`;
    analysis += `需要重点关注${insights.potentialRisks.length}个潜在风险：\n`;
    insights.potentialRisks.forEach((risk: string, index: number) => {
      analysis += `${index + 1}. ${risk}\n`;
    });
    analysis += `\n`;
    
    analysis += `## 4. 案例参考\n`;
    if (similarCases.length > 0) {
      analysis += `分析了${similarCases.length}个相似案例，提供以下参考：\n`;
      similarCases.forEach((caseItem, index) => {
        analysis += `${index + 1}. ${caseItem.title} - ${caseItem.description}\n`;
      });
    } else {
      analysis += `暂无相似案例，建议建立相关案例库以提升分析质量。\n`;
    }
    analysis += `\n`;
    
    analysis += `## 5. 竞争优势\n`;
    analysis += `通过创新可以建立以下竞争优势：\n`;
    insights.competitiveAdvantages.forEach((advantage: string, index: number) => {
      analysis += `${index + 1}. ${advantage}\n`;
    });
    analysis += `\n`;
    
    // 添加创新方案章节
    if (detailedAnalysis?.osbornDimensions) {
      analysis += `## 6. 具体创新方案\n`;
      analysis += `基于奥斯本九问的九个维度，提出了以下具体创新方案：\n\n`;
      
      detailedAnalysis.osbornDimensions.forEach((dimension: any, dimIndex: number) => {
        analysis += `### ${dimIndex + 1}. ${dimension.dimension}\n`;
        if (dimension.innovationSchemes && dimension.innovationSchemes.length > 0) {
          dimension.innovationSchemes.forEach((scheme: string, schemeIndex: number) => {
            analysis += `${schemeIndex + 1}. ${scheme}\n`;
          });
        }
        analysis += `\n`;
      });
    }
    
    return analysis;
  }

  // 生成总结 - 增强版
  private generateSummary(topic: string, insights: any, recommendations: any, detailedAnalysis: any): string {
    const totalRecommendations = recommendations.shortTerm.length + recommendations.mediumTerm.length + recommendations.longTerm.length;
    const innovationPatterns = detailedAnalysis?.innovationPatterns?.length || 0;
    const innovationSchemesCount = detailedAnalysis?.osbornDimensions?.reduce(
      (total: number, dimension: any) => total + (dimension.innovationSchemes?.length || 0), 0
    ) || 0;
    
    return `${topic}的深度创新分析揭示了${insights.keyOpportunities.length}个关键机会，识别了${insights.potentialRisks.length}个风险点，提出了${totalRecommendations}个实施建议，发现了${innovationPatterns}个创新模式，并提供了${innovationSchemesCount}个具体创新方案，为项目提供了全面的战略指导。`;
  }

  // 计算评分 - 增强版
  private calculateScore(insights: any, recommendations: any, similarCases: LocalCase[], detailedAnalysis: any): number {
    let score = 0;
    
    // 机会质量评分
    score += insights.keyOpportunities.length * 6;
    
    // 建议质量评分
    score += recommendations.shortTerm.length * 4;
    score += recommendations.mediumTerm.length * 5;
    score += recommendations.longTerm.length * 6;
    
    // 案例参考评分
    score += similarCases.length * 10;
    
    // 详细分析质量加分
    if (detailedAnalysis) {
      score += detailedAnalysis.osbornDimensions?.length * 3 || 0;
      score += detailedAnalysis.crossIndustryInsights?.length * 2 || 0;
      score += detailedAnalysis.innovationPatterns?.length * 5 || 0;
      // 创新方案质量加分
      const innovationSchemesCount = detailedAnalysis.osbornDimensions?.reduce(
        (total: number, dimension: any) => total + (dimension.innovationSchemes?.length || 0), 0
      ) || 0;
      score += innovationSchemesCount * 2;
    }
    
    // 行业上下文加分
    if (insights.marketTrends.length > 3) {
      score += 5;
    }
    
    return Math.min(Math.max(score, 0), 100);
  }

  // 评估质量
  private assessQuality(score: number): 'low' | 'medium' | 'high' {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  }

  // 计算置信度
  private calculateConfidence(context: AnalysisContext, similarCases: LocalCase[]): number {
    let confidence = 0.5; // 基础置信度
    
    if (context.industry) confidence += 0.15;
    if (context.targetAudience) confidence += 0.1;
    if (context.businessModel) confidence += 0.1;
    if (context.budget) confidence += 0.05;
    if (context.timeline) confidence += 0.05;
    if (similarCases.length > 0) confidence += Math.min(similarCases.length * 0.1, 0.3);
    
    return Math.min(confidence, 1.0);
  }

  // 生成详细分析 - 新增功能
  private generateDetailedAnalysis(topic: string, context: AnalysisContext, similarCases: LocalCase[]) {
    const dimensionAnalysis = this.generateOsbornDimensionAnalysis(topic, context);
    return {
      osbornDimensions: Object.entries(dimensionAnalysis).map(([dimension, analysis]) => ({
        dimension,
        questions: analysis.split('\n\n').filter(p => p.trim().length > 0),
        insights: [analysis],
        innovationSchemes: [],
        score: Math.floor(Math.random() * 20) + 70,
        recommendations: []
      })),
      crossIndustryInsights: this.generateCrossIndustryInsights(topic, context),
      innovationPatterns: this.identifyInnovationPatterns(topic, context, similarCases),
      implementationRoadmap: this.generateImplementationRoadmap(topic, context)
    };
  }


  // 生成跨行业洞察
  private generateCrossIndustryInsights(topic: string, context: AnalysisContext) {
    const insights: string[] = [];
    const currentIndustry = context.industry;
    
    // 从其他行业借鉴经验
    Object.entries(INDUSTRY_KNOWLEDGE).forEach(([industry, knowledge]) => {
      if (industry !== currentIndustry) {
        knowledge.trends.slice(0, 2).forEach(trend => {
          insights.push(`借鉴${industry}行业：${trend}可能适用于${topic}`);
        });
      }
    });
    
    return insights.slice(0, 5);
  }

  // 识别创新模式
  private identifyInnovationPatterns(_topic: string, context: AnalysisContext, similarCases: LocalCase[]) {
    const patterns: string[] = [];
    
    // 基于行业特征推荐模式
    if (context.industry && (INDUSTRY_KNOWLEDGE as Record<string, any>)[context.industry]) {
      const industryKnowledge = (INDUSTRY_KNOWLEDGE as Record<string, any>)[context.industry];
      
      if (industryKnowledge.trends.some((t: string) => t.includes('数字化') || t.includes('智能'))) {
        patterns.push('数字化转型模式');
      }
      if (industryKnowledge.trends.some((t: string) => t.includes('平台') || t.includes('生态'))) {
        patterns.push('平台化商业模式');
      }
    }
    
    // 从相似案例中提取模式
    similarCases.forEach(caseItem => {
      if (caseItem.tags.some(tag => tag.includes('创新') || tag.includes('模式'))) {
        patterns.push(`借鉴案例模式：${caseItem.title}`);
      }
    });
    
    return [...new Set(patterns)].slice(0, 3);
  }

  // 生成实施路线图
  private generateImplementationRoadmap(topic: string, _context: AnalysisContext) {
    return [
      {
        phase: '调研规划',
        timeline: '1-2个月',
        actions: [
          `深入调研${topic}市场需求`,
          '分析竞争对手情况',
          '制定详细的产品规划',
          '组建核心团队'
        ],
        dependencies: ['市场数据', '行业报告', '团队资源']
      },
      {
        phase: '产品开发',
        timeline: '3-6个月',
        actions: [
          `开发${topic}的MVP版本`,
          '进行用户测试和反馈收集',
          '迭代优化产品功能',
          '建立技术基础设施'
        ],
        dependencies: ['技术资源', '用户反馈', '开发进度']
      },
      {
        phase: '市场推广',
        timeline: '2-4个月',
        actions: [
          '制定市场推广策略',
          '建立品牌形象',
          '开展用户获取活动',
          '建立合作伙伴关系'
        ],
        dependencies: ['营销预算', '渠道资源', '品牌建设']
      },
      {
        phase: '规模化运营',
        timeline: '持续进行',
        actions: [
          '优化运营效率',
          '扩大用户规模',
          '探索新的收入模式',
          '建立持续创新机制'
        ],
        dependencies: ['运营团队', '资金支持', '市场机会']
      }
    ];
  }

  // 生成维度特定建议
  private generateDimensionRecommendations(dimension: string, topic: string, context: AnalysisContext) {
    const recommendations: string[] = [];
    
    switch (dimension) {
      case '能否他用？':
        recommendations.push(`探索${topic}在${context.industry || '其他'}行业的应用场景`);
        recommendations.push(`考虑将${topic}功能扩展到新的用户群体`);
        break;
      case '能否借用？':
        recommendations.push(`研究${context.industry || '相关'}行业的最佳实践`);
        recommendations.push('借鉴成功企业的经验和方法');
        break;
      case '能否修改？':
        recommendations.push(`优化${topic}的用户体验设计`);
        recommendations.push('改进产品性能和稳定性');
        break;
      // 其他维度的建议...
      default:
        recommendations.push(`针对${dimension}进行深入分析`);
        recommendations.push('制定具体的改进计划');
    }
    
    return recommendations;
  }

  // 将AI响应转换为IntelligentAnalysisResult
  private convertAIResponseToIntelligentResult(
    topic: string,
    aiResponse: any,
    context: AnalysisContext
  ): IntelligentAnalysisResult {
    const now = new Date();
    
    // 从AI响应中提取奥斯本九问分析
    const questions = this.extractOsbornQuestionsFromAI(aiResponse.analysis, topic);
    
    // 生成分析洞察
    const insights = this.generateInsightsFromAI(aiResponse.analysis, topic);
    
    // 生成建议
    const recommendations = this.generateRecommendationsFromAI(aiResponse.suggestions, topic);
    
    // 查找相似案例
    const similarCases = this.findSimilarCases(topic, context);
    
    // 生成详细分析
    const detailedAnalysis = this.generateDetailedAnalysisFromAI(aiResponse.analysis, topic, context);
    
    // 生成综合分析
    const analysis = this.generateComprehensiveAnalysisFromAI(aiResponse.analysis, topic, context);
    
    // 计算评分和置信度
    const totalScore = this.calculateScoreFromAI(aiResponse.analysis, aiResponse.confidence);
    const quality = this.assessQuality(totalScore);
    const confidence = aiResponse.confidence / 100; // AI返回的是0-100，转换为0-1
    
    return {
      id: `ai-analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${topic} - AI奥斯本创新分析`,
      description: `基于AI深度学习的${topic}奥斯本创新分析`,
      question: topic,
      analysis,
      suggestions: recommendations.shortTerm.concat(recommendations.mediumTerm, recommendations.longTerm),
      questions,
      summary: this.generateSummaryFromAI(aiResponse.analysis, topic),
      totalScore,
      quality,
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      insights,
      recommendations,
      similarCases,
      confidence,
      detailedAnalysis
    };
  }

  // 从AI分析中提取奥斯本九问
  private extractOsbornQuestionsFromAI(aiAnalysis: any[], topic: string): Record<string, string[]> {
    const questions: Record<string, string[]> = {};
    const osbornDimensions = [
      '能否他用？', '能否借用？', '能否修改？', '能否扩大？', '能否缩小？',
      '能否替代？', '能否调整？', '能否颠倒？', '能否组合？'
    ];
    
    osbornDimensions.forEach(dimension => {
      // 从AI分析结果中查找对应维度的分析
      const dimensionAnalysis = aiAnalysis.find(item => 
        item.title?.includes(dimension) || item.description?.includes(dimension)
      );
      
      if (dimensionAnalysis) {
        // 将AI分析内容按段落分割作为"问题"
        const paragraphs = dimensionAnalysis.description
          ?.split('\n')
          .filter((p: string) => p.trim().length > 0)
          .map((p: string) => p.trim()) || [];
        
        questions[dimension] = paragraphs.length > 0 ? paragraphs : [dimensionAnalysis.description || dimension];
      } else {
        // 如果没有找到对应维度，使用默认问题
        questions[dimension] = [`针对"${topic}"的${dimension}分析`];
      }
    });
    
    return questions;
  }

  // 从AI分析生成洞察
  private generateInsightsFromAI(aiAnalysis: any[], topic: string) {
    const insights = {
      keyOpportunities: [] as string[],
      potentialRisks: [] as string[],
      marketTrends: [] as string[],
      competitiveAdvantages: [] as string[]
    };
    
    aiAnalysis.forEach(item => {
      if (item.description) {
        // 提取机会
        if (item.description.includes('机会') || item.description.includes('潜力') || item.description.includes('可能')) {
          insights.keyOpportunities.push(item.description.substring(0, 100) + '...');
        }
        // 提取风险
        if (item.description.includes('风险') || item.description.includes('挑战') || item.description.includes('困难')) {
          insights.potentialRisks.push(item.description.substring(0, 100) + '...');
        }
        // 提取趋势
        if (item.description.includes('趋势') || item.description.includes('发展') || item.description.includes('未来')) {
          insights.marketTrends.push(item.description.substring(0, 100) + '...');
        }
        // 提取优势
        if (item.description.includes('优势') || item.description.includes('竞争力') || item.description.includes('强项')) {
          insights.competitiveAdvantages.push(item.description.substring(0, 100) + '...');
        }
      }
    });
    
    // 确保每个类别至少有1个洞察
    if (insights.keyOpportunities.length === 0) insights.keyOpportunities.push(`${topic}具有创新潜力`);
    if (insights.potentialRisks.length === 0) insights.potentialRisks.push('市场竞争激烈');
    if (insights.marketTrends.length === 0) insights.marketTrends.push('市场持续发展');
    if (insights.competitiveAdvantages.length === 0) insights.competitiveAdvantages.push(`${topic}具有独特价值`);
    
    return insights;
  }

  // 从AI分析生成建议
  private generateRecommendationsFromAI(aiSuggestions: string[], topic: string) {
    const recommendations = {
      shortTerm: [] as string[],
      mediumTerm: [] as string[],
      longTerm: [] as string[]
    };
    
    if (aiSuggestions && aiSuggestions.length > 0) {
      // 将AI建议分配到不同时间段
      aiSuggestions.forEach((suggestion, index) => {
        if (index % 3 === 0) {
          recommendations.shortTerm.push(suggestion);
        } else if (index % 3 === 1) {
          recommendations.mediumTerm.push(suggestion);
        } else {
          recommendations.longTerm.push(suggestion);
        }
      });
    }
    
    // 确保每个时间段至少有1个建议
    if (recommendations.shortTerm.length === 0) recommendations.shortTerm.push(`深入调研${topic}市场需求`);
    if (recommendations.mediumTerm.length === 0) recommendations.mediumTerm.push(`制定${topic}发展战略`);
    if (recommendations.longTerm.length === 0) recommendations.longTerm.push(`建立${topic}长期竞争优势`);
    
    return recommendations;
  }

  // 从AI分析生成详细分析
  private generateDetailedAnalysisFromAI(aiAnalysis: any[], topic: string, context: AnalysisContext) {
    return {
      osbornDimensions: aiAnalysis.map((item, index) => ({
        dimension: item.title || `维度${index + 1}`,
        questions: [item.description || 'AI分析结果'],
        insights: [item.description || 'AI深度洞察'],
        innovationSchemes: [item.description || 'AI创新方案'],
        score: Math.floor(Math.random() * 20) + 80, // AI分析质量较高
        recommendations: [item.description || 'AI实施建议']
      })),
      crossIndustryInsights: [`${topic}跨行业应用洞察`],
      innovationPatterns: [`${topic}创新模式识别`],
      implementationRoadmap: [
        {
          phase: 'AI分析阶段',
          timeline: '1-2周',
          actions: ['AI深度分析', '数据收集', '模式识别'],
          dependencies: ['AI服务', '数据源', '分析工具']
        }
      ]
    };
  }

  // 从AI分析生成综合分析
  private generateComprehensiveAnalysisFromAI(aiAnalysis: any[], topic: string, context: AnalysisContext): string {
    let analysis = `# ${topic} - AI深度创新分析报告\n\n`;
    
    analysis += `## AI分析概述\n`;
    analysis += `基于人工智能深度学习的${topic}创新分析，共分析了${aiAnalysis.length}个维度。\n\n`;
    
    analysis += `## 核心洞察\n`;
    aiAnalysis.slice(0, 3).forEach((item, index) => {
      analysis += `${index + 1}. ${item.title || `洞察${index + 1}`}：${item.description?.substring(0, 200) || 'AI深度分析结果'}...\n\n`;
    });
    
    analysis += `## AI建议\n`;
    analysis += `基于AI分析，为${topic}提供以下创新建议：\n`;
    analysis += `1. 利用AI识别的新兴机会\n`;
    analysis += `2. 基于数据驱动的决策制定\n`;
    analysis += `3. 采用AI推荐的创新模式\n\n`;
    
    return analysis;
  }

  // 从AI分析生成总结
  private generateSummaryFromAI(aiAnalysis: any[], topic: string): string {
    const analysisCount = aiAnalysis.length;
    const avgConfidence = aiAnalysis.reduce((sum, item) => sum + (item.confidence || 85), 0) / analysisCount;
    
    return `AI深度分析揭示了${topic}的${analysisCount}个关键创新维度，平均置信度${Math.round(avgConfidence)}%，为项目提供了基于人工智能的专业洞察和可执行的创新建议。`;
  }

  // 从AI分析计算评分
  private calculateScoreFromAI(aiAnalysis: any[], aiConfidence: number): number {
    const baseScore = Math.min(aiConfidence, 100);
    const analysisBonus = Math.min(aiAnalysis.length * 5, 20);
    return Math.min(baseScore + analysisBonus, 100);
  }

  // 将奥斯本分析结果转换为智能分析结果
  private convertOsbornToIntelligentResult(
    osbornResult: any, 
    context: Partial<AnalysisContext>
  ): IntelligentAnalysisResult {
    const now = new Date();
    
    return {
      id: osbornResult.id,
      title: osbornResult.title,
      description: osbornResult.description,
      question: osbornResult.question,
      analysis: osbornResult.analysis,
      suggestions: osbornResult.suggestions || [],
      questions: osbornResult.questions,
      summary: osbornResult.summary,
      totalScore: osbornResult.totalScore,
      quality: osbornResult.quality,
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      insights: {
        keyOpportunities: this.extractOpportunitiesFromQuestions(osbornResult.questions),
        potentialRisks: ['市场竞争加剧', '技术更新换代', '用户需求变化'],
        marketTrends: ['数字化转型加速', '用户体验要求提升', '个性化需求增长'],
        competitiveAdvantages: this.extractAdvantagesFromQuestions(osbornResult.questions)
      },
      recommendations: {
        shortTerm: this.extractShortTermRecommendations(osbornResult.questions),
        mediumTerm: this.extractMediumTermRecommendations(osbornResult.questions),
        longTerm: this.extractLongTermRecommendations(osbornResult.questions)
      },
      similarCases: this.findSimilarCases(osbornResult.question, context as AnalysisContext),
      confidence: this.calculateConfidence(context as AnalysisContext, []),
      detailedAnalysis: {
        osbornDimensions: osbornResult.dimensions || [],
        crossIndustryInsights: [],
        innovationPatterns: [],
        implementationRoadmap: []
      }
    };
  }

  // 从维度中提取机会
  private extractOpportunitiesFromQuestions(questions: Record<string, string[]>): string[] {
    if (!questions) return [];
    
    const opportunities: string[] = [];
    Object.values(questions).forEach(questionList => {
      questionList.forEach(question => {
        // 从问题中提取机会点
        if (question.includes('机会') || question.includes('可能') || question.includes('潜在')) {
          opportunities.push(question);
        }
      });
    });
    return opportunities.slice(0, 5); // 限制数量
  }

  // 从问题中提取优势
  private extractAdvantagesFromQuestions(questions: Record<string, string[]>): string[] {
    if (!questions) return [];
    
    const advantages: string[] = [];
    Object.values(questions).forEach(questionList => {
      questionList.forEach(question => {
        // 从问题中提取优势点
        if (question.includes('优势') || question.includes('强项') || question.includes('竞争力')) {
          advantages.push(question);
        }
      });
    });
    return advantages.slice(0, 5);
  }

  // 提取短期建议
  private extractShortTermRecommendations(questions: Record<string, string[]>): string[] {
    if (!questions) return [];
    
    const recommendations: string[] = [];
    const questionKeys = Object.keys(questions).slice(0, 3);
    questionKeys.forEach(key => {
      const questionList = questions[key];
      if (questionList && questionList.length > 0) {
        recommendations.push(`优先考虑${key}维度：${questionList[0]}`);
      }
    });
    return recommendations;
  }

  // 提取中期建议
  private extractMediumTermRecommendations(questions: Record<string, string[]>): string[] {
    if (!questions) return [];
    
    const recommendations: string[] = [];
    const questionKeys = Object.keys(questions).slice(3, 6);
    questionKeys.forEach(key => {
      const questionList = questions[key];
      if (questionList && questionList.length > 1) {
        recommendations.push(`中期规划${key}维度：${questionList[1]}`);
      }
    });
    return recommendations;
  }

  // 提取长期建议
  private extractLongTermRecommendations(questions: Record<string, string[]>): string[] {
    if (!questions) return [];
    
    const recommendations: string[] = [];
    const questionKeys = Object.keys(questions).slice(6);
    questionKeys.forEach(key => {
      const questionList = questions[key];
      if (questionList && questionList.length > 0) {
        recommendations.push(`长期战略${key}维度：${questionList[questionList.length - 1]}`);
      }
    });
    return recommendations;
  }
}

export const intelligentAnalysisEngine = new IntelligentAnalysisEngine();
export default intelligentAnalysisEngine;
