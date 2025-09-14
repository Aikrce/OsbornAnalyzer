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
            "智能汽车系统：将导航、娱乐、通讯功能合并",
            "多功能工具：将多种工具功能集成到一个产品中",
            "综合服务平台：将不同服务整合到统一平台",
            "跨界产品融合：将不同行业的产品特性进行合并"
        ]
    }
};

// 增强的行业专业模板
const industryTemplates = {
    "科技产品": {
        coreFunction: "通过先进技术解决特定用户痛点，提供智能化、高效化的解决方案",
        keyAttributes: ["技术创新性", "用户体验优化", "系统稳定性", "扩展灵活性", "数据安全性"],
        currentForm: "SaaS平台、移动应用、智能硬件、云端服务、技术解决方案",
        targetUsers: "企业决策者、技术开发者、终端用户、行业专家、投资机构",
        usageScenarios: ["日常工作场景", "紧急问题处理", "团队协作沟通", "个人效率提升", "数据分析决策"],
        valueChain: "技术研发->产品设计->市场推广->用户服务->生态建设",
        marketTrends: "AI驱动、云端优先、移动化、个性化定制、生态整合",
        competitiveAdvantage: "技术专利壁垒、品牌影响力、用户规模效应、生态系统完整性",
        riskFactors: "技术迭代风险、市场竞争加剧、用户需求变化、法规政策调整",
        constraints: "研发投入成本、技术人才稀缺、数据隐私合规、跨平台兼容性"
    },
    "教育服务": {
        coreFunction: "通过系统化教学方法提升学习效果，培养专业技能和综合素质",
        keyAttributes: ["教学内容质量", "互动体验设计", "个性化适配", "学习效果评估", "师资力量"],
        currentForm: "在线课程平台、教育APP、智能学习设备、培训服务、内容资源",
        targetUsers: "学生群体、在职人士、教育机构、企业培训部门、终身学习者",
        usageScenarios: ["课堂学习", "课后复习", "技能提升", "考试备考", "兴趣培养"],
        valueChain: "内容创作->平台运营->教学服务->效果评估->持续优化",
        marketTrends: "在线化、个性化、游戏化、社交化、终身学习",
        competitiveAdvantage: "优质内容资源、名师团队、技术平台优势、品牌口碑",
        riskFactors: "政策监管变化、内容同质化、用户流失率高、技术更新要求",
        constraints: "师资成本高昂、内容更新压力、用户体验要求高、效果评估难度"
    },
    "健康医疗": {
        coreFunction: "通过数字化技术和专业医疗资源整合，提供高效、精准、便捷的健康医疗服务，提升诊疗效率和患者体验",
        keyAttributes: ["医疗专业认证", "数据安全合规", "实时响应能力", "多学科协作", "用户隐私保护"],
        currentForm: "智能医疗APP、可穿戴健康设备、远程问诊平台、健康管理系统、医疗大数据平台",
        targetUsers: "慢性病患者、亚健康人群、医疗机构、医生专家、健康管理机构、保险公司",
        usageScenarios: ["日常健康指标监测与管理", "专科疾病在线咨询与诊断", "术后康复远程指导", "健康风险评估与预防", "紧急医疗求助与响应"],
        valueChain: "医疗资源整合->技术服务开发->用户服务交付->保险支付对接->健康数据管理",
        marketTrends: "AI辅助诊断、远程医疗普及、个性化健康管理、预防医学优先、医疗数据价值化",
        competitiveAdvantage: "三甲医院合作资源、AI算法准确率95%+、7×24小时服务、医保对接完备",
        riskFactors: "医疗事故责任界定、数据泄露风险、政策监管变化、专业人才流失",
        constraints: "医疗资质认证复杂、用户信任建立周期长、技术研发投入大、跨区域服务合规要求"
    },
    "金融服务": {
        coreFunction: "通过金融科技手段提供安全、高效、智能的金融服务解决方案，降低金融门槛提升服务效率",
        keyAttributes: ["资金安全保障", "交易实时性", "风险控制能力", "用户体验优化", "合规风控体系"],
        currentForm: "移动支付APP、智能投顾平台、在线借贷服务、数字货币钱包、金融数据分析工具",
        targetUsers: "个人投资者、小微企业主、金融机构、理财顾问、跨境交易用户",
        usageScenarios: ["移动端实时转账与支付", "智能投资组合管理与优化", "小微企业快速融资", "跨境汇款与结算", "金融数据实时分析与决策"],
        valueChain: "资金募集->风险定价->产品设计->渠道分发->客户服务->风险管控",
        marketTrends: "开放银行、嵌入式金融、DeFi去中心化、绿色金融、跨境支付创新",
        competitiveAdvantage: "银行级安全防护、毫秒级交易处理、智能风控模型、全球牌照布局",
        riskFactors: "系统性金融风险、网络安全威胁、监管政策变化、市场流动性风险",
        constraints: "合规成本高昂、技术安全要求极高、用户信任建立困难、市场竞争激烈"
    },
    "零售电商": {
        coreFunction: "构建数字化零售生态系统，通过技术创新提升商品流通效率，优化消费者购物体验",
        keyAttributes: ["供应链效率", "价格竞争力", "用户体验设计", "数据驱动运营", "物流配送能力"],
        currentForm: "电商平台、社交电商APP、新零售门店、直播带货、供应链管理系统",
        targetUsers: "终端消费者、品牌商家、小微店主、内容创作者、物流服务商",
        usageScenarios: ["移动端随时随地购物", "直播实时互动购买", "线下体验线上下单", "社交分享裂变获客", "智能推荐个性化购物"],
        valueChain: "商品采购->仓储管理->平台运营->营销推广->订单履约->售后服务",
        marketTrends: "直播电商、社交电商、即时零售、AR试穿试妆、可持续消费",
        competitiveAdvantage: "强大供应链网络、AI推荐算法、物流配送体系、用户数据积累",
        riskFactors: "假冒伪劣商品风险、用户数据隐私泄露、物流配送延误、市场竞争白热化",
        constraints: "库存管理复杂度高、获客成本持续上升、用户体验要求极高、退货率控制难度大"
    }
};

// 智能行业匹配函数（增强版）
function matchIndustryTemplate(topic) {
    const topicLower = topic.toLowerCase();
    
    // 行业关键词匹配
    const industryKeywords = {
        '科技产品': ['app', '软件', '平台', '系统', '智能', 'ai', '人工智能', '云计算', '大数据', '物联网', '算法', '开发', '技术', '数字', 'saaS', 'api', '代码', '编程', '数字化'],
        '教育服务': ['教育', '学习', '培训', '课程', '学校', '老师', '学生', '知识', '技能', '考试', '教学', '在线教育', '培训', '学位', '学历', '课堂', '教材', '辅导'],
        '健康医疗': ['健康', '医疗', '医生', '医院', '健身', '运动', '养生', '保健', '诊断', '治疗', '康复', '医疗', '健康管理', '药品', '疫苗', '中医', '西医', '体检'],
        '金融服务': ['金融', '银行', '投资', '理财', '保险', '证券', '股票', '基金', '支付', '贷款', '信贷', '货币', '比特币', '区块链', '风控', '财富', '资产'],
        '零售电商': ['零售', '电商', '购物', '消费', '商品', '产品', '品牌', '营销', '销售', '推广', '广告', '促销', '价格', '供应链', '物流', '仓储', '配送']
    };
    
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
        if (keywords.some(keyword => topicLower.includes(keyword))) {
            return industryTemplates[industry];
        }
    }
    
    // 默认返回通用模板
    return {
        coreFunction: `通过创新解决方案解决${topic}领域的核心问题，提供独特价值主张`,
        keyAttributes: ["技术创新性", "用户体验优化", "商业可行性", "市场适应性", "可持续发展"],
        currentForm: "综合性解决方案平台，整合技术、服务、内容等多维度要素",
        targetUsers: "行业从业者、终端用户、合作伙伴、投资者、监管机构",
        usageScenarios: ["日常工作场景应用", "特殊需求场景解决", "紧急情况处理", "长期价值创造", "生态协同合作"],
        valueChain: "需求发现->方案设计->技术实现->市场推广->价值交付->持续优化",
        marketTrends: "数字化转型、用户体验优先、生态协同、可持续发展、智能化升级",
        competitiveAdvantage: "综合解决方案能力、快速迭代响应、用户深度洞察、生态合作伙伴网络",
        riskFactors: "技术迭代风险、市场竞争加剧、用户需求变化、政策环境调整",
        constraints: "资源投入限制、技术实现复杂度、市场接受度、合规要求挑战"
    };
}

// 智能行业匹配函数（兼容旧版本）
function matchIndustryTemplateEnhanced(topic) {
    return matchIndustryTemplate(topic);
}

