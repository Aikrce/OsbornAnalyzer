// 奥斯本案例数据结构
export interface OsbornCase {
  id: string;
  title: string;
  description: string;
  topic: string;
  industry: string;
  company: string;
  tags: string[];
  analysisType: 'osborn';
  analysisData: {
    dimension: string;
    questions: string[];
    insights: string[];
    innovationSchemes: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// 奥斯本检核表法九大维度的基础案例
export const OSBORN_BASE_CASES: OsbornCase[] = [
  // 能否他用 - Put to other uses
  {
    id: 'osborn-other-uses-001',
    title: '无人机技术多用途应用',
    description: '将无人机技术从军事用途扩展到农田喷洒、电力巡检、快递配送等多个民用领域',
    topic: '无人机',
    industry: '科技创新',
    company: '多领域应用',
    tags: ['奥斯本分析', '能否他用', '技术创新', '多用途开发'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否他用',
      questions: [
        '无人机除了军事用途，还能用于哪些民用领域？',
        '如何将无人机技术应用到农业、物流、巡检等行业？',
        '无人机技术可以解决哪些传统行业的痛点？'
      ],
      insights: [
        '农田喷洒：提高农药喷洒效率，减少人工成本',
        '电力巡检：替代人工巡检，提高安全性和效率',
        '快递配送：解决最后一公里配送难题',
        '环境监测：用于空气质量、水质等环境数据收集'
      ],
      innovationSchemes: [
        '开发专用载荷系统，适应不同行业需求',
        '建立无人机服务网络，提供标准化服务',
        '开发智能调度系统，优化飞行路径和任务分配'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-other-uses-002',
    title: '3D打印技术跨界应用',
    description: '将3D打印技术从原型制造扩展到医疗、食品、建筑等多个领域',
    topic: '3D打印',
    industry: '制造业',
    company: '跨界创新',
    tags: ['奥斯本分析', '能否他用', '3D打印', '跨界应用'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否他用',
      questions: [
        '3D打印技术除了制造原型，还能用于哪些领域？',
        '如何将3D打印应用到医疗、食品、建筑等行业？',
        '3D打印技术可以创造哪些新的应用场景？'
      ],
      insights: [
        '医疗领域：打印骨骼、器官模型、定制假肢',
        '食品行业：打印巧克力、糖果、个性化食品',
        '建筑领域：打印建筑构件、装饰品',
        '教育领域：制作教学模型、实验器材'
      ],
      innovationSchemes: [
        '开发食品级3D打印材料和工艺',
        '建立医疗3D打印服务网络',
        '开发建筑3D打印技术和标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否借用 - Borrow/Adapt
  {
    id: 'osborn-borrow-001',
    title: '蜂巢结构在建筑设计中的应用',
    description: '借鉴蜂巢的六边形结构，实现轻质高强的建筑材料设计',
    topic: '蜂巢结构',
    industry: '建筑设计',
    company: '仿生设计',
    tags: ['奥斯本分析', '能否借用', '仿生设计', '建筑结构'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否借用',
      questions: [
        '自然界中哪些结构可以借鉴到建筑设计中？',
        '如何将蜂巢结构应用到现代建筑中？',
        '仿生设计可以解决哪些建筑难题？'
      ],
      insights: [
        '轻质高强：六边形结构提供最佳强度重量比',
        '材料节约：减少材料使用量，降低成本',
        '美观性：独特的几何美感，提升建筑外观',
        '功能性：内部空间可以用于管道、电缆等'
      ],
      innovationSchemes: [
        '开发仿蜂巢结构的建筑材料',
        '设计模块化的蜂巢建筑系统',
        '建立仿生建筑设计标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-borrow-002',
    title: '轮胎花纹在运动鞋设计中的应用',
    description: '借鉴轮胎的抓地花纹设计，提升运动鞋的防滑性能',
    topic: '运动鞋设计',
    industry: '体育用品',
    company: '跨界创新',
    tags: ['奥斯本分析', '能否借用', '运动鞋', '防滑设计'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否借用',
      questions: [
        '汽车工业的哪些技术可以借鉴到运动鞋设计？',
        '如何将轮胎花纹应用到鞋底设计中？',
        '跨界借鉴可以解决哪些运动鞋设计难题？'
      ],
      insights: [
        '防滑性能：借鉴轮胎花纹提升抓地力',
        '耐磨性：采用轮胎材料技术提高鞋底寿命',
        '排水性：借鉴轮胎排水槽设计',
        '舒适性：结合人体工学设计'
      ],
      innovationSchemes: [
        '开发仿轮胎花纹的鞋底设计',
        '采用轮胎材料技术制造鞋底',
        '建立运动鞋防滑性能标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否改变 - Modify
  {
    id: 'osborn-modify-001',
    title: '福特T型车的颜色多样化',
    description: '将福特T型车从只提供黑色改为多种颜色选择，满足不同用户需求',
    topic: '汽车设计',
    industry: '汽车制造',
    company: '福特汽车',
    tags: ['奥斯本分析', '能否改变', '汽车设计', '个性化'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否改变',
      questions: [
        '如何改变汽车的外观以满足不同用户需求？',
        '颜色多样化可以带来哪些商业价值？',
        '如何平衡个性化和生产成本？'
      ],
      insights: [
        '个性化需求：满足不同用户的审美偏好',
        '市场细分：针对不同用户群体推出不同颜色',
        '品牌差异化：通过颜色区分不同车型',
        '情感价值：颜色影响用户的情感体验'
      ],
      innovationSchemes: [
        '开发多种颜色选择方案',
        '建立颜色定制服务体系',
        '优化生产流程支持多颜色生产'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-modify-002',
    title: '笔杆形状的人体工学改进',
    description: '将传统圆形笔杆改为三角形或带软胶垫的笔杆，提升握持舒适度',
    topic: '笔具设计',
    industry: '文具制造',
    company: '人体工学设计',
    tags: ['奥斯本分析', '能否改变', '笔具设计', '人体工学'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否改变',
      questions: [
        '如何改变笔杆形状以提升使用体验？',
        '人体工学设计可以解决哪些使用问题？',
        '如何平衡美观性和功能性？'
      ],
      insights: [
        '握持舒适：三角形设计更符合手指自然弯曲',
        '防滑性：软胶垫提供更好的摩擦力',
        '长时间使用：减少手部疲劳',
        '个性化：适应不同手型和使用习惯'
      ],
      innovationSchemes: [
        '开发多种形状的笔杆设计',
        '采用软胶材料提升握持感',
        '建立人体工学笔具设计标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否扩大 - Magnify
  {
    id: 'osborn-magnify-001',
    title: '多功能药物牙膏的开发',
    description: '在牙膏中加入防酸、脱敏、止血等功能配料，制成多功能药物牙膏',
    topic: '牙膏产品',
    industry: '日化用品',
    company: '功能创新',
    tags: ['奥斯本分析', '能否扩大', '牙膏', '多功能产品'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否扩大',
      questions: [
        '如何扩大牙膏的功能以满足更多需求？',
        '多功能产品可以带来哪些市场优势？',
        '如何平衡功能性和安全性？'
      ],
      insights: [
        '防酸功能：保护牙齿免受酸性物质侵蚀',
        '脱敏功能：缓解牙齿敏感问题',
        '止血功能：帮助牙龈健康',
        '市场细分：针对不同口腔问题提供专门解决方案'
      ],
      innovationSchemes: [
        '开发多种功能配料的牙膏配方',
        '建立功能牙膏的产品标准',
        '开展功能验证和安全性测试'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-magnify-002',
    title: '智能手机功能增强',
    description: '增加智能手机的屏幕尺寸、电池容量和功能模块，提升用户体验',
    topic: '智能手机',
    industry: '消费电子',
    company: '功能增强',
    tags: ['奥斯本分析', '能否扩大', '智能手机', '功能增强'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否扩大',
      questions: [
        '如何扩大智能手机的功能和性能？',
        '功能增强可以解决哪些用户痛点？',
        '如何平衡功能性和便携性？'
      ],
      insights: [
        '屏幕尺寸：提供更好的视觉体验',
        '电池容量：延长使用时间',
        '功能模块：集成更多实用功能',
        '性能提升：提供更流畅的使用体验'
      ],
      innovationSchemes: [
        '开发大屏高续航的智能手机',
        '集成更多传感器和功能模块',
        '优化系统性能提升用户体验'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否缩小 - Minify
  {
    id: 'osborn-minify-001',
    title: '便携式3D打印机的开发',
    description: '缩小3D打印机机体，开发便携式3D打印机，满足移动制造需求',
    topic: '3D打印机',
    industry: '制造业',
    company: '便携化设计',
    tags: ['奥斯本分析', '能否缩小', '3D打印机', '便携化'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否缩小',
      questions: [
        '如何缩小3D打印机的体积？',
        '便携式设计可以创造哪些新应用场景？',
        '如何平衡便携性和功能性？'
      ],
      insights: [
        '移动制造：随时随地进行3D打印',
        '教育应用：便于在课堂和实验室使用',
        '个人使用：降低使用门槛',
        '应急制造：在紧急情况下快速制造所需物品'
      ],
      innovationSchemes: [
        '开发紧凑型3D打印机设计',
        '优化打印工艺提高效率',
        '建立便携式3D打印标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-minify-002',
    title: '纳米芯片技术发展',
    description: '开发纳米芯片技术，提高集成电路密度，实现更小更强的计算设备',
    topic: '芯片技术',
    industry: '半导体',
    company: '技术突破',
    tags: ['奥斯本分析', '能否缩小', '芯片技术', '纳米技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否缩小',
      questions: [
        '如何缩小芯片的尺寸？',
        '纳米技术可以带来哪些技术突破？',
        '如何平衡性能和功耗？'
      ],
      insights: [
        '集成度提升：在更小空间内集成更多功能',
        '性能提升：更快的运算速度和更低的功耗',
        '应用扩展：为可穿戴设备、物联网等提供支持',
        '成本降低：提高生产效率降低制造成本'
      ],
      innovationSchemes: [
        '开发纳米级芯片制造工艺',
        '优化芯片架构设计',
        '建立纳米芯片技术标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否代用 - Substitute
  {
    id: 'osborn-substitute-001',
    title: '植物蛋白替代动物蛋白',
    description: '用大豆、豌豆等植物蛋白替代动物蛋白制作人造肉，提供环保健康的替代方案',
    topic: '人造肉',
    industry: '食品科技',
    company: '替代创新',
    tags: ['奥斯本分析', '能否代用', '人造肉', '植物蛋白'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否代用',
      questions: [
        '如何用植物蛋白替代动物蛋白？',
        '替代方案可以解决哪些环境和社会问题？',
        '如何保证替代产品的营养和口感？'
      ],
      insights: [
        '环保性：减少畜牧业对环境的压力',
        '健康性：提供更健康的蛋白质来源',
        '可持续性：解决全球粮食安全问题',
        '创新性：创造新的食品产业'
      ],
      innovationSchemes: [
        '开发植物蛋白提取和加工技术',
        '优化人造肉的口感和营养',
        '建立植物蛋白食品标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-substitute-002',
    title: '可再生能源替代化石燃料',
    description: '用太阳能、风能等可再生能源替代化石燃料发电，实现清洁能源转型',
    topic: '清洁能源',
    industry: '能源',
    company: '能源转型',
    tags: ['奥斯本分析', '能否代用', '清洁能源', '能源转型'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否代用',
      questions: [
        '如何用可再生能源替代化石燃料？',
        '清洁能源可以解决哪些环境问题？',
        '如何保证能源供应的稳定性？'
      ],
      insights: [
        '环保性：减少温室气体排放',
        '可持续性：利用取之不尽的自然资源',
        '经济性：降低长期能源成本',
        '创新性：推动能源技术发展'
      ],
      innovationSchemes: [
        '开发高效的可再生能源技术',
        '建立智能电网系统',
        '建立清洁能源标准体系'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否调整 - Rearrange
  {
    id: 'osborn-rearrange-001',
    title: '飞机螺旋桨位置调整',
    description: '将飞机螺旋桨从头部移到顶部成为直升机，再移到尾部成为喷气式飞机',
    topic: '飞行器设计',
    industry: '航空',
    company: '设计创新',
    tags: ['奥斯本分析', '能否调整', '飞行器', '设计创新'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否调整',
      questions: [
        '如何调整螺旋桨位置改变飞行器性能？',
        '不同布局可以创造哪些新的飞行器类型？',
        '如何优化不同布局的飞行性能？'
      ],
      insights: [
        '直升机：垂直起降能力',
        '喷气式飞机：高速飞行能力',
        '多功能性：适应不同飞行需求',
        '创新性：创造新的飞行器类型'
      ],
      innovationSchemes: [
        '开发不同布局的飞行器设计',
        '优化不同布局的飞行性能',
        '建立飞行器设计标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-rearrange-002',
    title: '商店柜台布局优化',
    description: '重新安排商店柜台布局，优化客户流动线，提升购物体验和销售效率',
    topic: '零售设计',
    industry: '零售业',
    company: '布局优化',
    tags: ['奥斯本分析', '能否调整', '零售设计', '布局优化'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否调整',
      questions: [
        '如何调整商店布局提升客户体验？',
        '优化布局可以带来哪些商业价值？',
        '如何平衡美观性和功能性？'
      ],
      insights: [
        '客户流动：引导客户流向高价值区域',
        '商品展示：提高商品可见性和吸引力',
        '购物体验：减少拥挤和等待时间',
        '销售效率：提高单位面积销售额'
      ],
      innovationSchemes: [
        '开发智能布局设计系统',
        '建立零售空间设计标准',
        '优化客户流动线设计'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否颠倒 - Reverse
  {
    id: 'osborn-reverse-001',
    title: '电动机的发明',
    description: '将发电机原理颠倒，发明电动机，实现电能到机械能的转换',
    topic: '电动机',
    industry: '电气工程',
    company: '技术突破',
    tags: ['奥斯本分析', '能否颠倒', '电动机', '技术突破'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否颠倒',
      questions: [
        '如何颠倒发电机原理发明电动机？',
        '逆向思维可以创造哪些技术突破？',
        '如何优化电动机的性能和效率？'
      ],
      insights: [
        '能量转换：实现电能到机械能的转换',
        '应用广泛：为各种机械设备提供动力',
        '效率提升：比传统机械动力更高效',
        '创新性：开创了电气化时代'
      ],
      innovationSchemes: [
        '开发高效电动机技术',
        '优化电动机控制系统',
        '建立电动机技术标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-reverse-002',
    title: '反向拍卖模式',
    description: '改变传统拍卖模式，采用反向拍卖（买家发布需求，卖家竞争报价）',
    topic: '拍卖模式',
    industry: '电子商务',
    company: '模式创新',
    tags: ['奥斯本分析', '能否颠倒', '拍卖模式', '模式创新'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否颠倒',
      questions: [
        '如何颠倒传统拍卖模式？',
        '反向拍卖可以解决哪些商业问题？',
        '如何保证反向拍卖的公平性和效率？'
      ],
      insights: [
        '买方优势：买家获得更多选择和更低价格',
        '竞争激烈：卖家通过竞争提供更好服务',
        '效率提升：快速匹配供需双方',
        '透明度：公开的竞争过程'
      ],
      innovationSchemes: [
        '开发反向拍卖平台系统',
        '建立反向拍卖规则和标准',
        '优化匹配算法提高效率'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否组合 - Combine
  {
    id: 'osborn-combine-001',
    title: '带橡皮的铅笔',
    description: '把铅笔和橡皮组合在一起成为带橡皮的铅笔，提供一体化解决方案',
    topic: '文具设计',
    industry: '文具制造',
    company: '功能组合',
    tags: ['奥斯本分析', '能否组合', '文具设计', '功能组合'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否组合',
      questions: [
        '如何将铅笔和橡皮组合在一起？',
        '功能组合可以带来哪些便利？',
        '如何平衡组合产品的成本和性能？'
      ],
      insights: [
        '便利性：一个工具解决两个需求',
        '效率提升：减少工具切换时间',
        '成本节约：减少单独购买成本',
        '用户体验：提供更好的使用体验'
      ],
      innovationSchemes: [
        '开发一体化文具设计',
        '优化组合产品的生产工艺',
        '建立组合文具设计标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-combine-002',
    title: '智能手机多功能集成',
    description: '将电话、相机、电脑、导航仪、支付工具等多种功能组合在智能手机中',
    topic: '智能手机',
    industry: '消费电子',
    company: '功能集成',
    tags: ['奥斯本分析', '能否组合', '智能手机', '功能集成'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否组合',
      questions: [
        '如何将多种功能组合在智能手机中？',
        '功能集成可以带来哪些价值？',
        '如何平衡功能性和用户体验？'
      ],
      insights: [
        '便携性：一个设备替代多个设备',
        '便利性：随时随地使用各种功能',
        '成本节约：减少购买多个设备的成本',
        '创新性：创造新的使用场景'
      ],
      innovationSchemes: [
        '开发多功能集成技术',
        '优化用户界面和交互设计',
        '建立智能手机功能标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 更多奥斯本检核表法案例 - 基于用户提供的75个详细案例

  // 能否他用 - 更多案例
  {
    id: 'osborn-other-uses-003',
    title: '电吹风工业干燥应用',
    description: '将家用吹风机用于实验室设备快速干燥或小型工业零件清理',
    topic: '电吹风',
    industry: '工业制造',
    company: '多功能应用',
    tags: ['奥斯本分析', '能否他用', '电吹风', '工业应用'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否他用',
      questions: [
        '电吹风除了吹干头发，还能用于哪些工业场景？',
        '如何将电吹风应用到实验室和工业制造中？',
        '电吹风可以解决哪些专业干燥需求？'
      ],
      insights: [
        '实验室干燥：快速干燥实验器材和样品',
        '工业零件清理：清理小型机械零件',
        '成本优势：低成本解决专业干燥需求',
        '效率提升：比传统干燥方法更快速'
      ],
      innovationSchemes: [
        '开发工业级电吹风产品',
        '设计专用干燥附件',
        '建立工业干燥服务标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-other-uses-004',
    title: '红酒瓶创意灯具',
    description: '将空红酒瓶改造成创意台灯和吊灯，实现废品利用',
    topic: '红酒瓶',
    industry: '家居设计',
    company: '创意改造',
    tags: ['奥斯本分析', '能否他用', '红酒瓶', '创意设计'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否他用',
      questions: [
        '空红酒瓶除了回收，还能用于哪些创意用途？',
        '如何将红酒瓶改造成实用的家居用品？',
        '红酒瓶改造可以创造哪些新的市场价值？'
      ],
      insights: [
        '创意灯具：独特的家居装饰品',
        '环保价值：减少废品，实现循环利用',
        '艺术价值：创造独特的艺术效果',
        '商业价值：开发红酒瓶改造产品线'
      ],
      innovationSchemes: [
        '开发红酒瓶改造工具包',
        '建立创意改造教程平台',
        '设计模块化改造方案'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-other-uses-005',
    title: '集装箱改造房屋',
    description: '将货运集装箱改造为临时住房和办公空间，提供低成本解决方案',
    topic: '集装箱',
    industry: '建筑行业',
    company: '模块化建筑',
    tags: ['奥斯本分析', '能否他用', '集装箱', '模块化建筑'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否他用',
      questions: [
        '集装箱除了运输货物，还能用于哪些建筑用途？',
        '如何将集装箱改造成宜居的居住空间？',
        '集装箱建筑可以解决哪些住房问题？'
      ],
      insights: [
        '临时住房：快速解决住房需求',
        '办公空间：可移动的办公场所',
        '成本优势：比传统建筑更经济',
        '环保性：重复利用现有资源'
      ],
      innovationSchemes: [
        '开发集装箱改造技术标准',
        '设计模块化集装箱建筑系统',
        '建立集装箱建筑服务体系'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否借用 - 更多案例
  {
    id: 'osborn-borrow-003',
    title: '手术机器人技术',
    description: '借鉴工业机器人技术开发精密手术机器人系统',
    topic: '手术机器人',
    industry: '医疗外科',
    company: '技术移植',
    tags: ['奥斯本分析', '能否借用', '手术机器人', '医疗技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否借用',
      questions: [
        '工业机器人技术可以如何应用到医疗领域？',
        '如何将机器人技术移植到手术操作中？',
        '手术机器人可以解决哪些医疗难题？'
      ],
      insights: [
        '精密操作：提高手术精度和稳定性',
        '微创手术：减少手术创伤和恢复时间',
        '远程手术：突破地理限制',
        '培训价值：为医生提供手术训练平台'
      ],
      innovationSchemes: [
        '开发医疗专用机器人技术',
        '建立手术机器人操作标准',
        '设计机器人手术培训系统'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-borrow-004',
    title: '汽车导航系统',
    description: '借鉴军事GPS技术开发民用汽车导航系统',
    topic: '汽车导航',
    industry: '汽车电子',
    company: '技术民用化',
    tags: ['奥斯本分析', '能否借用', '汽车导航', 'GPS技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否借用',
      questions: [
        '军事GPS技术如何应用到民用汽车导航？',
        '如何将定位技术移植到汽车电子系统？',
        '汽车导航可以解决哪些出行问题？'
      ],
      insights: [
        '精确定位：提供准确的车辆位置信息',
        '路径规划：智能选择最优行驶路线',
        '实时导航：动态调整路线避开拥堵',
        '安全驾驶：提供安全驾驶提醒'
      ],
      innovationSchemes: [
        '开发车载导航系统',
        '建立导航数据服务',
        '设计智能交通管理系统'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否改变 - 更多案例
  {
    id: 'osborn-modify-003',
    title: '可调节办公桌椅',
    description: '改变传统桌椅高度固定模式，增加高度调节功能',
    topic: '办公桌椅',
    industry: '办公家具',
    company: '人体工学设计',
    tags: ['奥斯本分析', '能否改变', '办公桌椅', '人体工学'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否改变',
      questions: [
        '如何改变传统桌椅的固定高度设计？',
        '可调节功能可以解决哪些使用问题？',
        '如何平衡功能性和美观性？'
      ],
      insights: [
        '适应性：适应不同身高用户需求',
        '健康性：促进健康办公姿势',
        '灵活性：适应不同工作场景',
        '舒适性：提高长时间工作舒适度'
      ],
      innovationSchemes: [
        '开发智能调节系统',
        '设计模块化调节机构',
        '建立人体工学设计标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-modify-004',
    title: '变色龙材料',
    description: '改变材料表面特性，使其能随温度或光线改变颜色',
    topic: '智能材料',
    industry: '材料科学',
    company: '智能材料开发',
    tags: ['奥斯本分析', '能否改变', '智能材料', '变色技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否改变',
      questions: [
        '如何改变材料的颜色特性？',
        '变色材料可以创造哪些新的应用场景？',
        '如何控制材料的变色效果？'
      ],
      insights: [
        '美观性：创造动态视觉效果',
        '功能性：用于温度或光线指示',
        '防伪性：应用于防伪标识',
        '智能性：响应环境变化'
      ],
      innovationSchemes: [
        '开发变色材料技术',
        '设计智能包装系统',
        '建立变色材料应用标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否扩大 - 更多案例
  {
    id: 'osborn-magnify-003',
    title: '大屏智能手机',
    description: '扩大手机屏幕尺寸，提供更大显示区域',
    topic: '智能手机',
    industry: '消费电子',
    company: '屏幕技术',
    tags: ['奥斯本分析', '能否扩大', '智能手机', '屏幕技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否扩大',
      questions: [
        '如何扩大手机屏幕尺寸？',
        '大屏手机可以带来哪些体验提升？',
        '如何平衡屏幕大小和便携性？'
      ],
      insights: [
        '视觉体验：更好的媒体观看效果',
        '生产力：提高移动办公效率',
        '游戏体验：更沉浸的游戏体验',
        '阅读体验：更舒适的阅读界面'
      ],
      innovationSchemes: [
        '开发大屏显示技术',
        '优化大屏手机设计',
        '建立大屏手机使用标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-magnify-004',
    title: '加长续航电动汽车',
    description: '扩大电池容量，增加电动汽车单次充电行驶里程',
    topic: '电动汽车',
    industry: '汽车工业',
    company: '电池技术',
    tags: ['奥斯本分析', '能否扩大', '电动汽车', '电池技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否扩大',
      questions: [
        '如何扩大电动汽车的电池容量？',
        '长续航可以解决哪些用户痛点？',
        '如何平衡续航和成本？'
      ],
      insights: [
        '里程焦虑：减少用户对续航的担忧',
        '实用性：提高电动汽车的实用性',
        '市场接受度：促进电动汽车普及',
        '技术突破：推动电池技术发展'
      ],
      innovationSchemes: [
        '开发高能量密度电池',
        '优化电池管理系统',
        '建立充电基础设施'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否缩小 - 更多案例
  {
    id: 'osborn-minify-003',
    title: '微型医疗机器人',
    description: '缩小医疗设备尺寸，开发微型体内诊断和治疗机器人',
    topic: '医疗机器人',
    industry: '医疗技术',
    company: '微型化技术',
    tags: ['奥斯本分析', '能否缩小', '医疗机器人', '微型化'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否缩小',
      questions: [
        '如何缩小医疗设备的尺寸？',
        '微型机器人可以创造哪些新的医疗应用？',
        '如何保证微型设备的可靠性？'
      ],
      insights: [
        '微创手术：减少手术创伤',
        '精确诊断：提高诊断精度',
        '快速恢复：缩短恢复时间',
        '成本降低：减少医疗成本'
      ],
      innovationSchemes: [
        '开发微型机器人技术',
        '设计体内导航系统',
        '建立微型医疗设备标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-minify-004',
    title: '纳米涂层技术',
    description: '缩小涂层厚度至纳米级别，提供超薄防护层',
    topic: '纳米涂层',
    industry: '材料科学',
    company: '纳米技术',
    tags: ['奥斯本分析', '能否缩小', '纳米涂层', '纳米技术'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否缩小',
      questions: [
        '如何缩小涂层的厚度？',
        '纳米涂层可以带来哪些优势？',
        '如何保证纳米涂层的性能？'
      ],
      insights: [
        '超薄性：不影响产品外观',
        '高性能：提供优异的保护功能',
        '环保性：减少材料使用量',
        '多功能：集成多种保护功能'
      ],
      innovationSchemes: [
        '开发纳米涂层技术',
        '设计多功能涂层系统',
        '建立纳米涂层应用标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否代用 - 更多案例
  {
    id: 'osborn-substitute-003',
    title: '生物降解塑料',
    description: '用可生物降解材料替代传统石油基塑料',
    topic: '生物降解塑料',
    industry: '材料科学',
    company: '环保材料',
    tags: ['奥斯本分析', '能否代用', '生物降解塑料', '环保材料'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否代用',
      questions: [
        '如何用生物降解材料替代传统塑料？',
        '生物降解塑料可以解决哪些环境问题？',
        '如何保证替代材料的性能？'
      ],
      insights: [
        '环保性：减少塑料污染',
        '可持续性：利用可再生资源',
        '降解性：自然环境中可降解',
        '性能：保持塑料的基本性能'
      ],
      innovationSchemes: [
        '开发生物降解材料技术',
        '优化材料性能',
        '建立生物降解材料标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-substitute-004',
    title: '远程会议系统',
    description: '用视频会议替代部分面对面会议',
    topic: '远程会议',
    industry: '通信技术',
    company: '视频会议',
    tags: ['奥斯本分析', '能否代用', '远程会议', '视频会议'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否代用',
      questions: [
        '如何用视频会议替代面对面会议？',
        '远程会议可以解决哪些问题？',
        '如何保证远程会议的效果？'
      ],
      insights: [
        '成本节约：减少差旅成本',
        '时间效率：节省交通时间',
        '灵活性：随时随地参加会议',
        '环保性：减少碳排放'
      ],
      innovationSchemes: [
        '开发高质量视频会议系统',
        '设计协作工具',
        '建立远程会议标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否调整 - 更多案例
  {
    id: 'osborn-rearrange-003',
    title: '模块化家具系统',
    description: '重新调整家具结构和组合方式，设计可自定义布局的模块化家具',
    topic: '模块化家具',
    industry: '家具设计',
    company: '模块化设计',
    tags: ['奥斯本分析', '能否调整', '模块化家具', '模块化设计'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否调整',
      questions: [
        '如何重新调整家具的组合方式？',
        '模块化设计可以带来哪些优势？',
        '如何保证模块化家具的稳定性？'
      ],
      insights: [
        '灵活性：适应不同空间需求',
        '个性化：满足个人喜好',
        '可扩展性：根据需要增减模块',
        '经济性：按需购买模块'
      ],
      innovationSchemes: [
        '开发模块化连接系统',
        '设计标准化模块',
        '建立模块化家具标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-rearrange-004',
    title: '敏捷开发方法',
    description: '重新调整软件开发流程，采用迭代增量开发模式',
    topic: '软件开发',
    industry: '软件开发',
    company: '敏捷开发',
    tags: ['奥斯本分析', '能否调整', '软件开发', '敏捷开发'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否调整',
      questions: [
        '如何重新调整软件开发流程？',
        '敏捷开发可以解决哪些开发问题？',
        '如何保证敏捷开发的质量？'
      ],
      insights: [
        '快速响应：更快响应需求变化',
        '质量提升：持续集成和测试',
        '团队协作：提高团队协作效率',
        '客户满意：更贴近客户需求'
      ],
      innovationSchemes: [
        '建立敏捷开发流程',
        '设计协作工具',
        '建立敏捷开发标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否颠倒 - 更多案例
  {
    id: 'osborn-reverse-003',
    title: '倒置显微镜设计',
    description: '颠倒传统显微镜结构，设计倒置显微镜',
    topic: '显微镜',
    industry: '科学仪器',
    company: '仪器设计',
    tags: ['奥斯本分析', '能否颠倒', '显微镜', '仪器设计'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否颠倒',
      questions: [
        '如何颠倒传统显微镜的结构？',
        '倒置设计可以解决哪些观察问题？',
        '如何保证倒置显微镜的性能？'
      ],
      insights: [
        '观察便利：便于观察培养皿中样本',
        '细胞研究：更适合细胞培养观察',
        '操作便利：简化样本操作流程',
        '应用扩展：扩展显微镜应用场景'
      ],
      innovationSchemes: [
        '开发倒置显微镜技术',
        '设计专用观察系统',
        '建立倒置显微镜标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-reverse-004',
    title: '消费者定制模式',
    description: '颠倒传统生产-销售模式，采用先订单后生产模式',
    topic: '定制生产',
    industry: '制造业',
    company: '定制化生产',
    tags: ['奥斯本分析', '能否颠倒', '定制生产', '商业模式'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否颠倒',
      questions: [
        '如何颠倒传统的生产销售模式？',
        '定制模式可以解决哪些商业问题？',
        '如何保证定制生产的效率？'
      ],
      insights: [
        '个性化：满足个性化需求',
        '库存优化：减少库存积压',
        '成本控制：按需生产降低成本',
        '客户满意：提高客户满意度'
      ],
      innovationSchemes: [
        '建立定制生产系统',
        '设计柔性生产线',
        '建立定制生产标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // 能否组合 - 更多案例
  {
    id: 'osborn-combine-003',
    title: '汽车娱乐信息系统',
    description: '组合导航、娱乐、通信和车辆控制系统',
    topic: '车载系统',
    industry: '汽车电子',
    company: '系统集成',
    tags: ['奥斯本分析', '能否组合', '车载系统', '系统集成'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否组合',
      questions: [
        '如何组合多种车载功能？',
        '系统集成可以带来哪些优势？',
        '如何保证系统集成的稳定性？'
      ],
      insights: [
        '功能集成：一个系统多种功能',
        '用户体验：统一的操作界面',
        '成本优化：减少硬件成本',
        '智能化：提供智能服务'
      ],
      innovationSchemes: [
        '开发集成车载系统',
        '设计统一用户界面',
        '建立车载系统标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'osborn-combine-004',
    title: '智能家居生态系统',
    description: '组合照明、安防、家电控制、环境监测于统一系统',
    topic: '智能家居',
    industry: '家居自动化',
    company: '智能系统',
    tags: ['奥斯本分析', '能否组合', '智能家居', '系统集成'],
    analysisType: 'osborn',
    analysisData: {
      dimension: '能否组合',
      questions: [
        '如何组合多种家居功能？',
        '智能家居可以带来哪些便利？',
        '如何保证系统的兼容性？'
      ],
      insights: [
        '自动化：实现家居自动化控制',
        '节能：智能调节减少能源消耗',
        '安全：提供全方位安全保护',
        '便利：提高生活便利性'
      ],
      innovationSchemes: [
        '开发智能家居平台',
        '设计统一控制接口',
        '建立智能家居标准'
      ]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// 按奥斯本九问维度分类的案例
export const OSBORN_DIMENSION_CASES = {
  '能否他用': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否他用'),
  '能否借用': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否借用'),
  '能否改变': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否改变'),
  '能否扩大': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否扩大'),
  '能否缩小': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否缩小'),
  '能否代用': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否代用'),
  '能否调整': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否调整'),
  '能否颠倒': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否颠倒'),
  '能否组合': OSBORN_BASE_CASES.filter(case_ => case_.analysisData.dimension === '能否组合')
};

// 获取所有基础案例
export const getAllBaseCases = (): OsbornCase[] => {
  return OSBORN_BASE_CASES;
};

// 根据维度获取案例
export const getCasesByDimension = (dimension: string): OsbornCase[] => {
  return OSBORN_DIMENSION_CASES[dimension as keyof typeof OSBORN_DIMENSION_CASES] || [];
};

// 根据关键词搜索相关案例
export const searchCasesByKeyword = (keyword: string): OsbornCase[] => {
  const lowerKeyword = keyword.toLowerCase();
  return OSBORN_BASE_CASES.filter(case_ => 
    case_.title.toLowerCase().includes(lowerKeyword) ||
    case_.description.toLowerCase().includes(lowerKeyword) ||
    case_.topic.toLowerCase().includes(lowerKeyword) ||
    case_.tags.some((tag: string) => tag.toLowerCase().includes(lowerKeyword))
  );
};
