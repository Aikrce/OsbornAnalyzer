const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005; // 使用3005端口

// 改进的中间件配置
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3005', 'http://127.0.0.1:3005'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务优化
app.use(express.static(path.join(__dirname), {
  maxAge: '1d', // 1天缓存
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err.stack);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '服务暂时不可用'
  });
});

// DeepSeek API配置
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

// 改进的API调用函数，增加重试机制和错误处理
async function callDeepSeekAPI(prompt, apiKey, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.post(
        `${DEEPSEEK_BASE_URL}/v1/chat/completions`,
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          timeout: 30000 // 30秒超时
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`DeepSeek API调用失败 (尝试 ${attempt}/${maxRetries}):`, error.response?.data || error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`API调用失败，已尝试${maxRetries}次: ${error.message}`);
      }
      
      // 指数退避重试
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

// 关键词分析函数
async function analyzeKeyword(topic, apiKey) {
  const prompt = `你是一位资深商业分析师和创新顾问，拥有20年行业经验。请对"${topic}"进行深度、专业的多维度分析。

**分析框架要求：**
1. 核心功能：分析${topic}的核心价值主张、技术原理、解决的核心痛点，要求具体且有深度
2. 关键属性：识别3-5个最具竞争力的技术特征、商业模式优势、差异化特点
3. 现有形态：详细描述${topic}的产品形态、技术架构、运营模式、盈利方式
4. 目标用户：精准定义用户画像，包括年龄、职业、需求特征、消费能力、使用动机
5. 使用场景：提供2-3个具体的应用场景，包含时间、地点、情境、用户行为
6. 价值链条：分析${topic}在产业链中的定位、上下游关系、生态价值、商业网络
7. 约束限制：识别技术瓶颈、市场障碍、成本限制、政策风险、竞争压力

**分析质量要求：**
- 每个分析点必须具体、量化、有数据支撑
- 体现行业专业性和商业洞察力
- 避免空泛描述，要有实质内容和深度思考
- 考虑技术发展趋势、市场变化、用户需求演变
- 分析要具有前瞻性和创新性视角

**输出格式（严格遵循）：**
{
  "coreFunction": "${topic}通过[具体技术/方法]解决[具体问题]，核心价值体现在[具体价值点]。例如：[具体案例说明]，技术原理基于[具体技术基础]，能够实现[具体效果]。",
  "keyAttributes": [
    "[具体属性1：如'采用先进的AI算法实现精准预测，准确率达到95%以上']",
    "[具体属性2：如'基于云原生架构，支持弹性扩展和百万级并发']",
    "[具体属性3：如'采用订阅制商业模式，用户粘性强，LTV价值高']",
    "[具体属性4：如'界面设计简洁易用，用户体验评分4.8/5']"
  ],
  "currentForm": "${topic}目前以[具体产品形态：如SaaS平台/硬件设备/移动应用]形式存在，技术架构采用[具体技术栈]，商业模式为[具体模式：如B2B/B2C/平台型]，运营方式包括[具体运营策略]，主要盈利来源为[具体收入来源]。",
  "targetUsers": "主要用户群体为[具体年龄段]的[具体职业人群]，年收入约[具体范围]，核心需求是[具体需求]，使用动机包括[具体动机]。典型用户画像：[具体用户描述]。",
  "usageScenarios": [
    "[具体场景1：如'工作日早上8点，白领用户在通勤地铁上使用手机APP完成${topic}的核心操作，用时3分钟解决当日首要任务']",
    "[具体场景2：如'周末下午，家庭用户在客厅通过智能电视使用${topic}服务，全家参与互动，持续时长30分钟']",
    "[具体场景3：如'企业客户在工作时间通过PC端管理后台使用${topic}进行数据分析，辅助决策制定']"
  ],
  "valueChain": "${topic}处于[具体产业链环节]，上游依赖[具体供应商/技术提供方]，下游服务[具体客户群体]，生态合作伙伴包括[具体合作伙伴]。在价值链中主要创造[具体价值类型：如技术/数据/服务价值]，商业网络涵盖[具体网络范围]。",
  "constraints": [
    "[具体限制1：技术层面，如'当前算法在处理大规模数据时存在性能瓶颈，响应时间超过5秒']",
    "[具体限制2：市场层面，如'目标市场渗透率仅15%，用户教育成本较高']",
    "[具体限制3：成本层面，如'服务器和带宽成本占收入比重达40%，盈利压力较大']",
    "[具体限制4：政策层面，如'相关法规要求数据本地化存储，增加了合规成本']"
  ]
}

**重要提示：**
- 所有字段内容必须具体、量化、有实质内容
- 避免使用模糊词汇，要用具体数字和案例
- 体现专业深度和商业洞察
- 严格遵循JSON格式，只返回JSON对象"`;

  const content = await callDeepSeekAPI(prompt, apiKey);
  
  try {
    return JSON.parse(content);
  } catch (parseError) {
    console.error('JSON解析失败:', parseError);
    // 如果解析失败，返回备用结果
    return {
      coreFunction: `${topic}的核心功能和价值`,
      keyAttributes: [`${topic}的主要特征`, `${topic}的关键要素`, `${topic}的核心价值`],
      currentForm: `${topic}的现有形态和结构`,
      targetUsers: `${topic}的目标用户群体`,
      usageScenarios: [`${topic}的主要使用场景`, `${topic}的典型应用环境`],
      valueChain: `${topic}的价值链条和生态`,
      constraints: [`${topic}的主要限制因素`, `${topic}的发展瓶颈`]
    };
  }
}