// 本地案例库管理
const localCaseManager = {
    // 获取本地保存的案例
    getLocalCases() {
        try {
            const cases = localStorage.getItem('osborn_local_cases');
            return cases ? JSON.parse(cases) : {};
        } catch (error) {
            console.error('读取本地案例失败:', error);
            return {};
        }
    },

    // 保存案例到本地
    saveCase(topic, keywordAnalysis, nineDimensions, quality = 'high') {
        try {
            const cases = this.getLocalCases();
            const caseKey = topic.toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '_');
            
            // 评估案例质量
            const caseQuality = this.evaluateCaseQuality(keywordAnalysis, nineDimensions, quality);
            
            cases[caseKey] = {
                topic,
                keywordAnalysis,
                nineDimensions,
                createdAt: new Date().toISOString(),
                quality: caseQuality, // 质量等级：high, medium, low
                score: this.calculateCaseScore(keywordAnalysis, nineDimensions) // 质量评分
            };
            
            localStorage.setItem('osborn_local_cases', JSON.stringify(cases));
            console.log(`案例已保存到本地: ${topic} (质量: ${caseQuality})`);
            return true;
        } catch (error) {
            console.error('保存案例失败:', error);
            return false;
        }
    },

    // 评估案例质量
    evaluateCaseQuality(keywordAnalysis, nineDimensions, initialQuality) {
        let score = 0;
        
        // 评估关键词分析的深度
        if (keywordAnalysis.coreFunction && keywordAnalysis.coreFunction.length > 50) score += 20;
        if (keywordAnalysis.keyAttributes && keywordAnalysis.keyAttributes.length >= 3) score += 15;
        if (keywordAnalysis.valueChain && keywordAnalysis.valueChain.length > 50) score += 15;
        if (keywordAnalysis.constraints && keywordAnalysis.constraints.length >= 2) score += 10;
        
        // 评估九宫格的创新性
        if (nineDimensions) {
            const dimensions = ['ta', 'jie', 'gai', 'kuo', 'suo', 'ti', 'tiao', 'dao', 'he'];
            dimensions.forEach(dim => {
                if (nineDimensions[dim] && nineDimensions[dim].length >= 3) {
                    score += 5;
                    // 检查是否有具体性（避免过于简短）
                    const hasSpecific = nineDimensions[dim].some(item => item.length > 15);
                    if (hasSpecific) score += 2;
                }
            });
        }
        
        // 根据得分确定质量等级
        if (score >= 80) return 'high';
        if (score >= 60) return 'medium';
        return 'low';
    },

    // 计算案例质量评分
    calculateCaseScore(keywordAnalysis, nineDimensions) {
        let score = 0;
        
        // 关键词分析评分（40分）
        if (keywordAnalysis.coreFunction && keywordAnalysis.coreFunction.length > 50) score += 10;
        if (keywordAnalysis.keyAttributes && keywordAnalysis.keyAttributes.length >= 3) score += 8;
        if (keywordAnalysis.currentForm && keywordAnalysis.currentForm.length > 50) score += 8;
        if (keywordAnalysis.targetUsers && keywordAnalysis.targetUsers.length > 50) score += 8;
        if (keywordAnalysis.valueChain && keywordAnalysis.valueChain.length > 50) score += 6;
        
        // 九宫格评分（60分）
        if (nineDimensions) {
            const dimensions = ['ta', 'jie', 'gai', 'kuo', 'suo', 'ti', 'tiao', 'dao', 'he'];
            dimensions.forEach(dim => {
                if (nineDimensions[dim] && nineDimensions[dim].length >= 3) {
                    score += 5; // 基础分
                    // 质量加分
                    const avgLength = nineDimensions[dim].reduce((sum, item) => sum + item.length, 0) / nineDimensions[dim].length;
                    if (avgLength > 20) score += 1.67; // 平均长度足够
                }
            });
        }
        
        return Math.round(score);
    },

    // 根据主题查找相似案例（增强版）
    findSimilarCases(topic, options = {}) {
        const cases = this.getLocalCases();
        const topicLower = topic.toLowerCase();
        const similarCases = [];
        const {
            minSimilarity = 0.3,
            maxResults = 10,
            qualityFilter = null, // 'high', 'medium', 'low' 或 null(不限)
            useSemanticSearch = true
        } = options;
        
        Object.values(cases).forEach(case_ => {
            // 质量过滤
            if (qualityFilter && case_.quality !== qualityFilter) {
                return;
            }
            
            // 计算主题相似度
            let similarity = this.calculateSimilarity(topicLower, case_.topic.toLowerCase());
            
            // 语义增强：如果主题相似度不够高，尝试内容语义匹配
            if (similarity < 0.5 && useSemanticSearch && case_.keywordAnalysis) {
                const semanticSimilarity = this.calculateSemanticSimilarity(topic, case_);
                // 结合主题相似度和语义相似度
                similarity = Math.max(similarity, semanticSimilarity * 0.7);
            }
            
            if (similarity >= minSimilarity) {
                similarCases.push({
                    ...case_,
                    similarity,
                    matchReason: this.getMatchReason(topic, case_)
                });
            }
        });
        
        // 排序并限制结果数量
        return similarCases
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, maxResults);
    },

    // 计算语义相似度
    calculateSemanticSimilarity(topic, case_) {
        let score = 0;
        const topicWords = this.extractKeywords(topic);
        
        // 从案例中提取关键词
        const caseKeywords = [
            ...this.extractKeywords(case_.topic),
            ...this.extractKeywords(case_.keywordAnalysis.coreFunction || ''),
            ...this.extractKeywords(case_.keywordAnalysis.valueChain || ''),
            ...(case_.keywordAnalysis.keyAttributes || [])
        ];
        
        // 计算关键词重叠度
        const overlap = topicWords.filter(word => 
            caseKeywords.some(caseWord => 
                caseWord.includes(word) || word.includes(caseWord)
            )
        ).length;
        
        score = overlap / Math.max(topicWords.length, 1);
        
        // 如果有高质量案例，适当加分
        if (case_.quality === 'high') score *= 1.2;
        if (case_.score && case_.score > 80) score *= 1.1;
        
        return Math.min(score, 1);
    },

    // 提取关键词
    extractKeywords(text) {
        if (!text) return [];
        
        // 简单的关键词提取
        const words = text.toLowerCase()
            .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length >= 2);
        
        // 去除停用词（简单列表）
        const stopWords = ['的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这', '那', '里', '就是', '还是', '因为', '所以', '但是', '可能', '可以', '需要', '进行', '通过', '作为', '比如', '例如', '使用', '利用', '实现', '完成', '达到', '得到', '产生', '形成', '构成', '组成', '成为', '变成', '变化', '改变', '改进', '改善', '优化', '提升', '提高', '增强', '加强', '扩大', '扩展', '发展', '进步', '前进', '推进', '推动', '促进', '加速', '加快', '增加', '增长', '增多', '减少', '降低', '下降', '缩小', '压缩', '简化', '精简', '删除', '去除', '消除', '避免', '防止', '预防', '保护', '维护', '保持', '维持', '继续', '持续', '坚持', '支持', '帮助', '协助', '辅助', '配合', '合作', '协作', '协调', '统一', '一致', '相同', '类似', '相近', '相关', '联系', '关系', '关联', '连接', '链接', '结合', '整合', '融合', '混合', '合并', '组合', '集合', '集中', '聚集', '聚积', '积累', '积蓄', '储存', '保存', '保留', '剩余', '多余', '超过', '超越', '胜出', '胜利', '成功', '失败', '错误', '失误', '失去', '丢失', '缺失', '缺少', '缺乏', '不足', '不够', '不满', '不足够', '不充分', '不完全', '不完整', '不全面', '不详细', '不具体', '不明确', '不清楚', '不清晰', '不含糊', '不模糊', '不混乱', '不复杂', '不简单', '不容易', '不困难', '不麻烦', '不费力', '不费劲', '不辛苦', '不劳累', '不疲惫', '不疲倦', '不累', '不辛苦', '不艰难', '不艰苦', '不困难', '不难过', '不难受', '不舒服', '不舒适', '不惬意', '不自在', '不自由', '不轻松', '不悠闲', '不忙', '不紧张', '不焦虑', '不担心', '不害怕', '不恐惧', '不惊慌', '不慌张', '不着急', '不急躁', '不烦躁', '不烦恼', '不苦恼', '不痛苦', '不悲伤', '不伤心', '不难过', '不失望', '不绝望', '不沮丧', '不气馁', '不灰心', '不泄气', '不妥协', '不放弃', '不屈服', '不投降', '不服输', '不认输', '不服气', '不甘心', '不情愿', '不愿意', '不喜欢', '不爱', '不爱好', '不感兴趣', '不关心', '不在乎', '不在意', '不重视', '不尊重', '不尊敬', '不敬', '不礼貌', '不文明', '不友好', '不和善', '不亲切', '不热情', '不热心', '不积极', '不主动', '不被动', '不消极', '不怠慢', '不懈怠', '不懒惰', '不懒', '不勤快', '不勤奋', '不努力', '不刻苦', '不认真', '不仔细', '不细心', '不谨慎', '不小心', '不留意', '不注意', '不关注', '不专心', '不专注', '不投入', '不深入', '不深刻', '不透彻', '不全面', '不详细', '不具体', '不细致', '不精密', '不精确', '不准确', '不正确', '不错误', '不对', '不假', '不伪', '不虚假', '不真实', '不实在', '不实际', '不实用', '不实惠', '不经济', '不划算', '不值得', '不应当', '不应该', '不合适', '不适宜', '不适当', '不恰当', '不正好', '不恰好', '不刚好', '不正好', '不巧合', '不偶然', '不突然', '不意', '不料', '不想', '不到', '不认为', '不觉得', '不感觉', '不察觉', '不发觉', '不意识到', '不认识', '不了解', '不理解', '不明白', '不懂', '不知', '不晓', '不道', '不清楚', '不晓得', '不理解', '不了解', '不熟悉', '不熟练', '不精通', '不擅长', '不善于', '不会', '不能', '不可以', '不可', '不行', '不成', '不好', '不佳', '不良', '不善', '不妙', '不妙', '不妙', '不妙'];
        
        return words.filter(word => !stopWords.includes(word));
    },

    // 获取匹配原因
    getMatchReason(query, case_) {
        const reasons = [];
        
        // 主题词匹配
        const queryWords = this.extractKeywords(query);
        const topicWords = this.extractKeywords(case_.topic);
        const commonWords = queryWords.filter(word => 
            topicWords.some(topicWord => 
                topicWord.includes(word) || word.includes(topicWord)
            )
        );
        
        if (commonWords.length > 0) {
            reasons.push(`包含关键词：${commonWords.join('、')}`);
        }
        
        // 行业类别匹配
        if (case_.keywordAnalysis && case_.keywordAnalysis.valueChain) {
            const queryIndustry = this.detectIndustry(query);
            const caseIndustry = this.detectIndustry(case_.keywordAnalysis.valueChain);
            if (queryIndustry === caseIndustry) {
                reasons.push('同一行业领域');
            }
        }
        
        // 质量标记
        if (case_.quality === 'high') {
            reasons.push('高质量案例');
        }
        
        return reasons.length > 0 ? reasons.join('，') : '主题相关';
    },

    // 简单的行业检测
    detectIndustry(text) {
        if (!text) return 'general';
        
        const industryKeywords = {
            'tech': ['科技', '技术', '互联网', '软件', '硬件', '人工智能', 'AI', '大数据', '云计算', '区块链', '物联网', '5G', '算法', '编程', '开发', '数据', '数字化', '智能', '自动化', '机器人', '机器学习', '深度学习', '神经网络'],
            'education': ['教育', '学习', '培训', '学校', '学生', '教师', '课程', '教材', '教学', '知识', '技能', '能力', '考试', '成绩', '学位', '学历', '专业', '学科', '学术', '研究'],
            'healthcare': ['医疗', '健康', '医院', '医生', '病人', '疾病', '治疗', '药物', '药品', '保健', '养生', '康复', '护理', '诊断', '手术', '中医', '西医', '医药', '生物科技', '基因', '疫苗'],
            'finance': ['金融', '银行', '投资', '理财', '保险', '证券', '股票', '基金', '期货', '外汇', '支付', '结算', '信贷', '贷款', '融资', '众筹', 'P2P', '区块链', '数字货币', '比特币'],
            'retail': ['零售', '电商', '购物', '消费', '商品', '产品', '品牌', '营销', '销售', '推广', '广告', '促销', '价格', '成本', '利润', '供应链', '物流', '仓储', '配送', '快递'],
            'entertainment': ['娱乐', '游戏', '电影', '音乐', '体育', '旅游', '休闲', '文化', '艺术', '演出', '赛事', '节目', '视频', '直播', '短视频', '社交', '社区', '内容', '创作', 'IP'],
            'manufacturing': ['制造', '工业', '工厂', '生产', '加工', '设备', '机械', '自动化', '智能', '质量', '标准', '工艺', '技术', '材料', '零部件', '组装', '装配', '测试', '检测'],
            'agriculture': ['农业', '农村', '农民', '种植', '养殖', '畜牧', '渔业', '林业', '粮食', '蔬菜', '水果', '农产品', '食品', '有机', '绿色', '生态', '环保', '可持续发展', '精准扶贫'],
            'realestate': ['房地产', '房产', '房屋', '住宅', '商业', '写字楼', '物业', '开发', '建设', '建筑', '设计', '装修', '装饰', '家居', '家具', '建材', '施工', '工程', '项目'],
            'transportation': ['交通', '运输', '物流', '出行', '汽车', '火车', '飞机', '船舶', '公共交通', '共享', '网约车', '出租车', '自行车', '电动车', '充电桩', '道路', '桥梁', '隧道', '港口', '机场']
        };
        
        const textLower = text.toLowerCase();
        for (const [industry, keywords] of Object.entries(industryKeywords)) {
            if (keywords.some(keyword => textLower.includes(keyword))) {
                return industry;
            }
        }
        
        return 'general';
    },

    // 计算文本相似度（增强实现）
    calculateSimilarity(text1, text2) {
        // 1. 基础预处理
        const preprocess = (text) => {
            return text.toLowerCase()
                .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ') // 保留中文、英文、数字
                .replace(/\s+/g, ' ')
                .trim();
        };
        
        const processed1 = preprocess(text1);
        const processed2 = preprocess(text2);
        
        // 2. 中文分词（简单实现）
        const segment = (text) => {
            const words = [];
            // 简单的中文分词：单字+常见双字词
            for (let i = 0; i < text.length; i++) {
                words.push(text[i]);
                if (i < text.length - 1 && /[\u4e00-\u9fa5]/.test(text[i]) && /[\u4e00-\u9fa5]/.test(text[i+1])) {
                    words.push(text[i] + text[i+1]);
                }
            }
            return words;
        };
        
        const words1 = segment(processed1);
        const words2 = segment(processed2);
        
        // 3. 计算TF-IDF风格的权重
        const calculateTF = (words) => {
            const tf = {};
            words.forEach(word => {
                tf[word] = (tf[word] || 0) + 1;
            });
            const total = words.length;
            Object.keys(tf).forEach(word => {
                tf[word] = tf[word] / total;
            });
            return tf;
        };
        
        const tf1 = calculateTF(words1);
        const tf2 = calculateTF(words2);
        
        // 4. 计算余弦相似度
        const cosineSimilarity = (vec1, vec2) => {
            const allWords = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
            let dotProduct = 0;
            let norm1 = 0;
            let norm2 = 0;
            
            allWords.forEach(word => {
                const v1 = vec1[word] || 0;
                const v2 = vec2[word] || 0;
                dotProduct += v1 * v2;
                norm1 += v1 * v1;
                norm2 += v2 * v2;
            });
            
            if (norm1 === 0 || norm2 === 0) return 0;
            return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
        };
        
        // 5. 计算编辑距离相似度
        const editDistanceSimilarity = (s1, s2) => {
            const longer = s1.length > s2.length ? s1 : s2;
            const shorter = s1.length > s2.length ? s2 : s1;
            
            if (longer.length === 0) return 1.0;
            
            const editDistance = (s1, s2) => {
                const costs = [];
                for (let i = 0; i <= s1.length; i++) {
                    let lastValue = i;
                    for (let j = 0; j <= s2.length; j++) {
                        if (i === 0) costs[j] = j;
                        else {
                            if (j > 0) {
                                let newValue = costs[j - 1];
                                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                                }
                                costs[j - 1] = lastValue;
                                lastValue = newValue;
                            }
                        }
                    }
                    if (i > 0) costs[s2.length] = lastValue;
                }
                return costs[s2.length];
            };
            
            return (longer.length - editDistance(longer, shorter)) / longer.length;
        };
        
        // 6. 综合多种相似度
        const cosSim = cosineSimilarity(tf1, tf2);
        const editSim = editDistanceSimilarity(processed1, processed2);
        
        // 7. 加权综合（余弦相似度权重更高）
        const finalSimilarity = cosSim * 0.7 + editSim * 0.3;
        
        return finalSimilarity;
    },

    // 获取案例统计
    getCaseStats() {
        const cases = this.getLocalCases();
        return {
            total: Object.keys(cases).length,
            highQuality: Object.values(cases).filter(c => c.quality === 'high').length,
            recent: Object.values(cases).filter(c => {
                const daysDiff = (new Date() - new Date(c.createdAt)) / (1000 * 60 * 60 * 24);
                return daysDiff <= 30;
            }).length
        };
    }
};

