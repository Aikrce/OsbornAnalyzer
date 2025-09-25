import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { IndustryCategory } from '../../types/case';
import { useResponsive } from '../../hooks/useResponsive';
import { 
  IconSchool, 
  IconHeart, 
  IconCurrencyDollar, 
  IconTools,
  IconShoppingCart,
  IconCpu,
  IconBuilding,
  IconDots,
  IconArrowRight,
  IconTrendingUp
} from '@tabler/icons-react';

// 图标映射
const iconMap: Record<string, React.ComponentType<any>> = {
  IconSchool,
  IconHeart,
  IconCurrencyDollar,
  IconTools,
  IconShoppingCart,
  IconCpu,
  IconBuilding,
  IconDots
};

// 颜色映射
const colorMap: Record<string, string> = {
  blue: 'text-blue-600 bg-blue-50 border-blue-200',
  red: 'text-red-600 bg-red-50 border-red-200',
  green: 'text-green-600 bg-green-50 border-green-200',
  orange: 'text-orange-600 bg-orange-50 border-orange-200',
  purple: 'text-purple-600 bg-purple-50 border-purple-200',
  indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  gray: 'text-gray-600 bg-gray-50 border-gray-200',
  slate: 'text-slate-600 bg-slate-50 border-slate-200'
};

interface IndustryCategoryCardProps {
  category: IndustryCategory;
  onClick: (categoryId: string) => void;
  showSubcategories?: boolean;
  className?: string;
}

const IndustryCategoryCard: React.FC<IndustryCategoryCardProps> = ({
  category,
  onClick,
  showSubcategories = false,
  className = ''
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const IconComponent = iconMap[category.icon] || IconDots;
  const colorClass = colorMap[category.color] || colorMap.slate;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 ${
        isMobile 
          ? 'hover:shadow-md active:scale-95' 
          : 'hover:shadow-lg hover:scale-105'
      } ${colorClass} ${className}`}
      onClick={() => onClick(category.id)}
    >
      <CardHeader className={`pb-3 ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className={`flex items-center ${isMobile ? 'flex-col space-y-3' : 'justify-between'}`}>
          <div className={`flex items-center ${isMobile ? 'flex-col text-center space-y-2' : 'space-x-3'}`}>
            <div className={`p-2 rounded-lg ${colorClass?.split(' ')[1] ?? ''}`}>
              <IconComponent size={isMobile ? 20 : 24} className={colorClass?.split(' ')[0] ?? ''} />
            </div>
            <div className={isMobile ? 'text-center' : ''}>
              <CardTitle className={`font-semibold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'}`}>
                {category.name}
              </CardTitle>
              <p className={`text-gray-600 mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {category.description}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-2 ${isMobile ? 'mt-2' : ''}`}>
            <Badge variant="secondary" className="bg-white/80 text-gray-700">
              {category.caseCount} 个案例
            </Badge>
            <IconArrowRight size={isMobile ? 14 : 16} className="text-gray-400" />
          </div>
        </div>
      </CardHeader>
      
      {showSubcategories && category.subcategories.length > 0 && (
        <CardContent className={`pt-0 ${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
          <div className="space-y-2">
            <div className={`flex items-center space-x-2 text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <IconTrendingUp size={isMobile ? 12 : 14} />
              <span>子分类</span>
            </div>
            <div className={`flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
              {category.subcategories.slice(0, isMobile ? 2 : 4).map((subcategory, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`bg-white/60 border-gray-300 ${isMobile ? 'text-xs px-2 py-1' : 'text-xs'}`}
                >
                  {subcategory}
                </Badge>
              ))}
              {category.subcategories.length > (isMobile ? 2 : 4) && (
                <Badge variant="outline" className={`bg-white/60 border-gray-300 ${isMobile ? 'text-xs px-2 py-1' : 'text-xs'}`}>
                  +{category.subcategories.length - (isMobile ? 2 : 4)} 更多
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default IndustryCategoryCard;