// 九维度分析函数
async function analyzeNineDimensions(topic, keywordAnalysis, apiKey) {
  const prompt = `作为创新思维专家和商业模式设计顾问，基于对"${topic}"的深度分析，运用奥斯本检核表法进行系统性创新思考：

**分析基础：**
- 核心功能：${keywordAnalysis.coreFunction}
- 关键属性：${keywordAnalysis.keyAttributes?.join('、')}
- 现有形态：${keywordAnalysis.currentForm}
- 目标用户：${keywordAnalysis.targetUsers}
- 使用场景：${keywordAnalysis.usageScenarios?.join('、')}
- 价值链条：${keywordAnalysis.valueChain}
- 约束限制：${keywordAnalysis.constraints?.join('、')}

**创新维度分析要求：**
请针对每个维度提供4个高质量、具体可行、有商业价值的创新要点。每个要点都要：
- 具体明确，避免空泛概念
- 体现商业价值和市场潜力
- 考虑技术可行性和成本效益
- 具有创新性和差异化优势

**九维度创新框架：**

1. **他用途**：基于${topic}的核心能力，如何迁移应用到全新的领域、行业或用户群体？考虑技术迁移、能力复用、场景拓展。

2. **借用**：从哪些先进案例、前沿技术、成功模式中借鉴经验？如何跨界融合、引入新方法、学习优秀实践？

3. **改变**：如何改变${topic}的材料、形态、结构、流程、界面或商业模式？考虑技术升级、体验优化、成本降低。

4. **扩大**：如何扩大${topic}的功能范围、服务规模、影响范围或市场覆盖？考虑规模化、平台化、生态化。

5. **缩小**：如何简化${topic}，聚焦核心价值？考虑轻量化、便携化、低成本化、专用化。

6. **替代**：用什么新技术、新材料、新方法可以替代${topic}的现有组成部分？考虑技术革新、材料升级、工艺改进。

7. **调整**：如何重新安排${topic}的结构、顺序、流程或布局？考虑效率提升、体验优化、逻辑重构。

8. **颠倒**：如何反转${topic}的使用方式、商业逻辑或价值流向？考虑逆向思维、角色互换、模式创新。

9. **合并**：${topic}与哪些产品、服务、技术结合能产生协同效应？考虑跨界融合、系统集成、生态构建。

**输出标准：**
- 每个要点150字左右，深入具体
- 体现专业深度和商业洞察
- 考虑技术可行性、成本效益和市场潜力
- 包含具体数据、案例和实施路径
- 避免空泛概念，要有实质内容和可操作性

**输出格式：**
{
  "ta": ["具体创新要点1（150字左右，体现迁移应用）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "jie": ["具体创新要点1（150字左右，体现借鉴融合）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "gai": ["具体创新要点1（150字左右，体现改变优化）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "kuo": ["具体创新要点1（150字左右，体现扩大拓展）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "suo": ["具体创新要点1（150字左右，体现简化聚焦）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "ti": ["具体创新要点1（150字左右，体现替代革新）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "tiao": ["具体创新要点1（150字左右，体现调整优化）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "dao": ["具体创新要点1（150字左右，体现颠倒反转）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"],
  "he": ["具体创新要点1（150字左右，体现合并协同）", "具体创新要点2（150字左右）", "具体创新要点3（150字左右）", "具体创新要点4（150字左右）"]
}

只返回JSON格式结果，不要其他内容。`;

  const content = await callDeepSeekAPI(prompt, apiKey);
  
  try {
    return JSON.parse(content);
  } catch (parseError) {
    console.error('JSON解析失败:', parseError);
    // 备用结果
    return {
      ta: [
        `将${topic}的核心功能应用到教育培训领域`,
        `${topic}可以在医疗健康场景中发挥什么作用`,
        `${topic}如何为老年人群体提供特殊价值`
      ],
      jie: [
        `借鉴游戏化机制提升${topic}的用户粘性`,
        `引入人工智能技术优化${topic}的核心流程`,
        `学习共享经济模式重构${topic}的商业逻辑`
      ],
      gai: [
        `将${topic}的材质改为环保可持续材料`,
        `改变${topic}的交互方式为语音或手势控制`,
        `将${topic}的服务模式从一次性改为订阅制`
      ],
      kuo: [
        `扩大${topic}的服务半径覆盖更广区域`,
        `增加${topic}的功能模块形成完整生态`,
        `延长${topic}的使用寿命提高性价比`
      ],
      suo: [
        `简化${topic}的操作流程突出核心功能`,
        `缩小${topic}的体积便于携带和存储`,
        `专注${topic}的单一功能做到极致`
      ],
      ti: [
        `用数字化技术替代${topic}的传统实现方式`,
        `寻找${topic}原材料的低成本替代方案`,
        `用自动化设备替代${topic}的人工操作`
      ],
      tiao: [
        `调整${topic}的使用时序优化用户体验`,
        `重新设计${topic}的界面布局提升易用性`,
        `调整${topic}的价格策略适应不同市场`
      ],
      dao: [
        `让用户从${topic}的消费者变为生产者`,
        `将${topic}的付费模式改为免费增值`,
        `颠倒${topic}的传统使用场景和时间`
      ],
      he: [
        `将${topic}与社交功能结合增强互动性`,
        `整合${topic}与支付系统形成闭环`,
        `结合${topic}与数据分析提供智能建议`
      ]
    };
  }
}

// 统一分析API端点（兼容前端调用）
app.post('/api/analyze', async (req, res) => {
  try {
    const { topic, apiKey } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: '缺少主题参数' });
    }
    
    if (!apiKey) {
      return res.status(400).json({ error: '缺少API密钥' });
    }

    // 调用关键词分析
    const keywordAnalysis = await analyzeKeyword(topic, apiKey);
    
    // 调用九维度分析
    const nineDimensions = await analyzeNineDimensions(topic, keywordAnalysis, apiKey);
    
    res.json({
      keywordAnalysis,
      nineDimensions
    });
    
  } catch (error) {
    console.error('统一分析出错:', error.response?.data || error.message);
    res.status(500).json({ error: '分析失败' });
  }
});

// 第一步：关键词深度分析API
app.post('/api/keyword-analysis', async (req, res) => {
  try {
    const { topic, apiKey } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: '缺少主题参数' });
    }
    
    if (!apiKey) {
      return res.status(400).json({ error: '缺少API密钥' });
    }

    const prompt = `你是一位资深商业分析师和创新顾问，拥有20年行业经验。请对"${topic}"进行深度、专业的多维度分析。

**分析框架要求：**
1. 核心功能：分析${topic}的核心价值主张、技术原理、解决的核心痛点，要求具体且有深度
2. 关键属性：识别3-5个最具竞争力的技术特征、商业模式优势、差异化特点
3. 现有形态：详细描述${topic}的产品形态、技术架构、运营模式、盈利方式
4. 目标用户：精准定义用户画像，包括年龄、职业、需求特征、消费能力、使用动机
5. 使用场景：提供2-3个具体的应用场景，包含时间、地点、情境、用户行为
6. 价值链条：分析${topic}在产业链中的定位、上下游关系、生态价值、商业网络
7. 约束限制：识别技术瓶颈、市场障碍、成本限制、政策风险、竞争压力

**分析质量要求：**
- 每个分析点必须具体、量化、有数据支撑
- 体现行业专业性和商业洞察力
- 避免空泛描述，要有实质内容和深度思考
- 考虑技术发展趋势、市场变化、用户需求演变
- 分析要具有前瞻性和创新性视角

**输出格式（严格遵循）：**
{
  "coreFunction": "${topic}通过[具体技术/方法]解决[具体问题]，核心价值体现在[具体价值点]。例如：[具体案例说明]，技术原理基于[具体技术基础]，能够实现[具体效果]。",
  "keyAttributes": [
    "[具体属性1：如'采用先进的AI算法实现精准预测，准确率达到95%以上']",
    "[具体属性2：如'基于云原生架构，支持弹性扩展和百万级并发']",
    "[具体属性3：如'采用订阅制商业模式，用户粘性强，LTV价值高']",
    "[具体属性4：如'界面设计简洁易用，用户体验评分4.8/5']"
  ],
  "currentForm": "${topic}目前以[具体产品形态：如SaaS平台/硬件设备/移动应用]形式存在，技术架构采用[具体技术栈]，商业模式为[具体模式：如B2B/B2C/平台型]，运营方式包括[具体运营策略]，主要盈利来源为[具体收入来源]。",
  "targetUsers": "主要用户群体为[具体年龄段]的[具体职业人群]，年收入约[具体范围]，核心需求是[具体需求]，使用动机包括[具体动机]。典型用户画像：[具体用户描述]。",
  "usageScenarios": [
    "[具体场景1：如'工作日早上8点，白领用户在通勤地铁上使用手机APP完成${topic}的核心操作，用时3分钟解决当日首要任务']",
    "[具体场景2：如'周末下午，家庭用户在客厅通过智能电视使用${topic}服务，全家参与互动，持续时长30分钟']",
    "[具体场景3：如'企业客户在工作时间通过PC端管理后台使用${topic}进行数据分析，辅助决策制定']"
  ],
  "valueChain": "${topic}处于[具体产业链环节]，上游依赖[具体供应商/技术提供方]，下游服务[具体客户群体]，生态合作伙伴包括[具体合作伙伴]。在价值链中主要创造[具体价值类型：如技术/数据/服务价值]，商业网络涵盖[具体网络范围]。",
  "constraints": [
    "[具体限制1：技术层面，如'当前算法在处理大规模数据时存在性能瓶颈，响应时间超过5秒']",
    "[具体限制2：市场层面，如'目标市场渗透率仅15%，用户教育成本较高']",
    "[具体限制3：成本层面，如'服务器和带宽成本占收入比重达40%，盈利压力较大']",
    "[具体限制4：政策层面，如'相关法规要求数据本地化存储，增加了合规成本']"
  ]
}

**重要提示：**
- 所有字段内容必须具体、量化、有实质内容
- 避免使用模糊词汇，要用具体数字和案例
- 体现专业深度和商业洞察
- 严格遵循JSON格式，只返回JSON对象"`;

    const content = await callDeepSeekAPI(prompt, apiKey);
    
    try {
      const result = JSON.parse(content);
      res.json(result);
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      // 如果解析失败，返回备用结果
      res.json({
        coreFunction: `${topic}的核心功能和价值`,
        keyAttributes: [`${topic}的主要特征`, `${topic}的关键要素`, `${topic}的核心价值`],
        currentForm: `${topic}的现有形态和结构`,
        targetUsers: `${topic}的目标用户群体`,
        usageScenarios: [`${topic}的主要使用场景`, `${topic}的典型应用环境`],
        valueChain: `${topic}的价值链条和生态`,
        constraints: [`${topic}的主要限制因素`, `${topic}的发展瓶颈`]
      });
    }
    
  } catch (error) {
    console.error('关键词分析出错:', error.response?.data || error.message);
    res.status(500).json({ error: '关键词分析失败' });
  }
});

