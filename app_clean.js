// 奥斯本创新九问工具 - 主要逻辑文件

// 奥斯本检核表法案例数据库
const osbornCaseDatabase = {
    ta: { // 他用
        title: "他用",
        description: "探索其他用途和应用场景",
        cases: [
            "花生300种用途：从食品到工业原料的全面应用",
            "X射线技术迁移：从医疗诊断扩展到安检和材料检测",
            "GPS技术民用：从军事导航到日常生活导航",
            "激光技术多元化：从科研工具到医疗、工业、娱乐应用",
            "超声波技术扩展：从医疗检查到清洁、焊接、测距",
            "红外线技术应用：从军事侦察到体温检测、遥控器",
            "磁悬浮技术转移：从实验室到高速列车、轴承应用",
            "纳米技术产业化：从材料科学到化妆品、医药、电子",
            "3D打印技术普及：从原型制作到建筑、医疗、食品",
            "区块链技术扩展：从数字货币到供应链、版权保护"
        ]
    },
    jie: { // 借用
        title: "借用",
        description: "借鉴其他领域的做法和原理",
        cases: [
            "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",
            "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",
            "3D食品打印机：将3D打印技术借鉴到食品加工领域",
            "仿生学设计：借鉴动植物结构设计飞机、建筑、材料",
            "游戏化教育：将游戏机制借用到教育培训中",
            "军用技术民用：将雷达、卫星技术借用到民用领域",
            "医疗器械工业化：将精密医疗技术借用到制造业",
            "自然界启发设计：借鉴蜂巢结构设计建筑材料",
            "体育科学商业化：将运动训练方法借用到企业管理",
            "艺术技法工业应用：将绘画技术借用到产品设计"
        ]
    },
    gai: { // 改变
        title: "改变",
        description: "改变形态、流程、规则或属性",
        cases: [
            "福特汽车颜色变化：从单一黑色到多彩选择",
            "平面镜变哈哈镜：改变镜面形状创造娱乐效果",
            "传统教育在线化：改变教学形式和互动方式",
            "纸质媒体数字化：改变信息传播载体和形式",
            "现金支付电子化：改变交易方式和支付流程",
            "实体店铺虚拟化：改变购物环境和体验方式",
            "线性生产柔性化：改变制造流程和组织方式",
            "固定办公远程化：改变工作地点和协作模式",
            "标准产品定制化：改变生产模式和用户体验",
            "单向传播互动化：改变媒体形态和用户参与"
        ]
    },
    kuo: { // 扩大
        title: "扩大",
        description: "扩大规模、功能、影响范围",
        cases: [
            "药物牙膏：在普通牙膏基础上增加药物功能",
            "防弹玻璃创新：扩大玻璃的防护功能和应用范围",
            "智能手机功能扩展：从通讯工具到生活助手",
            "电商平台生态化：从购物网站到综合服务平台",
            "社交媒体多元化：从交流工具到商业营销平台",
            "搜索引擎智能化：从信息检索到知识服务",
            "云计算服务化：从存储工具到计算平台",
            "移动支付生态化：从支付工具到金融服务",
            "在线教育平台化：从课程提供到教育生态",
            "共享经济规模化：从单一服务到多元共享"
        ]
    },
    suo: { // 缩小
        title: "缩小",
        description: "简化、专注核心功能、便携化",
        cases: [
            "袖珍收音机：将大型收音机微型化便携化",
            "微型医疗器械：缩小医疗设备体积提高便携性",
            "迷你电脑：将台式机功能压缩到小型设备",
            "便携式投影仪：缩小传统投影设备体积",
            "折叠自行车：缩小存储空间提高便携性",
            "胶囊咖啡机：简化咖啡制作流程和设备体积",
            "即时通讯简化：从复杂通讯到简单消息传递",
            "快餐标准化：简化餐饮制作和服务流程",
            "一键操作设计：简化复杂功能到单一操作",
            "专业工具家用化：缩小专业设备到家用规模"
        ]
    },
    ti: { // 替代
        title: "替代",
        description: "替代材料、方法、技术或流程",
        cases: [
            "纸质铅笔：用纸卷替代木材制作铅笔外壳",
            "植物基人造肉：用植物蛋白替代动物蛋白",
            "电子书替代纸书：用数字媒体替代纸质载体",
            "LED替代白炽灯：用半导体照明替代传统照明",
            "电动车替代燃油车：用电力驱动替代燃油驱动",
            "视频会议替代出差：用远程技术替代面对面会议",
            "机器人替代人工：用自动化替代人工操作",
            "云存储替代本地存储：用网络存储替代物理存储",
            "移动支付替代现金：用电子支付替代纸币交易",
            "人工智能替代传统算法：用深度学习替代规则系统"
        ]
    },
    tiao: { // 调整
        title: "调整",
        description: "调整顺序、结构、流程或时间",
        cases: [
            "飞机螺旋桨位置调整：改变螺旋桨安装位置提高效率",
            "生产线重组：调整生产流程顺序提高效率",
            "网站布局优化：调整页面元素位置改善用户体验",
            "工作流程再造：重新安排工作步骤提高效率",
            "供应链优化：调整供应商顺序和配送路径",
            "课程安排调整：重新安排教学内容和时间分配",
            "团队结构重组：调整人员配置和职责分工",
            "产品功能排序：调整功能优先级和展示顺序",
            "服务流程优化：重新设计客户服务步骤",
            "数据处理管道：调整数据处理的顺序和方法"
        ]
    },
    dao: { // 颠倒
        title: "颠倒",
        description: "颠倒关系、反转思维、逆向操作",
        cases: [
            "电动机发明：颠倒发电机原理创造电动机",
            "反向拍卖模式：买家出价卖家竞争的颠倒模式",
            "逆向物流：从消费者到生产者的反向供应链",
            "反向学习：从结果推导过程的教学方法",
            "逆向工程：从产品分析设计和制造过程",
            "反向营销：让客户主动寻找产品的营销策略",
            "颠倒课堂：学生在家学习在校讨论的教学模式",
            "反向创新：从新兴市场向发达市场的创新扩散",
            "逆向思维设计：从用户需求反推产品功能",
            "反向供应链：从废品回收到资源再利用"
        ]
    },
    he: { // 合并
        title: "合并",
        description: "合并、组合、联动、集成",
        cases: [
            "带橡皮铅笔：将铅笔和橡皮合并为一体",
            "智能手机集成：将电话、相机、电脑等功能合并",
            "一体化办公软件：将文档、表格、演示合并",
            "智能家居系统：将各种家电设备联网集成",
            "移动支付生态：将支付、理财、生活服务合并",
            "云办公平台：将通讯、协作、存储功能集成",
            "智能汽车系统：将导航、娱乐、通讯功能合并"
        ]
    }
};

