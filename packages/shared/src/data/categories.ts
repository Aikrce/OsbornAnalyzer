import { QuestionCategory } from '../types';

export interface Category {
  id: QuestionCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
  examples: string[];
}

const categories: Category[] = [
  {
    id: QuestionCategory.ALTERNATIVE,
    title: '替代',
    description: '有什么其他东西可以替代现有的？',
    icon: '🔄',
    color: '#3B82F6',
    examples: [
      '用塑料替代金属',
      '用电子邮件替代纸质邮件',
      '用流媒体替代实体光盘',
    ],
  },
  {
    id: QuestionCategory.ADAPTATION,
    title: '适应',
    description: '能否借鉴其他领域的解决方案？',
    icon: '🎯',
    color: '#10B981',
    examples: [
      '仿生学设计',
      '跨行业最佳实践',
      '自然界启发',
    ],
  },
  {
    id: QuestionCategory.MODIFICATION,
    title: '修改',
    description: '改变形状、颜色、声音、意义等？',
    icon: '✏️',
    color: '#F59E0B',
    examples: [
      '改变产品形状',
      '调整颜色搭配',
      '优化声音设计',
    ],
  },
  {
    id: QuestionCategory.MAGNIFICATION,
    title: '放大',
    description: '增加什么？提高频率？延长时间？',
    icon: '🔍',
    color: '#EF4444',
    examples: [
      '增加功能',
      '提高性能',
      '延长保修期',
    ],
  },
  {
    id: QuestionCategory.MINIFICATION,
    title: '缩小',
    description: '减少什么？压缩？省略？分割？',
    icon: '🔬',
    color: '#8B5CF6',
    examples: [
      '简化流程',
      '减小体积',
      '降低成本',
    ],
  },
  {
    id: QuestionCategory.SUBSTITUTION,
    title: '替代（其他）',
    description: '替换组件、材料、人员？',
    icon: '🔄',
    color: '#06B6D4',
    examples: [
      '更换材料',
      '替换供应商',
      '改变工艺流程',
    ],
  },
  {
    id: QuestionCategory.REARRANGEMENT,
    title: '重排',
    description: '改变顺序？调整布局？交换组件？',
    icon: '📋',
    color: '#84CC16',
    examples: [
      '重新设计界面',
      '调整工作流程',
      '优化布局',
    ],
  },
  {
    id: QuestionCategory.REVERSAL,
    title: '逆转',
    description: '反过来会怎样？内外翻转？角色互换？',
    icon: '🔄',
    color: '#F97316',
    examples: [
      '逆向思维',
      '角色互换',
      '流程反转',
    ],
  },
  {
    id: QuestionCategory.COMBINATION,
    title: '组合',
    description: '混合？合并？集合？搭配？',
    icon: '🔗',
    color: '#EC4899',
    examples: [
      '功能整合',
      '多用途设计',
      '一站式服务',
    ],
  },
];

export default categories;