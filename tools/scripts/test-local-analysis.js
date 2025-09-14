// 测试本地分析功能
// 由于app.js是前端代码，我们直接复制相关函数进行测试

// 复制行业模板定义
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

// 复制智能行业匹配函数（增强版）
function matchIndustryTemplateEnhanced(topic) {
    const topicLower = topic.toLowerCase();
    
    // 行业关键词匹配（增强版，包含更多关键词和权重）
    const industryKeywords = {
        '科技产品': ['app', '软件', '平台', '系统', '智能', 'ai', '人工智能', '云计算', '大数据', '物联网', '算法', '开发', '技术', '数字', 'saaS', 'api', '代码', '编程', '数字化', '智能硬件', '云端', '技术方案', '解决方案'],
        '教育服务': ['教育', '学习', '培训', '课程', '学校', '老师', '学生', '知识', '技能', '考试', '教学', '在线教育', '培训', '学位', '学历', '课堂', '教材', '辅导', '教育平台', '学习平台', '培训服务', '教育app'],
        '健康医疗': ['健康', '医疗', '医生', '医院', '健身', '运动', '养生', '保健', '诊断', '治疗', '康复', '医疗', '健康管理', '药品', '疫苗', '中医', '西医', '体检', '医疗app', '健康app', '远程医疗', '智能医疗', '可穿戴'],
        '金融服务': ['金融', '银行', '投资', '理财', '保险', '证券', '股票', '基金', '支付', '贷款', '信贷', '货币', '比特币', '区块链', '风控', '财富', '资产', '移动支付', '数字支付', '金融服务', '金融科技', 'fintech'],
        '零售电商': ['零售', '电商', '购物', '消费', '商品', '产品', '品牌', '营销', '销售', '推广', '广告', '促销', '价格', '供应链', '物流', '仓储', '配送', '电商平台', '购物平台', '新零售', '直播带货', '社交电商']
    };
    
    // 计算匹配分数
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
        let score = 0;
        
        // 计算匹配分数
        keywords.forEach(keyword => {
            if (topicLower.includes(keyword)) {
                // 关键词长度越长，权重越高
                score += keyword.length * 2;
                
                // 如果是核心关键词，额外加分
                const coreKeywords = {
                    '科技产品': ['ai', '人工智能', '云计算', '大数据'],
                    '教育服务': ['教育', '学习', '培训', '课程'],
                    '健康医疗': ['医疗', '健康', '医生', '医院'],
                    '金融服务': ['金融', '支付', '理财', '投资'],
                    '零售电商': ['电商', '零售', '购物', '消费']
                };
                
                if (coreKeywords[industry]?.includes(keyword)) {
                    score += 10;
                }
            }
        });
        
        // 如果分数足够高，直接返回
        if (score > bestScore) {
            bestScore = score;
            bestMatch = industry;
        }
    }
    
    // 如果找到匹配的行业且分数足够高
    if (bestMatch && bestScore >= 5) {
        return industryTemplates[bestMatch];
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

console.log('测试本地行业模板匹配功能...\n');

// 测试不同行业的匹配
testCases = [
    '智能医疗APP',
    '在线教育平台', 
    '移动支付系统',
    '电商购物平台',
    '人工智能算法',
    '未知行业测试'
];

testCases.forEach(topic => {
    console.log(`主题: ${topic}`);
    const template = matchIndustryTemplateEnhanced(topic);
    console.log(`匹配行业: ${template.coreFunction.includes('医疗') ? '健康医疗' : 
                      template.coreFunction.includes('教育') ? '教育服务' :
                      template.coreFunction.includes('金融') ? '金融服务' :
                      template.coreFunction.includes('零售') ? '零售电商' :
                      template.coreFunction.includes('科技') ? '科技产品' : '通用'}`);
    console.log(`核心功能: ${template.coreFunction.substring(0, 50)}...`);
    console.log('---');
});