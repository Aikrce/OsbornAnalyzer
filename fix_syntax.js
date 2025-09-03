const fs = require('fs');

// 读取app.js文件
let content = fs.readFileSync('app.js', 'utf8');

// 修复语法错误：将对象字面量中的 = 替换为 :
// 修复 valueChain = 为 valueChain:
content = content.replace(/(\s+)valueChain\s*=\s*([^,;]+)/g, '$1valueChain: $2');

// 修复 constraints = 为 constraints:
content = content.replace(/(\s+)constraints\s*=\s*(\[[^\]]+\])/g, '$1constraints: $2');

// 修复 usageScenarios = 为 usageScenarios:
content = content.replace(/(\s+)usageScenarios\s*=\s*(\[[^\]]+\])/g, '$1usageScenarios: $2');

// 修复 marketTrends = 为 marketTrends:
content = content.replace(/(\s+)marketTrends\s*=\s*(\[[^\]]+\])/g, '$1marketTrends: $2');

// 修复 competitiveAdvantage = 为 competitiveAdvantage:
content = content.replace(/(\s+)competitiveAdvantage\s*=\s*(\[[^\]]+\])/g, '$1competitiveAdvantage: $2');

// 修复 riskFactors = 为 riskFactors:
content = content.replace(/(\s+)riskFactors\s*=\s*(\[[^\]]+\])/g, '$1riskFactors: $2');

// 修复其他可能的属性赋值错误
content = content.replace(/(\s+)coreFunction\s*=\s*([^,;]+)/g, '$1coreFunction: $2');
content = content.replace(/(\s+)keyAttributes\s*=\s*(\[[^\]]+\])/g, '$1keyAttributes: $2');
content = content.replace(/(\s+)currentForm\s*=\s*([^,;]+)/g, '$1currentForm: $2');
content = content.replace(/(\s+)targetUsers\s*=\s*([^,;]+)/g, '$1targetUsers: $2');

// 检查并修复可能的括号不匹配问题
let openBraces = 0;
let lines = content.split('\n');
let fixedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // 计算大括号
  for (let char of line) {
    if (char === '{') openBraces++;
    if (char === '}') openBraces--;
  }
  
  fixedLines.push(line);
}

// 如果最后还有未闭合的大括号，添加闭合括号
if (openBraces > 0) {
  for (let i = 0; i < openBraces; i++) {
    fixedLines.push('  }');
  }
}

content = fixedLines.join('\n');

// 写回文件
fs.writeFileSync('app.js', content, 'utf8');

console.log('语法错误修复完成！');
console.log('修复的问题包括：');
console.log('- 对象字面量中的赋值操作符 = 改为属性定义 :');
console.log('- 检查并修复了括号匹配问题');