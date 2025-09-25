import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useResponsive } from '../../hooks/useResponsive';
import IndustryCategoryCard from './IndustryCategoryCard';
import CaseTagManager from './CaseTagManager';
import { 
  EnhancedLocalCase, 
  IndustryCategory, 
  CaseViewMode, 
  CaseSortOption,
  CaseFilterOptions 
} from '../../types/case';
import { 
  filterCases, 
  sortCases, 
  getAllIndustryCategories,
  updateIndustryCategoryStats 
} from '../../utils/caseClassification';
import { 
  IconGrid, 
  IconList, 
  IconCategory, 
  IconSearch, 
  IconFilter,
  IconSortAscending,
  IconHeart,
  IconHeartFilled,
  IconEye,
  IconDownload,
  IconTrash,
  IconEdit
} from '@tabler/icons-react';

interface CaseClassificationViewProps {
  cases: EnhancedLocalCase[];
  onCaseClick: (caseId: string) => void;
  onCaseEdit?: (caseId: string) => void;
  onCaseDelete?: (caseId: string) => void;
  onCaseFavorite?: (caseId: string) => void;
  onCaseDownload?: (caseId: string) => void;
  className?: string;
}

const CaseClassificationView: React.FC<CaseClassificationViewProps> = ({
  cases,
  onCaseClick,
  onCaseEdit,
  onCaseDelete,
  onCaseFavorite,
  onCaseDownload,
  className = ''
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [viewMode, setViewMode] = useState<CaseViewMode>('category');
  const [sortBy, setSortBy] = useState<CaseSortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 获取行业分类数据
  const industryCategories = useMemo(() => {
    return updateIndustryCategoryStats(getAllIndustryCategories(), cases);
  }, [cases]);

  // 构建筛选选项
  const filterOptions: CaseFilterOptions = useMemo(() => ({
    industry: selectedIndustry || undefined,
    subcategory: selectedSubcategory || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    isFavorite: showFavoritesOnly ? true : undefined,
    searchQuery: searchQuery || undefined
  }), [selectedIndustry, selectedSubcategory, selectedTags, showFavoritesOnly, searchQuery]);

  // 筛选和排序案例
  const filteredAndSortedCases = useMemo(() => {
    const filtered = filterCases(cases, filterOptions);
    return sortCases(filtered, sortBy);
  }, [cases, filterOptions, sortBy]);

  // 处理行业分类点击
  const handleIndustryClick = useCallback((industryId: string) => {
    setSelectedIndustry(industryId);
    setSelectedSubcategory('');
    setViewMode('list');
  }, []);

  // 处理标签点击
  const handleTagClick = useCallback((tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }, [selectedTags]);

  // 清除筛选
  const handleClearFilters = useCallback(() => {
    setSelectedIndustry('');
    setSelectedSubcategory('');
    setSelectedTags([]);
    setShowFavoritesOnly(false);
    setSearchQuery('');
  }, []);

  // 获取所有标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    cases.forEach(caseItem => {
      caseItem.tags.forEach(tag => tagSet.add(tag));
      caseItem.customTags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [cases]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 控制栏 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          <div className={`flex flex-col gap-4 ${isMobile ? '' : 'lg:flex-row'}`}>
            {/* 搜索 */}
            <div className="flex-1">
              <div className="relative">
                <IconSearch size={isMobile ? 18 : 20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索案例..."
                  className={`pl-10 ${isMobile ? 'text-sm' : ''}`}
                />
              </div>
            </div>

            {/* 视图模式切换 */}
            <div className={`flex items-center ${isMobile ? 'justify-center' : 'space-x-2'}`}>
              <Button
                variant={viewMode === 'category' ? 'default' : 'outline'}
                size={isMobile ? 'sm' : 'sm'}
                onClick={() => setViewMode('category')}
                className={isMobile ? 'flex-1' : ''}
              >
                <IconCategory size={isMobile ? 14 : 16} />
                {isMobile && <span className="ml-1 text-xs">分类</span>}
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size={isMobile ? 'sm' : 'sm'}
                onClick={() => setViewMode('grid')}
                className={isMobile ? 'flex-1' : ''}
              >
                <IconGrid size={isMobile ? 14 : 16} />
                {isMobile && <span className="ml-1 text-xs">网格</span>}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size={isMobile ? 'sm' : 'sm'}
                onClick={() => setViewMode('list')}
                className={isMobile ? 'flex-1' : ''}
              >
                <IconList size={isMobile ? 14 : 16} />
                {isMobile && <span className="ml-1 text-xs">列表</span>}
              </Button>
            </div>

            {/* 排序 */}
            <Select value={sortBy} onValueChange={(value: CaseSortOption) => setSortBy(value)}>
              <SelectTrigger className={isMobile ? 'w-full' : 'w-40'}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">最新</SelectItem>
                <SelectItem value="oldest">最旧</SelectItem>
                <SelectItem value="title">标题</SelectItem>
                <SelectItem value="industry">行业</SelectItem>
                <SelectItem value="favorite">收藏</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 筛选器 */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <IconFilter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">筛选:</span>
            </div>

            {/* 行业筛选 */}
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="行业" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">全部行业</SelectItem>
                {industryCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 收藏筛选 */}
            <Button
              variant={showFavoritesOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              {showFavoritesOnly ? <IconHeartFilled size={16} /> : <IconHeart size={16} />}
              收藏
            </Button>

            {/* 清除筛选 */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
            >
              清除筛选
            </Button>
          </div>

          {/* 活跃筛选标签 */}
          {(selectedIndustry || selectedTags.length > 0 || showFavoritesOnly) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedIndustry && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  行业: {industryCategories.find(c => c.id === selectedIndustry)?.name}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedIndustry('')}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-green-100 text-green-800">
                  标签: {tag}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    ×
                  </Button>
                </Badge>
              ))}
              {showFavoritesOnly && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  仅收藏
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowFavoritesOnly(false)}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    ×
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 内容区域 */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as CaseViewMode)}>
        <TabsContent value="category" className="mt-0">
          {/* 行业分类视图 */}
          <div className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : isTablet 
                ? 'grid-cols-2' 
                : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {industryCategories.map(category => (
              <IndustryCategoryCard
                key={category.id}
                category={category}
                onClick={handleIndustryClick}
                showSubcategories={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grid" className="mt-0">
          {/* 网格视图 */}
          <div className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : isTablet 
                ? 'grid-cols-2' 
                : 'grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredAndSortedCases.map(caseItem => (
              <Card key={caseItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {caseItem.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      {caseItem.isFavorite && (
                        <IconHeartFilled size={16} className="text-red-500" />
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseFavorite?.(caseItem.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        {caseItem.isFavorite ? <IconHeartFilled size={14} /> : <IconHeart size={14} />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">
                      {industryCategories.find(c => c.id === caseItem.industry)?.name || caseItem.industry}
                    </Badge>
                    <span>{caseItem.company}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {caseItem.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {caseItem.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {caseItem.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{caseItem.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(caseItem.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseEdit?.(caseItem.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <IconEdit size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseDownload?.(caseItem.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <IconDownload size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseDelete?.(caseItem.id);
                        }}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <IconTrash size={12} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          {/* 列表视图 */}
          <div className="space-y-4">
            {filteredAndSortedCases.map(caseItem => (
              <Card key={caseItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {caseItem.title}
                        </h3>
                        {caseItem.isFavorite && (
                          <IconHeartFilled size={16} className="text-red-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {caseItem.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>行业: {industryCategories.find(c => c.id === caseItem.industry)?.name || caseItem.industry}</span>
                        <span>公司: {caseItem.company}</span>
                        <span>创建: {new Date(caseItem.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {caseItem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {caseItem.customTags.map((tag, index) => (
                          <Badge key={`custom-${index}`} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseFavorite?.(caseItem.id);
                        }}
                      >
                        {caseItem.isFavorite ? <IconHeartFilled size={16} /> : <IconHeart size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseEdit?.(caseItem.id);
                        }}
                      >
                        <IconEdit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseDownload?.(caseItem.id);
                        }}
                      >
                        <IconDownload size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCaseDelete?.(caseItem.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <IconTrash size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 标签管理 */}
      <CaseTagManager
        tags={allTags}
        customTags={[]}
        onTagsChange={() => {}}
        onCustomTagsChange={() => {}}
        onTagClick={handleTagClick}
        showManageMode={false}
      />
    </div>
  );
};

export default CaseClassificationView;
