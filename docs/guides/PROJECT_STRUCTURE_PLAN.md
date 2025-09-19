# 项目结构重组计划

## 🎯 目标
将混乱的项目结构重新组织为清晰的分区，便于开发和维护。

## 📁 新的目录结构

```
OsbornAnalyzer/
├── web/                          # 网页版 (主要产品)
│   ├── src/                      # 源代码
│   ├── public/                   # 静态资源
│   ├── config/                   # 配置文件
│   ├── package.json              # 依赖管理
│   ├── vite.config.ts            # 构建配置
│   ├── tailwind.config.js        # 样式配置
│   └── README.md                 # 网页版说明
│
├── mobile/                       # 移动端 (iOS App)
│   ├── OsbornApp/                # iOS项目文件
│   ├── OsbornApp.xcodeproj/      # Xcode项目
│   └── README.md                 # 移动端说明
│
├── tools/                        # 开发工具
│   ├── project-diagnosis-tool/   # 项目诊断工具
│   └── scripts/                  # 通用脚本
│
├── docs/                         # 统一文档
│   ├── web/                      # 网页版文档
│   ├── mobile/                   # 移动端文档
│   ├── api/                      # API文档
│   └── deployment/               # 部署文档
│
├── archives/                     # 历史文件
│   ├── old-configs/              # 旧配置文件
│   └── deprecated/               # 废弃文件
│
├── .github/                      # GitHub配置
├── .gitignore                    # Git忽略规则
└── README.md                     # 项目总览
```

## 🔄 迁移步骤

1. 创建新的目录结构
2. 移动网页版文件到 web/ 目录
3. 移动iOS项目到 mobile/ 目录
4. 整理工具和文档
5. 更新配置文件路径
6. 测试各分区功能
7. 清理根目录

## ✅ 预期效果

- 清晰的项目边界
- 独立的开发环境
- 统一的文档管理
- 便于团队协作
- 易于维护和扩展
