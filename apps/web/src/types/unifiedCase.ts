/**
 * 统一案例库数据模型
 * 支持个人、团队、组织三种权限级别
 */

// 权限级别枚举
export enum PermissionLevel {
  PRIVATE = 'private',           // 仅个人可见
  TEAM_READ = 'team_read',       // 团队可读
  TEAM_WRITE = 'team_write',     // 团队可写
  ORGANIZATION = 'organization'  // 组织级别
}

// 权限类型枚举
export enum Permission {
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete',
  SHARE = 'share',
  ADMIN = 'admin'
}

// 所有权信息
export interface Ownership {
  type: 'personal' | 'team' | 'organization';
  ownerId: string;
  teamId?: string;
  organizationId?: string;
}

// 权限信息
export interface CasePermissions {
  view: string[];      // 可查看的用户ID列表
  edit: string[];      // 可编辑的用户ID列表
  delete: string[];    // 可删除的用户ID列表
  share: string[];     // 可分享的用户ID列表
  admin: string[];     // 管理员用户ID列表
}

// 协作信息
export interface Collaboration {
  isShared: boolean;
  sharedWith: string[];
  lastModifiedBy: string;
  contributors: string[];
  activeUsers: string[];        // 当前正在编辑的用户
  comments: Comment[];
  versionHistory: CaseVersion[];
}

// 评论信息
export interface Comment {
  id: string;
  caseId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

// 版本信息
export interface CaseVersion {
  id: string;
  caseId: string;
  version: number;
  description: string;
  content: string;
  createdBy: string;
  createdAt: string;
  changes: string[];
}

// 元数据信息
export interface CaseMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  version: number;
  isTemplate: boolean;
  templateId?: string;
  lastModifiedBy: string;
}

// 统一案例模型
export interface UnifiedCase {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: CaseCategory;
  
  // 所有权和权限
  ownership: Ownership;
  permissions: CasePermissions;
  
  // 协作信息
  collaboration: Collaboration;
  
  // 元数据
  metadata: CaseMetadata;
  
  // 分析数据（保持向后兼容）
  analysisData?: any;
  analysisResult?: any;
  osbornAnalysis?: any;
  deepAnalysis?: any;
  detailedAnalysis?: any;
}

// 案例分类
export interface CaseCategory {
  id: string;
  name: string;
  type: 'personal' | 'team' | 'organization';
  parentId?: string;
  children?: CaseCategory[];
  permissions: PermissionLevel;
  description?: string;
  color?: string;
  icon?: string;
}

// 用户信息
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'owner';
  teams: string[];
  organizations: string[];
}

// 团队信息
export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  admins: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// 组织信息
export interface Organization {
  id: string;
  name: string;
  description: string;
  teams: string[];
  members: string[];
  admins: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// 权限管理器接口
export interface PermissionManager {
  canView(userId: string, caseId: string): boolean;
  canEdit(userId: string, caseId: string): boolean;
  canDelete(userId: string, caseId: string): boolean;
  canShare(userId: string, caseId: string): boolean;
  canAdmin(userId: string, caseId: string): boolean;
  
  grantPermission(caseId: string, userId: string, permission: Permission): void;
  revokePermission(caseId: string, userId: string, permission: Permission): void;
  transferOwnership(caseId: string, fromUserId: string, toUserId: string): void;
}

// 协作管理器接口
export interface CollaborationManager {
  startCollaborativeEdit(caseId: string, userId: string): void;
  stopCollaborativeEdit(caseId: string, userId: string): void;
  
  addComment(caseId: string, comment: Comment): void;
  updateComment(commentId: string, content: string): void;
  deleteComment(commentId: string): void;
  
  createVersion(caseId: string, description: string): CaseVersion;
  restoreVersion(caseId: string, versionId: string): void;
  getVersionHistory(caseId: string): CaseVersion[];
}

// 分享管理器接口
export interface ShareManager {
  shareToTeam(caseId: string, teamId: string, permissions: Permission[]): void;
  shareToUser(caseId: string, userId: string, permissions: Permission[]): void;
  createPublicLink(caseId: string, expiresAt?: Date): string;
  revokeShare(caseId: string, shareId: string): void;
}

// 数据同步管理器接口
export interface DataSyncManager {
  syncToCloud(): Promise<void>;
  syncFromCloud(): Promise<void>;
  resolveConflicts(conflicts: Conflict[]): Promise<void>;
  enableOfflineMode(): void;
  disableOfflineMode(): void;
}

// 冲突信息
export interface Conflict {
  id: string;
  caseId: string;
  type: 'edit' | 'delete' | 'permission';
  localVersion: any;
  remoteVersion: any;
  timestamp: string;
  resolved: boolean;
}

// 统一案例库页面属性
export interface UnifiedCaseLibraryPageProps {
  viewMode: 'personal' | 'team' | 'organization' | 'templates';
  filters: {
    category?: string;
    tags?: string[];
    permissions?: PermissionLevel[];
    dateRange?: [Date, Date];
    creator?: string;
  };
  sortBy: 'createdAt' | 'updatedAt' | 'title' | 'creator';
  sortOrder: 'asc' | 'desc';
  displayMode: 'grid' | 'list' | 'timeline';
}

// 案例详情页面属性
export interface CaseDetailPageProps {
  caseId: string;
  mode: 'view' | 'edit' | 'collaborate';
  collaboration: {
    realTimeEditing: boolean;
    comments: Comment[];
    versionHistory: CaseVersion[];
    contributors: User[];
  };
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canShare: boolean;
    canComment: boolean;
  };
}

// 本地存储数据结构
export interface LocalStorageData {
  user: User;
  teams: Team[];
  organizations: Organization[];
  cases: UnifiedCase[];
  permissions: {
    [caseId: string]: {
      [userId: string]: Permission[];
    };
  };
  collaborations: {
    [caseId: string]: {
      activeUsers: string[];
      comments: Comment[];
      versionHistory: CaseVersion[];
    };
  };
  settings: {
    defaultPermissions: PermissionLevel;
    autoSave: boolean;
    collaborationEnabled: boolean;
    notifications: NotificationSettings;
  };
}

// 通知设置
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
  types: {
    comments: boolean;
    edits: boolean;
    shares: boolean;
    mentions: boolean;
  };
}
