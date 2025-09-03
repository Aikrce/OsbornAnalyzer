const fs = require('fs');

// 读取文件
let content = fs.readFileSync('app.js', 'utf8');

// 找到问题区域并替换
const problemSection = `'金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值'
      keyAttributes: ['安全性' '流动性' '收益性' '便捷性' '合规性']
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台'
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构'
      usageScenarios: ['日常支付' '资产配置' '风险保障' '融资需求' '财富管理']
    }
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方'`;

const fixedSection = `'金融|支付|理财|投资|保险': {
      coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',
      keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],
      currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',
      targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',
      usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],
      valueChain: '金融生态系统的核心枢纽，连接资金供需双方'
    },`;

// 使用正则表达式替换，处理可能的编码问题
content = content.replace(/['']金融\|支付\|理财\|投资\|保险['']:\s*\{[\s\S]*?\}\s*valueChain:[^}]*?'/g, fixedSection);

// 写回文件
fs.writeFileSync('app.js', content);
console.log('编码和语法问题修复完成！');