// 奥斯本创新九问工具 - 性能优化版本

// 性能优化工具类
class PerformanceOptimizer {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // 批量DOM更新
    static batchDOMUpdate(callback) {
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                callback();
                resolve();
            });
        });
    }
}

// DOM管理器 - 缓存和优化DOM操作
class DOMManager {
    constructor() {
        this.cache = new Map();
        this.fragments = new Map();
    }
    
    getElement(id) {
        if (!this.cache.has(id)) {
            const element = document.getElementById(id);
            if (element) {
                this.cache.set(id, element);
            }
        }
        return this.cache.get(id) || null;
    }
    
    createElement(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }
    
    createFragment(items, createItemCallback) {
        const fragment = document.createDocumentFragment();
        items.forEach(item => {
            const element = createItemCallback(item);
            fragment.appendChild(element);
        });
        return fragment;
    }
    
    clearCache() {
        this.cache.clear();
        this.fragments.clear();
    }
}

// 奥斯本检核表法案例数据库
const osbornCaseDatabase = {
    ta: { 
        title: "他用",
        description: "探索其他用途和应用场景",
        cases: [
            "花生300种用途：从食品到工业原料的全面应用",
            "X射线技术迁移：从医疗诊断扩展到安检和材料检测",
            "GPS技术民用：从军事导航到日常生活导航",
            "激光技术多元化：从科研工具到医疗、工业、娱乐应用",
            "超声波技术扩展：从医疗检查到清洁、焊接、测距"
        ]
    },
    jie: { 
        title: "借用",
        description: "借鉴其他领域的做法和原理",
        cases: [
            "微爆破技术医疗应用：医生引入微爆破技术消除肾结石",
            "电吹风工业应用：借鉴到工业生产中用于快速烘干油漆",
            "3D食品打印机：将3D打印技术借鉴到食品加工领域",
            "仿生学设计：借鉴动植物结构设计飞机、建筑、材料",
            "游戏化教育：将游戏机制借用到教育培训中"
        ]
    },
    gai: { 
        title: "改变",
        description: "改变形态、流程、规则或属性",
        cases: [
            "福特汽车颜色变化：从单一黑色到多彩选择",
            "平面镜变哈哈镜：改变镜面形状创造娱乐效果",
            "传统教育在线化：改变教学形式和互动方式",
            "纸质媒体数字化：改变信息传播载体和形式",
            "现金支付电子化：改变交易方式和支付流程"
        ]
    },
    kuo: { 
        title: "扩大",
        description: "扩大规模、功能、影响范围",
        cases: [
            "药物牙膏：在普通牙膏基础上增加药物功能",
            "防弹玻璃创新：扩大玻璃的防护功能和应用范围",
            "智能手机功能扩展：从通讯工具到生活助手",
            "电商平台生态化：从购物网站到综合服务平台",
            "社交媒体多元化：从交流工具到商业营销平台"
        ]
    },
    suo: { 
        title: "缩小",
        description: "简化、专注核心功能、便携化",
        cases: [
            "袖珍收音机：将大型收音机微型化便携化",
            "微型医疗器械：缩小医疗设备体积提高便携性",
            "迷你电脑：将台式机功能压缩到小型设备",
            "便携式投影仪：缩小传统投影设备体积",
            "折叠自行车：缩小存储空间提高便携性"
        ]
    },
    ti: { 
        title: "替代",
        description: "替代材料、方法、技术或流程",
        cases: [
            "纸质铅笔：用纸卷替代木材制作铅笔外壳",
            "植物基人造肉：用植物蛋白替代动物蛋白",
            "电子书替代纸书：用数字媒体替代纸质载体",
            "LED替代白炽灯：用半导体照明替代传统照明",
            "电动车替代燃油车：用电力驱动替代燃油驱动"
        ]
    },
    tiao: { 
        title: "调整",
        description: "调整顺序、结构、流程或时间",
        cases: [
            "飞机螺旋桨位置调整：改变螺旋桨安装位置提高效率",
            "生产线重组：调整生产流程顺序提高效率",
            "网站布局优化：调整页面元素位置改善用户体验",
            "工作流程再造：重新安排工作步骤提高效率",
            "供应链优化：调整供应商顺序和配送路径"
        ]
    },
    dao: { 
        title: "颠倒",
        description: "颠倒关系、反转思维、逆向操作",
        cases: [
            "电动机发明：颠倒发电机原理创造电动机",
            "反向拍卖模式：买家出价卖家竞争的颠倒模式",
            "逆向物流：从消费者到生产者的反向供应链",
            "反向学习：从结果推导过程的教学方法",
            "逆向工程：从产品分析设计和制造过程"
        ]
    },
    he: { 
        title: "合并",
        description: "合并、组合、联动、集成",
        cases: [
            "带橡皮铅笔：将铅笔和橡皮合并为一体",
            "智能手机集成：将电话、相机、电脑等功能合并",
            "一体化办公软件：将文档、表格、演示合并",
            "智能家居系统：将各种家电设备联网集成",
            "移动支付生态：将支付、理财、生活服务合并"
        ]
    }
};

