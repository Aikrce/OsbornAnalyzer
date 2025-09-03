const fs = require('fs');

console.log('开始全面修复app.js语法错误...');

// 读取文件
let content = fs.readFileSync('app.js', 'utf8');

// 1. 修复所有缺少逗号的title属性
content = content.replace(/title: "([^"]+)"\s*description:/g, 'title: "$1",\n      description:');

// 2. 修复所有缺少逗号的description属性
content = content.replace(/description: "([^"]+)"\s*cases:/g, 'description: "$1",\n      cases:');

// 3. 修复数组中缺少逗号的字符串元素
content = content.replace(/"([^"]+)"\s+"([^"]+)"/g, '"$1",\n        "$2"');

// 4. 修复三个连续字符串的情况
content = content.replace(/"([^"]+)",\s*"([^"]+)"\s+"([^"]+)"/g, '"$1",\n        "$2",\n        "$3"');

// 5. 修复四个连续字符串的情况
content = content.replace(/"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s+"([^"]+)"/g, '"$1",\n        "$2",\n        "$3",\n        "$4"');

// 6. 修复对象属性缺少逗号的问题
content = content.replace(/(\w+): '([^']+)'\s+(\w+):/g, '$1: \'$2\',\n      $3:');
content = content.replace(/(\w+): "([^"]+)"\s+(\w+):/g, '$1: "$2",\n      $3:');

// 7. 修复数组缺少逗号的问题
content = content.replace(/\[([^[\]]+)\]/g, (match, arrayContent) => {
  // 如果数组内容包含引号，添加逗号
  if (arrayContent.includes('"') || arrayContent.includes("'")) {
    const fixed = arrayContent.replace(/(['"])[^'"]*\1\s+(?=['"])/g, '$&,');
    return `[${fixed}]`;
  }
  return match;
});

// 8. 修复对象结尾缺少逗号的问题
content = content.replace(/}\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '},\n    $1:');

// 9. 修复函数定义前缺少逗号的问题
content = content.replace(/}\s*\(function/g, '},\n\n(function');

// 10. 清理多余的逗号
content = content.replace(/,(\s*[}\]])/g, '$1');

// 写回文件
fs.writeFileSync('app.js', content);
console.log('全面语法修复完成！');