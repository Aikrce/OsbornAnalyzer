/**
 * 统一案例库Hook
 * 整合权限管理、协作管理和案例管理功能
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  UnifiedCase, 
  User, 
  Team, 
  Organization, 
  Permission, 
  PermissionLevel,
  CaseCategory,
  Comment,
  CaseVersion,
  LocalStorageData
} from '../types/unifiedCase';
import { CasePermissionManager, PermissionUtils } from '../utils/permissionManager';
import { CaseCollaborationManager, CollaborationUtils } from '../utils/collaborationManager';
import { useResponsive } from './useResponsive';

// Hook返回类型
interface UseUnifiedCasesReturn {
  // 数据状态
  cases: UnifiedCase[];
  users: User[];
  teams: Team[];
  organizations: Organization[];
  currentUser: User | null;
  
  // 加载状态
  isLoading: boolean;
  error: string | null;
  
  // 筛选和搜索
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  permissionFilter: PermissionLevel[];
  setPermissionFilter: (permissions: PermissionLevel[]) => void;
  
  // 排序和显示
  sortBy: 'createdAt' | 'updatedAt' | 'title' | 'creator';
  setSortBy: (sort: 'createdAt' | 'updatedAt' | 'title' | 'creator') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  displayMode: 'grid' | 'list' | 'timeline';
  setDisplayMode: (mode: 'grid' | 'list' | 'timeline') => void;
  
  // 筛选后的数据
  filteredCases: UnifiedCase[];
  categories: CaseCategory[];
  allTags: string[];
  
  // 案例操作
  createCase: (caseData: Omit<UnifiedCase, 'id' | 'metadata' | 'ownership' | 'permissions' | 'collaboration'>) => Promise<string>;
  updateCase: (caseId: string, updates: Partial<UnifiedCase>) => Promise<void>;
  deleteCase: (caseId: string) => Promise<void>;
  duplicateCase: (caseId: string) => Promise<string>;
  
  // 权限操作
  grantPermission: (caseId: string, userId: string, permission: Permission) => Promise<void>;
  revokePermission: (caseId: string, userId: string, permission: Permission) => Promise<void>;
  transferOwnership: (caseId: string, toUserId: string) => Promise<void>;
  
  // 协作操作
  startCollaborativeEdit: (caseId: string) => void;
  stopCollaborativeEdit: (caseId: string) => void;
  addComment: (caseId: string, content: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  createVersion: (caseId: string, description: string) => Promise<CaseVersion>;
  restoreVersion: (caseId: string, versionId: string) => Promise<void>;
  
  // 分享操作
  shareToTeam: (caseId: string, teamId: string, permissions: Permission[]) => Promise<void>;
  shareToUser: (caseId: string, userId: string, permissions: Permission[]) => Promise<void>;
  createPublicLink: (caseId: string, expiresAt?: Date) => string;
  revokeShare: (caseId: string, shareId: string) => Promise<void>;
  
  // 统计信息
  statistics: {
    totalCases: number;
    personalCases: number;
    teamCases: number;
    organizationCases: number;
    sharedCases: number;
    recentCases: number;
    totalComments: number;
    activeCollaborations: number;
  };
  
  // 权限检查
  canView: (caseId: string) => boolean;
  canEdit: (caseId: string) => boolean;
  canDelete: (caseId: string) => boolean;
  canShare: (caseId: string) => boolean;
  canAdmin: (caseId: string) => boolean;
  
  // 协作状态
  getActiveEditors: (caseId: string) => User[];
  getCollaborationStats: (caseId: string) => {
    totalComments: number;
    activeEditors: number;
    totalVersions: number;
    lastActivity: string;
  };
  
  // 工具函数
  getPermissionLabel: (permission: Permission) => string;
  getPermissionColor: (permission: Permission) => string;
  getPermissionLevelLabel: (level: PermissionLevel) => string;
  getPermissionLevelColor: (level: PermissionLevel) => string;
}

export const useUnifiedCases = (): UseUnifiedCasesReturn => {
  const { isMobile, isTablet } = useResponsive();
  
  // 基础状态
  const [cases, setCases] = useState<UnifiedCase[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 筛选和搜索状态
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [permissionFilter, setPermissionFilter] = useState<PermissionLevel[]>([]);
  
  // 排序和显示状态
  const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt' | 'title' | 'creator'>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list' | 'timeline'>('grid');
  
  // 管理器实例
  const [permissionManager] = useState(() => new CasePermissionManager());
  const [collaborationManager] = useState(() => new CaseCollaborationManager());
  
  // 初始化数据
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // 从localStorage加载数据
        const storedData = localStorage.getItem('unifiedCasesData');
        if (storedData) {
          const data: LocalStorageData = JSON.parse(storedData);
          setCases(data.cases || []);
          setUsers([data.user]);
          setTeams(data.teams || []);
          setOrganizations(data.organizations || []);
          setCurrentUser(data.user || null);
        } else {
          // 初始化默认数据
          const defaultUser: User = {
            id: 'current-user',
            name: '当前用户',
            email: 'user@example.com',
            avatar: '',
            role: 'user',
            teams: [],
            organizations: []
          };
          
          setCurrentUser(defaultUser);
          setUsers([defaultUser]);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '初始化数据失败');
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeData();
  }, []);
  
  // 保存数据到localStorage
  const saveData = useCallback(() => {
    try {
      const data: LocalStorageData = {
        user: currentUser!,
        teams,
        organizations,
        cases,
        permissions: {},
        collaborations: {},
        settings: {
          defaultPermissions: PermissionLevel.PRIVATE,
          autoSave: true,
          collaborationEnabled: true,
          notifications: {
            email: true,
            push: true,
            sms: false,
            frequency: 'immediate',
            types: {
              comments: true,
              edits: true,
              shares: true,
              mentions: true
            }
          }
        }
      };
      
      localStorage.setItem('unifiedCasesData', JSON.stringify(data));
    } catch (err) {
      console.error('保存数据失败:', err);
    }
  }, [currentUser, teams, organizations, cases]);
  
  // 筛选后的案例
  const filteredCases = useMemo(() => {
    let result = [...cases];
    
    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(case_ => 
        case_.title.toLowerCase().includes(query) ||
        case_.description.toLowerCase().includes(query) ||
        case_.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // 分类筛选
    if (selectedCategory) {
      result = result.filter(case_ => case_.category.id === selectedCategory);
    }
    
    // 标签筛选
    if (selectedTags.length > 0) {
      result = result.filter(case_ => 
        selectedTags.every(tag => case_.tags.includes(tag))
      );
    }
    
    // 权限筛选
    if (permissionFilter.length > 0) {
      result = result.filter(case_ => 
        permissionFilter.includes(case_.category.permissions)
      );
    }
    
    // 排序
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'createdAt':
          comparison = new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime();
          break;
        case 'updatedAt':
          comparison = new Date(a.metadata.updatedAt).getTime() - new Date(b.metadata.updatedAt).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'creator':
          comparison = a.metadata.createdBy.localeCompare(b.metadata.createdBy);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [cases, searchQuery, selectedCategory, selectedTags, permissionFilter, sortBy, sortOrder]);
  
  // 所有标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    cases.forEach(case_ => {
      case_.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [cases]);
  
  // 分类
  const categories = useMemo(() => {
    const categoryMap = new Map<string, CaseCategory>();
    
    cases.forEach(case_ => {
      if (!categoryMap.has(case_.category.id)) {
        categoryMap.set(case_.category.id, case_.category);
      }
    });
    
    return Array.from(categoryMap.values());
  }, [cases]);
  
  // 统计信息
  const statistics = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      totalCases: cases.length,
      personalCases: cases.filter(c => c.ownership.type === 'personal').length,
      teamCases: cases.filter(c => c.ownership.type === 'team').length,
      organizationCases: cases.filter(c => c.ownership.type === 'organization').length,
      sharedCases: cases.filter(c => c.collaboration.isShared).length,
      recentCases: cases.filter(c => new Date(c.metadata.createdAt) > oneWeekAgo).length,
      totalComments: cases.reduce((sum, c) => sum + c.collaboration.comments.length, 0),
      activeCollaborations: cases.filter(c => c.collaboration.activeUsers.length > 0).length
    };
  }, [cases]);
  
  // 案例操作
  const createCase = useCallback(async (caseData: Omit<UnifiedCase, 'id' | 'metadata' | 'ownership' | 'permissions' | 'collaboration'>): Promise<string> => {
    if (!currentUser) throw new Error('用户未登录');
    
    const newCase: UnifiedCase = {
      ...caseData,
      id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: currentUser.id,
        version: 1,
        isTemplate: false,
        lastModifiedBy: currentUser.id
      },
      ownership: {
        type: 'personal',
        ownerId: currentUser.id
      },
      permissions: {
        view: [currentUser.id],
        edit: [currentUser.id],
        delete: [currentUser.id],
        share: [currentUser.id],
        admin: [currentUser.id]
      },
      collaboration: {
        isShared: false,
        sharedWith: [],
        lastModifiedBy: currentUser.id,
        contributors: [currentUser.id],
        activeUsers: [],
        comments: [],
        versionHistory: []
      }
    };
    
    setCases(prev => [...prev, newCase]);
    saveData();
    
    return newCase.id;
  }, [currentUser, saveData]);
  
  const updateCase = useCallback(async (caseId: string, updates: Partial<UnifiedCase>): Promise<void> => {
    if (!currentUser) throw new Error('用户未登录');
    
    setCases(prev => prev.map(case_ => 
      case_.id === caseId 
        ? { 
            ...case_, 
            ...updates, 
            metadata: { 
              ...case_.metadata, 
              updatedAt: new Date().toISOString(),
              lastModifiedBy: currentUser.id
            }
          }
        : case_
    ));
    
    saveData();
  }, [currentUser, saveData]);
  
  const deleteCase = useCallback(async (caseId: string): Promise<void> => {
    setCases(prev => prev.filter(case_ => case_.id !== caseId));
    saveData();
  }, [saveData]);
  
  const duplicateCase = useCallback(async (caseId: string): Promise<string> => {
    const originalCase = cases.find(c => c.id === caseId);
    if (!originalCase) throw new Error('案例不存在');
    
    const duplicatedCase = {
      ...originalCase,
      title: `${originalCase.title} (副本)`,
      description: originalCase.description,
      content: originalCase.content,
      tags: [...originalCase.tags],
      category: originalCase.category
    };
    
    return await createCase(duplicatedCase);
  }, [cases, createCase]);
  
  // 权限操作
  const grantPermission = useCallback(async (caseId: string, userId: string, permission: Permission): Promise<void> => {
    permissionManager.grantPermission(caseId, userId, permission);
    saveData();
  }, [permissionManager, saveData]);
  
  const revokePermission = useCallback(async (caseId: string, userId: string, permission: Permission): Promise<void> => {
    permissionManager.revokePermission(caseId, userId, permission);
    saveData();
  }, [permissionManager, saveData]);
  
  const transferOwnership = useCallback(async (caseId: string, toUserId: string): Promise<void> => {
    if (!currentUser) throw new Error('用户未登录');
    
    permissionManager.transferOwnership(caseId, currentUser.id, toUserId);
    saveData();
  }, [currentUser, permissionManager, saveData]);
  
  // 协作操作
  const startCollaborativeEdit = useCallback((caseId: string) => {
    if (!currentUser) return;
    collaborationManager.startCollaborativeEdit(caseId, currentUser.id);
  }, [currentUser, collaborationManager]);
  
  const stopCollaborativeEdit = useCallback((caseId: string) => {
    if (!currentUser) return;
    collaborationManager.stopCollaborativeEdit(caseId, currentUser.id);
  }, [currentUser, collaborationManager]);
  
  const addComment = useCallback(async (caseId: string, content: string): Promise<void> => {
    if (!currentUser) throw new Error('用户未登录');
    
    const comment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      userId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    collaborationManager.addComment(caseId, comment);
    saveData();
  }, [currentUser, collaborationManager, saveData]);
  
  const updateComment = useCallback(async (commentId: string, content: string): Promise<void> => {
    collaborationManager.updateComment(commentId, content);
    saveData();
  }, [collaborationManager, saveData]);
  
  const deleteComment = useCallback(async (commentId: string): Promise<void> => {
    collaborationManager.deleteComment(commentId);
    saveData();
  }, [collaborationManager, saveData]);
  
  const createVersion = useCallback(async (caseId: string, description: string): Promise<CaseVersion> => {
    const version = collaborationManager.createVersion(caseId, description);
    saveData();
    return version;
  }, [collaborationManager, saveData]);
  
  const restoreVersion = useCallback(async (caseId: string, versionId: string): Promise<void> => {
    collaborationManager.restoreVersion(caseId, versionId);
    saveData();
  }, [collaborationManager, saveData]);
  
  // 分享操作
  const shareToTeam = useCallback(async (caseId: string, teamId: string, permissions: Permission[]): Promise<void> => {
    // 实现分享到团队逻辑
    console.log('分享到团队:', { caseId, teamId, permissions });
  }, []);
  
  const shareToUser = useCallback(async (caseId: string, userId: string, permissions: Permission[]): Promise<void> => {
    // 实现分享给用户逻辑
    console.log('分享给用户:', { caseId, userId, permissions });
  }, []);
  
  const createPublicLink = useCallback((caseId: string, expiresAt?: Date): string => {
    // 实现创建公开链接逻辑
    return `https://example.com/case/${caseId}`;
  }, []);
  
  const revokeShare = useCallback(async (caseId: string, shareId: string): Promise<void> => {
    // 实现撤销分享逻辑
    console.log('撤销分享:', { caseId, shareId });
  }, []);
  
  // 权限检查
  const canView = useCallback((caseId: string): boolean => {
    if (!currentUser) return false;
    return permissionManager.canView(currentUser.id, caseId);
  }, [currentUser, permissionManager]);
  
  const canEdit = useCallback((caseId: string): boolean => {
    if (!currentUser) return false;
    return permissionManager.canEdit(currentUser.id, caseId);
  }, [currentUser, permissionManager]);
  
  const canDelete = useCallback((caseId: string): boolean => {
    if (!currentUser) return false;
    return permissionManager.canDelete(currentUser.id, caseId);
  }, [currentUser, permissionManager]);
  
  const canShare = useCallback((caseId: string): boolean => {
    if (!currentUser) return false;
    return permissionManager.canShare(currentUser.id, caseId);
  }, [currentUser, permissionManager]);
  
  const canAdmin = useCallback((caseId: string): boolean => {
    if (!currentUser) return false;
    return permissionManager.canAdmin(currentUser.id, caseId);
  }, [currentUser, permissionManager]);
  
  // 协作状态
  const getActiveEditors = useCallback((caseId: string): User[] => {
    return collaborationManager.getActiveEditors(caseId);
  }, [collaborationManager]);
  
  const getCollaborationStats = useCallback((caseId: string) => {
    return collaborationManager.getCollaborationStats(caseId);
  }, [collaborationManager]);
  
  return {
    // 数据状态
    cases,
    users,
    teams,
    organizations,
    currentUser,
    
    // 加载状态
    isLoading,
    error,
    
    // 筛选和搜索
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    permissionFilter,
    setPermissionFilter,
    
    // 排序和显示
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    displayMode,
    setDisplayMode,
    
    // 筛选后的数据
    filteredCases,
    categories,
    allTags,
    
    // 案例操作
    createCase,
    updateCase,
    deleteCase,
    duplicateCase,
    
    // 权限操作
    grantPermission,
    revokePermission,
    transferOwnership,
    
    // 协作操作
    startCollaborativeEdit,
    stopCollaborativeEdit,
    addComment,
    updateComment,
    deleteComment,
    createVersion,
    restoreVersion,
    
    // 分享操作
    shareToTeam,
    shareToUser,
    createPublicLink,
    revokeShare,
    
    // 统计信息
    statistics,
    
    // 权限检查
    canView,
    canEdit,
    canDelete,
    canShare,
    canAdmin,
    
    // 协作状态
    getActiveEditors,
    getCollaborationStats,
    
    // 工具函数
    getPermissionLabel: PermissionUtils.getPermissionLabel,
    getPermissionColor: PermissionUtils.getPermissionColor,
    getPermissionLevelLabel: PermissionUtils.getPermissionLevelLabel,
    getPermissionLevelColor: PermissionUtils.getPermissionLevelColor
  };
};
