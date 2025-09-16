import type { CaseStudy } from '../types';
import { QuestionCategory } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: '智能手机革命',
    description: '从功能机到智能机的技术变革',
    industry: '科技',
    company: 'Apple/Samsung',
    analysisResult: {
      id: 'analysis-1',
      title: '智能手机创新分析',
      description: '探索智能手机如何改变通信方式',
      questions: {
        [QuestionCategory.ALTERNATIVE]: ['能否用其他方式实现通信？'],
        [QuestionCategory.ADAPTATION]: ['能否借鉴其他行业的技术？'],
        [QuestionCategory.MODIFICATION]: ['能否改变手机的外观设计？'],
        [QuestionCategory.MAGNIFICATION]: ['能否增加更多功能？'],
        [QuestionCategory.MINIFICATION]: ['能否简化操作流程？'],
        [QuestionCategory.SUBSTITUTION]: ['能否用其他材料制造？'],
        [QuestionCategory.REARRANGEMENT]: ['能否重新设计界面布局？'],
        [QuestionCategory.REVERSAL]: ['能否颠倒使用方式？'],
        [QuestionCategory.COMBINATION]: ['能否与其他设备结合？']
      },
      summary: '智能手机通过整合多种技术，彻底改变了人们的通信和生活方式',
      totalScore: 295,
      quality: 'high',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      timestamp: new Date('2024-03-10'),
      question: '智能手机如何改变通信方式？',
      analysis: '智能手机通过整合多种技术，彻底改变了人们的通信和生活方式',
      suggestions: ['继续优化用户体验', '开发更多创新功能']
    },
    difficulty: 'beginner',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: 'case-2',
    title: '电动汽车革命',
    description: '用电力驱动替代燃油驱动的交通变革',
    industry: '制造业',
    company: 'Tesla/BYD',
    analysisResult: {
      id: 'analysis-2',
      title: '电动汽车创新分析',
      description: '探索电动汽车如何颠覆传统汽车行业',
      questions: {
        [QuestionCategory.ALTERNATIVE]: ['能否用其他能源驱动？'],
        [QuestionCategory.ADAPTATION]: ['能否借鉴其他行业的技术？'],
        [QuestionCategory.MODIFICATION]: ['能否改变车身设计？'],
        [QuestionCategory.MAGNIFICATION]: ['能否增加续航里程？'],
        [QuestionCategory.MINIFICATION]: ['能否减少充电时间？'],
        [QuestionCategory.SUBSTITUTION]: ['能否用其他材料制造？'],
        [QuestionCategory.REARRANGEMENT]: ['能否重新设计内部结构？'],
        [QuestionCategory.REVERSAL]: ['能否颠倒充电方式？'],
        [QuestionCategory.COMBINATION]: ['能否与其他技术结合？']
      },
      summary: '电动汽车通过清洁能源和智能技术，正在重塑汽车行业',
      totalScore: 280,
      quality: 'high',
      createdAt: new Date('2024-03-25'),
      updatedAt: new Date('2024-03-25'),
      timestamp: new Date('2024-03-25'),
      question: '电动汽车如何颠覆传统汽车行业？',
      analysis: '电动汽车通过清洁能源和智能技术，正在重塑汽车行业',
      suggestions: ['提高电池技术', '建设充电基础设施']
    },
    difficulty: 'intermediate',
    createdAt: new Date('2024-03-25'),
    updatedAt: new Date('2024-03-25')
  },
  {
    id: 'case-3',
    title: '移动支付生态',
    description: '从支付工具到金融服务平台的演进',
    industry: '金融服务',
    company: '支付宝/微信支付',
    analysisResult: {
      id: 'analysis-3',
      title: '移动支付创新分析',
      description: '分析移动支付如何改变传统金融业态',
      questions: {
        [QuestionCategory.ALTERNATIVE]: ['能否用其他方式支付？'],
        [QuestionCategory.ADAPTATION]: ['能否借鉴其他行业模式？'],
        [QuestionCategory.MODIFICATION]: ['能否改变支付流程？'],
        [QuestionCategory.MAGNIFICATION]: ['能否增加金融服务？'],
        [QuestionCategory.MINIFICATION]: ['能否简化操作步骤？'],
        [QuestionCategory.SUBSTITUTION]: ['能否用其他技术实现？'],
        [QuestionCategory.REARRANGEMENT]: ['能否重新设计界面？'],
        [QuestionCategory.REVERSAL]: ['能否颠倒支付方式？'],
        [QuestionCategory.COMBINATION]: ['能否与其他服务结合？']
      },
      summary: '移动支付通过数字化和平台化，重新定义了金融服务',
      totalScore: 290,
      quality: 'high',
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date('2024-04-05'),
      timestamp: new Date('2024-04-05'),
      question: '移动支付如何改变传统金融业态？',
      analysis: '移动支付通过数字化和平台化，重新定义了金融服务',
      suggestions: ['加强安全防护', '拓展应用场景']
    },
    difficulty: 'beginner',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05')
  }
];

export default caseStudies;