// 行业专业模板（简化版）
const industryTemplates = {
    "科技产品": {
        coreFunction: "通过技术创新解决用户痛点，提升效率和体验",
        keyAttributes: ["创新性", "易用性", "可靠性", "扩展性", "安全性"],
        currentForm: "软件应用、硬件设备、平台服务、技术解决方案",
        targetUsers: "个人用户、企业客户、开发者、技术爱好者",
        usageScenarios: ["日常使用", "工作协作", "娱乐休闲", "学习提升", "问题解决"]
    },
    "默认": {
        coreFunction: "提供核心价值和服务",
        keyAttributes: ["实用性", "可靠性", "易用性"],
        currentForm: "产品或服务",
        targetUsers: "目标用户群体",
        usageScenarios: ["主要使用场景"]
    }
};

// 主应用类
class OsbornApp {
    constructor() {
        this.domManager = new DOMManager();
        this.analysisCache = new Map();
        this.isAnalyzing = false;
        
        // 防抖的分析函数
        this.debouncedAnalyze = PerformanceOptimizer.debounce(
            this.performAnalysis.bind(this), 
            500
        );
        
        this.init();
    }
    
    async init() {
        console.log('初始化奥斯本创新九问工具...');
        
        // 等待DOM加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }
    
    setupApp() {
        try {
            this.setupEventListeners();
            this.loadSavedApiKey();
            this.setupPageTabs();
            console.log('应用初始化完成');
        } catch (error) {
            console.error('应用初始化失败:', error);
            this.showNotification('应用初始化失败，请刷新页面重试', 'error');
        }
    }
    
    setupEventListeners() {
        // API密钥保存
        const apiKeyInput = this.domManager.getElement('apiKeyInput');
        if (apiKeyInput) {
            apiKeyInput.addEventListener('blur', (e) => {
                if (e.target.value.trim()) {
                    localStorage.setItem('deepseek_api_key', e.target.value.trim());
                }
            });
        }
    }
    
    loadSavedApiKey() {
        const savedApiKey = localStorage.getItem('deepseek_api_key');
        const apiKeyInput = this.domManager.getElement('apiKeyInput');
        if (savedApiKey && apiKeyInput) {
            apiKeyInput.value = savedApiKey;
        }
    }
    
    setupPageTabs() {
        const pageTabs = document.querySelectorAll('.page-tab');
        pageTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchPage(e.target.getAttribute('data-page'));
            });
        });
    }
    
    switchPage(pageId) {
        // 移除所有active类
        document.querySelectorAll('.page-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 添加当前active类
        document.querySelector(`[data-page="${pageId}"]`)?.classList.add('active');
        
        // 切换页面内容
        const pages = ['keywordAnalysis', 'gridAnalysis'];
        pages.forEach(id => {
            const page = this.domManager.getElement(id);
            if (page) {
                page.classList.toggle('active', id === pageId);
            }
        });
    }
    
    async startAnalysis() {
        if (this.isAnalyzing) {
            this.showNotification('分析正在进行中，请稍候...', 'warning');
            return;
        }
        
        const topicInput = this.domManager.getElement('topicInput');
        const topic = topicInput?.value?.trim();
        
        if (!topic) {
            this.showNotification('请输入分析主题', 'warning');
            return;
        }
        
        await this.debouncedAnalyze(topic);
    }
    
    async performAnalysis(topic) {
        this.isAnalyzing = true;
        this.setLoadingState(true);
        
        try {
            // 检查缓存
            const cacheKey = `analysis_${topic}`;
            let results = this.analysisCache.get(cacheKey);
            
            if (!results) {
                // 并行执行分析任务
                const [keywordAnalysis, gridSuggestions] = await Promise.all([
                    this.analyzeKeywords(topic),
                    this.generateGridSuggestions(topic)
                ]);
                
                results = { keywordAnalysis, gridSuggestions };
                this.analysisCache.set(cacheKey, results);
            }
            
            // 批量更新UI
            await this.updateUI(results, topic);
            
            this.showNotification('分析完成！', 'success');
            
        } catch (error) {
            console.error('分析失败:', error);
            this.showNotification('分析失败，请重试', 'error');
        } finally {
            this.isAnalyzing = false;
            this.setLoadingState(false);
        }
    }
    
    async analyzeKeywords(topic) {
        // 简化的关键词分析
        const template = this.matchIndustryTemplate(topic);
        return {
            coreFunction: template.coreFunction.replace(/通用/, topic),
            keyAttributes: template.keyAttributes,
            currentForm: template.currentForm,
            targetUsers: template.targetUsers,
            usageScenarios: template.usageScenarios
        };
    }
    
    matchIndustryTemplate(topic) {
        const topicLower = topic.toLowerCase();
        
        if (topicLower.includes('智能') || topicLower.includes('AI') || 
            topicLower.includes('软件') || topicLower.includes('技术')) {
            return industryTemplates["科技产品"];
        }
        
        return industryTemplates["默认"];
    }
    
    async generateGridSuggestions(topic) {
        const dimensions = ['ta', 'jie', 'gai', 'kuo', 'suo', 'ti', 'tiao', 'dao', 'he'];
        const suggestions = {};
        
        // 分批处理，避免阻塞UI
        for (let i = 0; i < dimensions.length; i += 3) {
            const batch = dimensions.slice(i, i + 3);
            
            batch.forEach(dim => {
                suggestions[dim] = this.generateSuggestionForDimension(topic, dim);
            });
            
            // 让出控制权
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        
        return suggestions;
    }
    
    generateSuggestionForDimension(topic, dimension) {
        const cases = osbornCaseDatabase[dimension]?.cases || [];
        const selectedCases = cases.slice(0, 3); // 只取前3个，提高性能
        
        return selectedCases.map(caseExample => {
            const rules = {
                'ta': `探索${topic}在其他领域的应用`,
                'jie': `借鉴其他行业做法应用到${topic}`,
                'gai': `改变${topic}的现有形态`,
                'kuo': `扩大${topic}的功能范围`,
                'suo': `简化${topic}的复杂度`,
                'ti': `寻找${topic}的替代方案`,
                'tiao': `调整${topic}的流程结构`,
                'dao': `颠倒${topic}的使用方式`,
                'he': `将${topic}与其他服务整合`
            };
            
            return `${rules[dimension]}：参考${caseExample.split('：')[0]}`;
        });
    }
    
    async updateUI(results, topic) {
        await PerformanceOptimizer.batchDOMUpdate(() => {
            this.displayKeywordAnalysis(results.keywordAnalysis);
            this.displayGridSuggestions(results.gridSuggestions);
            this.updateTopicDisplay(topic);
        });
    }
    
    displayKeywordAnalysis(analysis) {
        const dimensions = [
            { key: 'coreFunction', title: '核心功能', icon: '🎯', color: '#FF6B6B' },
            { key: 'keyAttributes', title: '关键属性', icon: '⭐', color: '#4ECDC4' },
            { key: 'currentForm', title: '现有形态', icon: '📦', color: '#45B7D1' },
            { key: 'targetUsers', title: '目标用户', icon: '👥', color: '#96CEB4' },
            { key: 'usageScenarios', title: '使用场景', icon: '🎬', color: '#FFEAA7' }
        ];
        
        const keywordGrid = this.domManager.getElement('keywordGrid');
        if (!keywordGrid) return;
        
        // 使用DocumentFragment优化DOM操作
        const fragment = this.domManager.createFragment(dimensions, (dim) => {
            const value = analysis[dim.key];
            const displayValue = Array.isArray(value) ? value.join('、') : value;
            
            return this.domManager.createElement('div', 'keyword-card', `
                <div class="keyword-header" style="border-left: 4px solid ${dim.color}">
                    <span class="keyword-icon">${dim.icon}</span>
                    <span class="keyword-title">${dim.title}</span>
                </div>
                <div class="keyword-content">${displayValue}</div>
            `);
        });
        
        keywordGrid.innerHTML = '';
        keywordGrid.appendChild(fragment);
    }
    
    displayGridSuggestions(suggestions) {
        const dimensionInfo = {
            'ta': { title: '能否他用', color: '#FF6B6B', icon: '🔄' },
            'jie': { title: '能否借用', color: '#4ECDC4', icon: '🤝' },
            'gai': { title: '能否改变', color: '#45B7D1', icon: '🔧' },
            'kuo': { title: '能否扩大', color: '#96CEB4', icon: '📈' },
            'suo': { title: '能否缩小', color: '#FFEAA7', icon: '📉' },
            'ti': { title: '能否替代', color: '#DDA0DD', icon: '🔀' },
            'tiao': { title: '能否调整', color: '#98D8C8', icon: '⚙️' },
            'dao': { title: '能否颠倒', color: '#F7DC6F', icon: '🔃' },
            'he': { title: '能否合并', color: '#F1948A', icon: '🔗' }
        };
        
        const gridContainer = this.domManager.getElement('gridContainer');
        if (!gridContainer) return;
        
        const fragment = this.domManager.createFragment(Object.keys(suggestions), (dim) => {
            const info = dimensionInfo[dim];
            const suggestionList = suggestions[dim].map(s => `<li>${s}</li>`).join('');
            
            return this.domManager.createElement('div', 'grid-item', `
                <div class="grid-header" style="border-top: 4px solid ${info.color}">
                    <span class="grid-icon">${info.icon}</span>
                    <span class="grid-title">${info.title}</span>
                </div>
                <div class="grid-content">
                    <ul>${suggestionList}</ul>
                </div>
            `);
        });
        
        gridContainer.innerHTML = '';
        gridContainer.appendChild(fragment);
    }
    
    updateTopicDisplay(topic) {
        const topicShow = this.domManager.getElement('topicShow');
        const dateShow = this.domManager.getElement('dateShow');
        
        if (topicShow) topicShow.textContent = topic;
        if (dateShow) dateShow.textContent = new Date().toLocaleDateString('zh-CN');
    }
    
    setLoadingState(isLoading) {
        const analyzeBtn = document.querySelector('.analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.disabled = isLoading;
            analyzeBtn.textContent = isLoading ? '分析中...' : '开始分析';
        }
    }
    
    showNotification(message, type = 'info') {
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };
        
        const notification = this.domManager.createElement('div', 'notification', message);
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // 下载功能（简化版）
    downloadKeywordAnalysis() {
        const element = this.domManager.getElement('keywordAnalysis');
        if (!element) {
            this.showNotification('没有可下载的内容', 'warning');
            return;
        }
        
        if (typeof html2canvas === 'function') {
            html2canvas(element, {
                backgroundColor: '#0d1421',
                scale: 1, // 降低scale提高性能
                useCORS: true
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `关键词分析_${new Date().toLocaleDateString('zh-CN')}.png`;
                link.href = canvas.toDataURL();
                link.click();
            }).catch(error => {
                console.error('下载失败:', error);
                this.showNotification('下载失败，请重试', 'error');
            });
        } else {
            this.showNotification('下载功能不可用', 'warning');
        }
    }
    
    downloadGridAnalysis() {
        const element = this.domManager.getElement('gridAnalysis');
        if (!element) {
            this.showNotification('没有可下载的内容', 'warning');
            return;
        }
        
        if (typeof html2canvas === 'function') {
            html2canvas(element, {
                backgroundColor: '#0d1421',
                scale: 1,
                useCORS: true
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `九宫格分析_${new Date().toLocaleDateString('zh-CN')}.png`;
                link.href = canvas.toDataURL();
                link.click();
            }).catch(error => {
                console.error('下载失败:', error);
                this.showNotification('下载失败，请重试', 'error');
            });
        } else {
            this.showNotification('下载功能不可用', 'warning');
        }
    }
    
    clearAll() {
        if (!confirm('确定要清空所有内容吗？')) return;
        
        const topicInput = this.domManager.getElement('topicInput');
        const keywordGrid = this.domManager.getElement('keywordGrid');
        const gridContainer = this.domManager.getElement('gridContainer');
        const topicShow = this.domManager.getElement('topicShow');
        const dateShow = this.domManager.getElement('dateShow');
        
        if (topicInput) topicInput.value = '';
        if (keywordGrid) keywordGrid.innerHTML = '';
        if (gridContainer) gridContainer.innerHTML = '';
        if (topicShow) topicShow.textContent = '';
        if (dateShow) dateShow.textContent = '';
        
        // 清空缓存
        this.analysisCache.clear();
        this.domManager.clearCache();
        
        this.showNotification('已清空所有内容', 'success');
    }
}

// 全局应用实例
let app;

// 初始化应用
function initApp() {
    try {
        app = new OsbornApp();
        window.osbornApp = app; // 调试用
    } catch (error) {
        console.error('应用启动失败:', error);
    }
}

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    if (app) {
        app.domManager.clearCache();
        app.analysisCache.clear();
    }
});

// 暴露全局函数（兼容现有HTML）
window.startAnalysis = () => app?.startAnalysis();
window.downloadKeywordAnalysis = () => app?.downloadKeywordAnalysis();
window.downloadGridAnalysis = () => app?.downloadGridAnalysis();
window.clearAll = () => app?.clearAll();
window.showKeywordAnalysis = () => app?.switchPage('keywordAnalysis');
window.showGridAnalysis = () => app?.switchPage('gridAnalysis');

// 启动应用
initApp();

// 添加CSS动画
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
.notification {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
}
`;
document.head.appendChild(style);