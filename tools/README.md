# HuiTu 工具集

本目录包含HuiTu项目的各种开发和管理工具。

## 🛠️ 工具列表

### 1. osborn-tool
**奥斯本分析工具**
- 独立的奥斯本九问分析工具
- 提供完整的奥斯本创新方法论支持
- 可用于独立分析和演示

**使用方法：**
```bash
cd osborn-tool
npm install
npm run dev
```

### 2. project-diagnosis
**项目诊断工具**
- 项目结构分析工具
- 代码质量检查工具
- 依赖关系分析工具

**使用方法：**
```bash
cd project-diagnosis
npm install
npm run dev
```

## 🚀 开发指南

### 工具开发原则
1. **独立性**：每个工具都应该能够独立运行
2. **可复用性**：工具应该可以在不同项目中复用
3. **文档完整**：每个工具都应该有完整的文档说明

### 添加新工具
1. 在 `tools/` 目录下创建新的工具目录
2. 添加 `README.md` 说明工具用途
3. 确保工具可以独立运行
4. 更新本README文件

## 📁 目录结构

```
tools/
├── README.md              # 本文件
├── osborn-tool/           # 奥斯本分析工具
│   ├── src/
│   ├── package.json
│   └── README.md
└── project-diagnosis/     # 项目诊断工具
    ├── src/
    ├── package.json
    └── README.md
```

## 🔧 维护说明

- 定期更新工具依赖
- 保持工具与主项目的兼容性
- 及时修复工具中的问题
- 添加新功能和改进

---

*如有问题或建议，请提交Issue或Pull Request。*