// 增强的本地分析引擎
function analyzeWithDatabase(topic) {
    console.log('使用增强本地分析引擎分析:', topic);
    
    // 1. 查找相似案例
    const similarCases = localCaseManager.findSimilarCases(topic);
    console.log('找到相似案例:', similarCases.length);
    
    // 2. 基础模板分析
    const template = matchIndustryTemplate(topic);
    
    // 3. 如果有相似案例，融合分析结果
    if (similarCases.length > 0) {
        const bestCase = similarCases[0];
        console.log('使用最佳相似案例:', bestCase.topic);
        
        return {
            coreFunction: adaptAnalysisFromCase(bestCase.keywordAnalysis.coreFunction, topic),
            keyAttributes: mergeAttributes(template.keyAttributes, bestCase.keywordAnalysis.keyAttributes),
            currentForm: adaptAnalysisFromCase(bestCase.keywordAnalysis.currentForm, topic),
            targetUsers: adaptAnalysisFromCase(bestCase.keywordAnalysis.targetUsers, topic),
            usageScenarios: mergeScenarios(template.usageScenarios, bestCase.keywordAnalysis.usageScenarios),
            valueChain: adaptAnalysisFromCase(bestCase.keywordAnalysis.valueChain, topic),
            marketTrends: template.marketTrends,
            competitiveAdvantage: template.competitiveAdvantage,
            riskFactors: template.riskFactors,
            constraints: mergeConstraints(template.constraints, bestCase.keywordAnalysis.constraints)
        };
    }
    
    // 4. 使用基础模板
    return {
        coreFunction: template.coreFunction.replace(/通用|科技产品/, topic),
        keyAttributes: template.keyAttributes.map(attr => attr.replace(/通用/, topic)),
        currentForm: template.currentForm.replace(/通用/, topic),
        targetUsers: template.targetUsers.replace(/通用/, topic),
        usageScenarios: template.usageScenarios,
        valueChain: template.valueChain.replace(/通用/, topic),
        marketTrends: template.marketTrends,
        competitiveAdvantage: template.competitiveAdvantage,
        riskFactors: template.riskFactors,
        constraints: template.constraints
    };
}

