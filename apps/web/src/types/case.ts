// 案例分类相关类型定义

// 行业分类接口
export interface IndustryCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subcategories: string[];
  caseCount: number;
}

// 扩展的案例接口
export interface EnhancedLocalCase {
  id: string;
  title: string;
  topic: string;
  description: string;
  industry: string;
  subcategory?: string; // 新增：子分类
  company: string;
  tags: string[];
  customTags: string[]; // 新增：自定义标签
  createdAt: Date;
  updatedAt: Date;
  analysisData?: Record<string, unknown>;
  isFavorite?: boolean; // 新增：收藏状态
}

// 案例分类统计
export interface CaseClassificationStats {
  totalCases: number;
  byIndustry: Record<string, number>;
  bySubcategory: Record<string, number>;
  byTag: Record<string, number>;
  byCustomTag: Record<string, number>;
  recentCases: number;
  topTags: string[];
  topCustomTags: string[];
  favoriteCases: number;
}

// 案例筛选选项
export interface CaseFilterOptions {
  industry?: string;
  subcategory?: string;
  tags?: string[];
  customTags?: string[];
  isFavorite?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

// 预设行业分类数据
export const PRESET_INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    id: 'education',
    name: '教育',
    icon: 'IconSchool',
    color: 'blue',
    description: '教育行业创新案例',
    subcategories: ['在线教育', '职业教育', 'K12教育', '高等教育', '教育科技'],
    caseCount: 0
  },
  {
    id: 'healthcare',
    name: '医疗',
    icon: 'IconHeart',
    color: 'red',
    description: '医疗健康行业创新案例',
    subcategories: ['远程医疗', '医疗设备', '生物技术', '数字健康', '医疗AI'],
    caseCount: 0
  },
  {
    id: 'finance',
    name: '金融',
    icon: 'IconCurrencyDollar',
    color: 'green',
    description: '金融科技行业创新案例',
    subcategories: ['移动支付', '区块链', '保险科技', '投资管理', '银行科技'],
    caseCount: 0
  },
  {
    id: 'engineering',
    name: '工程',
    icon: 'IconTools',
    color: 'orange',
    description: '工程技术行业创新案例',
    subcategories: ['建筑工程', '机械工程', '电子工程', '软件工程', '环境工程'],
    caseCount: 0
  },
  {
    id: 'retail',
    name: '零售',
    icon: 'IconShoppingCart',
    color: 'purple',
    description: '零售电商行业创新案例',
    subcategories: ['电商平台', '新零售', '供应链', '营销科技', '客户体验'],
    caseCount: 0
  },
  {
    id: 'technology',
    name: '科技',
    icon: 'IconCpu',
    color: 'indigo',
    description: '科技互联网行业创新案例',
    subcategories: ['人工智能', '云计算', '物联网', '大数据', '移动应用'],
    caseCount: 0
  },
  {
    id: 'manufacturing',
    name: '制造',
    icon: 'IconBuilding',
    color: 'gray',
    description: '制造业创新案例',
    subcategories: ['智能制造', '工业4.0', '自动化', '质量控制', '供应链管理'],
    caseCount: 0
  },
  {
    id: 'other',
    name: '其他',
    icon: 'IconDots',
    color: 'slate',
    description: '其他行业创新案例',
    subcategories: ['政府服务', '文化娱乐', '旅游', '农业', '能源'],
    caseCount: 0
  }
];

// 案例视图模式
export type CaseViewMode = 'grid' | 'list' | 'category';

// 案例排序选项
export type CaseSortOption = 'newest' | 'oldest' | 'title' | 'industry' | 'favorite';
