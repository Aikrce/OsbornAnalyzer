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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    "金融|支付|理财|投资|保险": {
      coreFunction: "通过资金融通和风险管理服务，促进经济活动和财富增值",
      keyAttributes: ["安全性", "流动性", "收益性", "便捷性", "合规性"],
      currentForm: "银行服务、支付工具、投资产品、保险保障、金融科技平台",
      targetUsers: "个人客户、企业客户、机构投资者、金融从业者、监管机构",
      usageScenarios: ["日常支付", "资产配置", "风险保障", "融资需求", "财富管理"],
      valueChain: "金融生态系统的核心枢纽，连接资金供需双方"
    },,
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  }

  function displayKeywordAnalysis(analysis) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (!analysisContent) return;
    
    const html = `
      <div class="keyword-result">
        <div class="analysis-header">
          <h4>🔍 关键词深度分析结果</h4>
          <p class="analysis-subtitle">基于行业数据库的专业分析</p>
        </div>
        
        <div class="analysis-grid">
          <!-- 基础分析维度 -->
          <div class="keyword-item core">
            <h5><i class="icon">🎯</i>核心功能</h5>
            <p>${analysis.coreFunction || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⭐</i>关键属性</h5>
            <div class="tags">
              ${Array.isArray(analysis.keyAttributes) ? analysis.keyAttributes.map(attr => `<span class="tag primary">${attr}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">📦</i>现有形态</h5>
            <p>${analysis.currentForm || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">👥</i>目标用户</h5>
            <p>${analysis.targetUsers || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🎬</i>使用场景</h5>
            <div class="tags">
              ${Array.isArray(analysis.usageScenarios) ? analysis.usageScenarios.map(scenario => `<span class="tag scenario">${scenario}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🔗</i>价值链条</h5>
            <p>${analysis.valueChain || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⚠️</i>约束限制</h5>
            <div class="tags">
              ${Array.isArray(analysis.constraints) ? analysis.constraints.map(constraint => `<span class="tag warning">${constraint}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <!-- 新增深度分析维度 -->
          ${analysis.marketTrends ? `
          <div class="keyword-item trend">
            <h5><i class="icon">📈</i>市场趋势</h5>
            <div class="tags">
              ${Array.isArray(analysis.marketTrends) ? analysis.marketTrends.map(trend => `<span class="tag trend">${trend}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.competitiveAdvantage ? `
          <div class="keyword-item advantage">
            <h5><i class="icon">🏆</i>竞争优势</h5>
            <div class="tags">
              ${Array.isArray(analysis.competitiveAdvantage) ? analysis.competitiveAdvantage.map(advantage => `<span class="tag advantage">${advantage}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.riskFactors ? `
          <div class="keyword-item risk">
            <h5><i class="icon">🚨</i>风险因素</h5>
            <div class="tags">
              ${Array.isArray(analysis.riskFactors) ? analysis.riskFactors.map(risk => `<span class="tag risk">${risk}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="analysis-footer">
          <p class="analysis-note">
            💡 <strong>分析说明：</strong>基于行业数据库和智能算法生成的专业分析，
            涵盖${Object.keys(analysis).length}个关键维度，为创新思考提供全面视角。
          </p>
        </div>
      </div>
    `;
    
    analysisContent.innerHTML = html;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
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

  // 获取卡片简洁色彩方案 - 增强版
  function getCardColor(title, type) {
    if (type === 'keyword') {
      // 关键词分析10种丰富色彩
      const keywordColors = {
        '核心功能': 'rgba(255, 107, 107, 0.85)', // 红色 - 核心突出
        '关键属性': 'rgba(34, 197, 94, 0.85)', // 绿色 - 属性特征
        '现有形态': 'rgba(249, 115, 22, 0.85)', // 橙色 - 形态展示
        '目标用户': 'rgba(168, 85, 247, 0.85)', // 紫色 - 用户群体
        '使用场景': 'rgba(6, 182, 212, 0.85)', // 青色 - 场景应用
        '价值链条': 'rgba(236, 72, 153, 0.85)', // 粉色 - 价值连接
        '约束限制': 'rgba(239, 68, 68, 0.85)', // 深红 - 限制警示
        '市场趋势': 'rgba(78, 205, 196, 0.85)', // 青绿 - 趋势发展
        '竞争优势': 'rgba(69, 183, 209, 0.85)', // 蓝青 - 优势突出
        '风险因素': 'rgba(240, 147, 251, 0.85)' // 紫粉 - 风险提醒
      },;
      return keywordColors[title] || keywordColors['核心功能'];
    }, else {
      // 九宫格分析9种简洁色彩
      const gridColors = {
        '他用': 'rgba(59, 130, 246, 0.85)', // 蓝色
        '借用': 'rgba(34, 197, 94, 0.85)', // 绿色
        '改变': 'rgba(249, 115, 22, 0.85)', // 橙色
        '扩大': 'rgba(168, 85, 247, 0.85)', // 紫色
        '缩小': 'rgba(6, 182, 212, 0.85)', // 青色
        '替代': 'rgba(236, 72, 153, 0.85)', // 粉色
        '调整': 'rgba(239, 68, 68, 0.85)', // 红色
        '颠倒': 'rgba(99, 102, 241, 0.85)', // 靛蓝
        '合并': 'rgba(139, 69, 19, 0.85)' // 棕色
      },;
      return gridColors[title] || gridColors['他用'];
    }
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  }

  function displayKeywordAnalysis(analysis) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (!analysisContent) return;
    
    const html = `
      <div class="keyword-result">
        <div class="analysis-header">
          <h4>🔍 关键词深度分析结果</h4>
          <p class="analysis-subtitle">基于行业数据库的专业分析</p>
        </div>
        
        <div class="analysis-grid">
          <!-- 基础分析维度 -->
          <div class="keyword-item core">
            <h5><i class="icon">🎯</i>核心功能</h5>
            <p>${analysis.coreFunction || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⭐</i>关键属性</h5>
            <div class="tags">
              ${Array.isArray(analysis.keyAttributes) ? analysis.keyAttributes.map(attr => `<span class="tag primary">${attr}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">📦</i>现有形态</h5>
            <p>${analysis.currentForm || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">👥</i>目标用户</h5>
            <p>${analysis.targetUsers || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🎬</i>使用场景</h5>
            <div class="tags">
              ${Array.isArray(analysis.usageScenarios) ? analysis.usageScenarios.map(scenario => `<span class="tag scenario">${scenario}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🔗</i>价值链条</h5>
            <p>${analysis.valueChain || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⚠️</i>约束限制</h5>
            <div class="tags">
              ${Array.isArray(analysis.constraints) ? analysis.constraints.map(constraint => `<span class="tag warning">${constraint}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <!-- 新增深度分析维度 -->
          ${analysis.marketTrends ? `
          <div class="keyword-item trend">
            <h5><i class="icon">📈</i>市场趋势</h5>
            <div class="tags">
              ${Array.isArray(analysis.marketTrends) ? analysis.marketTrends.map(trend => `<span class="tag trend">${trend}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.competitiveAdvantage ? `
          <div class="keyword-item advantage">
            <h5><i class="icon">🏆</i>竞争优势</h5>
            <div class="tags">
              ${Array.isArray(analysis.competitiveAdvantage) ? analysis.competitiveAdvantage.map(advantage => `<span class="tag advantage">${advantage}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.riskFactors ? `
          <div class="keyword-item risk">
            <h5><i class="icon">🚨</i>风险因素</h5>
            <div class="tags">
              ${Array.isArray(analysis.riskFactors) ? analysis.riskFactors.map(risk => `<span class="tag risk">${risk}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="analysis-footer">
          <p class="analysis-note">
            💡 <strong>分析说明：</strong>基于行业数据库和智能算法生成的专业分析，
            涵盖${Object.keys(analysis).length}个关键维度，为创新思考提供全面视角。
          </p>
        </div>
      </div>
    `;
    
    analysisContent.innerHTML = html;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
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

  // 获取卡片简洁色彩方案
  function getCardColor(title, type) {
    if (type === 'keyword') {
      // 关键词分析7种简洁色彩
      const keywordColors = {
        '核心功能': 'rgba(59, 130, 246, 0.85)', // 蓝色
        '关键属性': 'rgba(34, 197, 94, 0.85)', // 绿色
        '现有形态': 'rgba(249, 115, 22, 0.85)', // 橙色
        '目标用户': 'rgba(168, 85, 247, 0.85)', // 紫色
        '使用场景': 'rgba(6, 182, 212, 0.85)', // 青色
        '价值链条': 'rgba(236, 72, 153, 0.85)', // 粉色
        '约束限制': 'rgba(239, 68, 68, 0.85)' // 红色
      },;
      return keywordColors[title] || keywordColors['核心功能'];
    }, else {
      // 九宫格分析9种简洁色彩
      const gridColors = {
        '他用': 'rgba(59, 130, 246, 0.85)', // 蓝色
        '借用': 'rgba(34, 197, 94, 0.85)', // 绿色
        '改变': 'rgba(249, 115, 22, 0.85)', // 橙色
        '扩大': 'rgba(168, 85, 247, 0.85)', // 紫色
        '缩小': 'rgba(6, 182, 212, 0.85)', // 青色
        '替代': 'rgba(236, 72, 153, 0.85)', // 粉色
        '调整': 'rgba(239, 68, 68, 0.85)', // 红色
        '颠倒': 'rgba(99, 102, 241, 0.85)', // 靛蓝
        '合并': 'rgba(139, 69, 19, 0.85)' // 棕色
      },;
      return gridColors[title] || gridColors['他用'];
    }
  }

  // 创建完全展示内容的卡片HTML模板 - 重新设计确保内容完整显示
  function createCardHTML(title, content, topic, type = 'grid') {
    const backgroundColor = getCardColor(title, type);
    
    // 处理内容数组
    const contentArray = Array.isArray(content) ? content : [content.toString()];
    
    // 更精确地计算所需高度
    let totalTextLength = 0;
    contentArray.forEach(item => {
      totalTextLength += item.length;
    },);
    
    // 基于内容长度动态计算高度
    const baseHeight = 400; // 基础高度
    const contentHeight = Math.max(300, contentArray.length * 80 + totalTextLength * 2); // 更宽松的计算
    const finalHeight = baseHeight + contentHeight;
    
    return `
      <div class="innovation-card" style="
        width: 380px;
        height: ${finalHeight}px;
        background: ${backgroundColor};
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 28px;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        position: relative;
        box-shadow: 0 24px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.25);
        display: flex;
        flex-direction: column;
        margin: 15px;
        overflow: visible;
      ">
        
        <!-- 装饰性背景元素 -->
        <div style="
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
        "></div>
        
        <!-- 主题区域 - 顶部突出显示 -->
        <div style="
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
          padding: 20px 24px;
          background: rgba(255,255,255,0.15);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        ">
          <div style="
            font-size: 24px; 
            font-weight: 900;
            color: white;
            text-shadow: 0 3px 15px rgba(0,0,0,0.5);
            letter-spacing: 1px;
            margin-bottom: 8px;
          ">${topic}</div>
          <div style="
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%);
            margin: 0 auto;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(255,255,255,0.3);
          "></div>
        </div>
        
        <!-- 维度标题区域 - 小一点 -->
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          position: relative;
          z-index: 10;
        ">
          <div style="
            width: 4px;
            height: 24px;
            background: rgba(255,255,255,0.9);
            border-radius: 2px;
            margin-right: 12px;
            box-shadow: 0 2px 8px rgba(255,255,255,0.3);
          "></div>
          <h3 style="
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            color: white;
            text-shadow: 0 2px 8px rgba(0,0,0,0.3);
            letter-spacing: 0.5px;
          ">${title}</h3>
        </div>
        
        <!-- 内容展示区域 - 减少内边距但保持可读性 -->
        <div style="
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          color: #1a202c;
          border-radius: 16px;
          padding: 20px;
          position: relative;
          z-index: 10;
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 
            inset 0 2px 8px rgba(0,0,0,0.05),
            0 4px 16px rgba(0,0,0,0.08);
          flex: 1;
          min-height: ${contentHeight}px;
          overflow: visible;
        ">
          ${contentArray.map((item, index) => `
            <div style="
              display: flex;
              align-items: flex-start;
              margin-bottom: ${index === contentArray.length - 1 ? '0' : '20px'};
              min-height: 60px;
            ">
              <div style="
                width: 10px;
                height: 10px;
                background: ${backgroundColor.replace('0.85', '1')};
                border-radius: 50%;
                margin-top: 12px;
                margin-right: 16px;
                flex-shrink: 0;
                box-shadow: 0 3px 8px rgba(0,0,0,0.25);
              "></div>
              <div style="
                font-size: 17px; 
                color: #1a202c;
                font-weight: 500;
                line-height: 1.8;
                word-wrap: break-word;
                word-break: break-word;
                hyphens: auto;
                flex: 1;
              ">${item}</div>
            </div>
          `).join('')}
        </div>
        
        <!-- 底部标识 -->
        <div style="
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          opacity: 0.85;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          position: relative;
          z-index: 10;
        ">
          奥斯本创新九问 · ${new Date().toLocaleDateString()}
        </div>
      </div>
    `;
  }

  // 创建临时容器并生成图片
  async function generateCardImage(cardHTML, filename) {
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      background: white;
      padding: 20px;
    `;
    tempContainer.innerHTML = cardHTML;
    document.body.appendChild(tempContainer);
    
    try {
      const canvas = await html2canvas(tempContainer.firstElementChild, {
        backgroundColor: 'transparent',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      },);
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      return true;
    }, catch (error) {
      console.error('生成卡片图片失败:', error);
      return false;
    }, finally {
      document.body.removeChild(tempContainer);
    }
  }

  // 批量下载（ZIP格式）
  async function downloadAsZip(cards, zipName) {
    if (typeof JSZip === 'undefined') {
      showToast('ZIP功能未加载，将逐个下载图片', 'info');
      // 逐个下载
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        await generateCardImage(card.html, card.filename);
        if (i < cards.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 延迟避免浏览器阻止
        }
      },
      return;
    },
    
    const zip = new JSZip();
    
    for (const card of cards) {
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = 'position: fixed; top: -9999px; left: -9999px;';
      tempContainer.innerHTML = card.html;
      document.body.appendChild(tempContainer);
      
      try {
        const canvas = await html2canvas(tempContainer.firstElementChild, {
          backgroundColor: 'transparent',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false
        },);
        
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.split(',')[1];
        zip.file(card.filename, base64Data, { base64: true });
      }, catch (error) {
        console.error(`生成${card.filename}失败:`, error);
      }, finally {
        document.body.removeChild(tempContainer);
      }
    },
    
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = zipName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // 关键词分析下载功能
  async function downloadKeywordPNG(mode = 'full') {
    const topic = topicInput.value.trim() || '未命名主题';
    
    if (mode === 'full') {
      // 原有的完整下载功能
      return downloadKeywordPNG();
    },
    
    const analysisResult = document.querySelector('#keywordAnalysisResult .keyword-result');
    if (!analysisResult) {
      showToast('请先进行分析再下载', 'error');
      return;
    },
    
    try {
      showToast('正在生成卡片...', 'info');
      
      // 提取关键词分析数据
      const keywordData = extractKeywordData(analysisResult);
      
      if (mode === 'cards') {
        // 显示卡片选择界面
        showCardSelectionModal(keywordData, topic, 'keyword');
      }, else if (mode === 'all') {
        // 批量下载所有卡片
        const cards = [];
        Object.entries(keywordData).forEach(([key, value]) => {
          const title = getKeywordTitle(key);
          const cardHTML = createCardHTML(title, value, topic, 'keyword');
          cards.push({
            html: cardHTML,
            filename: `${topic}-${title}-${new Date().toISOString().slice(0,10)}.png`
          },);
        },);
        
        await downloadAsZip(cards, `${topic}-关键词分析卡片-${new Date().toISOString().slice(0,10)}.zip`);
        showToast('关键词分析卡片批量下载完成！', 'success');
      }
    }, catch (error) {
      console.error('下载失败:', error);
      showToast('下载失败，请重试', 'error');
    }
  }

  // 九宫格下载功能
  async function downloadGridPNG(mode = 'full') {
    const topic = topicInput.value.trim() || '未命名主题';
    
    if (mode === 'full') {
      // 原有的完整下载功能
      return downloadGridPNG();
    },
    
    try {
      showToast('正在生成卡片...', 'info');
      
      // 提取九宫格数据
      const gridData = {};
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (textarea && textarea.value.trim()) {
          const suggestions = textarea.value.split('\n').filter(line => line.trim());
          gridData[key] = suggestions;
        }
      },);
      
      if (Object.keys(gridData).length === 0) {
        showToast('请先进行分析或填写内容', 'error');
        return;
      },
      
      if (mode === 'cards') {
        // 显示卡片选择界面
        showCardSelectionModal(gridData, topic, 'grid');
      }, else if (mode === 'all') {
        // 批量下载所有卡片
        const cards = [];
        Object.entries(gridData).forEach(([key, suggestions]) => {
          const title = osbornCaseDatabase[key]?.title || key;
          const cardHTML = createCardHTML(title, suggestions, topic, 'grid');
          cards.push({
            html: cardHTML,
            filename: `${topic}-${title}-${new Date().toISOString().slice(0,10)}.png`
          },);
        },);
        
        await downloadAsZip(cards, `${topic}-九宫格分析卡片-${new Date().toISOString().slice(0,10)}.zip`);
        showToast('九宫格分析卡片批量下载完成！', 'success');
      }
    }, catch (error) {
      console.error('下载失败:', error);
      showToast('下载失败，请重试', 'error');
    }
  }

  // 提取关键词数据
  function extractKeywordData(analysisResult) {
    const data = {};
    const items = analysisResult.querySelectorAll('.keyword-item');
    
    items.forEach(item => {
      const title = item.querySelector('h5')?.textContent;
      const content = item.querySelector('p')?.textContent;
      const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent);
      
      if (title) {
        data[title] = content || tags.join('、') || '暂无数据';
      }
    },);
    
    return data;
  }

  // 获取关键词标题
  function getKeywordTitle(key) {
    const titleMap = {
      '核心功能': '核心功能',
      '关键属性': '关键属性', 
      '现有形态': '现有形态',
      '目标用户': '目标用户',
      '使用场景': '使用场景',
      '价值链条': '价值链条',
      '约束限制': '约束限制',
      '市场趋势': '市场趋势',
      '竞争优势': '竞争优势',
      '风险因素': '风险因素'
    },;
    return titleMap[key] || key;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  }

  function displayKeywordAnalysis(analysis) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (!analysisContent) return;
    
    const html = `
      <div class="keyword-result">
        <div class="analysis-header">
          <h4>🔍 关键词深度分析结果</h4>
          <p class="analysis-subtitle">基于行业数据库的专业分析</p>
        </div>
        
        <div class="analysis-grid">
          <!-- 基础分析维度 -->
          <div class="keyword-item core">
            <h5><i class="icon">🎯</i>核心功能</h5>
            <p>${analysis.coreFunction || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⭐</i>关键属性</h5>
            <div class="tags">
              ${Array.isArray(analysis.keyAttributes) ? analysis.keyAttributes.map(attr => `<span class="tag primary">${attr}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">📦</i>现有形态</h5>
            <p>${analysis.currentForm || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">👥</i>目标用户</h5>
            <p>${analysis.targetUsers || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🎬</i>使用场景</h5>
            <div class="tags">
              ${Array.isArray(analysis.usageScenarios) ? analysis.usageScenarios.map(scenario => `<span class="tag scenario">${scenario}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🔗</i>价值链条</h5>
            <p>${analysis.valueChain || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⚠️</i>约束限制</h5>
            <div class="tags">
              ${Array.isArray(analysis.constraints) ? analysis.constraints.map(constraint => `<span class="tag warning">${constraint}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <!-- 新增深度分析维度 -->
          ${analysis.marketTrends ? `
          <div class="keyword-item trend">
            <h5><i class="icon">📈</i>市场趋势</h5>
            <div class="tags">
              ${Array.isArray(analysis.marketTrends) ? analysis.marketTrends.map(trend => `<span class="tag trend">${trend}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.competitiveAdvantage ? `
          <div class="keyword-item advantage">
            <h5><i class="icon">🏆</i>竞争优势</h5>
            <div class="tags">
              ${Array.isArray(analysis.competitiveAdvantage) ? analysis.competitiveAdvantage.map(advantage => `<span class="tag advantage">${advantage}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.riskFactors ? `
          <div class="keyword-item risk">
            <h5><i class="icon">🚨</i>风险因素</h5>
            <div class="tags">
              ${Array.isArray(analysis.riskFactors) ? analysis.riskFactors.map(risk => `<span class="tag risk">${risk}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="analysis-footer">
          <p class="analysis-note">
            💡 <strong>分析说明：</strong>基于行业数据库和智能算法生成的专业分析，
            涵盖${Object.keys(analysis).length}个关键维度，为创新思考提供全面视角。
          </p>
        </div>
      </div>
    `;
    
    analysisContent.innerHTML = html;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
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

  // 获取卡片简洁色彩方案 - 增强版
  function getCardColor(title, type) {
    if (type === 'keyword') {
      // 关键词分析10种丰富色彩
      const keywordColors = {
        '核心功能': 'rgba(255, 107, 107, 0.85)', // 红色 - 核心突出
        '关键属性': 'rgba(34, 197, 94, 0.85)', // 绿色 - 属性特征
        '现有形态': 'rgba(249, 115, 22, 0.85)', // 橙色 - 形态展示
        '目标用户': 'rgba(168, 85, 247, 0.85)', // 紫色 - 用户群体
        '使用场景': 'rgba(6, 182, 212, 0.85)', // 青色 - 场景应用
        '价值链条': 'rgba(236, 72, 153, 0.85)', // 粉色 - 价值连接
        '约束限制': 'rgba(239, 68, 68, 0.85)', // 深红 - 限制警示
        '市场趋势': 'rgba(78, 205, 196, 0.85)', // 青绿 - 趋势发展
        '竞争优势': 'rgba(69, 183, 209, 0.85)', // 蓝青 - 优势突出
        '风险因素': 'rgba(240, 147, 251, 0.85)' // 紫粉 - 风险提醒
      },;
      return keywordColors[title] || keywordColors['核心功能'];
    }, else {
      // 九宫格分析9种简洁色彩
      const gridColors = {
        '他用': 'rgba(59, 130, 246, 0.85)', // 蓝色
        '借用': 'rgba(34, 197, 94, 0.85)', // 绿色
        '改变': 'rgba(249, 115, 22, 0.85)', // 橙色
        '扩大': 'rgba(168, 85, 247, 0.85)', // 紫色
        '缩小': 'rgba(6, 182, 212, 0.85)', // 青色
        '替代': 'rgba(236, 72, 153, 0.85)', // 粉色
        '调整': 'rgba(239, 68, 68, 0.85)', // 红色
        '颠倒': 'rgba(99, 102, 241, 0.85)', // 靛蓝
        '合并': 'rgba(139, 69, 19, 0.85)' // 棕色
      },;
      return gridColors[title] || gridColors['他用'];
    }
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  }

  function displayKeywordAnalysis(analysis) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (!analysisContent) return;
    
    const html = `
      <div class="keyword-result">
        <div class="analysis-header">
          <h4>🔍 关键词深度分析结果</h4>
          <p class="analysis-subtitle">基于行业数据库的专业分析</p>
        </div>
        
        <div class="analysis-grid">
          <!-- 基础分析维度 -->
          <div class="keyword-item core">
            <h5><i class="icon">🎯</i>核心功能</h5>
            <p>${analysis.coreFunction || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⭐</i>关键属性</h5>
            <div class="tags">
              ${Array.isArray(analysis.keyAttributes) ? analysis.keyAttributes.map(attr => `<span class="tag primary">${attr}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">📦</i>现有形态</h5>
            <p>${analysis.currentForm || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">👥</i>目标用户</h5>
            <p>${analysis.targetUsers || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🎬</i>使用场景</h5>
            <div class="tags">
              ${Array.isArray(analysis.usageScenarios) ? analysis.usageScenarios.map(scenario => `<span class="tag scenario">${scenario}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">🔗</i>价值链条</h5>
            <p>${analysis.valueChain || '暂无数据'}</p>
          </div>
          
          <div class="keyword-item">
            <h5><i class="icon">⚠️</i>约束限制</h5>
            <div class="tags">
              ${Array.isArray(analysis.constraints) ? analysis.constraints.map(constraint => `<span class="tag warning">${constraint}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          
          <!-- 新增深度分析维度 -->
          ${analysis.marketTrends ? `
          <div class="keyword-item trend">
            <h5><i class="icon">📈</i>市场趋势</h5>
            <div class="tags">
              ${Array.isArray(analysis.marketTrends) ? analysis.marketTrends.map(trend => `<span class="tag trend">${trend}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.competitiveAdvantage ? `
          <div class="keyword-item advantage">
            <h5><i class="icon">🏆</i>竞争优势</h5>
            <div class="tags">
              ${Array.isArray(analysis.competitiveAdvantage) ? analysis.competitiveAdvantage.map(advantage => `<span class="tag advantage">${advantage}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
          
          ${analysis.riskFactors ? `
          <div class="keyword-item risk">
            <h5><i class="icon">🚨</i>风险因素</h5>
            <div class="tags">
              ${Array.isArray(analysis.riskFactors) ? analysis.riskFactors.map(risk => `<span class="tag risk">${risk}</span>`).join('') : '<span class="tag">暂无</span>'}
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="analysis-footer">
          <p class="analysis-note">
            💡 <strong>分析说明：</strong>基于行业数据库和智能算法生成的专业分析，
            涵盖${Object.keys(analysis).length}个关键维度，为创新思考提供全面视角。
          </p>
        </div>
      </div>
    `;
    
    analysisContent.innerHTML = html;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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

  // 增强的关键词分析数据库 - 更细致的行业模板
  const keywordAnalysisDatabase = {
    // 科技产品类
    '智能|AI|人工智能|机器人|自动化': {
      coreFunction: '通过智能算法和自动化技术，提升效率、降低人工成本、优化决策过程',
      keyAttributes: ['智能化', '自适应', '数据驱动', '自动化', '学习能力'],
      currentForm: '软件系统、硬件设备、云服务平台、嵌入式解决方案',
      targetUsers: '企业用户、技术开发者、终端消费者、行业专家',
      usageScenarios: ['业务流程优化', '数据分析决策', '用户体验提升', '成本控制', '风险预警'],
      valueChain: '技术创新链的核心驱动环节，连接研发、应用与市场',
      constraints: ['算法复杂度', '数据隐私', '计算资源', '技术标准', '伦理规范'],
      marketTrends: ['边缘计算普及', 'AI民主化', '行业垂直化', '隐私保护加强'],
      competitiveAdvantage: ['技术壁垒', '数据优势', '生态整合', '用户粘性'],
      riskFactors: ['技术迭代风险', '监管政策变化', '数据安全威胁', '人才竞争激烈']
    },,
    
    // 教育培训类
    '教育|学习|培训|课程|知识': {
      coreFunction: '通过系统化的知识传递和技能培养，提升个人能力和社会价值',
      keyAttributes: ['系统性', '个性化', '互动性', '可测量', '持续性'],
      currentForm: '线下课堂、在线平台、混合式教学、企业培训、自主学习工具',
      targetUsers: '学生群体、职场人士、企业组织、教育机构、终身学习者',
      usageScenarios: ['学历教育', '职业技能提升', '兴趣爱好培养', '企业内训', '认证考试'],
      valueChain: '人才培养生态的关键节点，连接知识创造与应用实践',
      constraints: ['教育资源分配', '学习时间成本', '效果评估难度', '技术接受度', '政策法规'],
      marketTrends: ['在线教育普及', '个性化学习', '技能导向转变', '终身学习理念'],
      competitiveAdvantage: ['内容质量', '师资力量', '技术平台', '品牌声誉'],
      riskFactors: ['政策监管收紧', '市场竞争激烈', '技术更新换代', '用户需求变化']
    },,
    
    // 医疗健康类
    '医疗|健康|康复|诊断|治疗': {
      coreFunction: '通过专业医疗服务和健康管理，维护和改善人体健康状态',
      keyAttributes: ['专业性', '安全性', '精准性', '可及性', '人文关怀'],
      currentForm: '医院诊疗、社区医疗、远程医疗、健康管理、医疗器械',
      targetUsers: '患者群体、医护人员、健康管理者、医疗机构、保险机构',
      usageScenarios: ['疾病诊断', '治疗康复', '预防保健', '健康监测', '应急救护'],
      valueChain: '健康产业链的核心服务环节，连接医药研发与患者需求',
      constraints: ['医疗资源稀缺', '技术门槛高', '监管要求严', '成本控制压力', '伦理道德'],
      marketTrends: ['精准医疗发展', '数字化转型', '预防医学重视', '医疗服务下沉'],
      competitiveAdvantage: ['技术实力', '专家资源', '服务质量', '设备先进性'],
      riskFactors: ['医疗事故风险', '技术安全隐患', '政策变化影响', '人才流失']
    },,
    
    // 金融服务类
    '金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',,,
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',,,
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',,,
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],,
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方',
      constraints: ['监管合规', '风险控制', '技术安全', '市场波动', '信用风险'],
      marketTrends: ['数字化转型', '普惠金融', '绿色金融', '开放银行'],
      competitiveAdvantage: ['风控能力', '技术创新', '客户资源', '品牌信誉'],
      riskFactors: ['系统性风险', '网络安全威胁', '监管政策变化', '市场竞争加剧']
    },,
    
    // 电商零售类
    '电商|购物|零售|商城|销售': {
      coreFunction: '通过商品交易平台和服务体系，连接商家与消费者实现价值交换',
      keyAttributes: ['便捷性', '丰富性', '性价比', '可信度', '个性化'],
      currentForm: '线上商城、移动应用、社交电商、直播带货、O2O模式',
      targetUsers: '消费者、商家卖家、平台运营者、物流服务商、支付机构',
      usageScenarios: ['日常购物', '品牌推广', '库存管理', '客户服务', '数据分析'],
      valueChain: '商业流通链的数字化核心，整合供应链各环节',
      constraints: ['物流成本', '库存管理', '用户获取', '平台竞争', '监管要求'],
      marketTrends: ['直播电商兴起', '社交化购物', '供应链优化', '绿色消费'],
      competitiveAdvantage: ['流量优势', '供应链效率', '技术能力', '用户体验'],
      riskFactors: ['市场饱和', '获客成本上升', '供应链风险', '政策监管']
    }
  };

  // 基于数据库生成关键词分析 - 增强版
  function generateKeywordAnalysisFromDatabase(topic) {
    const topicLower = topic.toLowerCase();
    
    // 智能匹配最相关的行业模板
    let matchedTemplate = null;
    let maxScore = 0;
    
    Object.entries(keywordAnalysisDatabase).forEach(([pattern, template]) => {
      const keywords = pattern.split('|');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (topicLower.includes(keyword)) {
          score += keyword.length; // 更长的关键词权重更高
        }
      },);
      
      if (score > maxScore) {
        maxScore = score;
        matchedTemplate = template;
      }
    },);
    
    // 如果没有匹配到模板，使用智能推理
    if (!matchedTemplate) {
      matchedTemplate = generateIntelligentAnalysis(topic, topicLower);
    },
    
    // 个性化调整模板内容
    return personalizeAnalysis(topic, matchedTemplate);
  }

  // 智能推理分析 - 当没有匹配模板时
  function generateIntelligentAnalysis(topic, topicLower) {
    // 基于关键词推断行业类型
    const industryIndicators = {
      '产品': ['功能实现', '用户体验', '市场竞争'],
      '服务': ['服务质量', '客户满意', '运营效率'],
      '平台': ['生态建设', '用户规模', '数据价值'],
      '系统': ['技术架构', '集成能力', '扩展性'],
      '工具': ['易用性', '效率提升', '成本节约']
    },;
    
    let categoryType = '产品'; // 默认类型
    Object.keys(industryIndicators).forEach(category => {
      if (topicLower.includes(category)) {
        categoryType = category;
      }
    },);
    
    return {
      coreFunction: `${topic}通过${categoryType}化的方式，为用户提供专业化解决方案，解决特定领域的核心问题`,
      keyAttributes: ['专业性', '实用性', '创新性', '可靠性', '用户友好'],
      currentForm: `基于${categoryType}的多种实现形态，包括传统模式和数字化升级版本`,
      targetUsers: `${topic}的核心用户群体，包括直接使用者、决策者和影响者`,
      usageScenarios: ['核心业务场景', '辅助功能场景', '特殊需求场景', '未来扩展场景'],
      valueChain: `在相关产业生态中发挥重要作用，连接上下游合作伙伴`,
      constraints: ['技术实现难度', '市场接受程度', '成本控制压力', '竞争环境挑战'],
      marketTrends: ['数字化转型', '用户需求升级', '技术创新驱动', '生态化发展'],
      competitiveAdvantage: ['核心技术', '用户资源', '品牌价值', '运营效率'],
      riskFactors: ['技术风险', '市场风险', '运营风险', '政策风险']
    },;
  }

  // 个性化调整分析内容
  function personalizeAnalysis(topic, template) {
    const personalizedTemplate = { ...template };
    
    // 将模板中的通用词汇替换为具体主题
    Object.keys(personalizedTemplate).forEach(key => {
      if (typeof personalizedTemplate[key] === 'string') {
        personalizedTemplate[key] = personalizedTemplate[key]
          .replace(/该产品|该服务|该系统/g, topic)
          .replace(/相关/g, `${topic}相关`);
      }
    },);
    
    return personalizedTemplate;
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
  },

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

  // 奥斯本检核表法完整案例数据库（基于您提供的75+案例）
  const osbornCaseDatabase = {
    he: { // 他用
      title: "他用",
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
      ],
      prompts: [
        "这个产品/服务还能在哪些场景下使用？",
        "能否应用到其他行业或领域？",
        "是否可以服务于不同的用户群体？",
        "能否解决其他类型的问题？",
        "是否可以跨界应用到意想不到的领域？"
      ]
    },,
    jie: { // 借用
      title: "借用",,
      description: "借鉴其他领域的做法和原理",
      cases: [
        "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",,
        "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",,
        "3D食品打印机：将3D打印技术借鉴到食品加工领域",,
        "防震技术建筑应用：将机械防震技术借鉴到建筑防震设计中",
        "纳米材料服装应用：将航空航天领域的纳米材料借鉴到服装行业",
        "激光美容医疗：将工业激光技术借鉴到医疗美容领域",
        "GPS动物追踪：将军事GPS技术借鉴到野生动物研究领域",
        "二维码支付系统：将商品标识技术借鉴到金融支付领域",
        "人工智能医学诊断：将人工智能技术从棋类游戏借鉴到医学影像诊断",
        "潜艇生物研究：将军事潜艇技术借鉴到深海生物科学研究"
      ],
      prompts: [
        "其他行业是如何解决类似问题的？",
        "能否借鉴自然界的解决方案？",
        "是否可以引入新兴技术？",
        "能否学习成功案例的模式？",
        "哪些跨领域的技术可以移植过来？"
      ]
    },,
    gai: { // 改变
      title: "改变",
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
      ],
      prompts: [
        "改变产品的外观或结构？",
        "是否可以调整服务流程？",
        "能否修改使用规则或标准？",
        "是否可以改变交互方式？",
        "改变材质、颜色、形状等属性？"
      ]
    },,
    da: { // 扩大
      title: "扩大",
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
      ],
      prompts: [
        "能否增加更多功能特性？",
        "是否可以扩大服务范围？",
        "能否提高处理能力或容量？",
        "是否可以延长使用时间？",
        "能否增强性能或效果？"
      ]
    },,
    xiao: { // 缩小
      title: "缩小",
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
      ],
      prompts: [
        "能否简化为核心功能？",
        "是否可以做得更小更便携？",
        "能否减少使用步骤？",
        "是否可以降低使用门槛？",
        "能否压缩体积或重量？"
      ]
    },,
    ti: { // 替代
      title: "替代",
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
      ],
      prompts: [
        "能否用更好的材料替代？",
        "是否可以用新技术替代旧方法？",
        "能否用自动化替代人工？",
        "是否可以用更环保的方案替代？",
        "能否用更经济的方案替代？"
      ]
    },,
    tiao: { // 调整
      title: "调整",
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
      ],
      prompts: [
        "调整操作顺序？",
        "是否可以重新安排时间？",
        "能否优化空间布局？",
        "是否可以调整优先级？",
        "能否重新配置资源分配？"
      ]
    },,
    dian: { // 颠倒
      title: "颠倒",
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
      ],
      prompts: [
        "颠倒操作顺序？",
        "是否可以反转服务模式？",
        "能否逆向思考问题？",
        "是否可以颠倒角色关系？",
        "能否将因果关系颠倒？"
      ]
    },,
    hebing: { // 合并
      title: "合并",
      description: "合并、组合、联动、集成",
      cases: [
        "带橡皮铅笔：把铅笔和橡皮组合在一起",
        "组合机床：将几种部件组合在一起变成组合机床",
        "多功能家具：把餐桌、茶几和凳子组合在一起",
        "模块化3D打印机：可根据打印产品大小调整打印机尺寸",
        "智能手机：组合电话、相机、电脑等多种功能",
        "智能家居系统：整合照明、安保、温控等功能",
        "一体化办公系统：组合打印、扫描、复印功能",
        "混合动力汽车：组合传统发动机和电动马达",
        "旅游套餐服务：组合交通、住宿、景点服务",
        "综合学习平台：整合视频、文本、测验和互动工具"
      ],
      prompts: [
        "能否与其他产品合并？",
        "是否可以集成多项功能？",
        "能否与现有系统联动？",
        "是否可以组合不同服务？",
        "能否创造协同效应？"
      ]
    }
  };

  // 本地存储管理 - 扩展支持案例数据库
  const storage = {
    getApiKey: () => localStorage.getItem('deepseek_api_key') || '',
    setApiKey: (key) => localStorage.setItem('deepseek_api_key', key),
    clearApiKey: () => localStorage.removeItem('deepseek_api_key'),
    
    // 案例数据库管理
    getUserCases: () => {
      try {
        const cases = localStorage.getItem('user_cases_database');
        return cases ? JSON.parse(cases) : {};
      }, catch (e) {
        console.warn('读取用户案例数据库失败:', e);
        return {};
      }
    },,
    
    saveUserCases: (cases) => {
      try {
        localStorage.setItem('user_cases_database', JSON.stringify(cases));
        return true;
      }, catch (e) {
        console.warn('保存用户案例数据库失败:', e);
        return false;
      }
    },,
    
    addNewCase: (topic, dimension, suggestion) => {
      const userCases = storage.getUserCases();
      
      // 初始化维度数组
      if (!userCases[dimension]) {
        userCases[dimension] = [];
      },
      
      // 创建新案例
      const newCase = {
        topic: topic,
        suggestion: suggestion,
        timestamp: new Date().toISOString(),
        source: 'user_analysis'
      },;
      
      // 避免重复案例
      const exists = userCases[dimension].some(existingCase => 
        existingCase.topic === topic && existingCase.suggestion === suggestion
      );
      
      if (!exists) {
        userCases[dimension].push(newCase);
        
        // 限制每个维度最多保存50个用户案例，保持性能
        if (userCases[dimension].length > 50) {
          userCases[dimension] = userCases[dimension].slice(-50);
        },
        
        storage.saveUserCases(userCases);
        return true;
      },
      
      return false;
    },,
    
    getCaseStats: () => {
      const userCases = storage.getUserCases();
      const stats = {
        totalCases: 0,
        dimensionCounts: {},
        lastUpdated: null
      },;
      
      Object.keys(userCases).forEach(dimension => {
        const count = userCases[dimension].length;
        stats.dimensionCounts[dimension] = count;
        stats.totalCases += count;
        
        // 找到最新更新时间
        userCases[dimension].forEach(caseItem => {
          if (!stats.lastUpdated || new Date(caseItem.timestamp) > new Date(stats.lastUpdated)) {
            stats.lastUpdated = caseItem.timestamp;
          }
        },);
      },);
      
      return stats;
    }
  };

  // 初始化
  updateDate();
  renderPreview();
  setupPageTabs();
  setupApiKeyToggle();
  loadSavedApiKey();
  
  // 初始化时显示案例数据库统计
  const stats = storage.getCaseStats();
  if (stats.totalCases > 0) {
    updateCaseStatsDisplay(stats);
  }

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
      },);
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
    // 根据主题类型推断分析结果
    const topicLower = topic.toLowerCase();
    
    let coreFunction, keyAttributes, currentForm, targetUsers, usageScenarios, valueChain, constraints;
    
    // 智能匹配主题类型
    if (topicLower.includes('手机') || topicLower.includes('电话')) {
      coreFunction: '通信联络、信息处理、娱乐办公的综合功能';
      keyAttributes: ['便携性', '智能化', '多功能', '网络连接'];
      currentForm: '智能手机、功能机等移动通信设备';
      targetUsers: '各年龄段用户，从学生到商务人士';
      usageScenarios: ['日常通信', '移动办公', '娱乐消费', '学习教育'];
      valueChain: '通信产业链核心终端设备';
      constraints: ['电池续航', '屏幕尺寸', '成本控制', '技术更新'];
    }, else if (topicLower.includes('汽车') || topicLower.includes('车')) {
      coreFunction: '人员和货物的陆地交通运输工具';
      keyAttributes: ['机动性', '安全性', '舒适性', '环保性'];
      currentForm: '燃油车、电动车、混合动力车等';
      targetUsers: '个人用户、家庭用户、商业用户';
      usageScenarios: ['日常出行', '长途旅行', '货物运输', '商务用车'];
      valueChain: '汽车制造产业链核心产品';
      constraints: ['环保法规', '能源供应', '交通拥堵', '购买成本'];
    }, else if (topicLower.includes('教育') || topicLower.includes('学习')) {
      coreFunction: '知识传授、技能培养、人才培育';
      keyAttributes: ['系统性', '互动性', '个性化', '可持续'];
      currentForm: '学校教育、在线教育、培训机构等';
      targetUsers: '学生、职场人士、终身学习者';
      usageScenarios: ['课堂教学', '在线学习', '职业培训', '自主学习'];
      valueChain: '教育服务产业链核心环节';
      constraints: ['教育资源', '技术门槛', '学习时间', '成本投入'];
    }, else {
      // 通用分析模板
      coreFunction: `${topic}的核心功能和价值主张`;
      keyAttributes: ['实用性', '便捷性', '创新性', '可靠性'];
      currentForm: `${topic}的现有形态和实现方式`;
      targetUsers: `${topic}的主要目标用户群体`;
      usageScenarios: ['日常使用场景', '专业应用场景', '特殊需求场景'];
      valueChain: `${topic}在相关产业价值链中的定位`;
      constraints: ['技术限制', '成本约束', '市场竞争', '用户接受度'];
    },
    
    return {
      coreFunction,
      keyAttributes,
      currentForm,
      targetUsers,
      usageScenarios,
      valueChain,
      constraints
    },;
  }

  // 基于数据库生成九维度分析
  function generateNineDimensionsFromDatabase(topic, keywordAnalysis) {
    const results = {};
    
    keys.forEach(key => {
      const caseInfo = osbornCaseDatabase[key];
      const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
      results[key] = suggestions;
    },);
    
    return results;
  }

  // 基于案例生成建议 - 融合用户案例的增强版本
  function generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo) {
    const suggestions = [];
    
    // 1. 获取用户历史案例
    const userCases = storage.getUserCases();
    const userCasesForDimension = userCases[caseInfo.title.replace('能否', '')] || [];
    
    // 2. 合并内置案例和用户案例
    const allCases = [...caseInfo.cases];
    
    // 添加用户案例（转换格式）
    userCasesForDimension.forEach(userCase => {
      const caseText = `${userCase.topic}创新应用：${userCase.suggestion}`;
      allCases.push(caseText);
    },);
    
    // 3. 智能选择最相关的案例（优先用户案例）
    const relevantCases = selectRelevantCasesEnhanced(topic, allCases, userCasesForDimension);
    
    // 4. 生成高质量建议
    relevantCases.forEach(caseExample => {
      const suggestion = adaptCaseToTopic(caseExample, topic, caseInfo.title);
      suggestions.push(suggestion);
    },);
    
    // 5. 确保至少有3个建议
    while (suggestions.length < 3) {
      const genericSuggestion = generateContextualSuggestion(topic, caseInfo, suggestions.length);
      suggestions.push(genericSuggestion);
    },
    
    return suggestions.slice(0, 4); // 限制为4个高质量建议
  }

  // 增强的案例选择算法 - 优先考虑用户案例
  function selectRelevantCasesEnhanced(topic, allCases, userCases) {
    const topicLower = topic.toLowerCase();
    const scoredCases = allCases.map(caseExample => {
      let score = 0;
      const caseText = caseExample.toLowerCase();
      
      // 用户案例加权（优先级更高）
      const isUserCase = userCases.some(uc => 
        caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
      );
      if (isUserCase) score += 5;
      
      // 关键词匹配评分
      const topicWords = topicLower.split(/[\s，。！？；：、]+/).filter(w => w.length > 1);
      topicWords.forEach(word => {
        if (caseText.includes(word)) score += 2;
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      // 时间新鲜度评分（用户案例）
      if (isUserCase) {
        const userCase = userCases.find(uc => 
          caseExample.includes(uc.topic) || caseExample.includes(uc.suggestion)
        );
        if (userCase) {
          const daysSinceCreated = (Date.now() - new Date(userCase.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) score += 2; // 30天内的案例加分
        }
      },
      
      return { case: caseExample, score, isUserCase };
    },);
    
    // 返回评分最高的案例，优先用户案例
    return scoredCases
      .sort((a, b) => {
        if (a.isUserCase && !b.isUserCase) return -1;
        if (!a.isUserCase && b.isUserCase) return 1;
        return b.score - a.score;
      },)
      .slice(0, 3)
      .map(item => item.case);
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
      },);
      
      // 行业相关性评分
      const industryKeywords = getIndustryKeywords(topicLower);
      industryKeywords.forEach(keyword => {
        if (caseText.includes(keyword)) score += 3;
      },);
      
      return { case: caseExample, score };
    },);
    
    // 返回评分最高的2-3个案例
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
    },;
    
    for (const [pattern, keywords] of Object.entries(industryMap)) {
      if (new RegExp(pattern).test(topic)) {
        return keywords;
      }
    },
    return ['创新', '优化', '改进', '发展'];
  }

  // 高质量案例适配
  function adaptCaseToTopic(caseExample, topic, method) {
    const caseKey = extractCaseKey(caseExample);
    const caseInnovation = extractInnovation(caseExample);
    
    const templates = {
      '他用': [
        `参考${caseKey}的跨界应用，${topic}可以拓展到${getAlternativeField(topic)}领域`,
        `借鉴${caseKey}的多元化策略，为${topic}开发新的应用场景`,
        `学习${caseKey}的成功经验，${topic}也可以${caseInnovation}`
      ],
      '借用': [
        `引入${caseKey}的核心技术，提升${topic}的功能性能`,
        `借鉴${caseKey}的创新模式，为${topic}注入新的活力`,
        `学习${caseKey}的解决方案，优化${topic}的实现方式`
      ],
      '改变': [
        `参考${caseKey}的变革思路，改变${topic}的${getChangeableAspect(topic)}`,
        `借鉴${caseKey}的创新设计，为${topic}带来形态上的突破`,
        `学习${caseKey}的改进策略，优化${topic}的用户体验`
      ],
      '扩大': [
        `参考${caseKey}的扩展策略，增强${topic}的${getExpandableFeature(topic)}`,
        `借鉴${caseKey}的成功模式，扩大${topic}的影响范围`,
        `学习${caseKey}的发展思路，提升${topic}的综合能力`
      ],
      '缩小': [
        `参考${caseKey}的精简理念，专注${topic}的核心价值`,
        `借鉴${caseKey}的便携化设计，提高${topic}的易用性`,
        `学习${caseKey}的优化方案，简化${topic}的操作流程`
      ],
      '替代': [
        `参考${caseKey}的替代方案，为${topic}寻找更优的${getReplaceableComponent(topic)}`,
        `借鉴${caseKey}的创新材料，提升${topic}的性能表现`,
        `学习${caseKey}的技术革新，实现${topic}的升级换代`
      ],
      '调整': [
        `参考${caseKey}的优化布局，重新设计${topic}的${getAdjustableStructure(topic)}`,
        `借鉴${caseKey}的流程改进，提升${topic}的运行效率`,
        `学习${caseKey}的结构调整，优化${topic}的整体性能`
      ],
      '颠倒': [
        `参考${caseKey}的逆向思维，颠倒${topic}的${getReversibleAspect(topic)}`,
        `借鉴${caseKey}的创新理念，反转${topic}的传统模式`,
        `学习${caseKey}的突破性思路，重新定义${topic}的价值主张`
      ],
      '合并': [
        `参考${caseKey}的集成策略，将${topic}与${getCombinable(topic)}相结合`,
        `借鉴${caseKey}的融合理念，创造${topic}的协同效应`,
        `学习${caseKey}的组合模式，实现${topic}的功能整合`
      ]
    },;
    
    const methodTemplates = templates[method] || [`基于${method}思路，为${topic}寻找创新机会`];
    return methodTemplates[Math.floor(Math.random() * methodTemplates.length)];
  }

  // 辅助函数 - 快速实现
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
      '他用': [
        `探索${topic}在不同年龄群体中的应用潜力`,
        `考虑${topic}在特殊环境下的使用可能性`,
        `研究${topic}与其他行业结合的创新机会`
      ],
      '借用': [
        `从自然界寻找${topic}的设计灵感`,
        `借鉴成功企业的商业模式应用到${topic}`,
        `引入前沿科技提升${topic}的竞争力`
      ],
      '改变': [
        `改变${topic}的服务时间和频率`,
        `调整${topic}的目标用户群体定位`,
        `修改${topic}的核心价值主张`
      ],
      '扩大': [
        `扩展${topic}的服务半径和覆盖范围`,
        `增加${topic}的附加价值和衍生服务`,
        `提升${topic}的处理能力和响应速度`
      ],
      '缩小': [
        `专注${topic}的核心功能，去除冗余特性`,
        `简化${topic}的操作界面和使用步骤`,
        `降低${topic}的使用门槛和学习成本`
      ],
      '替代': [
        `寻找${topic}的环保替代方案`,
        `探索${topic}的低成本实现方式`,
        `研究${topic}的智能化替代技术`
      ],
      '调整': [
        `优化${topic}的资源配置和分配策略`,
        `调整${topic}的服务流程和响应机制`,
        `重新设计${topic}的用户交互体验`
      ],
      '颠倒': [
        `颠倒${topic}的传统供需关系`,
        `反转${topic}的服务提供方式`,
        `逆向思考${topic}的价值创造模式`
      ],
      '合并': [
        `整合${topic}与相关服务的资源优势`,
        `合并${topic}的多个功能模块`,
        `联合${topic}与合作伙伴的核心能力`
      ]
    },;
    
    const prompts = contextualPrompts[caseInfo.title] || [`深入思考${topic}的创新可能性`];
    return prompts[index % prompts.length];
  }

  // 主分析函数 - 支持本地和AI两种模式
  async function analyzeWithAI() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
      alert('请先输入主题');
      return;
    },

    // 更新按钮状态
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    if (btnText && loadingSpinner) {
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'inline-flex';
    }, else {
      analyzeBtn.textContent = '分析中...';
    },
    analyzeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      let keywordAnalysis, analysisResults;

      if (apiKey) {
        // 保存API密钥
        storage.setApiKey(apiKey);
        
        // 使用AI分析
        try {
          keywordAnalysis = await analyzeKeywordWithAI(topic, apiKey);
          analysisResults = await analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey);
          updateAnalysisStatus('AI分析完成！请点击"九宫格编辑"标签页查看结果。');
        }, catch (error) {
          console.warn('AI分析失败，使用本地数据库分析:', error);
          // AI失败时降级到本地分析
          const localResult = analyzeWithDatabase(topic);
          keywordAnalysis = localResult.keywordAnalysis;
          analysisResults = localResult.analysisResults;
          updateAnalysisStatus('已使用本地案例数据库完成分析，请点击"九宫格编辑"标签页查看结果。');
        }
      }, else {
        // 使用本地数据库分析
        const localResult = analyzeWithDatabase(topic);
        keywordAnalysis = localResult.keywordAnalysis;
        analysisResults = localResult.analysisResults;
        updateAnalysisStatus('已使用本地案例数据库完成分析，如需AI深度分析请填入API密钥。');
      },
      
      // 显示关键词分析结果
      displayKeywordAnalysis(keywordAnalysis);
      
      // 显示关键词下载选项
      const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
      if (keywordDownloadOptions) {
        keywordDownloadOptions.style.display = 'flex';
      },
      
      // 填充九宫格结果并保存到本地案例数据库
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (analysisResults[key] && Array.isArray(analysisResults[key])) {
          textarea.value = analysisResults[key].join('\n');
          
          // 自动保存每个建议到本地案例数据库
          const dimension = key;
          analysisResults[key].forEach(suggestion => {
            if (suggestion && suggestion.trim()) {
              const saved = storage.addNewCase(topic, dimension, suggestion.trim());
              if (saved) {
                console.log(`已保存新案例到维度 ${dimension}: ${suggestion.substring(0, 50)}...`);
              }
            }
          },);
        }
      },);
      
      // 显示案例数据库统计信息
      displayCaseStats();
      
    }, catch (error) {
      console.error('分析错误:', error);
      alert(`分析失败：${error.message}`);
      updateAnalysisStatus('分析失败，请重试');
    }, finally {
      // 恢复按钮状态
      const btnText = analyzeBtn.querySelector('.btn-text');
      const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
      
      if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
      }, else {
        analyzeBtn.textContent = '开始分析';
      },
      analyzeBtn.disabled = false;
    }
  }

  // AI关键词分析
  async function analyzeKeywordWithAI(topic, apiKey) {
    const prompt = `
请对主题"${topic}"进行深度关键词分析，从以下7个维度进行分析：

1. 核心功能：这个主题的主要功能和作用是什么？
2. 关键属性：有哪些重要的特征和属性？（请列出3-5个关键词）
3. 现有形态：目前主要以什么形式存在？
4. 目标用户：主要服务于哪些用户群体？
5. 使用场景：在哪些场景下会被使用？（请列出3-5个场景）
6. 价值链条：在整个价值链中处于什么位置？
7. 约束限制：面临哪些主要限制和挑战？（请列出3-5个约束）

请以JSON格式返回分析结果：
{
  "coreFunction": "核心功能描述",
  "keyAttributes": ["属性1", "属性2", "属性3"],
  "currentForm": "现有形态描述",
  "targetUsers": "目标用户描述",
  "usageScenarios": ["场景1", "场景2", "场景3"],
  "valueChain": "价值链条描述",
  "constraints": ["约束1", "约束2", "约束3"]
}
`;

    const result = await callDeepSeekAPI(prompt, apiKey);
    try {
      return JSON.parse(result);
    }, catch (e) {
      console.warn('JSON解析失败，使用文本解析');
      return generateKeywordAnalysisFromDatabase(topic);
    }
  }

  // AI九维度分析
  async function analyzeNineDimensionsWithAI(topic, keywordAnalysis, apiKey) {
    const results = {};
    
    // 并行分析所有维度
    const promises = keys.map(async (key) => {
      try {
        const prompt = generateAIAnalysisPrompt(topic, keywordAnalysis, key);
        const result = await callDeepSeekAPI(prompt, apiKey);
        
        const suggestions = result.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
        
        return { key, suggestions };
      }, catch (error) {
        console.error(`${key}维度AI分析失败:`, error);
        // AI失败时使用本地数据库
        const caseInfo = osbornCaseDatabase[key];
        const suggestions = generateSuggestionsFromCases(topic, keywordAnalysis, caseInfo);
        return { key, suggestions };
      }
    },);

    const analysisResults = await Promise.all(promises);
    
    analysisResults.forEach(({ key, suggestions }) => {
      results[key] = suggestions;
    },);

    return results;
  }

  // 生成AI分析提示词
  function generateAIAnalysisPrompt(topic, keywordAnalysis, dimension) {
    const caseInfo = osbornCaseDatabase[dimension];
    const cases = caseInfo.cases.slice(0, 5).join('；');
    const prompts = caseInfo.prompts.join('；');
    
    return `
你是一位创新思维专家，请基于奥斯本检核表法的"${caseInfo.title}"维度，对主题"${topic}"进行深度创新分析。

【主题信息】
- 分析主题：${topic}
- 核心功能：${keywordAnalysis.coreFunction || '未知'}
- 关键属性：${Array.isArray(keywordAnalysis.keyAttributes) ? keywordAnalysis.keyAttributes.join('、') : '未知'}
- 目标用户：${keywordAnalysis.targetUsers || '未知'}
- 使用场景：${Array.isArray(keywordAnalysis.usageScenarios) ? keywordAnalysis.usageScenarios.join('、') : '未知'}
- 约束限制：${Array.isArray(keywordAnalysis.constraints) ? keywordAnalysis.constraints.join('、') : '未知'}

【${caseInfo.title}分析维度】
${caseInfo.description}

【参考案例】
${cases}

【分析思路】
${prompts}

【要求】
1. 基于以上案例和思路，针对"${topic}"提出3-5个具体的创新建议
2. 每个建议要具体可行，不要泛泛而谈
3. 结合主题的实际特点和约束条件
4. 参考成功案例的创新模式
5. 每行一个建议，简洁明了

请直接输出创新建议列表，每行一个建议：
`;
  }

  // 调用DeepSeek API
  async function callDeepSeekAPI(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },,
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },)
    },);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
    },

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    },
    
    return data.choices[0].message.content;
  }

  function updateAnalysisStatus(message) {
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = `<p class="placeholder">${message}</p>`;
    }
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

  // 获取卡片简洁色彩方案
  function getCardColor(title, type) {
    if (type === 'keyword') {
      // 关键词分析7种简洁色彩
      const keywordColors = {
        '核心功能': 'rgba(59, 130, 246, 0.85)', // 蓝色
        '关键属性': 'rgba(34, 197, 94, 0.85)', // 绿色
        '现有形态': 'rgba(249, 115, 22, 0.85)', // 橙色
        '目标用户': 'rgba(168, 85, 247, 0.85)', // 紫色
        '使用场景': 'rgba(6, 182, 212, 0.85)', // 青色
        '价值链条': 'rgba(236, 72, 153, 0.85)', // 粉色
        '约束限制': 'rgba(239, 68, 68, 0.85)' // 红色
      },;
      return keywordColors[title] || keywordColors['核心功能'];
    }, else {
      // 九宫格分析9种简洁色彩
      const gridColors = {
        '他用': 'rgba(59, 130, 246, 0.85)', // 蓝色
        '借用': 'rgba(34, 197, 94, 0.85)', // 绿色
        '改变': 'rgba(249, 115, 22, 0.85)', // 橙色
        '扩大': 'rgba(168, 85, 247, 0.85)', // 紫色
        '缩小': 'rgba(6, 182, 212, 0.85)', // 青色
        '替代': 'rgba(236, 72, 153, 0.85)', // 粉色
        '调整': 'rgba(239, 68, 68, 0.85)', // 红色
        '颠倒': 'rgba(99, 102, 241, 0.85)', // 靛蓝
        '合并': 'rgba(139, 69, 19, 0.85)' // 棕色
      },;
      return gridColors[title] || gridColors['他用'];
    }
  }

  // 创建完全展示内容的卡片HTML模板 - 重新设计确保内容完整显示
  function createCardHTML(title, content, topic, type = 'grid') {
    const backgroundColor = getCardColor(title, type);
    
    // 处理内容数组
    const contentArray = Array.isArray(content) ? content : [content.toString()];
    
    // 更精确地计算所需高度
    let totalTextLength = 0;
    contentArray.forEach(item => {
      totalTextLength += item.length;
    },);
    
    // 基于内容长度动态计算高度
    const baseHeight = 400; // 基础高度
    const contentHeight = Math.max(300, contentArray.length * 80 + totalTextLength * 2); // 更宽松的计算
    const finalHeight = baseHeight + contentHeight;
    
    return `
      <div class="innovation-card" style="
        width: 380px;
        height: ${finalHeight}px;
        background: ${backgroundColor};
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 28px;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        position: relative;
        box-shadow: 0 24px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.25);
        display: flex;
        flex-direction: column;
        margin: 15px;
        overflow: visible;
      ">
        
        <!-- 装饰性背景元素 -->
        <div style="
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
        "></div>
        
        <!-- 主题区域 - 顶部突出显示 -->
        <div style="
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
          padding: 20px 24px;
          background: rgba(255,255,255,0.15);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        ">
          <div style="
            font-size: 24px; 
            font-weight: 900;
            color: white;
            text-shadow: 0 3px 15px rgba(0,0,0,0.5);
            letter-spacing: 1px;
            margin-bottom: 8px;
          ">${topic}</div>
          <div style="
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%);
            margin: 0 auto;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(255,255,255,0.3);
          "></div>
        </div>
        
        <!-- 维度标题区域 - 小一点 -->
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          position: relative;
          z-index: 10;
        ">
          <div style="
            width: 4px;
            height: 24px;
            background: rgba(255,255,255,0.9);
            border-radius: 2px;
            margin-right: 12px;
            box-shadow: 0 2px 8px rgba(255,255,255,0.3);
          "></div>
          <h3 style="
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            color: white;
            text-shadow: 0 2px 8px rgba(0,0,0,0.3);
            letter-spacing: 0.5px;
          ">${title}</h3>
        </div>
        
        <!-- 内容展示区域 - 减少内边距但保持可读性 -->
        <div style="
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          color: #1a202c;
          border-radius: 16px;
          padding: 20px;
          position: relative;
          z-index: 10;
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 
            inset 0 2px 8px rgba(0,0,0,0.05),
            0 4px 16px rgba(0,0,0,0.08);
          flex: 1;
          min-height: ${contentHeight}px;
          overflow: visible;
        ">
          ${contentArray.map((item, index) => `
            <div style="
              display: flex;
              align-items: flex-start;
              margin-bottom: ${index === contentArray.length - 1 ? '0' : '20px'};
              min-height: 60px;
            ">
              <div style="
                width: 10px;
                height: 10px;
                background: ${backgroundColor.replace('0.85', '1')};
                border-radius: 50%;
                margin-top: 12px;
                margin-right: 16px;
                flex-shrink: 0;
                box-shadow: 0 3px 8px rgba(0,0,0,0.25);
              "></div>
              <div style="
                font-size: 17px; 
                color: #1a202c;
                font-weight: 500;
                line-height: 1.8;
                word-wrap: break-word;
                word-break: break-word;
                hyphens: auto;
                flex: 1;
              ">${item}</div>
            </div>
          `).join('')}
        </div>
        
        <!-- 底部标识 -->
        <div style="
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          opacity: 0.85;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          position: relative;
          z-index: 10;
        ">
          奥斯本创新九问 · ${new Date().toLocaleDateString()}
        </div>
      </div>
    `;
  }

  // 创建临时容器并生成图片
  async function generateCardImage(cardHTML, filename) {
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      background: white;
      padding: 20px;
    `;
    tempContainer.innerHTML = cardHTML;
    document.body.appendChild(tempContainer);
    
    try {
      const canvas = await html2canvas(tempContainer.firstElementChild, {
        backgroundColor: 'transparent',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      },);
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      return true;
    }, catch (error) {
      console.error('生成卡片图片失败:', error);
      return false;
    }, finally {
      document.body.removeChild(tempContainer);
    }
  }

  // 批量下载（ZIP格式）
  async function downloadAsZip(cards, zipName) {
    if (typeof JSZip === 'undefined') {
      showToast('ZIP功能未加载，将逐个下载图片', 'info');
      // 逐个下载
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        await generateCardImage(card.html, card.filename);
        if (i < cards.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 延迟避免浏览器阻止
        }
      },
      return;
    },
    
    const zip = new JSZip();
    
    for (const card of cards) {
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = 'position: fixed; top: -9999px; left: -9999px;';
      tempContainer.innerHTML = card.html;
      document.body.appendChild(tempContainer);
      
      try {
        const canvas = await html2canvas(tempContainer.firstElementChild, {
          backgroundColor: 'transparent',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false
        },);
        
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.split(',')[1];
        zip.file(card.filename, base64Data, { base64: true });
      }, catch (error) {
        console.error(`生成${card.filename}失败:`, error);
      }, finally {
        document.body.removeChild(tempContainer);
      }
    },
    
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = zipName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // 关键词分析下载功能
  async function downloadKeywordPNG(mode = 'full') {
    const topic = topicInput.value.trim() || '未命名主题';
    
    if (mode === 'full') {
      // 原有的完整下载功能
      return downloadKeywordPNG();
    },
    
    const analysisResult = document.querySelector('#keywordAnalysisResult .keyword-result');
    if (!analysisResult) {
      showToast('请先进行分析再下载', 'error');
      return;
    },
    
    try {
      showToast('正在生成卡片...', 'info');
      
      // 提取关键词分析数据
      const keywordData = extractKeywordData(analysisResult);
      
      if (mode === 'cards') {
        // 显示卡片选择界面
        showCardSelectionModal(keywordData, topic, 'keyword');
      }, else if (mode === 'all') {
        // 批量下载所有卡片
        const cards = [];
        Object.entries(keywordData).forEach(([key, value]) => {
          const title = getKeywordTitle(key);
          const cardHTML = createCardHTML(title, value, topic, 'keyword');
          cards.push({
            html: cardHTML,
            filename: `${topic}-${title}-${new Date().toISOString().slice(0,10)}.png`
          },);
        },);
        
        await downloadAsZip(cards, `${topic}-关键词分析卡片-${new Date().toISOString().slice(0,10)}.zip`);
        showToast('关键词分析卡片批量下载完成！', 'success');
      }
    }, catch (error) {
      console.error('下载失败:', error);
      showToast('下载失败，请重试', 'error');
    }
  }

  // 九宫格下载功能
  async function downloadGridPNG(mode = 'full') {
    const topic = topicInput.value.trim() || '未命名主题';
    
    if (mode === 'full') {
      // 原有的完整下载功能
      return downloadGridPNG();
    },
    
    try {
      showToast('正在生成卡片...', 'info');
      
      // 提取九宫格数据
      const gridData = {};
      keys.forEach(key => {
        const textarea = document.querySelector(`textarea[data-key="${key}"]`);
        if (textarea && textarea.value.trim()) {
          const suggestions = textarea.value.split('\n').filter(line => line.trim());
          gridData[key] = suggestions;
        }
      },);
      
      if (Object.keys(gridData).length === 0) {
        showToast('请先进行分析或填写内容', 'error');
        return;
      },
      
      if (mode === 'cards') {
        // 显示卡片选择界面
        showCardSelectionModal(gridData, topic, 'grid');
      }, else if (mode === 'all') {
        // 批量下载所有卡片
        const cards = [];
        Object.entries(gridData).forEach(([key, suggestions]) => {
          const title = osbornCaseDatabase[key]?.title || key;
          const cardHTML = createCardHTML(title, suggestions, topic, 'grid');
          cards.push({
            html: cardHTML,
            filename: `${topic}-${title}-${new Date().toISOString().slice(0,10)}.png`
          },);
        },);
        
        await downloadAsZip(cards, `${topic}-九宫格分析卡片-${new Date().toISOString().slice(0,10)}.zip`);
        showToast('九宫格分析卡片批量下载完成！', 'success');
      }
    }, catch (error) {
      console.error('下载失败:', error);
      showToast('下载失败，请重试', 'error');
    }
  }

  // 提取关键词数据
  function extractKeywordData(analysisResult) {
    const data = {};
    const items = analysisResult.querySelectorAll('.keyword-item');
    
    items.forEach(item => {
      const title = item.querySelector('h5')?.textContent;
      const content = item.querySelector('p')?.textContent;
      const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent);
      
      if (title) {
        data[title] = content || tags.join('、') || '暂无数据';
      }
    },);
    
    return data;
  }

  // 获取关键词标题
  function getKeywordTitle(key) {
    const titleMap = {
      '核心功能': '核心功能',
      '关键属性': '关键属性', 
      '现有形态': '现有形态',
      '目标用户': '目标用户',
      '使用场景': '使用场景',
      '价值链条': '价值链条',
      '约束限制': '约束限制'
    },;
    return titleMap[key] || key;
  }

  // 显示卡片选择模态框
  function showCardSelectionModal(data, topic, type) {
    // 先移除可能存在的旧模态框
    const existingModal = document.querySelector('.card-selection-modal');
    if (existingModal) {
      existingModal.remove();
    },
    
    const modal = document.createElement('div');
    modal.className = 'card-selection-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      backdrop-filter: blur(4px);
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 24px;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    `;
    
    const title = type === 'keyword' ? '选择关键词分析卡片' : '选择九宫格分析卡片';
    content.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #2d3748;">${title}</h3>
      <div class="card-selection">
        ${Object.entries(data).map(([key, value]) => {
          const displayTitle = type === 'keyword' ? getKeywordTitle(key) : (osbornCaseDatabase[key]?.title || key);
          return `
            <label style="
              display: flex;
              align-items: center;
              padding: 12px;
              border: 2px solid #e2e8f0;
              border-radius: 8px;
              margin-bottom: 8px;
              cursor: pointer;
              transition: all 0.2s;
            " onmouseover="this.style.borderColor='#4a90e2'" onmouseout="this.style.borderColor='#e2e8f0'">
              <input type="checkbox" value="${key}" checked style="margin-right: 12px;">
              <span style="font-weight: 500;">${displayTitle}</span>
            </label>
          `;
        },).join('')}
      </div>
      <div style="display: flex; gap: 12px; margin-top: 20px; justify-content: flex-end;">
        <button id="cancelSelection" style="
          padding: 8px 16px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 6px;
          cursor: pointer;
        ">取消</button>
        <button id="downloadSelected" style="
          padding: 8px 16px;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        ">下载选中卡片</button>
      </div>
    `;
    
    modal.appendChild(content);
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 获取复选框
    const checkboxes = content.querySelectorAll('input[type="checkbox"]');
    
    // 取消按钮
    content.querySelector('#cancelSelection').onclick = () => {
      modal.remove();
    },;
    
    // 下载按钮
    content.querySelector('#downloadSelected').onclick = async () => {
      const selected = Array.from(content.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
      
      if (selected.length === 0) {
        showToast('请至少选择一个卡片', 'error');
        return;
      },
      
      // 显示下载进度
      const downloadBtn = content.querySelector('#downloadSelected');
      const originalText = downloadBtn.textContent;
      downloadBtn.textContent = '正在生成...';
      downloadBtn.disabled = true;
      
      try {
        // 生成并下载选中的卡片
        for (let i = 0; i < selected.length; i++) {
          const key = selected[i];
          const value = data[key];
          const displayTitle = type === 'keyword' ? getKeywordTitle(key) : (osbornCaseDatabase[key]?.title || key);
          const cardHTML = createCardHTML(displayTitle, value, topic, type);
          const filename = `${topic}-${displayTitle}-${new Date().toISOString().slice(0,10)}.png`;
          
          downloadBtn.textContent = `正在生成 ${i + 1}/${selected.length}...`;
          
          const success = await generateCardImage(cardHTML, filename);
          if (!success) {
            showToast(`生成第${i + 1}张卡片失败`, 'error');
          },
          
          // 添加延迟避免浏览器阻止下载
          if (i < selected.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 800));
          }
        },
        
        modal.remove();
        showToast(`成功下载${selected.length}张卡片！`, 'success');
        
      }, catch (error) {
        console.error('下载过程中出错:', error);
        showToast('下载过程中出现错误', 'error');
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
      }
    },;
    
    // 点击背景关闭
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    },;
    
    // 阻止内容区域点击事件冒泡
    content.onclick = (e) => {
      e.stopPropagation();
    },;
  }

  // 原有的完整下载功能 - 修复版本
  async function downloadGridPNG() {
    try {
      const node = document.getElementById('exportArea');
      if (!node) {
        showToast('找不到九宫格元素', 'error');
        return;
      },

      // 确保html2canvas已加载
      if (typeof html2canvas === 'undefined') {
        showToast('图片生成库未加载，请刷新页面重试', 'error');
        return;
      },

      // 显示加载提示
      showToast('正在生成图片，请稍候...', 'info');

      // 临时调整样式以确保完整截图
      const originalStyles = new Map();
      
      // 保存并调整主容器样式
      originalStyles.set(node, node.style.cssText);
      node.style.cssText += `
        transform: none !important;
        transition: none !important;
        position: relative !important;
        z-index: 1 !important;
        background: white !important;
      `;

      // 调整所有子元素样式
      const allElements = node.querySelectorAll('*');
      allElements.forEach(el => {
        originalStyles.set(el, el.style.cssText);
        el.style.cssText += `
          transform: none !important;
          transition: none !important;
          box-shadow: none !important;
        `;
      },);

      // 确保文本框内容可见
      const textareas = node.querySelectorAll('textarea');
      textareas.forEach(textarea => {
        if (textarea.value.trim()) {
          // 创建div替换textarea显示内容
          const div = document.createElement('div');
          div.style.cssText = `
            width: 100%;
            min-height: 120px;
            padding: 12px;
            border: 2px solid #cbd5e0;
            border-radius: 6px;
            font-size: 14px;
            line-height: 1.5;
            font-family: inherit;
            background: white;
            white-space: pre-wrap;
            word-wrap: break-word;
          `;
          div.textContent = textarea.value;
          textarea.style.display = 'none';
          textarea.parentNode.appendChild(div);
          originalStyles.set(div, 'temp-element');
        }
      },);

      // 等待样式应用
      await new Promise(resolve => setTimeout(resolve, 200));

      // 生成截图
      const canvas = await html2canvas(node, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: node.offsetWidth,
        height: node.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        onclone: (clonedDoc) => {
          // 在克隆文档中确保样式正确
          const clonedNode = clonedDoc.getElementById('exportArea');
          if (clonedNode) {
            clonedNode.style.transform = 'none';
            clonedNode.style.position = 'relative';
          }
        }
      },);

      // 恢复原始样式
      originalStyles.forEach((originalStyle, element) => {
        if (originalStyle === 'temp-element') {
          element.remove();
        }, else {
          element.style.cssText = originalStyle;
        }
      },);

      // 恢复textarea显示
      textareas.forEach(textarea => {
        textarea.style.display = '';
      },);

      // 下载图片
      const data = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = data;
      a.download = `${topicInput.value.trim() || '奥斯本九问'}-九宫格分析-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast('九宫格分析图下载成功！', 'success');
    }, catch (error) {
      console.error('下载失败:', error);
      showToast(`下载失败：${error.message}`, 'error');
    }
  }

  async function downloadKeywordPNG() {
    try {
      const node = document.getElementById('keywordAnalysisCard');
      
      if (!node) {
        showToast('找不到关键词分析元素', 'error');
        return;
      },

      const analysisResult = node.querySelector('#keywordAnalysisResult');
      if (!analysisResult || !analysisResult.querySelector('.keyword-result')) {
        showToast('请先进行分析再下载', 'error');
        return;
      },

      // 确保html2canvas已加载
      if (typeof html2canvas === 'undefined') {
        showToast('图片生成库未加载，请刷新页面重试', 'error');
        return;
      },

      showToast('正在生成图片，请稍候...', 'info');

      // 临时调整样式确保完整显示
      const originalStyles = new Map();
      
      // 保存并调整主容器样式
      originalStyles.set(node, node.style.cssText);
      node.style.cssText += `
        transform: none !important;
        transition: none !important;
        max-height: none !important;
        overflow: visible !important;
        position: relative !important;
        background: white !important;
      `;

      // 调整分析内容样式
      originalStyles.set(analysisResult, analysisResult.style.cssText);
      analysisResult.style.cssText += `
        max-height: none !important;
        overflow: visible !important;
      `;

      // 调整所有子元素
      const allElements = node.querySelectorAll('*');
      allElements.forEach(el => {
        if (!originalStyles.has(el)) {
          originalStyles.set(el, el.style.cssText);
        },
        el.style.cssText += `
          transform: none !important;
          transition: none !important;
          max-height: none !important;
          overflow: visible !important;
        `;
      },);

      // 等待样式应用
      await new Promise(resolve => setTimeout(resolve, 200));

      // 生成截图
      const canvas = await html2canvas(node, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: node.scrollWidth || node.offsetWidth,
        height: node.scrollHeight || node.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: Math.max(window.innerWidth, 1200),
        windowHeight: window.innerHeight,
        onclone: (clonedDoc) => {
          const clonedNode = clonedDoc.getElementById('keywordAnalysisCard');
          if (clonedNode) {
            clonedNode.style.transform = 'none';
            clonedNode.style.maxHeight = 'none';
            clonedNode.style.overflow = 'visible';
          }
        }
      },);

      // 恢复原始样式
      originalStyles.forEach((originalStyle, element) => {
        element.style.cssText = originalStyle;
      },);

      // 下载图片
      const data = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = data;
      a.download = `${topicInput.value.trim() || '关键词分析'}-关键词分析-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast('关键词分析图下载成功！', 'success');
    }, catch (error) {
      console.error('下载失败:', error);
      showToast(`下载失败：${error.message}`, 'error');
    }
  }

  // 显示案例数据库统计信息
  function displayCaseStats() {
    const stats = storage.getCaseStats();
    
    if (stats.totalCases > 0) {
      const statsMessage = `📚 本地案例数据库已收录 ${stats.totalCases} 个案例`;
      showToast(statsMessage, 'success');
      
      // 在控制台显示详细统计
      console.log('📊 案例数据库统计:', {
        总案例数: stats.totalCases,
        各维度分布: stats.dimensionCounts,
        最后更新: stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : '无'
      },);
      
      // 更新界面显示
      updateCaseStatsDisplay(stats);
    }
  }

  // 更新界面上的案例统计显示
  function updateCaseStatsDisplay(stats) {
    // 在分析页面添加统计信息
    let statsElement = document.getElementById('caseStatsDisplay');
    
    if (!statsElement) {
      // 创建统计显示元素
      statsElement = document.createElement('div');
      statsElement.id = 'caseStatsDisplay';
      statsElement.style.cssText = `
        background: linear-gradient(135deg, #4caf50 0%, #689f38 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        margin-top: 16px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
      `;
      
      // 添加悬浮效果
      statsElement.addEventListener('mouseenter', () => {
        statsElement.style.transform = 'translateY(-2px)';
        statsElement.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
      },);
      
      statsElement.addEventListener('mouseleave', () => {
        statsElement.style.transform = 'translateY(0)';
        statsElement.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
      },);
      
      // 点击显示详细统计
      statsElement.addEventListener('click', () => {
        showDetailedCaseStats(stats);
      },);
      
      // 插入到配置区域
      const configCard = document.querySelector('.topic-section.card');
      if (configCard) {
        configCard.appendChild(statsElement);
      }
    },
    
    // 更新统计内容
    const dimensionNames = {
      'he': '他用', 'jie': '借用', 'gai': '改变', 'da': '扩大', 'xiao': '缩小',
      'ti': '替代', 'tiao': '调整', 'dian': '颠倒', 'hebing': '合并'
    },;
    
    const topDimensions = Object.entries(stats.dimensionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([dim, count]) => `${dimensionNames[dim] || dim}(${count})`)
      .join(' · ');
    
    statsElement.innerHTML = `
      📚 智能案例库：已学习 <strong>${stats.totalCases}</strong> 个案例
      ${topDimensions ? `<br><small style="opacity: 0.9;">热门维度：${topDimensions}</small>` : ''}
      <br><small style="opacity: 0.8;">点击查看详细统计 →</small>
    `;
  }

  // 显示详细案例统计
  function showDetailedCaseStats(stats) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      backdrop-filter: blur(4px);
    `;
    
    const dimensionNames = {
      'he': '他用', 'jie': '借用', 'gai': '改变', 'da': '扩大', 'xiao': '缩小',
      'ti': '替代', 'tiao': '调整', 'dian': '颠倒', 'hebing': '合并'
    },;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    `;
    
    const dimensionStats = Object.entries(stats.dimensionCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([dim, count]) => {
        const percentage = ((count / stats.totalCases) * 100).toFixed(1);
        return `
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
          ">
            <span style="font-weight: 600; color: #2d3748;">${dimensionNames[dim] || dim}</span>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="
                width: 100px;
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
              ">
                <div style="
                  width: ${percentage}%;
                  height: 100%;
                  background: linear-gradient(135deg, #4caf50 0%, #689f38 100%);
                  transition: width 0.3s ease;
                "></div>
              </div>
              <span style="font-weight: 700; color: #4caf50; min-width: 60px; text-align: right;">
                ${count} (${percentage}%)
              </span>
            </div>
          </div>
        `;
      },).join('');
    
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <h3 style="margin: 0 0 8px 0; color: #2d3748; font-size: 24px;">📊 智能案例数据库统计</h3>
        <p style="color: #718096; margin: 0;">系统自动学习并积累创新案例</p>
      </div>
      
      <div style="
        background: linear-gradient(135deg, #4caf50 0%, #689f38 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 24px;
        text-align: center;
      ">
        <div style="font-size: 32px; font-weight: 800; margin-bottom: 8px;">${stats.totalCases}</div>
        <div style="font-size: 16px; opacity: 0.9;">累计学习案例数</div>
        ${stats.lastUpdated ? `
          <div style="font-size: 12px; opacity: 0.8; margin-top: 8px;">
            最后更新：${new Date(stats.lastUpdated).toLocaleString()}
          </div>
        ` : ''}
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 16px 0; color: #2d3748;">各维度案例分布</h4>
        ${dimensionStats}
      </div>
      
      <div style="
        background: #f7fafc;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #4caf50;
      ">
        <h5 style="margin: 0 0 8px 0; color: #2d3748;">💡 智能学习机制</h5>
        <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.5;">
          每次分析后，系统会自动将生成的创新建议保存到本地案例数据库。
          这些案例会在后续分析中被优先使用，让系统越用越智能！
        </p>
      </div>
      
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="clearCaseDatabase" style="
          padding: 8px 16px;
          border: 2px solid #e53e3e;
          background: white;
          color: #e53e3e;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        ">清空数据库</button>
        <button id="closeCaseStats" style="
          padding: 8px 16px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        ">关闭</button>
      </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 关闭按钮
    content.querySelector('#closeCaseStats').onclick = () => {
      modal.remove();
    },;
    
    // 清空数据库按钮
    content.querySelector('#clearCaseDatabase').onclick = () => {
      if (confirm('确定要清空所有学习的案例数据吗？此操作不可恢复！')) {
        localStorage.removeItem('user_cases_database');
        showToast('案例数据库已清空', 'info');
        modal.remove();
        
        // 移除统计显示
        const statsElement = document.getElementById('caseStatsDisplay');
        if (statsElement) {
          statsElement.remove();
        }
      }
    },;
    
    // 点击背景关闭
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    },;
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
    },);
    
    // 设置背景色
    if (type === 'success') {
      toast.style.background = 'linear-gradient(135deg, #4caf50 0%, #689f38 100%)';
    }, else if (type === 'error') {
      toast.style.background = 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)';
    }, else {
      toast.style.background = 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
    },
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    },, 10);
    
    // 自动隐藏
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      },, 300);
    },, 3000);
  }

  function clearAll() {
    topicInput.value = '';
    textareas.forEach(ta => ta.value = '');
    
    const analysisContent = document.getElementById('keywordAnalysisResult');
    if (analysisContent) {
      analysisContent.innerHTML = '<p class="placeholder">点击"开始分析"进行主题分析<br><small>系统将基于案例数据库进行分析，填入API密钥可获得AI深度分析</small></p>';
    },
    
    // 隐藏关键词下载选项
    const keywordDownloadOptions = document.getElementById('keywordDownloadOptions');
    if (keywordDownloadOptions) {
      keywordDownloadOptions.style.display = 'none';
    },
    
    renderPreview();
    switchToPage('analysis');
  }

  function setupPageTabs() {
    const pageTabs = document.querySelectorAll('.page-tab');
    pageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchToPage(tab.dataset.page);
      },);
    },);
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
    analyzeBtn.addEventListener('click', analyzeWithAI);
  }
  
  if (downloadGridBtn) {
    downloadGridBtn.addEventListener('click', downloadGridPNG);
  }
  
  // 等待DOM完全加载后绑定事件
  document.addEventListener('DOMContentLoaded', function() {
    // 关键词分析下载按钮事件
    const downloadKeywordFullBtn = document.getElementById('downloadKeywordFullBtn');
    const downloadKeywordCardsBtn = document.getElementById('downloadKeywordCardsBtn');
    const downloadKeywordAllBtn = document.getElementById('downloadKeywordAllBtn');
    
    // 九宫格下载按钮事件
    const downloadGridFullBtn = document.getElementById('downloadGridFullBtn');
    const downloadGridCardsBtn = document.getElementById('downloadGridCardsBtn');
    const downloadGridAllBtn = document.getElementById('downloadGridAllBtn');
    
    if (downloadKeywordFullBtn) {
      downloadKeywordFullBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('点击了完整关键词分析下载');
        downloadKeywordPNG();
      },);
    },
    
    if (downloadKeywordCardsBtn) {
      downloadKeywordCardsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('点击了单张关键词卡片下载');
        downloadKeywordCards();
      },);
    },
    
    if (downloadKeywordAllBtn) {
      downloadKeywordAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('点击了批量关键词下载');
        downloadKeywordPNG('all');
      },);
    },
    
    if (downloadGridFullBtn) {
      downloadGridFullBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('点击了完整九宫格下载');
        downloadGridPNG();
      },);
    },
    
    if (downloadGridCardsBtn) {
      downloadGridCardsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('点击了单张九宫格卡片下载');
        downloadGridCards();
      },);
    },
    
    if (downloadGridAllBtn) {
      downloadGridAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('点击了批量九宫格下载');
        downloadGridPNG('all');
      },);
    }
  });

  // 使用事件委托作为备用方案
  document.addEventListener('click', (e) => {
    const target = e.target;
    
    // 关键词分析下载按钮
    if (target.id === 'downloadKeywordFullBtn' || target.closest('#downloadKeywordFullBtn')) {
      e.preventDefault();
      console.log('事件委托：点击了完整关键词分析下载');
      downloadKeywordPNG();
    }, else if (target.id === 'downloadKeywordCardsBtn' || target.closest('#downloadKeywordCardsBtn')) {
      e.preventDefault();
      console.log('事件委托：点击了单张关键词卡片下载');
      downloadKeywordCards();
    }, else if (target.id === 'downloadKeywordAllBtn' || target.closest('#downloadKeywordAllBtn')) {
      e.preventDefault();
      console.log('事件委托：点击了批量关键词下载');
      downloadKeywordPNG('all');
    },
    // 九宫格下载按钮
    else if (target.id === 'downloadGridFullBtn' || target.closest('#downloadGridFullBtn')) {
      e.preventDefault();
      console.log('事件委托：点击了完整九宫格下载');
      downloadGridPNG();
    }, else if (target.id === 'downloadGridCardsBtn' || target.closest('#downloadGridCardsBtn')) {
      e.preventDefault();
      console.log('事件委托：点击了单张九宫格卡片下载');
      downloadGridCards();
    }, else if (target.id === 'downloadGridAllBtn' || target.closest('#downloadGridAllBtn')) {
      e.preventDefault();
      console.log('事件委托：点击了批量九宫格下载');
      downloadGridPNG('all');
    }
  });
  
  // 新增专门的卡片选择下载函数
  async function downloadGridCards() {
    const topic = topicInput.value.trim() || '未命名主题';
    
    // 提取九宫格数据
    const gridData = {};
    keys.forEach(key => {
      const textarea = document.querySelector(`textarea[data-key="${key}"]`);
      if (textarea && textarea.value.trim()) {
        const suggestions = textarea.value.split('\n').filter(line => line.trim());
        gridData[key] = suggestions;
      }
    },);
    
    if (Object.keys(gridData).length === 0) {
      showToast('请先进行分析或填写内容', 'error');
      return;
    },
    
    // 显示卡片选择界面
    showCardSelectionModal(gridData, topic, 'grid');
  }
  
  // 新增专门的关键词卡片选择下载函数
  async function downloadKeywordCards() {
    const topic = topicInput.value.trim() || '未命名主题';
    
    const analysisResult = document.querySelector('#keywordAnalysisResult .keyword-result');
    if (!analysisResult) {
      showToast('请先进行分析再下载', 'error');
      return;
    },
    
    // 提取关键词分析数据
    const keywordData = extractKeywordData(analysisResult);
    
    if (Object.keys(keywordData).length === 0) {
      showToast('没有找到分析数据', 'error');
      return;
    },
    
    // 显示卡片选择界面
    showCardSelectionModal(keywordData, topic, 'keyword');
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }
})();
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }