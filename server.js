const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// DeepSeek API配置
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

// 调用DeepSeek API的通用函数
async function callDeepSeekAPI(prompt, apiKey) {
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
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API调用失败:', error.response?.data || error.message);
    throw error;
  }
}

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

    const prompt = `作为一名资深的商业分析师和创新顾问，请对"${topic}"进行深度的多维度分析。请从商业、技术、用户、市场等角度进行系统性解构：

**分析要求：**
1. 核心功能：深入分析${topic}的本质价值主张、核心功能机制、解决的根本问题
2. 关键属性：识别${topic}的3-4个最重要的特征、技术要素、竞争优势
3. 现有形态：详细描述${topic}的物理形态、技术架构、商业模式、运营方式
4. 目标用户：精准定义主要用户群体的特征、需求、痛点、使用动机
5. 使用场景：列举2-3个典型的使用场景，包括时间、地点、情境
6. 价值链条：分析${topic}在产业链中的位置、上下游关系、生态价值
7. 约束限制：识别当前的技术瓶颈、市场限制、成本约束、政策风险

**输出格式：**
请以JSON格式返回详细分析结果，每个字段都要具体、专业、有洞察力：
{
  "coreFunction": "详细的核心功能和价值主张描述（50-80字）",
  "keyAttributes": ["具体属性1", "具体属性2", "具体属性3", "具体属性4"],
  "currentForm": "详细的现有形态和结构描述（50-80字）",
  "targetUsers": "精准的目标用户群体分析（50-80字）",
  "usageScenarios": ["具体场景1", "具体场景2", "具体场景3"],
  "valueChain": "详细的价值链条和生态位置分析（50-80字）",
  "constraints": ["具体限制1", "具体限制2", "具体限制3"]
}

只返回JSON格式的分析结果，不要任何其他文字或解释。`;

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

    const prompt = `作为创新思维专家，基于对"${topic}"的深度分析，运用奥斯本检核表法进行系统性创新思考：

**分析基础：**
- 核心功能：${keywordAnalysis.coreFunction}
- 关键属性：${keywordAnalysis.keyAttributes?.join('、')}
- 现有形态：${keywordAnalysis.currentForm}
- 目标用户：${keywordAnalysis.targetUsers}
- 使用场景：${keywordAnalysis.usageScenarios?.join('、')}
- 价值链条：${keywordAnalysis.valueChain}
- 约束限制：${keywordAnalysis.constraints?.join('、')}

**创新维度分析：**
请针对每个维度提供3-4个具体、可行、有商业价值的创新要点：

1. **他用途**：将${topic}的核心能力迁移到哪些新领域、新行业、新用户群体？
2. **借用**：从哪些成功案例、先进技术、优秀模式中借鉴经验改进${topic}？
3. **改变**：如何改变${topic}的材料、形态、界面、流程、商业模式？
4. **扩大**：如何扩大${topic}的功能范围、服务规模、影响力、市场覆盖？
5. **缩小**：如何简化${topic}，聚焦核心价值，降低复杂度和成本？
6. **替代**：用什么新技术、新材料、新方法替代${topic}的现有组成部分？
7. **调整**：如何重新安排${topic}的结构、流程、时序、空间布局？
8. **颠倒**：如何反转${topic}的使用方式、商业逻辑、价值流向？
9. **合并**：${topic}与哪些产品、服务、技术结合能产生协同效应？

**输出要求：**
每个要点要具体、可操作，15-30字，体现商业价值和创新性。

{
  "he": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "jie": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "gai": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "da": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "xiao": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "ti": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "tiao": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "dian": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"],
  "hebing": ["具体创新要点1", "具体创新要点2", "具体创新要点3", "具体创新要点4"]
}

只返回JSON格式结果，不要其他内容。`;

    const content = await callDeepSeekAPI(prompt, apiKey);
    
    try {
      const result = JSON.parse(content);
      res.json(result);
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      // 如果解析失败，返回备用结果
      const backupResult = {
        he: [
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
        da: [
          `扩大${topic}的服务半径覆盖更广区域`,
          `增加${topic}的功能模块形成完整生态`,
          `延长${topic}的使用寿命提高性价比`
        ],
        xiao: [
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
        dian: [
          `让用户从${topic}的消费者变为生产者`,
          `将${topic}的付费模式改为免费增值`,
          `颠倒${topic}的传统使用场景和时间`
        ],
        hebing: [
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