// 案例适配函数
function adaptAnalysisFromCase(originalText, newTopic) {
    if (!originalText) return `${newTopic}的相关分析`;
    
    // 简单的文本适配，将原案例中的主题词替换为新主题
    return originalText.replace(/[\u4e00-\u9fa5]+(?=的|是|为|在|与|和|或)/g, newTopic);
}

// 属性合并函数
function mergeAttributes(templateAttrs, caseAttrs) {
    if (!caseAttrs || !Array.isArray(caseAttrs)) return templateAttrs;
    
    const merged = [...templateAttrs];
    caseAttrs.forEach(attr => {
        if (!merged.some(m => m.includes(attr) || attr.includes(m))) {
            merged.push(attr);
        }
    });
    
    return merged.slice(0, 5); // 限制数量
}

// 场景合并函数
function mergeScenarios(templateScenarios, caseScenarios) {
    if (!caseScenarios || !Array.isArray(caseScenarios)) return templateScenarios;
    
    const merged = [...templateScenarios];
    caseScenarios.forEach(scenario => {
        if (!merged.some(m => m.includes(scenario) || scenario.includes(m))) {
            merged.push(scenario);
        }
    });
    
    return merged.slice(0, 4); // 限制数量
}

// 约束合并函数
function mergeConstraints(templateConstraints, caseConstraints) {
    if (!caseConstraints || !Array.isArray(caseConstraints)) return templateConstraints;
    
    const merged = [...templateConstraints];
    caseConstraints.forEach(constraint => {
        if (!merged.some(m => m.includes(constraint) || constraint.includes(m))) {
            merged.push(constraint);
        }
    });
    
    return merged.slice(0, 4); // 限制数量
}

// 从案例数据库生成建议
function generateSuggestionsFromCases(topic, dimension) {
    const cases = osbornCaseDatabase[dimension]?.cases || [];
    const suggestions = [];
    
    const selectedCases = cases.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, cases.length));
    
    selectedCases.forEach(caseExample => {
        const adaptedSuggestion = adaptCaseToTopic(caseExample, topic, dimension);
        suggestions.push(adaptedSuggestion);
    });
    
    return suggestions;
}

