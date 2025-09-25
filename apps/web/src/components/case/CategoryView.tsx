import React, { useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  IconBooks, 
  IconTag, 
  IconTrendingUp, 
  IconSparkles, 
  IconTarget, 
  IconCalendar,
  IconArrowLeft
} from '@tabler/icons-react';
import { useResponsive } from '../../hooks/useResponsive';

interface CategoryViewProps {
  cases: any[];
  onCategoryClick: (categoryId: string, filteredCases: any[]) => void;
  onBackToCategories: () => void;
  selectedCategory: string | null;
  categoryFilteredCases: any[];
}

const CategoryView: React.FC<CategoryViewProps> = ({
  cases,
  onCategoryClick,
  onBackToCategories,
  selectedCategory,
  categoryFilteredCases
}) => {
  const { isMobile } = useResponsive();

  // 行业分类定义
  const industryCategories = useMemo(() => [
    {
      id: 'education',
      name: '教育行业',
      keywords: ['教育', '学校', '培训', '学习', '课程', '教学', '学生', '老师'],
      color: 'blue',
      icon: IconBooks
    },
    {
      id: 'healthcare',
      name: '医疗健康',
      keywords: ['医疗', '健康', '医院', '医生', '病人', '治疗', '药物', '康复'],
      color: 'green',
      icon: IconTag
    },
    {
      id: 'finance',
      name: '金融服务',
      keywords: ['金融', '银行', '投资', '保险', '理财', '贷款', '支付', '货币'],
      color: 'purple',
      icon: IconTrendingUp
    },
    {
      id: 'technology',
      name: '科技创新',
      keywords: ['科技', '创新', '技术', '软件', '硬件', '互联网', '人工智能', '数据'],
      color: 'indigo',
      icon: IconSparkles
    },
    {
      id: 'business',
      name: '商业管理',
      keywords: ['商业', '管理', '企业', '公司', '市场', '销售', '运营', '战略'],
      color: 'orange',
      icon: IconTarget
    },
    {
      id: 'lifestyle',
      name: '生活服务',
      keywords: ['生活', '服务', '娱乐', '旅游', '餐饮', '购物', '家居', '时尚'],
      color: 'pink',
      icon: IconCalendar
    }
  ], []);

  // 计算每个分类的案例数量
  const getCategoryStats = useCallback(() => {
    return industryCategories.map(category => {
      const count = cases.filter(caseItem => {
        const searchText = `${caseItem.title} ${caseItem.description} ${caseItem.tags.join(' ')}`.toLowerCase();
        return category.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
      }).length;
      return { ...category, count };
    });
  }, [cases, industryCategories]);

  // 处理分类点击
  const handleCategoryClick = useCallback((categoryId: string) => {
    const category = industryCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    const filtered = cases.filter(caseItem => {
      const searchText = `${caseItem.title} ${caseItem.description} ${caseItem.tags.join(' ')}`.toLowerCase();
      return category.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    });

    onCategoryClick(categoryId, filtered);
  }, [cases, industryCategories, onCategoryClick]);

  // 颜色类映射
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        text: 'text-blue-600',
        icon: 'text-blue-500',
        count: 'text-blue-700',
        hint: 'text-blue-600'
      },
      green: {
        bg: 'from-green-50 to-green-100',
        border: 'border-green-200',
        text: 'text-green-600',
        icon: 'text-green-500',
        count: 'text-green-700',
        hint: 'text-green-600'
      },
      purple: {
        bg: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        text: 'text-purple-600',
        icon: 'text-purple-500',
        count: 'text-purple-700',
        hint: 'text-purple-600'
      },
      indigo: {
        bg: 'from-indigo-50 to-indigo-100',
        border: 'border-indigo-200',
        text: 'text-indigo-600',
        icon: 'text-indigo-500',
        count: 'text-indigo-700',
        hint: 'text-indigo-600'
      },
      orange: {
        bg: 'from-orange-50 to-orange-100',
        border: 'border-orange-200',
        text: 'text-orange-600',
        icon: 'text-orange-500',
        count: 'text-orange-700',
        hint: 'text-orange-600'
      },
      pink: {
        bg: 'from-pink-50 to-pink-100',
        border: 'border-pink-200',
        text: 'text-pink-600',
        icon: 'text-pink-500',
        count: 'text-pink-700',
        hint: 'text-pink-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  if (selectedCategory) {
    // 显示分类筛选结果
    const category = industryCategories.find(cat => cat.id === selectedCategory);
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/20">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToCategories}
            className="flex items-center gap-2"
          >
            <IconArrowLeft size={16} />
            {isMobile ? '返回' : '返回分类'}
          </Button>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category?.name} 相关案例
            </h3>
            <p className="text-sm text-gray-600">
              找到 {categoryFilteredCases.length} 个相关案例
            </p>
          </div>
        </div>

        {categoryFilteredCases.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <IconTag size={24} className="text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">暂无相关案例</h4>
            <p className="text-gray-600">该分类下暂时没有相关案例</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryFilteredCases.map((caseItem) => (
              <Card 
                key={caseItem.id} 
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-gray-50/50"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2">
                    {caseItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(caseItem.createdAt).toLocaleDateString()}</span>
                    <span>{caseItem.tags.length} 个标签</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 显示分类视图
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/20">
      <div className="text-center mb-8">
        <IconTag size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">智能分类</h3>
        <p className="text-gray-600">按行业领域和标签智能分类展示案例</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCategoryStats().map((category) => {
          const IconComponent = category.icon;
          const colors = getColorClasses(category.color);

          return (
            <div 
              key={category.id}
              className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border ${colors.border} cursor-pointer hover:shadow-lg transition-all duration-200`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`font-semibold ${colors.text}`}>
                  {category.name}
                </div>
                <IconComponent size={20} className={colors.icon} />
              </div>
              <div className={`text-sm mb-2 ${colors.count}`}>
                {category.count} 个案例
              </div>
              <div className={`text-xs ${colors.hint}`}>
                {category.count > 0 ? '点击查看详情' : '暂无相关案例'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryView;
