/**
 * 统一案例库页面
 * 支持个人、团队、组织三种权限级别的案例管理
 */

import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUnifiedCases } from '../hooks/useUnifiedCases';
import { useResponsive } from '../hooks/useResponsive';
import { 
  IconSearch, 
  IconPlus, 
  IconUsers, 
  IconBuilding, 
  IconTemplate,
  IconEye,
  IconEdit,
  IconTrash,
  IconShare,
  IconDownload,
  IconClock,
  IconTag,
  IconTrendingUp,
  IconBooks
} from '@tabler/icons-react';
import { Permission, PermissionLevel } from '../types/unifiedCase';

const UnifiedCaseLibraryPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  
  // 使用统一案例库Hook
  const {
    cases,
    currentUser,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    permissionFilter,
    setPermissionFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    displayMode,
    setDisplayMode,
    filteredCases,
    categories,
    allTags,
    statistics,
    canView,
    canEdit,
    canDelete,
    canShare,
    getActiveEditors,
    getCollaborationStats,
    getPermissionLabel,
    getPermissionColor,
    getPermissionLevelLabel,
    getPermissionLevelColor
  } = useUnifiedCases();

  // 视图模式状态
  const [viewMode, setViewMode] = useState<'personal' | 'team' | 'organization' | 'templates'>('personal');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  // 处理案例点击
  const handleCaseClick = useCallback((caseId: string) => {
    if (canView(caseId)) {
      navigate(`/case-detail/${caseId}`);
    }
  }, [navigate, canView]);

  // 处理案例编辑
  const handleCaseEdit = useCallback((caseId: string) => {
    if (canEdit(caseId)) {
      navigate(`/case-edit/${caseId}`);
    }
  }, [navigate, canEdit]);

  // 处理案例删除
  const handleCaseDelete = useCallback((caseId: string) => {
    if (canDelete(caseId) && window.confirm('确定要删除这个案例吗？')) {
      // 这里应该调用deleteCase方法
      console.log('删除案例:', caseId);
    }
  }, [canDelete]);

  // 处理案例分享
  const handleCaseShare = useCallback((caseId: string) => {
    if (canShare(caseId)) {
      setSelectedCase(caseId);
      setShowShareModal(true);
    }
  }, [canShare]);

  // 处理创建新案例
  const handleCreateCase = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  // 处理开始新分析
  const handleStartAnalysis = useCallback(() => {
    navigate('/osborn-analysis');
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载案例库中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <IconBooks size={32} className="text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">加载失败</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl shadow-blue-500/20">
            <IconBooks size={28} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            统一案例库
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            管理您的个人、团队和组织案例，支持权限控制和协作功能
          </p>

          {/* 快速操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleStartAnalysis}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl px-6 py-3"
            >
              <IconPlus size={16} className="mr-2" />
              开始新分析
            </Button>
            <Button 
              variant="outline"
              onClick={handleCreateCase}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-6 py-3"
            >
              <IconTemplate size={16} className="mr-2" />
              创建案例
            </Button>
          </div>
        </div>

        {/* 视图模式切换 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 border border-gray-200/50 shadow-xl shadow-gray-200/20 mb-8">
          <div className="flex items-center justify-center">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <Button
                variant={viewMode === 'personal' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('personal')}
                className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'personal' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconBooks size={16} />
                {isMobile ? '个人' : '个人案例'}
              </Button>
              <Button
                variant={viewMode === 'team' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('team')}
                className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'team' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconUsers size={16} />
                {isMobile ? '团队' : '团队案例'}
              </Button>
              <Button
                variant={viewMode === 'organization' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('organization')}
                className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'organization' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconBuilding size={16} />
                {isMobile ? '组织' : '组织案例'}
              </Button>
              <Button
                variant={viewMode === 'templates' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('templates')}
                className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'templates' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconTemplate size={16} />
                {isMobile ? '模板' : '案例模板'}
              </Button>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 shadow-xl shadow-gray-200/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* 搜索框 */}
            <div className="flex-1 w-full">
              <div className="relative">
                <IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索案例标题、描述或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
              </div>
            </div>

            {/* 筛选器 */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory || 'all'} onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}>
                <SelectTrigger className="w-32 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="分类" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  <SelectItem value="all">所有分类</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="排序" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  <SelectItem value="createdAt">创建时间</SelectItem>
                  <SelectItem value="updatedAt">更新时间</SelectItem>
                  <SelectItem value="title">标题</SelectItem>
                  <SelectItem value="creator">创建者</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{statistics.totalCases}</div>
                <div className="text-sm text-blue-700">总案例数</div>
              </div>
              <IconBooks size={24} className="text-blue-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">{statistics.personalCases}</div>
                <div className="text-sm text-green-700">个人案例</div>
              </div>
              <IconBooks size={24} className="text-green-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{statistics.teamCases}</div>
                <div className="text-sm text-purple-700">团队案例</div>
              </div>
              <IconUsers size={24} className="text-purple-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-1">{statistics.sharedCases}</div>
                <div className="text-sm text-orange-700">共享案例</div>
              </div>
              <IconShare size={24} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* 案例列表 */}
        {filteredCases.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <IconBooks size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {cases.length === 0 ? '暂无案例' : '没有找到匹配的案例'}
            </h3>
            <p className="text-gray-600 mb-6">
              {cases.length === 0 
                ? '开始您的第一个奥斯本分析，创建您的案例库' 
                : '尝试调整搜索条件或筛选器'
              }
            </p>
            <Button 
              onClick={handleStartAnalysis}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl"
            >
              <IconPlus size={16} className="mr-2" />
              开始新分析
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((case_) => (
              <Card 
                key={case_.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl"
                onClick={() => handleCaseClick(case_.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {case_.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1 ml-2">
                      {canDelete(case_.id) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCaseDelete(case_.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-red-600 hover:text-red-700"
                        >
                          <IconTrash size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {case_.description}
                  </p>
                  
                  {/* 权限标签 */}
                  <div className="flex items-center gap-2 mt-3">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getPermissionLevelColor(case_.category.permissions)}`}
                    >
                      {getPermissionLevelLabel(case_.category.permissions)}
                    </Badge>
                    {case_.collaboration.isShared && (
                      <Badge variant="outline" className="text-xs">
                        已分享
                      </Badge>
                    )}
                  </div>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {case_.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        {tag}
                      </Badge>
                    ))}
                    {case_.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{case_.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <IconClock size={14} className="mr-1" />
                      {new Date(case_.metadata.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <IconTag size={14} className="mr-1" />
                      {case_.category.name}
                    </div>
                  </div>
                  
                  {/* 协作状态 */}
                  {case_.collaboration.activeUsers.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-1">
                        {case_.collaboration.activeUsers.slice(0, 3).map(userId => (
                          <div key={userId} className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                            {userId.charAt(0).toUpperCase()}
                          </div>
                        ))}
                        {case_.collaboration.activeUsers.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            +{case_.collaboration.activeUsers.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {case_.collaboration.activeUsers.length} 人正在编辑
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCaseClick(case_.id);
                      }}
                      className="rounded-xl"
                    >
                      <IconEye size={14} className="mr-1" />
                      查看详情
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {canEdit(case_.id) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCaseEdit(case_.id);
                          }}
                          className="p-2"
                        >
                          <IconEdit size={14} className="text-gray-600" />
                        </Button>
                      )}
                      {canShare(case_.id) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCaseShare(case_.id);
                          }}
                          className="p-2"
                        >
                          <IconShare size={14} className="text-gray-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

UnifiedCaseLibraryPage.displayName = 'UnifiedCaseLibraryPage';

export default UnifiedCaseLibraryPage;