// 第二步：九维度分析API
app.post('/api/nine-dimensions', async (req, res) => {
  try {
    const { topic, keywordAnalysis, apiKey } = req.body;
    
    if (!topic || !keywordAnalysis) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    if (!apiKey) {
      return res.status(400).json({ error: '缺少API密钥' });
    }

    const prompt = `你是一位资深创新顾问和商业模式专家，基于对"${topic}"的深度分析，运用奥斯本检核表法进行系统性创新思考。

**深度分析基础：**
- 核心功能：${keywordAnalysis.coreFunction}
- 关键优势：${keywordAnalysis.keyAttributes?.join('、')}
- 产品形态：${keywordAnalysis.currentForm}
- 目标用户：${keywordAnalysis.targetUsers}
- 使用场景：${keywordAnalysis.usageScenarios?.join('、')}
- 价值链条：${keywordAnalysis.valueChain}
- 限制因素：${keywordAnalysis.constraints?.join('、')}

**创新维度分析要求：**
请为每个维度提供3-4个高质量、具体可行、有商业价值的创新要点。每个要点必须：
- 具体明确，避免空泛概念
- 体现商业价值和市场潜力
- 考虑技术可行性和成本效益
- 具有创新性和差异化优势
- 字数控制在20-40字之间

**九维度创新框架详解：**

1. **他用途（ta）**：基于${topic}的[${keywordAnalysis.keyAttributes?.[0] || '核心能力'}]，如何迁移应用到全新的领域、行业或用户群体？考虑技术迁移、能力复用、场景拓展，创造新的市场机会。

2. **借用（jie）**：从哪些先进案例（如特斯拉、苹果、亚马逊的成功模式）、前沿技术（如AI、区块链、物联网）、优秀实践中借鉴经验？如何跨界融合、引入新方法、学习最佳实践来提升${topic}？

3. **改变（gai）**：如何改变${topic}的材料（如环保材料、智能材料）、形态（如模块化、可定制）、界面（如语音交互、AR界面）、流程（如自动化、智能化）、商业模式（如订阅制、共享经济）？

4. **扩大（kuo）**：如何扩大${topic}的功能范围（增加新特性）、服务规模（扩展到新地区）、影响力（品牌建设）、市场覆盖（渠道拓展）？考虑规模化、平台化、生态化发展。

5. **缩小（suo）**：如何简化${topic}，聚焦核心价值？考虑轻量化（减少资源消耗）、便携化（移动使用）、低成本化（降低价格）、专用化（垂直领域深度优化）、最小化（核心功能极致体验）。

6. **替代（ti）**：用什么新技术（如AI替代人工）、新材料（如复合材料替代传统材料）、新方法（如数字化替代物理流程）、新工艺可以替代${topic}的现有组成部分？考虑技术革新、效率提升、成本降低。

7. **调整（tiao）**：如何重新安排${topic}的结构（优化架构）、顺序（流程再造）、流程（效率提升）、时序（时间优化）、空间布局（用户体验改善）？考虑效率提升、体验优化、逻辑重构。

8. **颠倒（dao）**：如何反转${topic}的使用方式（用户变创作者）、商业逻辑（免费变收费）、价值流向（单向变双向）、服务模式（被动变主动）？考虑逆向思维、角色互换、模式创新。

9. **合并（he）**：${topic}与哪些产品、服务、技术结合能产生1+1>2的协同效应？考虑跨界融合（如教育+游戏）、系统集成（如硬件+软件+服务）、生态构建（如平台+内容+社区）。

**输出格式（严格遵循）：**
{
  "ta": [
    "[具体创新要点1：如'将${topic}的AI算法应用到医疗诊断领域，开发智能辅助诊断系统，准确率提升30%']",
    "[具体创新要点2：如'利用${topic}的数据处理能力为金融风控提供实时分析服务，降低坏账率20%']",
    "[具体创新要点3：如'将${topic}的核心技术迁移到农业领域，实现精准灌溉和作物生长预测']",
    "[具体创新要点4：如'拓展${topic}到教育行业，为学生提供个性化学习路径推荐']"
  ],
  "jie": [
    "[具体创新要点1：如'借鉴Netflix的推荐算法优化${topic}的内容分发，提升用户 engagement 40%']",
    "[具体创新要点2：如'学习特斯拉的OTA升级模式，为${topic}增加远程功能更新能力']",
    "[具体创新要点3：如'引入游戏化机制如积分排行榜，提升${topic}的用户活跃度和粘性']",
    "[具体创新要点4：如'借鉴亚马逊的飞轮效应，构建${topic}的自增长生态系统']"
  ],
  "gai": [
    "[具体创新要点1：如'将${topic}的界面改为语音交互，支持多语言实时翻译，提升国际化用户体验']",
    "[具体创新要点2：如'改变${topic}的商业模式为订阅制，提供阶梯定价，ARPU值提升50%']",
    "[具体创新要点3：如'采用环保可降解材料重新设计${topic}的包装，减少30%碳足迹']",
    "[具体创新要点4：如'将${topic}的流程自动化，减少人工干预，运营成本降低40%']"
  ],
  "kuo": [
    "[具体创新要点1：如'扩大${topic}的功能范围，增加社交分享和协作功能，用户留存率提升25%']",
    "[具体创新要点2：如'将${topic}的服务扩展到东南亚市场，本地化运营，年增长预期50%']",
    "[具体创新要点3：如'增加${topic}的企业级版本，提供API接口和白标解决方案']",
    "[具体创新要点4：如'扩大${topic}的合作伙伴生态，集成100+第三方服务']"
  ],
  "suo": [
    "[具体创新要点1：如'推出${topic}轻量版，专注核心功能，安装包大小减少60%']",
    "[具体创新要点2：如'简化${topic}的操作流程，从7步减少到3步，新用户上手时间缩短70%']",
    "[具体创新要点3：如'聚焦${topic}在垂直领域的深度应用，成为行业标准解决方案']",
    "[具体创新要点4：如'降低${topic}的使用门槛，提供免费基础版，用户基数扩大3倍']"
  ],
  "ti": [
    "[具体创新要点1：如'用AI客服替代${topic}的人工客服，响应时间从分钟级降到秒级']",
    "[具体创新要点2：如'采用云计算替代${topic}的本地部署，弹性扩展，成本降低60%']",
    "[具体创新要点3：如'用区块链技术替代${topic}的传统数据库，提升数据安全性和透明度']",
    "[具体创新要点4：如'用AR技术替代${topic}的平面展示，提供沉浸式用户体验']"
  ],
  "tiao": [
    "[具体创新要点1：如'调整${topic}的功能布局，将常用功能前置，用户操作效率提升35%']",
    "[具体创新要点2：如'重新安排${topic}的服务流程，实现7x24小时自动化运营']",
    "[具体创新要点3：如'优化${topic}的数据处理顺序，实时分析替代批量处理']",
    "[具体创新要点4：如'调整${topic}的定价策略，采用动态定价最大化收益']"
  ],
  "dao": [
    "[具体创新要点1：如'让用户从${topic}的消费者变为内容创作者，构建UGC生态']",
    "[具体创新要点2：如'将${topic}的付费模式改为免费增值，通过高级功能盈利']",
    "[具体创新要点3：如'颠倒${topic}的服务流程，从被动响应改为主动预测用户需求']",
    "[具体创新要点4：如'反转${topic}的价值链，让用户参与价值创造并获得分成']"
  ],
  "he": [
    "[具体创新要点1：如'将${topic}与智能硬件结合，打造物联网生态系统']",
    "[具体创新要点2：如'整合${topic}与支付系统，形成交易闭环，提升变现能力']",
    "[具体创新要点3：如'结合${topic}与大数据分析，提供个性化推荐和智能洞察']",
    "[具体创新要点4：如'融合${topic}与社交媒体，实现病毒式传播和用户增长']"
  ]
}

**重要提示：**
- 所有创新要点必须具体、可行、有商业价值
- 避免空泛描述，要用具体数字和案例
- 体现创新思维和商业洞察
- 严格遵循JSON格式，只返回JSON对象"`;

    const content = await callDeepSeekAPI(prompt, apiKey);
    
    try {
      const result = JSON.parse(content);
      res.json(result);
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      // 如果解析失败，返回备用结果
      const backupResult = {
        ta: [
          `将${topic}的核心功能应用到教育培训领域`,
          `${topic}可以在医疗健康场景中发挥什么作用`,
          `${topic}如何为老年人群体提供特殊价值`
        ],
        jie: [
          `借鉴游戏化机制提升${topic}的用户粘性`,
          `引入人工智能技术优化${topic}的核心流程`,
          `学习共享经济模式重构${topic}的商业逻辑`
        ],
        gai: [
          `将${topic}的材质改为环保可持续材料`,
          `改变${topic}的交互方式为语音或手势控制`,
          `将${topic}的服务模式从一次性改为订阅制`
        ],
        kuo: [
          `扩大${topic}的服务半径覆盖更广区域`,
          `增加${topic}的功能模块形成完整生态`,
          `延长${topic}的使用寿命提高性价比`
        ],
        suo: [
          `简化${topic}的操作流程突出核心功能`,
          `缩小${topic}的体积便于携带和存储`,
          `专注${topic}的单一功能做到极致`
        ],
        ti: [
          `用数字化技术替代${topic}的传统实现方式`,
          `寻找${topic}原材料的低成本替代方案`,
          `用自动化设备替代${topic}的人工操作`
        ],
        tiao: [
          `调整${topic}的使用时序优化用户体验`,
          `重新设计${topic}的界面布局提升易用性`,
          `调整${topic}的价格策略适应不同市场`
        ],
        dao: [
          `让用户从${topic}的消费者变为生产者`,
          `将${topic}的付费模式改为免费增值`,
          `颠倒${topic}的传统使用场景和时间`
        ],
        he: [
          `将${topic}与社交功能结合增强互动性`,
          `整合${topic}与支付系统形成闭环`,
          `结合${topic}与数据分析提供智能建议`
        ]
      };
      res.json(backupResult);
    }
    
  } catch (error) {
    console.error('九维度分析出错:', error.response?.data || error.message);
    res.status(500).json({ error: '九维度分析失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`使用DeepSeek API: ${DEEPSEEK_BASE_URL}`);
});