// 案例适配函数
function adaptCaseToTopic(caseExample, topic, dimension) {
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

// 增强的本地九维度分析生成函数
function generateLocalNineDimensions(topic) {
    console.log('生成本地九维度分析:', topic);
    
    // 1. 查找相似案例的九维度分析
    const similarCases = localCaseManager.findSimilarCases(topic);
    
    // 2. 基础维度模板
    const baseDimensions = {
        ta: [
            `将${topic}应用到教育培训领域，开发专业课程体系`,
            `${topic}在医疗健康场景的创新应用探索`,
            `${topic}为老年群体提供适老化服务方案`,
            `${topic}在智慧城市建设中的应用潜力`
        ],
        jie: [
            `借鉴游戏化机制，提升${topic}的用户参与度和粘性`,
            `引入人工智能技术，优化${topic}的核心算法和流程`,
            `学习共享经济模式，重构${topic}的商业运营逻辑`,
            `参考订阅制服务，创新${topic}的盈利模式`
        ],
        gai: [
            `将${topic}的交互方式改为语音控制或手势操作`,
            `改变${topic}的材质为环保可持续的新型材料`,
            `将${topic}的服务模式从B2C转向B2B2C`,
            `重新设计${topic}的用户界面，提升易用性`
        ],
        kuo: [
            `扩大${topic}的服务半径，覆盖更广泛的地理区域`,
            `增加${topic}的功能模块，形成完整的产品生态`,
            `延长${topic}的生命周期，提高整体性价比`,
            `拓展${topic}的用户群体，覆盖不同年龄段`
        ],
        suo: [
            `简化${topic}的操作流程，突出最核心的功能价值`,
            `缩小${topic}的体积规格，提高便携性和灵活性`,
            `专注${topic}的单一功能，做到行业内的极致体验`,
            `降低${topic}的使用门槛，让普通用户也能轻松上手`
        ],
        ti: [
            `用数字化虚拟技术替代${topic}的物理实现方式`,
            `寻找${topic}核心组件的低成本高效替代方案`,
            `用自动化智能设备替代${topic}的人工操作环节`,
            `探索${topic}原材料的环保替代品和新工艺`
        ],
        tiao: [
            `调整${topic}的使用时序，优化用户的操作体验`,
            `重新设计${topic}的功能布局，提升界面友好度`,
            `调整${topic}的定价策略，适应不同市场需求`,
            `优化${topic}的供应链流程，提高运营效率`
        ],
        dao: [
            `让用户从${topic}的消费者转变为内容生产者`,
            `将${topic}的付费模式改为免费增值服务`,
            `颠倒${topic}的传统使用场景和应用时间`,
            `反转${topic}的价值流向，创造双向价值交换`
        ],
        he: [
            `将${topic}与社交网络功能深度整合，增强用户互动`,
            `整合${topic}与移动支付系统，形成商业闭环`,
            `结合${topic}与大数据分析，提供智能化建议`,
            `融合${topic}与物联网技术，实现万物互联`
        ]
    };
    
    // 3. 如果有相似案例，融合其分析结果
    if (similarCases.length > 0) {
        const bestCase = similarCases[0];
        console.log('融合相似案例的九维度分析:', bestCase.topic);
        
        Object.keys(baseDimensions).forEach(dimension => {
            if (bestCase.nineDimensions && bestCase.nineDimensions[dimension]) {
                // 将相似案例的建议适配到当前主题
                const adaptedSuggestions = bestCase.nineDimensions[dimension].map(suggestion => 
                    adaptSuggestionToTopic(suggestion, bestCase.topic, topic)
                );
                
                // 合并基础建议和适配建议
                baseDimensions[dimension] = [
                    ...adaptedSuggestions.slice(0, 2), // 取前2个适配建议
                    ...baseDimensions[dimension].slice(0, 2) // 取前2个基础建议
                ];
            }
        });
    }
    
    // 4. 从案例数据库中获取启发
    Object.keys(baseDimensions).forEach(dimension => {
        const caseExamples = osbornCaseDatabase[dimension]?.cases || [];
        if (caseExamples.length > 0) {
            // 随机选择一个案例进行启发
            const randomCase = caseExamples[Math.floor(Math.random() * caseExamples.length)];
            const inspiredSuggestion = `参考"${randomCase}"的思路，为${topic}创造类似的创新突破`;
            baseDimensions[dimension].push(inspiredSuggestion);
        }
    });
    
    return baseDimensions;
}

// 建议适配函数
function adaptSuggestionToTopic(originalSuggestion, originalTopic, newTopic) {
    if (!originalSuggestion) return `为${newTopic}创造创新价值`;
    
    // 替换主题词
    let adapted = originalSuggestion.replace(new RegExp(originalTopic, 'g'), newTopic);
    
    // 如果没有发生替换，则在建议前加上新主题
    if (adapted === originalSuggestion) {
        adapted = `${newTopic}可以${originalSuggestion}`;
    }
    
    return adapted;
}

// 从AI分析结果生成九宫格建议
function generateGridSuggestionsFromAI(topic, nineDimensions) {
    console.log('从AI生成九宫格建议:', topic, nineDimensions);
    
    const dimensionMap = {
        'ta': 't-ta',
        'jie': 't-jie', 
        'gai': 't-gai',
        'kuo': 't-da',
        'suo': 't-xiao',
        'ti': 't-ti',
        'tiao': 't-tiao',
        'dao': 't-dao',
        'he': 't-he'
    };

    Object.entries(dimensionMap).forEach(([dimKey, textareaId]) => {
        const suggestions = nineDimensions[dimKey] || [];
        const textarea = document.getElementById(textareaId);
        console.log(`处理维度 ${dimKey}, 找到元素:`, !!textarea, `建议数量:`, suggestions.length);
        
        if (textarea && suggestions.length > 0) {
            const content = suggestions.slice(0, 3).join('\n');
            textarea.value = content;
            console.log(`已填充 ${dimKey}:`, content);
        }
    });

    // 显示九宫格下载选项
    const gridDownloadOptions = document.querySelectorAll('#downloadGridFullBtn, #downloadGridCardsBtn, #downloadGridAllBtn');
    gridDownloadOptions.forEach(btn => {
        if (btn) btn.style.display = 'inline-flex';
    });

    console.log('九宫格建议生成完成');
}

// 主要的DOM操作和事件处理
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化...');
    
    const topicInput = document.getElementById('topicInput');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const topicShow = document.getElementById('topicShow');
    const dateShow = document.getElementById('dateShow');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const toggleApiKeyBtn = document.getElementById('toggleApiKey');

    console.log('找到的元素:', {
        topicInput: !!topicInput,
        apiKeyInput: !!apiKeyInput,
        analyzeBtn: !!analyzeBtn,
        clearBtn: !!clearBtn
    });

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

    // 绑定分析按钮事件
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', startAnalysis);
        console.log('分析按钮事件已绑定');
    }

    // 绑定清空按钮事件
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAll);
        console.log('清空按钮事件已绑定');
    }

    // 绑定案例库按钮事件
    const caseLibraryBtn = document.getElementById('caseLibraryBtn');
    if (caseLibraryBtn) {
        caseLibraryBtn.addEventListener('click', showCaseLibrary);
        console.log('案例库按钮事件已绑定');
    }

    // 绑定API密钥显示/隐藏切换
    if (toggleApiKeyBtn && apiKeyInput) {
        toggleApiKeyBtn.addEventListener('click', function() {
            const type = apiKeyInput.type === 'password' ? 'text' : 'password';
            apiKeyInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // 绑定页面标签切换事件
    const pageTabs = document.querySelectorAll('.page-tab');
    pageTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPage = this.dataset.page;
            switchPage(targetPage);
        });
    });

    // 初始化九宫格字数统计
    initCharacterCount();

    // 绑定九宫格文本框字数监控
    bindTextareaCharacterCount();

    // 页面切换函数
    function switchPage(targetPage) {
        console.log('切换到页面:', targetPage);
        
        // 更新标签状态
        document.querySelectorAll('.page-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-page="${targetPage}"]`).classList.add('active');

        // 更新页面显示
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`${targetPage}-page`).classList.add('active');
    }

    // 改进的分析函数，增加完善的错误处理和案例保存
    async function startAnalysis() {
        console.log('开始分析...');
        
        const topic = topicInput?.value?.trim();
        if (!topic) {
            showNotification('请输入分析主题', 'error');
            return;
        }

        // 输入验证
        if (topic.length < 2) {
            showNotification('主题长度至少需要2个字符', 'error');
            return;
        }

        if (topic.length > 50) {
            showNotification('主题长度不能超过50个字符', 'error');
            return;
        }

        console.log('分析主题:', topic);

        // 更新显示信息
        updateDisplayInfo(topic);

        // 显示加载状态
        const btnText = analyzeBtn.querySelector('.btn-text');
        const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
        if (btnText && loadingSpinner) {
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'inline';
            analyzeBtn.disabled = true;
        }

        // 创建取消令牌
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            showNotification('分析超时，请检查网络连接', 'error');
            resetAnalysisButton();
        }, 60000); // 60秒超时

        try {
            let analysisResult;
            let isAIAnalysis = false;
            const apiKey = apiKeyInput?.value?.trim();

            // 显示本地案例库统计
            const stats = localCaseManager.getCaseStats();
            console.log('本地案例库统计:', stats);

            // 检查网络连接
            if (!navigator.onLine) {
                throw new Error('网络连接不可用，将使用本地分析');
            }

            // 尝试AI分析，失败则使用本地分析
            if (apiKey && apiKey.length > 10) { // 检查API密钥是否看起来有效
                try {
                    analysisResult = await analyzeWithAI(topic, apiKey, controller.signal);
                    console.log('AI分析成功', analysisResult);
                    isAIAnalysis = true;
                    showNotification('AI深度分析完成', 'success');
                } catch (error) {
                    console.log('AI分析失败，使用本地分析:', error);
                    
                    // 检查是否为API密钥问题
                    if (error.message.includes('authentication') || error.message.includes('invalid') || error.message.includes('401')) {
                        showNotification('API密钥无效，已自动切换到本地分析模式', 'warning');
                    } else {
                        showNotification('AI分析失败，正在使用本地增强分析...', 'warning');
                    }
                    
                    // 使用本地分析作为降级方案
                    analysisResult = {
                        keywordAnalysis: analyzeWithDatabase(topic),
                        nineDimensions: generateLocalNineDimensions(topic)
                    };
                }
            } else {
                console.log('未提供API密钥或密钥无效，使用本地增强分析');
                if (apiKey && apiKey.length <= 10) {
                    showNotification('API密钥格式不正确，已自动使用本地分析模式', 'warning');
                } else {
                    showNotification(`正在使用本地案例库分析（已有${stats.total}个案例）...`, 'info');
                }
                analysisResult = {
                    keywordAnalysis: analyzeWithDatabase(topic),
                    nineDimensions: generateLocalNineDimensions(topic)
                };
            }

            // 清除超时
            clearTimeout(timeoutId);

            // 显示关键词分析结果
            displayKeywordAnalysis(analysisResult.keywordAnalysis);

            // 生成九宫格建议
            generateGridSuggestionsFromAI(topic, analysisResult.nineDimensions);

            // 如果是AI分析结果，保存到本地案例库
            if (isAIAnalysis && analysisResult.keywordAnalysis && analysisResult.nineDimensions) {
                const saved = localCaseManager.saveCase(topic, analysisResult.keywordAnalysis, analysisResult.nineDimensions);
                if (saved) {
                    const newStats = localCaseManager.getCaseStats();
                    showNotification(`分析完成！已保存到本地案例库（共${newStats.total}个案例）`, 'success');
                } else {
                    showNotification('分析完成！（案例保存失败）', 'success');
                }
            } else {
                showNotification('分析完成！', 'success');
            }

        } catch (error) {
            console.error('分析过程出错:', error);
            clearTimeout(timeoutId);
            
            // 在任何情况下都尝试使用本地分析作为最后的降级方案
            try {
                console.log('尝试使用紧急本地分析模式');
                const emergencyResult = {
                    keywordAnalysis: analyzeWithDatabase(topic),
                    nineDimensions: generateLocalNineDimensions(topic)
                };
                
                displayKeywordAnalysis(emergencyResult.keywordAnalysis);
                generateGridSuggestionsFromAI(topic, emergencyResult.nineDimensions);
                updateDisplayInfo(topic);
                
                showNotification('已使用本地紧急分析模式完成分析', 'success');
                return; // 成功后直接返回，不显示错误
            } catch (localError) {
                console.error('本地分析也失败:', localError);
            }
            
            // 只有在本地分析也失败时才显示错误
            let errorMessage = '分析失败，请重试';
            if (error.name === 'AbortError') {
                errorMessage = '分析超时，请检查网络连接';
            } else if (error.message.includes('网络')) {
                errorMessage = '网络连接异常，请稍后重试';
            } else {
                errorMessage = '分析过程出错: ' + error.message;
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            resetAnalysisButton();
        }
    }

    // 重置分析按钮状态
    function resetAnalysisButton() {
        const btnText = analyzeBtn.querySelector('.btn-text');
        const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
        if (btnText && loadingSpinner) {
            btnText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
            analyzeBtn.disabled = false;
        }
    }

    // 显示通知消息
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
        
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    // 获取通知图标
    function getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || '💬';
    }

    // 更新主题显示和日期
    function updateDisplayInfo(topic) {
        if (topicShow) topicShow.textContent = topic;
        if (dateShow) dateShow.textContent = new Date().toLocaleDateString('zh-CN');
    }

    // 改进的AI分析函数
    async function analyzeWithAI(topic, apiKey, signal) {
        console.log('调用AI分析API:', topic);
        
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, apiKey }),
                signal: signal // 支持取消请求
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: AI分析请求失败`);
            }

            const result = await response.json();
            console.log('AI分析结果:', result);
            
            // 验证返回数据结构
            if (!result.keywordAnalysis || !result.nineDimensions) {
                throw new Error('AI分析返回数据格式不正确');
            }
            
            return result;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                throw error;
            }
            
            console.error('AI分析调用失败:', error);
            throw new Error(`AI分析失败: ${error.message}`);
        }
    }

    // 显示关键词分析结果
    function displayKeywordAnalysis(analysis) {
        console.log('显示关键词分析结果:', analysis);
        
        const keywordAnalysisResult = document.getElementById('keywordAnalysisResult');
        if (!keywordAnalysisResult) {
            console.error('找不到keywordAnalysisResult元素');
            return;
        }

        const dimensions = [
            { key: 'coreFunction', title: '核心功能', icon: '🎯' },
            { key: 'keyAttributes', title: '关键属性', icon: '⭐' },
            { key: 'currentForm', title: '现有形态', icon: '📦' },
            { key: 'targetUsers', title: '目标用户', icon: '👥' },
            { key: 'usageScenarios', title: '使用场景', icon: '🎬' },
            { key: 'valueChain', title: '价值链条', icon: '🔗' },
            { key: 'marketTrends', title: '市场趋势', icon: '📈' },
            { key: 'competitiveAdvantage', title: '竞争优势', icon: '🏆' },
            { key: 'riskFactors', title: '风险因素', icon: '⚠️' },
            { key: 'constraints', title: '约束限制', icon: '🚧' }
        ];

        const analysisHTML = dimensions.map(dim => {
            const value = analysis[dim.key];
            const displayValue = Array.isArray(value) ? value.join('、') : value;
            
            return `
                <div class="keyword-item">
                    <h5><span class="icon">${dim.icon}</span>${dim.title}</h5>
                    <p>${displayValue}</p>
                </div>
            `;
        }).join('');

        keywordAnalysisResult.innerHTML = `<div class="analysis-grid">${analysisHTML}</div>`;
        
        // 显示下载选项
        const downloadOptions = document.getElementById('keywordDownloadOptions');
        if (downloadOptions) {
            downloadOptions.style.display = 'flex';
        }

        console.log('关键词分析结果已显示');
    }

    // 生成九宫格建议并填充到文本框
    function generateGridSuggestions(topic) {
        console.log('生成九宫格建议:', topic);
        
        const dimensions = [
            { key: 'ta', id: 't-ta' },
            { key: 'jie', id: 't-jie' },
            { key: 'gai', id: 't-gai' },
            { key: 'kuo', id: 't-da' },
            { key: 'suo', id: 't-xiao' },
            { key: 'ti', id: 't-ti' },
            { key: 'tiao', id: 't-tiao' },
            { key: 'dao', id: 't-dao' },
            { key: 'he', id: 't-he' }
        ];

        dimensions.forEach(dim => {
            const suggestions = generateSuggestionsFromCases(topic, dim.key);
            const textarea = document.getElementById(dim.id);
            console.log(`处理维度 ${dim.key}, 找到元素:`, !!textarea, `建议数量:`, suggestions.length);
            
            if (textarea && suggestions.length > 0) {
                const content = suggestions.slice(0, 3).join('\n');
                textarea.value = content;
                console.log(`已填充 ${dim.key}:`, content);
            }
        });

        // 显示九宫格下载选项
        const gridDownloadOptions = document.querySelectorAll('#downloadGridFullBtn, #downloadGridCardsBtn, #downloadGridAllBtn');
        gridDownloadOptions.forEach(btn => {
            if (btn) btn.style.display = 'inline-flex';
        });

        console.log('九宫格建议生成完成');
    }

    // 动态加载脚本的辅助函数
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 增强的下载功能，支持重试和更好的错误处理
    async function downloadKeywordAnalysis() {
        console.log('开始下载关键词分析');
        
        // 检查是否有分析结果
        const analysisResult = document.getElementById('keywordAnalysisResult');
        if (!analysisResult || analysisResult.innerHTML.includes('placeholder')) {
            showNotification('请先进行主题分析，然后再下载', 'warning');
            return;
        }

        try {
            showNotification('正在准备下载内容...', 'info');
            
            // 确保html2canvas库已加载
            if (typeof html2canvas === 'undefined') {
                console.log('html2canvas未加载，尝试加载...');
                await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
                
                // 等待库加载完成
                await new Promise((resolve, reject) => {
                    let attempts = 0;
                    const checkLibrary = () => {
                        attempts++;
                        if (typeof html2canvas !== 'undefined') {
                            resolve();
                        } else if (attempts > 10) {
                            reject(new Error('html2canvas库加载超时'));
                        } else {
                            setTimeout(checkLibrary, 200);
                        }
                    };
                    checkLibrary();
                });
            }

        } catch (loadError) {
            console.error('库加载失败:', loadError);
            showNotification('依赖库加载失败，请刷新页面重试', 'error');
            return;
        }

        const element = document.getElementById('keywordAnalysisCard');
        if (!element) {
            showNotification('找不到分析内容', 'error');
            return;
        }

        // 重试机制
        const maxRetries = 3;
        let lastError = null;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                showNotification(`正在生成图片 (尝试 ${attempt}/${maxRetries})...`, 'info');
                
                // 克隆元素以避免影响页面显示
                const clone = element.cloneNode(true);
                clone.style.cssText = `
                    position: absolute;
                    left: -9999px;
                    top: -9999px;
                    background: white;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    border: 1px solid #e0e0e0;
                    margin: 20px;
                    border-radius: 8px;
                    width: ${element.offsetWidth}px;
                    z-index: -1;
                `;
                document.body.appendChild(clone);
                
                // 等待渲染
                await new Promise(resolve => setTimeout(resolve, 300));
                
                const canvas = await html2canvas(clone, {
                    backgroundColor: '#ffffff',
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    logging: false,
                    width: clone.offsetWidth,
                    height: clone.offsetHeight + 20, // 额外边距
                    scrollX: 0,
                    scrollY: 0,
                    onclone: (clonedDoc) => {
                        // 确保克隆文档中的样式正确
                        const styles = clonedDoc.createElement('style');
                        styles.textContent = `
                            body { margin: 0; padding: 0; background: white; }
                            * { box-sizing: border-box; }
                        `;
                        clonedDoc.head.appendChild(styles);
                    }
                });
                
                // 清理克隆元素
                document.body.removeChild(clone);
                
                // 创建下载链接
                const link = document.createElement('a');
                const topic = (topicShow?.textContent || '未命名').replace(/[^\w\u4e00-\u9fa5]/g, '_');
                const date = new Date().toISOString().slice(0, 10);
                link.download = `关键词分析_${topic}_${date}.png`;
                
                // 使用高质量的PNG格式
                link.href = canvas.toDataURL('image/png', 0.95);
                
                // 触发下载
                document.body.appendChild(link);
                link.click();
                
                // 延迟移除以确保下载触发
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                }, 100);
                
                showNotification('关键词分析图片下载成功！', 'success');
                return; // 成功则退出
                
            } catch (error) {
                console.error(`下载尝试 ${attempt} 失败:`, error);
                lastError = error;
                
                // 如果不是最后一次尝试，等待一段时间后重试
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                }
            }
        }
        
        // 所有尝试都失败
        console.error('所有下载尝试都失败:', lastError);
        showNotification('下载失败，请稍后重试或尝试其他下载选项', 'error');
        
        // 提供备选方案：文本导出
        try {
            const topic = (topicShow?.textContent || '未命名').replace(/[^\w\u4e00-\u9fa5]/g, '_');
            const date = new Date().toISOString().slice(0, 10);
            const analysisText = extractAnalysisText();
            
            const blob = new Blob([analysisText], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.download = `关键词分析_${topic}_${date}.txt`;
            link.href = URL.createObjectURL(blob);
            link.click();
            
            setTimeout(() => URL.revokeObjectURL(link.href), 100);
            showNotification('已提供文本格式的备选下载', 'info');
            
        } catch (fallbackError) {
            console.error('备选下载也失败:', fallbackError);
        }
    }
    
    // 提取分析文本内容
    function extractAnalysisText() {
        const topic = topicShow?.textContent || '未命名主题';
        const date = new Date().toLocaleDateString('zh-CN');
        const analysisItems = document.querySelectorAll('.keyword-item');
        
        let text = `奥斯本创新九问 - 关键词分析报告\n`;
        text += `分析主题: ${topic}\n`;
        text += `分析日期: ${date}\n`;
        text += '='.repeat(50) + '\n\n';
        
        analysisItems.forEach(item => {
            const title = item.querySelector('h5')?.textContent || '未知';
            const content = item.querySelector('p')?.textContent || '无内容';
            text += `${title}:\n${content}\n\n`;
        });
        
        text += '='.repeat(50) + '\n';
        text += '生成工具: 奥斯本创新九问智能分析工具\n';
        text += '生成时间: ' + new Date().toLocaleString('zh-CN');
        
        return text;
    }

    // 改进的九宫格下载功能
    async function downloadGridAnalysis(type = 'full') {
        console.log('开始下载九宫格分析, 类型:', type);
        
        // 检查并加载必要的库
        if (typeof html2canvas === 'undefined') {
            console.error('html2canvas库未加载，尝试重新加载...');
            await loadScript('https://html2canvas.hertzen.com/dist/html2canvas.min.js');
            if (typeof html2canvas === 'undefined') {
                showNotification('html2canvas库加载失败，请检查网络连接', 'error');
                return;
            }
        }

        const element = document.getElementById('exportArea');
        if (!element) {
            showNotification('找不到九宫格区域', 'error');
            return;
        }

        // 检查是否有内容
        const textareas = element.querySelectorAll('textarea');
        let hasContent = false;
        textareas.forEach(textarea => {
            if (textarea.value.trim()) {
                hasContent = true;
            }
        });

        if (!hasContent) {
            showNotification('请先进行主题分析生成九宫格内容', 'warning');
            return;
        }

        try {
            if (type === 'cards') {
                await downloadGridCards();
            } else if (type === 'all') {
                await downloadGridAll();
            } else {
                await downloadGridFull();
            }
        } catch (error) {
            console.error('下载失败:', error);
            showNotification('下载失败: ' + error.message, 'error');
        }
    }

    // 下载完整九宫格
    async function downloadGridFull() {
        showNotification('正在生成完整九宫格图片...', 'info');
        
        const element = document.getElementById('exportArea');
        
        // 临时调整textarea样式以优化截图
        const textareas = element.querySelectorAll('textarea');
        const originalStyles = [];
        
        textareas.forEach((textarea, index) => {
            originalStyles[index] = textarea.style.cssText;
            textarea.style.cssText += `
                resize: none !important;
                overflow: hidden !important;
                border: 1px solid #ddd !important;
                background: white !important;
                font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
                line-height: 1.4 !important;
            `;
        });
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: false,
            logging: false,
            width: element.offsetWidth,
            height: element.offsetHeight,
            foreignObjectRendering: true
        });
        
        // 恢复原始样式
        textareas.forEach((textarea, index) => {
            textarea.style.cssText = originalStyles[index];
        });
        
        const link = document.createElement('a');
        const topic = (topicShow?.textContent || '未命名').replace(/[^\w\u4e00-\u9fa5]/g, '_');
        const date = new Date().toISOString().slice(0, 10);
        link.download = `九宫格分析_${topic}_${date}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('完整九宫格下载成功！', 'success');
    }

    // 下载单张卡片
    async function downloadGridCards() {
        // 检查并加载JSZip库
        if (typeof JSZip === 'undefined') {
            console.error('JSZip库未加载，尝试重新加载...');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
            if (typeof JSZip === 'undefined') {
                showNotification('JSZip库加载失败，请检查网络连接', 'error');
                return;
            }
        }
        
        showNotification('正在生成单张卡片...', 'info');
        
        const zip = new JSZip();
        const cells = document.querySelectorAll('.export-grid .cell');
        const topic = (topicShow?.textContent || '未命名').replace(/[^\w\u4e00-\u9fa5]/g, '_');
        let downloadedCount = 0;
        
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const titleElement = cell.querySelector('.cell-title');
            const textarea = cell.querySelector('textarea');
            
            if (!titleElement || !textarea || !textarea.value.trim()) continue;
            
            const title = titleElement.textContent;
            
            // 创建单独的卡片容器
            const cardContainer = document.createElement('div');
            cardContainer.style.cssText = `
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                width: 300px;
                margin: 20px;
                font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            `;
            
            cardContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 15px; color: #3498db; font-size: 18px; font-weight: 600;">
                    ${title}
                </div>
                <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0; min-height: 120px; line-height: 1.5; font-size: 14px; color: #333;">
                    ${textarea.value.split('\n').map(line => line.trim()).filter(line => line).map(line => `• ${line}`).join('<br>')}
                </div>
                <div style="text-align: center; margin-top: 15px; font-size: 12px; color: #666;">
                    ${topic} - ${title}
                </div>
            `;
            
            document.body.appendChild(cardContainer);
            
            try {
                const canvas = await html2canvas(cardContainer, {
                    backgroundColor: '#ffffff',
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    width: 300,
                    height: cardContainer.offsetHeight,
                    foreignObjectRendering: true
                });
                
                const imgData = canvas.toDataURL('image/png', 1.0);
                const base64Data = imgData.split(',')[1];
                zip.file(`${title}_${topic}.png`, base64Data, {base64: true});
                downloadedCount++;
                
            } catch (error) {
                console.error(`生成${title}卡片失败:`, error);
            }
            
            document.body.removeChild(cardContainer);
        }
        
        if (downloadedCount > 0) {
            const content = await zip.generateAsync({type: 'blob'});
            const link = document.createElement('a');
            const date = new Date().toISOString().slice(0, 10);
            link.download = `九宫格卡片_${topic}_${date}.zip`;
            link.href = URL.createObjectURL(content);
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification(`成功下载 ${downloadedCount} 张卡片！`, 'success');
        } else {
            showNotification('没有可下载的卡片内容', 'warning');
        }
    }

    // 下载全部（完整图+单张卡片）
    async function downloadGridAll() {
        // 检查并加载JSZip库
        if (typeof JSZip === 'undefined') {
            console.error('JSZip库未加载，尝试重新加载...');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
            if (typeof JSZip === 'undefined') {
                showNotification('JSZip库加载失败，请检查网络连接', 'error');
                return;
            }
        }
        
        showNotification('正在生成全部下载内容...', 'info');
        
        const zip = new JSZip();
        const topic = (topicShow?.textContent || '未命名').replace(/[^\w\u4e00-\u9fa5]/g, '_');
        
        // 1. 添加完整九宫格
        const element = document.getElementById('exportArea');
        const textareas = element.querySelectorAll('textarea');
        const originalStyles = [];
        
        textareas.forEach((textarea, index) => {
            originalStyles[index] = textarea.style.cssText;
            textarea.style.cssText += `
                resize: none !important;
                overflow: hidden !important;
                border: 1px solid #ddd !important;
                background: white !important;
            `;
        });
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const fullCanvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: false,
            foreignObjectRendering: true
        });
        
        textareas.forEach((textarea, index) => {
            textarea.style.cssText = originalStyles[index];
        });
        
        const fullImgData = fullCanvas.toDataURL('image/png', 1.0).split(',')[1];
        zip.file(`完整九宫格_${topic}.png`, fullImgData, {base64: true});
        
        // 2. 添加单张卡片
        const cells = document.querySelectorAll('.export-grid .cell');
        
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const titleElement = cell.querySelector('.cell-title');
            const textarea = cell.querySelector('textarea');
            
            if (!titleElement || !textarea || !textarea.value.trim()) continue;
            
            const title = titleElement.textContent;
            
            const cardContainer = document.createElement('div');
            cardContainer.style.cssText = `
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                width: 300px;
                margin: 20px;
                font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            `;
            
            cardContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 15px; color: #3498db; font-size: 18px; font-weight: 600;">
                    ${title}
                </div>
                <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0; min-height: 120px; line-height: 1.5; font-size: 14px; color: #333;">
                    ${textarea.value.split('\n').map(line => line.trim()).filter(line => line).map(line => `• ${line}`).join('<br>')}
                </div>
                <div style="text-align: center; margin-top: 15px; font-size: 12px; color: #666;">
                    ${topic} - ${title}
                </div>
            `;
            
            document.body.appendChild(cardContainer);
            
            try {
                const canvas = await html2canvas(cardContainer, {
                    backgroundColor: '#ffffff',
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    width: 300,
                    foreignObjectRendering: true
                });
                
                const imgData = canvas.toDataURL('image/png', 1.0);
                const base64Data = imgData.split(',')[1];
                zip.file(`单张卡片/${title}_${topic}.png`, base64Data, {base64: true});
                
            } catch (error) {
                console.error(`生成${title}卡片失败:`, error);
            }
            
            document.body.removeChild(cardContainer);
        }
        
        const content = await zip.generateAsync({type: 'blob'});
        const link = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        link.download = `九宫格全套_${topic}_${date}.zip`;
        link.href = URL.createObjectURL(content);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('全套资料下载成功！', 'success');
    }

    // 显示提示消息
    function showToast(message) {
        // 创建提示元素
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // 显示提示
        document.body.appendChild(toast);
        
        // 3秒后移除
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
                if (style.parentNode) {
                    document.head.removeChild(style);
                }
            }, 300);
        }, 3000);
    }

    // 清空功能
    function clearAll() {
        console.log('执行清空功能');
        if (confirm('确定要清空所有内容吗？')) {
            if (topicInput) topicInput.value = '';
            
            // 清空九宫格文本框
            const textareas = ['t-ta', 't-jie', 't-gai', 't-da', 't-xiao', 't-ti', 't-tiao', 't-dao', 't-he'];
            textareas.forEach(id => {
                const textarea = document.getElementById(id);
                if (textarea) textarea.value = '';
            });
            
            // 清空关键词分析结果
            const keywordAnalysisResult = document.getElementById('keywordAnalysisResult');
            if (keywordAnalysisResult) {
                keywordAnalysisResult.innerHTML = `
                    <p class="placeholder">
                        点击"开始分析"进行主题分析<br>
                        <small>系统将基于案例数据库进行分析，填入API密钥可获得AI深度分析</small>
                    </p>
                `;
            }
            
            // 隐藏下载选项
            const downloadOptions = document.getElementById('keywordDownloadOptions');
            if (downloadOptions) downloadOptions.style.display = 'none';
            
            const gridDownloadOptions = document.querySelectorAll('#downloadGridFullBtn, #downloadGridCardsBtn, #downloadGridAllBtn');
            gridDownloadOptions.forEach(btn => {
                if (btn) btn.style.display = 'none';
            });
            
            if (topicShow) topicShow.textContent = '（未填写）';
            if (dateShow) dateShow.textContent = '';
            
            console.log('清空完成');
        }
    }

    // 显示案例库管理界面
    function showCaseLibrary() {
        const cases = localCaseManager.getLocalCases();
        const stats = localCaseManager.getCaseStats();
        
        const modal = document.createElement('div');
        modal.className = 'case-library-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>本地案例库管理</h3>
                    <button class="modal-close" onclick="this.closest('.case-library-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="case-stats">
                        <div class="stat-item">
                            <span class="stat-number">${stats.total}</span>
                            <span class="stat-label">总案例数</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${stats.highQuality}</span>
                            <span class="stat-label">高质量案例</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${stats.recent}</span>
                            <span class="stat-label">近30天新增</span>
                        </div>
                    </div>
                    <div class="case-list">
                        ${Object.values(cases).length === 0 ? 
                            '<p class="no-cases">暂无保存的案例，完成AI分析后会自动保存到本地</p>' :
                            Object.values(cases).map(case_ => `
                                <div class="case-item">
                                    <div class="case-header">
                                        <h4>${case_.topic}</h4>
                                        <div class="case-meta">
                                            <span class="case-quality ${case_.quality}">${case_.quality === 'high' ? '高质量' : '普通'}</span>
                                            <span class="case-date">${new Date(case_.createdAt).toLocaleDateString('zh-CN')}</span>
                                        </div>
                                    </div>
                                    <div class="case-preview">
                                        <p><strong>核心功能：</strong>${case_.keywordAnalysis?.coreFunction?.substring(0, 50) || '无'}...</p>
                                    </div>
                                    <div class="case-actions">
                                        <button onclick="loadCase('${case_.topic}')" class="btn-load">加载案例</button>
                                        <button onclick="deleteCase('${case_.topic}')" class="btn-delete">删除</button>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="exportCaseLibrary()" class="btn-export">导出案例库</button>
                    <button onclick="clearCaseLibrary()" class="btn-clear">清空案例库</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // 加载案例
    window.loadCase = function(topic) {
        const cases = localCaseManager.getLocalCases();
        const caseKey = topic.toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '_');
        const case_ = cases[caseKey];
        
        if (!case_) {
            showNotification('案例不存在', 'error');
            return;
        }
        
        // 填充主题
        if (topicInput) topicInput.value = case_.topic;
        
        // 显示关键词分析
        displayKeywordAnalysis(case_.keywordAnalysis);
        
        // 填充九宫格
        generateGridSuggestionsFromAI(case_.topic, case_.nineDimensions);
        
        // 更新显示信息
        updateDisplayInfo(case_.topic);
        
        // 关闭模态框
        document.querySelector('.case-library-modal')?.remove();
        
        showNotification('案例加载成功', 'success');
    };

    // 删除案例
    window.deleteCase = function(topic) {
        if (!confirm(`确定要删除案例"${topic}"吗？`)) return;
        
        const cases = localCaseManager.getLocalCases();
        const caseKey = topic.toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '_');
        
        delete cases[caseKey];
        localStorage.setItem('osborn_local_cases', JSON.stringify(cases));
        
        showNotification('案例删除成功', 'success');
        
        // 刷新案例库界面
        document.querySelector('.case-library-modal')?.remove();
        showCaseLibrary();
    };

    // 导出案例库
    window.exportCaseLibrary = function() {
        const cases = localCaseManager.getLocalCases();
        const dataStr = JSON.stringify(cases, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `奥斯本案例库_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        
        showNotification('案例库导出成功', 'success');
    };

    // 清空案例库
    window.clearCaseLibrary = function() {
        if (!confirm('确定要清空整个案例库吗？此操作不可恢复！')) return;
        
        localStorage.removeItem('osborn_local_cases');
        showNotification('案例库已清空', 'success');
        
        // 刷新案例库界面
        document.querySelector('.case-library-modal')?.remove();
        showCaseLibrary();
    };

    // 改进的下载按钮绑定
    function bindDownloadEvents() {
        // 关键词分析下载按钮
        const keywordBtns = {
            'downloadKeywordFullBtn': () => downloadKeywordAnalysis(),
            'downloadKeywordCardsBtn': () => downloadKeywordAnalysis(),
            'downloadKeywordAllBtn': () => downloadKeywordAnalysis()
        };
        
        Object.entries(keywordBtns).forEach(([btnId, handler]) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', handler);
                console.log(`${btnId} 事件已绑定`);
            }
        });
        
        // 九宫格分析下载按钮
        const gridBtns = {
            'downloadGridFullBtn': () => downloadGridAnalysis('full'),
            'downloadGridCardsBtn': () => downloadGridAnalysis('cards'),
            'downloadGridAllBtn': () => downloadGridAnalysis('all')
        };
        
        Object.entries(gridBtns).forEach(([btnId, handler]) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', handler);
                console.log(`${btnId} 事件已绑定`);
            }
        });
        
        console.log('所有下载按钮事件已绑定');
    }
    
    // 调用绑定函数
    bindDownloadEvents();

    console.log('初始化完成');
});