// 行业专业模板
const industryTemplates = {
    "科技产品": {
        coreFunction: "通过技术创新解决用户痛点，提升效率和体验",
        keyAttributes: ["创新性", "易用性", "可靠性", "扩展性", "安全性"],
        currentForm: "软件应用、硬件设备、平台服务、技术解决方案",
        targetUsers: "个人用户、企业客户、开发者、技术爱好者",
        usageScenarios: ["日常使用", "工作协作", "娱乐休闲", "学习提升", "问题解决"],
        valueChain: "技术生态系统的重要组成部分，连接用户需求与技术实现",
        marketTrends: "人工智能化、云端化、移动化、个性化发展趋势",
        competitiveAdvantage: "技术领先性、用户体验优势、生态系统完整性",
        riskFactors: "技术更新风险、市场竞争激烈、用户需求变化",
        constraints: "技术实现难度、开发成本、法规限制、兼容性要求"
    },
    "教育培训": {
        coreFunction: "通过知识传授和能力培养，促进个人和社会发展",
        keyAttributes: ["专业性", "系统性", "实用性", "互动性", "个性化"],
        currentForm: "线上课程、线下培训、混合式教学、自学材料",
        targetUsers: "学生群体、职场人士、教育机构、企业培训部门",
        usageScenarios: ["学历教育", "职业培训", "兴趣学习", "技能提升", "考试备考"],
        valueChain: "教育产业链的核心环节，连接知识创造与人才培养",
        marketTrends: "在线化、个性化、终身学习、技能导向发展",
        competitiveAdvantage: "师资力量、课程质量、教学方法、品牌声誉",
        riskFactors: "教育政策变化、技术冲击、市场饱和、质量控制",
        constraints: "教育资源限制、认证要求、成本控制、效果评估"
    },
    "医疗健康": {
        coreFunction: "通过医疗服务和健康管理，维护和改善人类健康",
        keyAttributes: ["专业性", "安全性", "有效性", "可及性", "人文关怀"],
        currentForm: "医院诊疗、社区医疗、远程医疗、健康管理、医疗器械",
        targetUsers: "患者群体、医护人员、医疗机构、健康管理者",
        usageScenarios: ["疾病诊治", "预防保健", "康复护理", "健康监测", "急救处理"],
        valueChain: "医疗健康生态系统的关键节点，连接医疗资源与健康需求",
        marketTrends: "数字化医疗、精准医学、预防医学、智能诊断发展",
        competitiveAdvantage: "医疗技术、服务质量、专家资源、设备先进性",
        riskFactors: "医疗风险、政策监管、技术更新、成本上升",
        constraints: "监管要求严格、技术门槛高、投入成本大、伦理考量"
    },
    "金融服务": {
        coreFunction: "通过资金融通和风险管理服务，促进经济活动和财富增值",
        keyAttributes: ["安全性", "流动性", "收益性", "便捷性", "合规性"],
        currentForm: "银行服务、支付工具、投资产品、保险保障、金融科技平台",
        targetUsers: "个人客户、企业客户、机构投资者、金融从业者、监管机构",
        usageScenarios: ["日常支付", "资产配置", "风险保障", "融资需求", "财富管理"],
        valueChain: "金融生态系统的核心枢纽，连接资金供需双方",
        marketTrends: "数字化转型、普惠金融、绿色金融、开放银行发展",
        competitiveAdvantage: "风控能力、技术创新、客户资源、品牌信誉",
        riskFactors: "市场风险、信用风险、操作风险、合规风险",
        constraints: "监管政策严格、资本要求高、技术投入大、竞争激烈"
    },
    "电商零售": {
        coreFunction: "通过商品流通和服务提供，满足消费者多样化需求",
        keyAttributes: ["便利性", "多样性", "性价比", "服务质量", "用户体验"],
        currentForm: "线上商城、线下门店、移动电商、社交电商、直播带货",
        targetUsers: "消费者群体、商家卖家、平台运营者、供应链伙伴",
        usageScenarios: ["日常购物", "特殊需求", "比价选择", "社交分享", "售后服务"],
        valueChain: "零售生态系统的重要环节，连接生产与消费",
        marketTrends: "全渠道融合、个性化推荐、社交化购物、可持续发展",
        competitiveAdvantage: "供应链效率、用户规模、技术能力、品牌影响力",
        riskFactors: "市场竞争、库存风险、物流成本、消费变化",
        constraints: "成本压力、监管要求、技术投入、用户获取成本"
    }
};

