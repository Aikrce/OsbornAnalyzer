(function () {
  const topicInput = document.getElementById('topicInput');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const topicShow = document.getElementById('topicShow');
  const dateShow = document.getElementById('dateShow');
  const downloadKeywordBtn = document.getElementById('downloadKeywordBtn');
  const downloadGridBtn = document.getElementById('downloadGridBtn');
  const clearBtn = document.getElementById('clearBtn');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const toggleApiKeyBtn = document.getElementById('toggleApiKey');
  const textareas = Array.from(document.querySelectorAll('textarea[data-key]'));
  const keys = ['he','jie','gai','da','xiao','ti','tiao','dian','hebing'];

  // 奥斯本检核表法完整案例数据库
  const osbornCaseDatabase = {
    he: { // 能否他用
      title: "能否他用",
      description: "探索其他用途和应用场景",
      cases: [
        "花生用途扩展：德国有人想出了300种利用花生的方法，仅用于烹调就有100多种",
        "橡胶多重应用：用于制造床毯、浴盆、人行道边饰、衣夹、鸟笼、门扶手、棺材、墓碑等",
        "X射线技术迁移：从医疗诊断扩展到安全检查、无损检测和工艺品制作",
        "电吹风改造：用于工业生产中快速烘干油漆",
        "3D打印技术应用扩展：从工业制造扩展到食品加工（3D食品打印机）和医疗领域（定制面膜）",
        "炉渣再利用：探索炉渣在建筑材料中的新用途",
        "废料创意利用：将工业废料转化为艺术品或建筑材料",
        "边角料高效应用：服装厂利用边角料制作小型饰品或拼贴设计",
        "无人机配送药物：将消费级无人机技术用于医疗物资配送",
        "虚拟现实技术：从游戏娱乐扩展到医疗康复和心理治疗领域"
      ]
    },
    jie: { // 能否借用
      title: "能否借用",
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ]
    },
    gai: { // 能否改变
      title: "能否改变",
      description: "改变形态、流程、规则或属性",
      cases: [
        "平面镜变曲面镜：制成哈哈镜",
        "福特T型车颜色：从只有黑色改为多种颜色选择",
        "面包包装材料：改变包装使其具有芳香味道，提高嗅觉诱力",
        "手机外壳材质：从塑料改为金属、玻璃甚至木质材料",
        "汽车大灯形状：从圆形改为流线型设计，提高空气动力学性能",
        "软件界面配色方案：改变颜色方案降低视觉疲劳",
        "办公桌椅高度调节：可调节设计适应不同身高用户",
        "食品口味变化：开发不同地域口味的方便面系列",
        "建筑物外立面：改变纹理和颜色创造视觉吸引力",
        "音响设备造型：从方正的设计改为流线型现代设计"
      ]
    },
    da: { // 能否扩大
      title: "能否扩大",
      description: "扩大规模、功能、影响范围",
      cases: [
        "药物牙膏开发：在牙膏中加入某种配料，制成具有防酸、脱敏、止血等功能的药物牙膏",
        "袜子加固设计：织袜厂通过加固袜头和袜跟，使袜子销售量大增",
        "防弹玻璃创新：在两块玻璃之间加入特殊材料，制成防震、防碎、防弹的新型玻璃",
        "智能手机屏幕：增大屏幕尺寸提高观看体验",
        "电池容量提升：增加电池容量延长电子产品使用时间",
        "存储空间扩展：为云计算服务提供更大的存储空间选项",
        "会员特权增加：为高级会员增加更多专属特权和服务",
        "课程内容扩充：在线课程增加辅助学习材料和实践项目",
        "产品保修期延长：延长保修期提高客户信心",
        "软件功能增强：为专业版软件增加更多高级功能"
      ]
    },
    xiao: { // 能否缩小
      title: "能否缩小",
      description: "简化、专注核心功能、便携化",
      cases: [
        "袖珍电子产品：袖珍式收音机、微型计算机等",
        "无内胎自行车轮胎：简化结构，避免泄气问题",
        "便携式3D打印机：缩小打印机机体，实现手机直接打印",
        "纳米芯片技术：缩小电子元件尺寸提高集成度",
        "浓缩清洁剂：减少包装体积和运输成本",
        "微型医疗器械：开发微型内窥镜等医疗设备减少患者痛苦",
        "折叠屏手机：缩小体积提高便携性",
        "压缩空气储能：缩小能源存储设备体积",
        "无人机小型化：开发更小型无人机用于特定场景",
        "可折叠自行车：缩小体积便于携带和存储"
      ]
    },
    ti: { // 能否替代
      title: "能否替代",
      description: "替代材料、方法、技术或流程",
      cases: [
        "纸质铅笔：用纸代替木料做铅笔",
        "液压传动替代：在气体中用液压传动来替代金属齿轮",
        "充氩灯泡：用充氩的办法来代替电灯泡中的真空，使钨丝灯泡提高亮度",
        "塑料凳子材质：用塑料替代木材制造凳子",
        "植物基人造肉：用植物蛋白替代动物蛋白",
        "可再生能源：用太阳能、风能替代化石燃料",
        "视频会议系统：替代线下会议减少差旅需求",
        "电子发票：替代纸质发票更加环保",
        "虚拟键盘：替代物理键盘减少设备体积",
        "合成皮革：替代动物皮革更加环保和低成本"
      ]
    },
    tiao: { // 能否调整
      title: "能否调整",
      description: "调整顺序、结构、流程或时间",
      cases: [
        "飞机螺旋桨位置调整：从头部移到顶部成为直升机，再移到尾部成为喷气式飞机",
        "商店柜台布局：重新安排柜台优化客户流线",
        "3D打印流程调整：直接扫描打印简化流程",
        "生产线重组：调整生产线布局提高生产效率",
        "网站导航菜单：重新组织菜单结构提高用户体验",
        "课程模块顺序：调整学习模块顺序优化学习曲线",
        "组织结构扁平化：减少管理层级提高决策效率",
        "交通信号灯时序：调整信号时序优化交通流量",
        "软件功能菜单：重新组织功能菜单提高用户效率",
        "物流配送路线：重新规划配送路线降低运输成本"
      ]
    },
    dian: { // 能否颠倒
      title: "能否颠倒",
      description: "颠倒关系、反转思维、逆向操作",
      cases: [
        "电动机发明：将发电机原理颠倒",
        "电能化学能转换：化学能可以转化为电能，电能也可以转化为化学能（蓄电池）",
        "可逆凳子设计：制作无论是正着还是倒过来都能使用的凳子",
        "自上而下管理模式：颠倒传统自下而上的管理方式",
        "反向摄影：手机摄像头同时拍摄前后视角",
        "逆序烹饪：改变传统烹饪顺序创造新口感",
        "倒置房屋设计：屋顶在下地基在上的创意建筑",
        "学生授课模式：学生代替老师授课加深理解",
        "反向拍卖：买家出价卖家竞争",
        "逆向物流：产品从消费者返回生产者的流程"
      ]
    },
    hebing: { // 能否合并
      title: "能否合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能"
      ]
    }
  };

  // 本地存储管理（iOS WebView兼容）
  const storage = {
    getApiKey: () => {
      try {
        return localStorage.getItem('deepseek_api_key') || '';
      } catch (e) {
        return '';
      }
    },
    setApiKey: (key) => {
      try {
        localStorage.setItem('deepseek_api_key', key);
      } catch (e) {
        console.warn('无法保存API密钥');
      }
    },
    clearApiKey: () => {
      try {
        localStorage.removeItem('deepseek_api_key');
      } catch (e) {
        console.warn('无法清除API密钥');
      }
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();

  // 加载保存的API密钥
  function loadSavedApiKey() {
    const savedKey = storage.getApiKey();
    if (savedKey && apiKeyInput) {
      apiKeyInput.value = savedKey;
    }
  }

  // API密钥显示/隐藏切换
  function setupApiKeyToggle() {
    const toggleBtn = document.getElementById('toggleApiKey');
    const apiInput = document.getElementById('apiKeyInput');
    
    if (toggleBtn && apiInput) {
      toggleBtn.addEventListener('click', () => {
        const isPassword = apiInput.type === 'password';
        apiInput.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? '🙈' : '👁️';
        toggleBtn.setAttribute('aria-label', isPassword ? '隐藏密钥' : '显示密钥');
      });
    }
  }

  function renderPreview() {
    const topic = topicInput.value.trim();
    if (topicShow) {
      topicShow.textContent = topic || '（未填写）';
    }
  }

  function updateDate() {
    const d = new Date();
    const s = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (dateShow) {
      dateShow.textContent = s;
    }
  }

  // 基于案例数据库的本地分析
  function analyzeWithDatabase(topic) {
    const keywordAnalysis = generateKeywordAnalysisFromDatabase(topic);
    const analysisResults = generateNineDimensionsFromDatabase(topic, keywordAnalysis);
    
    return { keywordAnalysis, analysisResults };
  }

  // 基于数据库生成关键词分析
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction = '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes = ['便携性', '智能化', '多功能', '网络连接'];
      currentForm = '智能手机、功能机等移动通信设备';
      targetUsers = '各年龄段用户，从学生到商务人士';
      usageScenarios = ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain = '通信产业链核心终端设备';
      constraints = ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    } else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction = '人员和货物的陆地交通运输工具';
      keyAttributes = ['机动性', '安全性', '舒适性', '环保性'];
      currentForm = '燃油车、电动车、混合动力车等';
      targetUsers = '个人用户、家庭用户、商业用户';
      usageScenarios = ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain = '汽车制造产业链核心产品';
      constraints = ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    } else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction = '知识传授、技能培养、人才培育';
      keyAttributes = ['系统性', '互动性', '个性化', '可持续'];
      currentForm = '学校教育、在线教育、培训机构等';
      targetUsers = '学生、职场人士、终身学习者';
      usageScenarios = ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain = '教育服务产业链核心环节';
      constraints = ['教育资源', '技术门槛', '学习时间', '成本投入'];
    } else {
      // 通用分析模板
      coreFunction = `${topic}的核心功能和价值主张`;
      keyAttributes = ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm = `${topic}的现有形态和实现方式`;
      targetUsers = `${topic}的主要目标用户群体`;
      usageScenarios = ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain = `${topic}在相关产业价值链中的定位`;
      constraints = ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    }
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    };
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    });
    
    return results;
  }

  // 基于案例生成建议
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 智能选择最相关的案例
    const relevantCases = selectRelevantCases(topic, caseInfo.cases);
    
    // 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    });
    
    // 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    }
    
    return suggestions.slice(0, 4);
  }

  // 智能选择相关案例
  function selectRelevantCases(topic, cases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = cases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      });
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      });
      
      return { case: caseExample, score };
    });
    
    return scoredCases
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.case);
  }

  // 获取行业关键词
  function getIndustryKeywords(topic) {
    const industryMap = {
      '智能|ai|人工智能': ['技术', '自动化', '算法', '数据'],
      '教育|学习|培训': ['知识', '课程', '学生', '教学'],
      '医疗|健康|康复': ['治疗', '诊断', '患者', '医生'],
      '交通|出行|车辆': ['运输', '道路', '驾驶', '乘客'],
      '金融|支付|理财': ['资金', '投资', '银行', '交易'],
      '购物|电商|零售': ['商品', '消费', '客户', '销售'],
      '社交|社区|交流': ['用户', '互动', '分享', '连接'],
      '家居|生活|日常': ['便利', '舒适', '实用', '家庭']
    };
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    }
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '能否他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '能否借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '能否改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '能否扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '能否缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '能否替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '能否调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '能否颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '能否合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    };
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数
  function extractCaseKey(caseExample) {
    return caseExample.split('：')[0] || caseExample.substring(0, 15);
  }

  function extractInnovation(caseExample) {
    const parts = caseExample.split('：');
    return parts.length > 1 ? parts[1].substring(0, 20) + '...' : '进行创新应用';
  }

  function getAlternativeField(topic) {
    const fields = ['教育', '医疗', '娱乐', '办公', '家居', '交通'];
    return fields[Math.floor(Math.random() * fields.length)];
  }

  function getChangeableAspect(topic) {
    const aspects = ['外观设计', '交互方式', '功能配置', '使用流程'];
    return aspects[Math.floor(Math.random() * aspects.length)];
  }

  function getExpandableFeature(topic) {
    const features = ['功能范围', '服务能力', '用户覆盖', '应用场景'];
    return features[Math.floor(Math.random() * features.length)];
  }

  function getReplaceableComponent(topic) {
    const components = ['核心技术', '关键材料', '实现方式', '服务模式'];
    return components[Math.floor(Math.random() * components.length)];
  }

  function getAdjustableStructure(topic) {
    const structures = ['功能布局', '操作流程', '界面设计', '服务架构'];
    return structures[Math.floor(Math.random() * structures.length)];
  }

  function getReversibleAspect(topic) {
    const aspects = ['服务模式', '用户关系', '价值传递', '交互方式'];
    return aspects[Math.floor(Math.random() * aspects.length)];
  }

  function getCombinable(topic) {
    const combinables = ['相关服务', '互补功能', '协同技术', '配套产品'];
    return combinables[Math.floor(Math.random() * combinables.length)];
  }

  // 生成情境化建议
  function generateContextualSuggestion(topic, caseInfo, index) {
    const contextualPrompts = {
      '能否他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '能否借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '能否改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '能否扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '能否缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '能否替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '能否调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '能否颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '能否合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    };
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 仅使用本地数据库
  function analyzeWithLocalDatabase() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      showToast('请先输入主题', 'error');
      return;
    }

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }
    analyzeBtn.disabled = true;

    // 模拟分析延迟
    setTimeout(() => {
      try {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        const keywordAnalysis = localResult.keywordAnalysis;
        const analysisResults = localResult.analysisResults;
        
        // 显示关键词分析结果
        displayKeywordAnalysis(keywordAnalysis);
        
        if (downloadKeywordBtn) {
          downloadKeywordBtn.style.display = 'inline-flex';
        }
        
        // 填充九宫格结果
        keys.forEach(key => {
          const textarea = document.querySelector(`textarea[data-key="${key}"]`);
          if (analysisResults[key] && Array.isArray(analysisResults[key])) {
            textarea.value = analysisResults[key].join('\n');
          }
        });
        
        showToast('分析完成！请点击"九宫格编辑"标签页查看结果。', 'success');
        
      } catch (error) {
        console.error('分析错误:', error);
        showToast(`分析失败：${error.message}`, 'error');
      } finally {
        // 恢复按钮状态
        if (btnText && loadingSpinner) {
          btnText.style.display = 'inline';
          loadingSpinner.style.display = 'none';
        }
        analyzeBtn.disabled = false;
      }
    }, 1000);
  }

  function displayKeywordAnalysis(analysis) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (!analysisContent) return;
    
    const html = `
      <div class="keyword-result">
        <div class="analysis-header">
          <h4>关键词深度分析结果</h4>
        </div>
        
        <div class="analysis-grid">
          <div class="keyword-item">
            <h5>核心功能</h5>
            <p>${analysis.coreFunction || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5>关键属性</h5>
            <div class="tags">
              ${Array.isArray(analysis.keyAttributes) ? analysis.keyAttributes.map(attr => `<span class="tag">${attr}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5>现有形态</h5>
            <p>${analysis.currentForm || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5>目标用户</h5>
            <p>${analysis.targetUsers || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5>使用场景</h5>
            <div class="tags">
              ${Array.isArray(analysis.usageScenarios) ? analysis.usageScenarios.map(scenario => `<span class="tag">${scenario}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5>价值链条</h5>
            <p>${analysis.valueChain || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5>约束限制</h5>
            <div class="tags">
              ${Array.isArray(analysis.constraints) ? analysis.constraints.map(constraint => `<span class="tag warning">${constraint}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
        </div>
      </div>
    `;
    
    analysisContent.innerHTML = html;
  }

  // 下载功能 - iOS优化版本
  async function downloadGridPNG() {
    try {
      showToast('正在生成图片，请稍候...', 'info');
      
      // 在iOS中，我们可以提示用户截屏
      showToast('请使用设备截屏功能保存九宫格分析图', 'info');
      
    } catch (error) {
      console.error('下载失败:', error);
      showToast('请使用设备截屏功能保存图片', 'info');
    }
  }

  async function downloadKeywordPNG() {
    try {
      showToast('请使用设备截屏功能保存关键词分析图', 'info');
    } catch (error) {
      console.error('下载失败:', error);
      showToast('请使用设备截屏功能保存图片', 'info');
    }
  }

  // 显示提示消息
  function showToast(message, type = 'info') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加样式
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      fontSize: '14px',
      zIndex: '10000',
      opacity: '0',
      transform: 'translateY(-20px)',
      transition: 'all 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });
    
    // 设置背景色
    if (type === 'success') {
      toast.style.background = 'linear-gradient(135deg, #4caf50 0%, #689f38 100%)';
    } else if (type === 'error') {
      toast.style.background = 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)';
    } else {
      toast.style.background = 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
    }
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  function clearAll() {
    topicInput.value = '';
    textareas.forEach(ta => ta.value = '');
    
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = '<p class="placeholder">点击"开始分析"进行主题分析<br><small>系统将基于案例数据库进行分析</small></p>';
    }
    
    if (downloadKeywordBtn) {
      downloadKeywordBtn.style.display = 'none';
    }
    
    renderPreview();
    switchToPage('analysis');
  }

  function setupPageTabs() {
    const pageTabs = document.querySelectorAll('.page-tab');
    pageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchToPage(tab.dataset.page);
      });
    });
  }

  function switchToPage(pageName) {
    document.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    const targetTab = document.querySelector(`[data-page="${pageName}"]`);
    const targetPage = document.getElementById(`${pageName}-page`);
    
    if (targetTab) targetTab.classList.add('active');
    if (targetPage) targetPage.classList.add('active');
  }

  // 事件绑定
  if (topicInput) {
    topicInput.addEventListener('input', renderPreview);
  }
  
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', analyzeWithLocalDatabase);
  }
  
  if (downloadGridBtn) {
    downloadGridBtn.addEventListener('click', downloadGridPNG);
  }
  
  if (downloadKeywordBtn) {
    downloadKeywordBtn.addEventListener('click', downloadKeywordPNG);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }
})();