// 初始化字数统计
function initCharacterCount() {
    const textareas = document.querySelectorAll('.export-grid textarea');
    textareas.forEach(textarea => {
        updateCharacterCount(textarea);
    });
}

// 绑定文本框字数监控
function bindTextareaCharacterCount() {
    const textareas = document.querySelectorAll('.export-grid textarea');
    
    textareas.forEach(textarea => {
        // 监听输入事件
        textarea.addEventListener('input', function() {
            updateCharacterCount(this);
        });
        
        // 监听粘贴事件
        textarea.addEventListener('paste', function() {
            setTimeout(() => updateCharacterCount(this), 0);
        });
        
        // 初始化时的字数统计
        updateCharacterCount(textarea);
    });
}

// 更新字数统计显示
function updateCharacterCount(textarea) {
    const currentLength = textarea.value.length;
    const maxLength = parseInt(textarea.maxLength) || 200;
    
    // 找到对应的字数统计元素
    const cell = textarea.closest('.cell');
    const charCount = cell.querySelector('.char-count');
    const currentSpan = charCount.querySelector('.current');
    
    if (currentSpan) {
        currentSpan.textContent = currentLength;
        
        // 根据字数设置不同的颜色状态
        charCount.className = 'char-count';
        if (currentLength > maxLength * 0.9) {
            charCount.classList.add('danger');
        } else if (currentLength > maxLength * 0.7) {
            charCount.classList.add('warning');
        }
        
        // 如果超出限制，截断文本
        if (currentLength > maxLength) {
            textarea.value = textarea.value.substring(0, maxLength);
            currentSpan.textContent = maxLength;
            showNotification(`文本已达到${maxLength}字上限`, 'warning');
        }
    }
}