// 智能行业匹配函数
function matchIndustryTemplate(topic) {
    const topicLower = topic.toLowerCase();
    
    // 科技产品关键词
    if (topicLower.includes('智能') || topicLower.includes('AI') || topicLower.includes('软件') || 
        topicLower.includes('应用') || topicLower.includes('系统') || topicLower.includes('平台') ||
        topicLower.includes('技术') || topicLower.includes('数字') || topicLower.includes('互联网')) {
        return industryTemplates["科技产品"];
    }
    
    // 教育培训关键词
    if (topicLower.includes('教育') || topicLower.includes('培训') || topicLower.includes('学习') || 
        topicLower.includes('课程') || topicLower.includes('教学') || topicLower.includes('知识') ||
        topicLower.includes('技能') || topicLower.includes('学校') || topicLower.includes('在线学习')) {
        return industryTemplates["教育培训"];
    }
    
    // 医疗健康关键词
    if (topicLower.includes('医疗') || topicLower.includes('健康') || topicLower.includes('医院') || 
        topicLower.includes('诊断') || topicLower.includes('治疗') || topicLower.includes('药物') ||
        topicLower.includes('康复') || topicLower.includes('保健') || topicLower.includes('医生')) {
        return industryTemplates["医疗健康"];
    }
    
    // 金融服务关键词
    if (topicLower.includes('金融') || topicLower.includes('银行') || topicLower.includes('支付') || 
        topicLower.includes('投资') || topicLower.includes('理财') || topicLower.includes('保险') ||
        topicLower.includes('贷款') || topicLower.includes('财富') || topicLower.includes('资金')) {
        return industryTemplates["金融服务"];
    }
    
    // 电商零售关键词
    if (topicLower.includes('电商') || topicLower.includes('购物') || topicLower.includes('零售') || 
        topicLower.includes('商城') || topicLower.includes('店铺') || topicLower.includes('销售') ||
        topicLower.includes('商品') || topicLower.includes('消费') || topicLower.includes('买卖')) {
        return industryTemplates["电商零售"];
    }
    
    // 默认返回科技产品模板
    return industryTemplates["科技产品"];
}

