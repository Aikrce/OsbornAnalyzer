const fs = require('fs');

// 读取文件
let content = fs.readFileSync('app.js', 'utf8');

// 修复语法错误
content = content.replace(
  /coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值'/g,
  "coreFunction: '通过资金融通和风险管理服务，促进经济活动和财富增值',"
);

content = content.replace(
  /keyAttributes: \['安全性' '流动性' '收益性' '便捷性' '合规性'\]/g,
  "keyAttributes: ['安全性', '流动性', '收益性', '便捷性', '合规性'],"
);

content = content.replace(
  /currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台'/g,
  "currentForm: '银行服务、支付工具、投资产品、保险保障、金融科技平台',"
);

content = content.replace(
  /targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构'/g,
  "targetUsers: '个人客户、企业客户、机构投资者、金融从业者、监管机构',"
);

content = content.replace(
  /usageScenarios: \['日常支付' '资产配置' '风险保障' '融资需求' '财富管理'\]/g,
  "usageScenarios: ['日常支付', '资产配置', '风险保障', '融资需求', '财富管理'],"
);

// 修复valueChain位置问题
content = content.replace(
  /    }\s*valueChain: '金融生态系统的核心枢纽，连接资金供需双方'/g,
  "      valueChain: '金融生态系统的核心枢纽，连接资金供需双方'\n    },"
);

// 写回文件
fs.writeFileSync('app.js', content);
console.log('最终语法修复完成！');