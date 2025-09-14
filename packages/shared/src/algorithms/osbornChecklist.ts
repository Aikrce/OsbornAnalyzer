import { OsbornQuestion, OsbornQuestionType, AnalysisResultItem } from '../types';

/**
 * 奥斯本检核表九大问题配置
 */
export const OSBORN_QUESTIONS: Record<OsbornQuestionType, OsbornQuestion> = {
  putToOtherUses: {
    id: 'putToOtherUses',
    title: '他用',
    description: '现有的东西（如发明、材料、方法等）有无其他用途？保持原状不变能否扩大用途？稍加改变有无其他用途？',
    icon: '🔍',
    examples: [
      '微波炉最初是为雷达系统开发的，后来发现可以用于烹饪',
      '可口可乐最初是作为药物发明的',
      '凡士林最初是作为机械润滑剂开发的'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，从"{topic}"领域出发，思考它是否有其他用途？保持原状或稍作改变后能否应用于其他场景？'
  },
  adapt: {
    id: 'adapt',
    title: '适应',
    description: '能否借用其他的经验或发明？过去有无类似的东西？有什么东西可供模仿？谁的东西可供模仿？现有的发明能否引入其他的创造性设想？',
    icon: '🔄',
    examples: [
      '飞机借鉴了鸟类的飞行原理',
      '尼龙搭扣模仿了苍耳的结构',
      '潜水艇借鉴了鱼类的浮沉原理'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，有哪些其他领域的经验或发明可以借鉴？过去有无类似的东西可供模仿？'
  },
  modify: {
    id: 'modify',
    title: '修改',
    description: '现有的东西能否作某些改变？改变一下会怎么样？可否改变一下形状、颜色、声音、味道？是否可改变一下意义、型号、模具、运动形式？',
    icon: '🎨',
    examples: [
      '圆形轮胎改为椭圆形轮胎提高舒适性',
      '改变手机外壳颜色吸引不同用户群体',
      '调整食品口味适应不同地区消费者'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否对其形状、颜色、声音、味道或其他属性进行修改？改变后会带来什么效果？'
  },
  magnify: {
    id: 'magnify',
    title: '扩大',
    description: '现有的东西能否扩大使用范围？能不能增加一些东西？能否添加部件，拉长时间，增加长度，提高强度，延长使用寿命，提高价值，加快转速？',
    icon: '📈',
    examples: [
      '手机屏幕尺寸不断增大提升用户体验',
      '增加电池容量延长设备使用时间',
      '扩大存储空间满足用户需求'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否扩大其使用范围或规模？是否可以增加功能、延长使用时间、提高性能？'
  },
  minify: {
    id: 'minify',
    title: '缩小',
    description: '现有的东西能否缩小体积？减轻重量？降低高度？压缩、变薄、缩短、省略、分割、减轻？',
    icon: '📉',
    examples: [
      '计算机从房间大小缩小到桌面设备',
      '手机从厚重变得轻薄',
      '软件功能模块化便于维护'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否缩小其体积、减轻重量或简化结构？是否可以省略某些部分或进行分割？'
  },
  substitute: {
    id: 'substitute',
    title: '代替',
    description: '能否用其他材料、元件、方法、工艺、动力、场所、声音等代替？',
    icon: '🔄',
    examples: [
      '塑料代替金属制造零件降低成本',
      '数字支付代替现金交易',
      '远程会议代替面对面会议'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否用其他材料、方法、技术或资源来代替？替代后会有什么优势？'
  },
  rearrange: {
    id: 'rearrange',
    title: '重组',
    description: '能否更换元件？能否用其他型号？能否用其他设计？能否调整顺序？能否调整速度？能否调整日程？',
    icon: '🔀',
    examples: [
      '家具模块化设计便于重新组合',
      '工作流程重组提高效率',
      '产品功能重新排列优化用户体验'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否重新排列组合其组成部分？调整顺序、结构或流程后会有什么效果？'
  },
  reverse: {
    id: 'reverse',
    title: '反转',
    description: '能否正反颠倒？能否前后颠倒？能否上下颠倒？能否颠倒位置？能否颠倒作用？',
    icon: '🔄',
    examples: [
      '吸尘器从吹风改为吸风',
      '电梯从人力操作改为自动运行',
      '从卖方市场转为买方市场思维'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否颠倒其方向、顺序或作用？反过来思考会有什么新发现？'
  },
  combine: {
    id: 'combine',
    title: '组合',
    description: '现有东西能否加以组合？能否组合部件？能否组合方案？能否组合目的？能否组合观点？',
    icon: '➕',
    examples: [
      '智能手机组合了电话、相机、音乐播放器等功能',
      '跨界合作产生新的商业模式',
      '不同技术组合创造新产品'
    ],
    promptTemplate: '针对"{keyword}"这个关键词，在"{topic}"领域中，能否与其他元素、技术或概念进行组合？组合后会产生什么新的价值？'
  }
};

/**
 * 生成奥斯本检核表分析问题
 */
export function generateOsbornQuestions(topic: string, keyword: string): OsbornQuestion[] {
  return Object.values(OSBORN_QUESTIONS).map(question => ({
    ...question,
    promptTemplate: question.promptTemplate
      .replace('{topic}', topic)
      .replace('{keyword}', keyword)
  }));
}

/**
 * 计算分析结果的质量评分
 */
export function calculateQualityScore(results: AnalysisResultItem[]): {
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
} {
  const totalScore = results.reduce((sum, item) => sum + item.score, 0) / results.length;
  
  let quality: 'low' | 'medium' | 'high' = 'low';
  if (totalScore >= 80) quality = 'high';
  else if (totalScore >= 60) quality = 'medium';
  
  return { totalScore, quality };
}

/**
 * 生成分析结果摘要
 */
export function generateSummary(results: AnalysisResultItem[], topic: string, keyword: string): string {
  const highScoreResults = results.filter(item => item.score >= 80);
  const mediumScoreResults = results.filter(item => item.score >= 60 && item.score < 80);
  
  const insights = [
    `基于"${keyword}"在"${topic}"领域的奥斯本检核表分析，共发现:`,
    `• ${highScoreResults.length} 个高价值创新方向（评分≥80）`,
    `• ${mediumScoreResults.length} 个中等价值创新方向（评分60-79）`,
    `• ${results.length - highScoreResults.length - mediumScoreResults.length} 个待优化方向`
  ];
  
  // 添加最高分的三个方向
  const topResults = [...results]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  if (topResults.length > 0) {
    insights.push('\n最具潜力的创新方向:');
    topResults.forEach((result, index) => {
      const question = OSBORN_QUESTIONS[result.questionType];
      insights.push(`${index + 1}. ${question.title} - ${result.answer.substring(0, 100)}...`);
    });
  }
  
  return insights.join('\n');
}

/**
 * 评估回答质量
 */
export function evaluateAnswerQuality(answer: string): number {
  if (!answer || answer.trim().length === 0) return 0;
  
  const text = answer.toLowerCase();
  let score = 50; // 基础分
  
  // 根据内容特征加分
  if (text.length > 100) score += 10;
  if (text.includes('例如') || text.includes('比如') || text.includes('案例')) score += 5;
  if (text.includes('因为') || text.includes('原因') || text.includes('因此')) score += 5;
  if (text.includes('可以') || text.includes('能够') || text.includes('可能')) score += 5;
  if (text.includes('创新') || text.includes('改进') || text.includes('优化')) score += 5;
  
  // 根据具体性加分
  const specificTerms = text.match(/\b(\d+|[A-Za-z]+\.|[①②③④⑤])\b/g);
  if (specificTerms && specificTerms.length > 1) score += 10;
  
  // 限制在0-100之间
  return Math.min(Math.max(score, 0), 100);
}

/**
 * 提取关键洞察
 */
export function extractInsights(answer: string): string[] {
  const insights: string[] = [];
  const sentences = answer.split(/[.!?。！？]/).filter(s => s.trim().length > 10);
  
  sentences.forEach(sentence => {
    const trimmed = sentence.trim();
    
    // 识别包含价值陈述的句子
    if (
      trimmed.includes('可以') ||
      trimmed.includes('能够') ||
      trimmed.includes('可能') ||
      trimmed.includes('提高') ||
      trimmed.includes('降低') ||
      trimmed.includes('优化') ||
      trimmed.includes('改进') ||
      trimmed.includes('创新')
    ) {
      insights.push(trimmed);
    }
  });
  
  // 如果没有提取到洞察，使用整个回答的前三句
  if (insights.length === 0 && sentences.length > 0) {
    return sentences.slice(0, 3).map(s => s.trim());
  }
  
  return insights.slice(0, 5); // 最多返回5个洞察
}

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 格式化时间戳
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * 验证分析请求参数
 */
export function validateAnalysisRequest(topic: string, keyword: string): string | null {
  if (!topic || topic.trim().length === 0) {
    return '主题不能为空';
  }
  
  if (!keyword || keyword.trim().length === 0) {
    return '关键词不能为空';
  }
  
  if (topic.trim().length < 2) {
    return '主题至少需要2个字符';
  }
  
  if (keyword.trim().length < 2) {
    return '关键词至少需要2个字符';
  }
  
  if (topic.trim().length > 100) {
    return '主题长度不能超过100个字符';
  }
  
  if (keyword.trim().length > 50) {
    return '关键词长度不能超过50个字符';
  }
  
  return null;
}

/**
 * 分析结果排序器
 */
export const resultSorters = {
  byScore: (a: AnalysisResultItem, b: AnalysisResultItem) => b.score - a.score,
  byQuestionType: (a: AnalysisResultItem, b: AnalysisResultItem) => 
    a.questionType.localeCompare(b.questionType),
  byConfidence: (a: AnalysisResultItem, b: AnalysisResultItem) => b.confidence - a.confidence
};

/**
 * 过滤分析结果
 */
export function filterResults(
  results: AnalysisResultItem[],
  filters: {
    minScore?: number;
    maxScore?: number;
    questionTypes?: OsbornQuestionType[];
  }
): AnalysisResultItem[] {
  return results.filter(item => {
    if (filters.minScore !== undefined && item.score < filters.minScore) return false;
    if (filters.maxScore !== undefined && item.score > filters.maxScore) return false;
    if (filters.questionTypes && !filters.questionTypes.includes(item.questionType)) return false;
    return true;
  });
}