// 本地分析引擎
function analyzeWithDatabase(topic) {
    const template = matchIndustryTemplate(topic);
    
    // 个性化调整模板内容
    const personalizedTemplate = {
        coreFunction: template.coreFunction.replace(/通用/, topic),
        keyAttributes: template.keyAttributes,
        currentForm: template.currentForm,
        targetUsers: template.targetUsers,
        usageScenarios: template.usageScenarios,
        valueChain: template.valueChain,
        marketTrends: template.marketTrends,
        competitiveAdvantage: template.competitiveAdvantage,
        riskFactors: template.riskFactors,
        constraints: template.constraints
    };
    
    return personalizedTemplate;
}

// 从案例数据库生成建议
function generateSuggestionsFromCases(topic, dimension) {
    const cases = osbornCaseDatabase[dimension]?.cases || [];
    const suggestions = [];
    
    // 随机选择3-5个案例并适配到当前主题
    const selectedCases = cases.sort(() => 0.5 - Math.random()).slice(0, Math.min(5, cases.length));
    
    selectedCases.forEach(caseExample => {
        // 提取案例的核心思路并适配到当前主题
        const adaptedSuggestion = adaptCaseToTopic(caseExample, topic, dimension);
        suggestions.push(adaptedSuggestion);
    });
    
    return suggestions;
}

// 案例适配函数
function adaptCaseToTopic(caseExample, topic, dimension) {
    // 根据不同维度和主题特点，将通用案例适配为具体建议
    const adaptationRules = {
        'ta': `探索${topic}在其他领域的应用可能性`,
        'jie': `借鉴其他行业的成功做法应用到${topic}中`,
        'gai': `改变${topic}的现有形态或使用方式`,
        'kuo': `扩大${topic}的功能范围或服务对象`,
        'suo': `简化${topic}的复杂度或专注核心功能`,
        'ti': `寻找可以替代${topic}现有组件的新方案`,
        'tiao': `调整${topic}的流程顺序或结构布局`,
        'dao': `颠倒${topic}的传统使用方式或服务模式`,
        'he': `将${topic}与其他产品或服务进行整合`
    };
    
    return `${adaptationRules[dimension]}：参考${caseExample}的思路`;
}

