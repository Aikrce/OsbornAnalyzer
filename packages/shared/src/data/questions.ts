import { QuestionCategory } from '../types';

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  prompt?: string;
  examples?: string[];
}

const osbornQuestions: Question[] = [
  // 替代
  {
    id: 'alt-1',
    text: '有什么其他东西可以替代现有的物品？',
    category: QuestionCategory.ALTERNATIVE,
    prompt: '思考是否有其他材料、方法、技术或方案可以替代当前使用的',
    examples: ['塑料替代金属', '电子邮件替代纸质邮件', '可再生能源替代化石燃料'],
  },
  {
    id: 'alt-2',
    text: '如果改变规则或标准会怎样？',
    category: QuestionCategory.ALTERNATIVE,
    prompt: '考虑改变现有的规则、标准或约束条件',
    examples: ['放宽尺寸限制', '改变质量标准', '调整时间要求'],
  },
  {
    id: 'alt-3',
    text: '有其他过程或方法可以达到相同目的吗？',
    category: QuestionCategory.ALTERNATIVE,
    prompt: '探索不同的实现方式或工艺流程',
    examples: ['3D打印替代传统制造', '线上会议替代面对面会议'],
  },

  // 适应
  {
    id: 'ada-1',
    text: '有什么类似的东西可以借鉴？',
    category: QuestionCategory.ADAPTATION,
    prompt: '寻找其他领域或行业的类似解决方案',
    examples: ['仿生学设计', '跨行业最佳实践', '自然界启发'],
  },
  {
    id: 'ada-2',
    text: '这个创意可以应用到其他领域吗？',
    category: QuestionCategory.ADAPTATION,
    prompt: '思考当前创意的普适性和扩展性',
    examples: ['智能手机技术应用到汽车', '航空技术应用到高铁'],
  },
  {
    id: 'ada-3',
    text: '过去的解决方案中有可以借鉴的吗？',
    category: QuestionCategory.ADAPTATION,
    prompt: '回顾历史经验，寻找可复用的解决方案',
    examples: ['传统工艺现代化', '历史智慧应用', '经典案例重现'],
  },

  // 修改
  {
    id: 'mod-1',
    text: '改变形状、颜色、声音、意义会怎样？',
    category: QuestionCategory.MODIFICATION,
    prompt: '考虑改变物品的各种属性',
    examples: ['改变产品形状', '调整颜色搭配', '优化声音设计'],
  },
  {
    id: 'mod-2',
    text: '重新设计外观或风格？',
    category: QuestionCategory.MODIFICATION,
    prompt: '思考外观设计的创新可能性',
    examples: ['极简主义风格', '复古风格', '未来主义风格'],
  },
  {
    id: 'mod-3',
    text: '改变某个部分或组件会怎样？',
    category: QuestionCategory.MODIFICATION,
    prompt: '关注局部修改带来的整体影响',
    examples: ['更换材料', '改变连接方式', '调整比例'],
  },

  // 放大
  {
    id: 'mag-1',
    text: '增加什么？延长时间？提高频率？',
    category: QuestionCategory.MAGNIFICATION,
    prompt: '考虑增加各种元素或参数',
    examples: ['增加功能', '提高性能', '延长保修期'],
  },
  {
    id: 'mag-2',
    text: '加厚？加重？加高？加长？',
    category: QuestionCategory.MAGNIFICATION,
    prompt: '思考尺寸上的放大',
    examples: ['加大容量', '增强强度', '扩大覆盖范围'],
  },
  {
    id: 'mag-3',
    text: '添加额外的成分或功能？',
    category: QuestionCategory.MAGNIFICATION,
    prompt: '考虑增加新的元素或特性',
    examples: ['附加功能', '增值服务', '扩展模块'],
  },

  // 缩小
  {
    id: 'min-1',
    text: '减少什么？压缩？省略？精简？',
    category: QuestionCategory.MINIFICATION,
    prompt: '考虑减少或去除某些元素',
    examples: ['简化流程', '减小体积', '降低成本'],
  },
  {
    id: 'min-2',
    text: '小型化？轻量化？微型化？',
    category: QuestionCategory.MINIFICATION,
    prompt: '思考尺寸上的缩小',
    examples: ['迷你版设计', '轻量化材料', '紧凑布局'],
  },
  {
    id: 'min-3',
    text: '分割成更小的部分？',
    category: QuestionCategory.MINIFICATION,
    prompt: '考虑分解和模块化的可能性',
    examples: ['模块化设计', '分步实施', '组件化'],
  },

  // 替代（其他）
  {
    id: 'sub-1',
    text: '替换组件、材料、人员？',
    category: QuestionCategory.SUBSTITUTION,
    prompt: '考虑替换各种元素',
    examples: ['更换材料', '替换供应商', '改变工艺流程'],
  },
  {
    id: 'sub-2',
    text: '改变规则或条件？',
    category: QuestionCategory.SUBSTITUTION,
    prompt: '思考改变约束条件',
    examples: ['改变温度', '调整压力', '修改参数'],
  },
  {
    id: 'sub-3',
    text: '有其他资源可以利用吗？',
    category: QuestionCategory.SUBSTITUTION,
    prompt: '探索不同的资源选择',
    examples: ['利用废料', '共享资源', '循环经济'],
  },

  // 重排
  {
    id: 'rea-1',
    text: '改变顺序？调整布局？',
    category: QuestionCategory.REARRANGEMENT,
    prompt: '考虑顺序和布局的变化',
    examples: ['重新设计界面', '调整工作流程', '优化布局'],
  },
  {
    id: 'rea-2',
    text: '交换组件的位置？',
    category: QuestionCategory.REARRANGEMENT,
    prompt: '思考位置互换的可能性',
    examples: ['调换顺序', '镜像布局', '反向排列'],
  },
  {
    id: 'rea-3',
    text: '改变速度或节奏？',
    category: QuestionCategory.REARRANGEMENT,
    prompt: '考虑时间顺序的调整',
    examples: ['并行处理', '异步执行', '流水线'],
  },

  // 逆转
  {
    id: 'rev-1',
    text: '反过来会怎样？',
    category: QuestionCategory.REVERSAL,
    prompt: '思考逆向思维',
    examples: ['逆向思维', '反向操作', '倒序执行'],
  },
  {
    id: 'rev-2',
    text: '内外翻转？上下颠倒？',
    category: QuestionCategory.REVERSAL,
    prompt: '考虑空间上的反转',
    examples: ['内外翻转', '上下颠倒', '左右互换'],
  },
  {
    id: 'rev-3',
    text: '角色互换？职责对调？',
    category: QuestionCategory.REVERSAL,
    prompt: '思考角色和职责的变化',
    examples: ['客户变供应商', '学生变老师', '买方变卖方'],
  },

  // 组合
   {
    id: 'com-1',
    text: '混合？合并？集合？',
    category: QuestionCategory.COMBINATION,
    prompt: '考虑组合的可能性',
    examples: ['功能整合', '多用途设计', '一站式服务'],
  },
  {
    id: 'com-2',
    text: '搭配？配对？联盟？',
    category: QuestionCategory.COMBINATION,
    prompt: '思考联合和协作',
    examples: ['战略合作', '产品组合', '套餐服务'],
  },
  {
    id: 'com-3',
    text: '多功能集成？',
    category: QuestionCategory.COMBINATION,
    prompt: '考虑功能的整合',
    examples: ['瑞士军刀', '智能手机', '多功能工具'],
  },
];

export default osbornQuestions;