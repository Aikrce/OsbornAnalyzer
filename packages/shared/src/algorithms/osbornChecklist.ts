import { OsbornQuestionType, AnalysisResultItem } from '../types';

export interface OsbornQuestion {
  title: string;
  description: string;
  category: string;
}

export const OSBORN_QUESTIONS: Record<OsbornQuestionType, OsbornQuestion> = {
  'other-uses': {
    title: '他用',
    description: '现有的东西（如发明、材料、方法等）有无其他用途？保持原状不变能否扩大用途？稍加改变有无其他用途？',
    category: 'other-uses'
  },
  'adapt': {
    title: '适应',
    description: '能否借用其他的经验或发明？过去有无类似的东西？有什么东西可供模仿？谁的东西可供模仿？现有的发明能否引入其他的创造性设想？',
    category: 'adapt'
  },
  'modify': {
    title: '修改',
    description: '现有的东西能否作某些改变？改变一下会怎么样？可否改变一下形状、颜色、声音、味道？是否可改变一下意义、型号、模具、运动形式？',
    category: 'modify'
  },
  'magnify': {
    title: '扩大',
    description: '现有的东西能否扩大使用范围？能不能增加一些东西？能否添加部件，拉长时间，增加长度，提高强度，延长使用寿命，提高价值，加快转速？',
    category: 'magnify'
  },
  'minify': {
    title: '缩小',
    description: '现有的东西能否缩小体积？减轻重量？降低高度？压缩、变薄、缩短、省略、分割、减轻？',
    category: 'minify'
  },
  'substitute': {
    title: '代替',
    description: '能否用其他材料、元件、方法、工艺、动力、场所、声音等代替？',
    category: 'substitute'
  },
  'rearrange': {
    title: '重组',
    description: '能否更换元件？能否用其他型号？能否用其他设计？能否调整顺序？能否调整速度？能否调整日程？',
    category: 'rearrange'
  },
  'reverse': {
    title: '反转',
    description: '能否正反颠倒？能否前后颠倒？能否上下颠倒？能否颠倒位置？能否颠倒作用？',
    category: 'reverse'
  },
  'combine': {
    title: '组合',
    description: '现有东西能否加以组合？能否组合部件？能否组合方案？能否组合目的？能否组合观点？',
    category: 'combine'
  }
};

export function generateOsbornQuestions(topic: string, keyword: string): OsbornQuestion[] {
  return Object.values(OSBORN_QUESTIONS).map(question => ({
    ...question,
    title: `${question.title} - ${topic}`,
    description: `针对"${keyword}"这个关键词，在"${topic}"领域中的${question.description}`
  }));
}

export function generateInsights(results: AnalysisResultItem[]): string[] {
  const insights: string[] = [];
  
  results.forEach((result, index) => {
    const question = OSBORN_QUESTIONS[result.type as OsbornQuestionType];
    if (question) {
      insights.push(`${index + 1}. ${question.title} - ${result.description.substring(0, 100)}...`);
    }
  });
  
  return insights;
}

export const sortOptions = {
  byType: (a: AnalysisResultItem, b: AnalysisResultItem) => 
    a.type.localeCompare(b.type),
  byScore: (a: AnalysisResultItem, b: AnalysisResultItem) => b.score - a.score
};

export function filterResults(results: AnalysisResultItem[], filters: {
  questionTypes?: string[];
  minScore?: number;
  maxScore?: number;
}): AnalysisResultItem[] {
  return results.filter(item => {
    if (filters.questionTypes && !filters.questionTypes.includes(item.type)) return false;
    if (filters.minScore !== undefined && item.score < filters.minScore) return false;
    if (filters.maxScore !== undefined && item.score > filters.maxScore) return false;
    return true;
  });
}