// 主要的DOM操作和事件处理
(function () {
    const topicInput = document.getElementById('topicInput');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const topicShow = document.getElementById('topicShow');
    const dateShow = document.getElementById('dateShow');
    const downloadKeywordBtn = document.getElementById('downloadKeywordBtn');
    const downloadGridBtn = document.getElementById('downloadGridBtn');
    const clearBtn = document.getElementById('clearBtn');

    // 从localStorage加载API密钥
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey && apiKeyInput) {
        apiKeyInput.value = savedApiKey;
    }

    // 保存API密钥到localStorage
    if (apiKeyInput) {
        apiKeyInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                localStorage.setItem('deepseek_api_key', this.value.trim());
            }
        });
    }

    // 分析按钮事件
    window.startAnalysis = async function() {
        const topic = topicInput?.value?.trim();
        if (!topic) {
            alert('请输入分析主题');
            return;
        }

        // 显示加载状态
        const analyzeBtn = document.querySelector('.analyze-btn');
        const originalText = analyzeBtn?.textContent;
        if (analyzeBtn) {
            analyzeBtn.textContent = '分析中...';
            analyzeBtn.disabled = true;
        }

        try {
            let keywordAnalysis;
            const apiKey = apiKeyInput?.value?.trim();

            // 尝试AI分析，失败则使用本地分析
            if (apiKey) {
                try {
                    keywordAnalysis = await analyzeWithAI(topic, apiKey);
                } catch (error) {
                    console.log('AI分析失败，使用本地分析:', error);
                    keywordAnalysis = analyzeWithDatabase(topic);
                }
            } else {
                keywordAnalysis = analyzeWithDatabase(topic);
            }

            // 显示关键词分析结果
            displayKeywordAnalysis(keywordAnalysis);

            // 生成九宫格建议
            const gridSuggestions = generateGridSuggestions(topic);
            displayGridSuggestions(gridSuggestions);

            // 更新主题显示
            if (topicShow) topicShow.textContent = topic;
            if (dateShow) dateShow.textContent = new Date().toLocaleDateString('zh-CN');

        } catch (error) {
            console.error('分析过程出错:', error);
            alert('分析过程中出现错误，请重试');
        } finally {
            // 恢复按钮状态
            if (analyzeBtn) {
                analyzeBtn.textContent = originalText;
                analyzeBtn.disabled = false;
            }
        }
    };

    // AI分析函数
    async function analyzeWithAI(topic, apiKey) {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, apiKey })
        });

        if (!response.ok) {
            throw new Error('AI分析请求失败');
        }

        return await response.json();
    }

    // 显示关键词分析结果
    function displayKeywordAnalysis(analysis) {
        const dimensions = [
            { key: 'coreFunction', title: '核心功能', icon: '🎯', color: '#FF6B6B' },
            { key: 'keyAttributes', title: '关键属性', icon: '⭐', color: '#4ECDC4' },
            { key: 'currentForm', title: '现有形态', icon: '📦', color: '#45B7D1' },
            { key: 'targetUsers', title: '目标用户', icon: '👥', color: '#96CEB4' },
            { key: 'usageScenarios', title: '使用场景', icon: '🎬', color: '#FFEAA7' },
            { key: 'valueChain', title: '价值链条', icon: '🔗', color: '#DDA0DD' },
            { key: 'marketTrends', title: '市场趋势', icon: '📈', color: '#98D8C8' },
            { key: 'competitiveAdvantage', title: '竞争优势', icon: '🏆', color: '#F7DC6F' },
            { key: 'riskFactors', title: '风险因素', icon: '⚠️', color: '#F1948A' },
            { key: 'constraints', title: '约束限制', icon: '🚧', color: '#BB8FCE' }
        ];

        const keywordGrid = document.getElementById('keywordGrid');
        if (!keywordGrid) return;

        keywordGrid.innerHTML = dimensions.map(dim => {
            const value = analysis[dim.key];
            const displayValue = Array.isArray(value) ? value.join('、') : value;
            
            return `
                <div class="keyword-card" style="border-left: 4px solid ${dim.color}">
                    <div class="keyword-header">
                        <span class="keyword-icon">${dim.icon}</span>
                        <span class="keyword-title">${dim.title}</span>
                    </div>
                    <div class="keyword-content">${displayValue}</div>
                </div>
            `;
        }).join('');
    }

    // 生成九宫格建议
    function generateGridSuggestions(topic) {
        const dimensions = ['ta', 'jie', 'gai', 'kuo', 'suo', 'ti', 'tiao', 'dao', 'he'];
        const suggestions = {};

        dimensions.forEach(dim => {
            suggestions[dim] = generateSuggestionsFromCases(topic, dim);
        });

        return suggestions;
    }

    // 显示九宫格建议
    function displayGridSuggestions(suggestions) {
        const gridContainer = document.getElementById('gridContainer');
        if (!gridContainer) return;

        const dimensionInfo = {
            'ta': { title: '能否他用', color: '#FF6B6B', icon: '🔄' },
            'jie': { title: '能否借用', color: '#4ECDC4', icon: '🤝' },
            'gai': { title: '能否改变', color: '#45B7D1', icon: '🔧' },
            'kuo': { title: '能否扩大', color: '#96CEB4', icon: '📈' },
            'suo': { title: '能否缩小', color: '#FFEAA7', icon: '📉' },
            'ti': { title: '能否替代', color: '#DDA0DD', icon: '🔀' },
            'tiao': { title: '能否调整', color: '#98D8C8', icon: '⚙️' },
            'dao': { title: '能否颠倒', color: '#F7DC6F', icon: '🔃' },
            'he': { title: '能否合并', color: '#F1948A', icon: '🔗' }
        };

        gridContainer.innerHTML = Object.keys(suggestions).map(dim => {
            const info = dimensionInfo[dim];
            const suggestionList = suggestions[dim].map(s => `<li>${s}</li>`).join('');
            
            return `
                <div class="grid-item" style="border-top: 4px solid ${info.color}">
                    <div class="grid-header">
                        <span class="grid-icon">${info.icon}</span>
                        <span class="grid-title">${info.title}</span>
                    </div>
                    <div class="grid-content">
                        <ul>${suggestionList}</ul>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 下载功能
    window.downloadKeywordAnalysis = function() {
        const element = document.getElementById('keywordAnalysis');
        if (!element) return;

        html2canvas(element, {
            backgroundColor: '#0d1421',
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `关键词分析_${topicShow?.textContent || '未命名'}_${new Date().toLocaleDateString('zh-CN')}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    window.downloadGridAnalysis = function() {
        const element = document.getElementById('gridAnalysis');
        if (!element) return;

        html2canvas(element, {
            backgroundColor: '#0d1421',
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `九宫格分析_${topicShow?.textContent || '未命名'}_${new Date().toLocaleDateString('zh-CN')}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    // 清空功能
    window.clearAll = function() {
        if (confirm('确定要清空所有内容吗？')) {
            if (topicInput) topicInput.value = '';
            const keywordGrid = document.getElementById('keywordGrid');
            const gridContainer = document.getElementById('gridContainer');
            if (keywordGrid) keywordGrid.innerHTML = '';
            if (gridContainer) gridContainer.innerHTML = '';
            if (topicShow) topicShow.textContent = '';
            if (dateShow) dateShow.textContent = '';
        }
    };

    // 页面切换功能
    window.showKeywordAnalysis = function() {
        document.getElementById('keywordAnalysis')?.classList.add('active');
        document.getElementById('gridAnalysis')?.classList.remove('active');
        document.querySelector('[onclick="showKeywordAnalysis()"]')?.classList.add('active');
        document.querySelector('[onclick="showGridAnalysis()"]')?.classList.remove('active');
    };

    window.showGridAnalysis = function() {
        document.getElementById('gridAnalysis')?.classList.add('active');
        document.getElementById('keywordAnalysis')?.classList.remove('active');
        document.querySelector('[onclick="showGridAnalysis()"]')?.classList.add('active');
        document.querySelector('[onclick="showKeywordAnalysis()"]')?.classList.remove('active');
    };

})();