// 改进九宫格建议生成，控制每个建议长度
function generateGridSuggestionsFromAI(topic, nineDimensions) {
    console.log('从 AI 生成九宫格建议:', topic, nineDimensions);
    
    const dimensionMap = {
        'ta': 't-ta',
        'jie': 't-jie', 
        'gai': 't-gai',
        'kuo': 't-da',
        'suo': 't-xiao',
        'ti': 't-ti',
        'tiao': 't-tiao',
        'dao': 't-dao',
        'he': 't-he'
    };

    Object.entries(dimensionMap).forEach(([dimKey, textareaId]) => {
        const suggestions = nineDimensions[dimKey] || [];
        const textarea = document.getElementById(textareaId);
        console.log(`处理维度 ${dimKey}, 找到元素:`, !!textarea, `建议数量:`, suggestions.length);
        
        if (textarea && suggestions.length > 0) {
            // 限制每个建议的长度，确保总长度不超过200字
            const processedSuggestions = suggestions.map(suggestion => {
                // 限制单个建议最长30字
                return suggestion.length > 30 ? suggestion.substring(0, 27) + '...' : suggestion;
            });
            
            // 选择前几个建议，确保总字数不超过200
            let content = '';
            let totalLength = 0;
            const maxTotalLength = 200;
            
            for (let i = 0; i < processedSuggestions.length; i++) {
                const suggestion = processedSuggestions[i];
                const newLength = totalLength + suggestion.length + (content ? 1 : 0); // +1 为换行符
                
                if (newLength <= maxTotalLength) {
                    content += (content ? '\n' : '') + suggestion;
                    totalLength = newLength;
                } else {
                    break;
                }
            }
            
            textarea.value = content;
            updateCharacterCount(textarea);
            console.log(`已填充 ${dimKey}: ${content.length}字`);
        }
    });

    // 显示九宫格下载选项
    const gridDownloadOptions = document.querySelectorAll('#downloadGridFullBtn, #downloadGridCardsBtn, #downloadGridAllBtn');
    gridDownloadOptions.forEach(btn => {
        if (btn) btn.style.display = 'inline-flex';
    });

    console.log('九宫格建议生成完成');
}