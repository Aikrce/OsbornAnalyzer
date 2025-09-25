/**
 * 协作管理系统
 * 处理案例的实时协作、评论、版本控制等功能
 */

import { 
  UnifiedCase, 
  Comment, 
  CaseVersion, 
  Collaboration,
  CollaborationManager,
  User
} from '../types/unifiedCase';

export class CaseCollaborationManager implements CollaborationManager {
  private cases: Map<string, UnifiedCase> = new Map();
  private users: Map<string, User> = new Map();
  private activeEditors: Map<string, Set<string>> = new Map(); // caseId -> Set of userIds
  private collaborationCallbacks: Map<string, ((data: any) => void)[]> = new Map();

  constructor(cases: UnifiedCase[] = [], users: User[] = []) {
    cases.forEach(case_ => this.cases.set(case_.id, case_));
    users.forEach(user => this.users.set(user.id, user));
  }

  /**
   * 开始协作编辑
   */
  startCollaborativeEdit(caseId: string, userId: string): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    // 检查用户是否有编辑权限
    if (!this.canEdit(case_, userId)) return;

    // 添加到活跃编辑者列表
    if (!this.activeEditors.has(caseId)) {
      this.activeEditors.set(caseId, new Set());
    }
    this.activeEditors.get(caseId)!.add(userId);

    // 更新案例的协作信息
    if (!case_.collaboration.activeUsers.includes(userId)) {
      case_.collaboration.activeUsers.push(userId);
    }

    // 更新最后修改者
    case_.collaboration.lastModifiedBy = userId;
    case_.metadata.lastModifiedBy = userId;
    case_.metadata.updatedAt = new Date().toISOString();

    this.updateCase(case_);
    this.notifyCollaborationChange(caseId, 'edit_start', { userId });
  }

  /**
   * 停止协作编辑
   */
  stopCollaborativeEdit(caseId: string, userId: string): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    // 从活跃编辑者列表移除
    if (this.activeEditors.has(caseId)) {
      this.activeEditors.get(caseId)!.delete(userId);
    }

    // 更新案例的协作信息
    const index = case_.collaboration.activeUsers.indexOf(userId);
    if (index > -1) {
      case_.collaboration.activeUsers.splice(index, 1);
    }

    this.updateCase(case_);
    this.notifyCollaborationChange(caseId, 'edit_stop', { userId });
  }

  /**
   * 添加评论
   */
  addComment(caseId: string, comment: Comment): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    // 检查用户是否有评论权限
    if (!this.canComment(case_, comment.userId)) return;

    // 添加评论
    case_.collaboration.comments.push(comment);
    case_.metadata.updatedAt = new Date().toISOString();

    this.updateCase(case_);
    this.notifyCollaborationChange(caseId, 'comment_add', { comment });
  }

  /**
   * 更新评论
   */
  updateComment(commentId: string, content: string): void {
    // 查找评论
    for (const [caseId, case_] of this.cases) {
      const comment = case_.collaboration.comments.find(c => c.id === commentId);
      if (comment) {
        comment.content = content;
        comment.updatedAt = new Date().toISOString();
        case_.metadata.updatedAt = new Date().toISOString();

        this.updateCase(case_);
        this.notifyCollaborationChange(caseId, 'comment_update', { commentId, content });
        return;
      }
    }
  }

  /**
   * 删除评论
   */
  deleteComment(commentId: string): void {
    // 查找并删除评论
    for (const [caseId, case_] of this.cases) {
      const index = case_.collaboration.comments.findIndex(c => c.id === commentId);
      if (index > -1) {
        case_.collaboration.comments.splice(index, 1);
        case_.metadata.updatedAt = new Date().toISOString();

        this.updateCase(case_);
        this.notifyCollaborationChange(caseId, 'comment_delete', { commentId });
        return;
      }
    }
  }

  /**
   * 创建版本
   */
  createVersion(caseId: string, description: string): CaseVersion {
    const case_ = this.cases.get(caseId);
    if (!case_) throw new Error('案例不存在');

    const version: CaseVersion = {
      id: `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      version: case_.metadata.version + 1,
      description,
      content: case_.content,
      createdBy: case_.collaboration.lastModifiedBy,
      createdAt: new Date().toISOString(),
      changes: this.getChanges(case_)
    };

    // 添加版本到历史记录
    case_.collaboration.versionHistory.push(version);
    case_.metadata.version = version.version;
    case_.metadata.updatedAt = new Date().toISOString();

    this.updateCase(case_);
    this.notifyCollaborationChange(caseId, 'version_create', { version });

    return version;
  }

  /**
   * 恢复版本
   */
  restoreVersion(caseId: string, versionId: string): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    const version = case_.collaboration.versionHistory.find(v => v.id === versionId);
    if (!version) return;

    // 恢复内容
    case_.content = version.content;
    case_.metadata.updatedAt = new Date().toISOString();

    this.updateCase(case_);
    this.notifyCollaborationChange(caseId, 'version_restore', { versionId });
  }

  /**
   * 获取版本历史
   */
  getVersionHistory(caseId: string): CaseVersion[] {
    const case_ = this.cases.get(caseId);
    if (!case_) return [];

    return [...case_.collaboration.versionHistory].reverse(); // 最新的在前
  }

  /**
   * 获取活跃编辑者
   */
  getActiveEditors(caseId: string): User[] {
    const activeUserIds = this.activeEditors.get(caseId) || new Set();
    return Array.from(activeUserIds)
      .map(userId => this.users.get(userId))
      .filter(user => user !== undefined) as User[];
  }

  /**
   * 获取协作统计
   */
  getCollaborationStats(caseId: string): {
    totalComments: number;
    activeEditors: number;
    totalVersions: number;
    lastActivity: string;
  } {
    const case_ = this.cases.get(caseId);
    if (!case_) {
      return {
        totalComments: 0,
        activeEditors: 0,
        totalVersions: 0,
        lastActivity: ''
      };
    }

    const activeEditors = this.activeEditors.get(caseId)?.size || 0;
    const lastActivity = case_.metadata.updatedAt;

    return {
      totalComments: case_.collaboration.comments.length,
      activeEditors,
      totalVersions: case_.collaboration.versionHistory.length,
      lastActivity
    };
  }

  /**
   * 订阅协作变化
   */
  subscribeToCollaboration(caseId: string, callback: (data: any) => void): () => void {
    if (!this.collaborationCallbacks.has(caseId)) {
      this.collaborationCallbacks.set(caseId, []);
    }
    this.collaborationCallbacks.get(caseId)!.push(callback);

    // 返回取消订阅函数
    return () => {
      const callbacks = this.collaborationCallbacks.get(caseId);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * 检查是否可以编辑
   */
  private canEdit(case_: UnifiedCase, userId: string): boolean {
    // 这里需要根据实际的权限系统来实现
    // 暂时返回true，实际应该调用权限管理器
    return true;
  }

  /**
   * 检查是否可以评论
   */
  private canComment(case_: UnifiedCase, userId: string): boolean {
    // 这里需要根据实际的权限系统来实现
    // 暂时返回true，实际应该调用权限管理器
    return true;
  }

  /**
   * 获取变化内容
   */
  private getChanges(case_: UnifiedCase): string[] {
    // 这里应该实现实际的变化检测逻辑
    // 暂时返回空数组
    return [];
  }

  /**
   * 更新案例
   */
  private updateCase(case_: UnifiedCase): void {
    this.cases.set(case_.id, case_);
    // 这里可以添加持久化逻辑
  }

  /**
   * 通知协作变化
   */
  private notifyCollaborationChange(caseId: string, type: string, data: any): void {
    const callbacks = this.collaborationCallbacks.get(caseId) || [];
    callbacks.forEach(callback => {
      try {
        callback({ type, data, caseId, timestamp: new Date().toISOString() });
      } catch (error) {
        console.error('协作变化通知失败:', error);
      }
    });
  }
}

/**
 * 协作工具函数
 */
export class CollaborationUtils {
  /**
   * 格式化协作状态
   */
  static formatCollaborationStatus(activeEditors: User[]): string {
    if (activeEditors.length === 0) return '无人编辑';
    if (activeEditors.length === 1) return `${activeEditors[0].name} 正在编辑`;
    return `${activeEditors[0].name} 等 ${activeEditors.length} 人正在编辑`;
  }

  /**
   * 获取协作状态颜色
   */
  static getCollaborationStatusColor(activeEditors: User[]): string {
    if (activeEditors.length === 0) return 'text-gray-500';
    if (activeEditors.length === 1) return 'text-blue-500';
    return 'text-green-500';
  }

  /**
   * 格式化评论时间
   */
  static formatCommentTime(timestamp: string): string {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diff = now.getTime() - commentTime.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return commentTime.toLocaleDateString();
  }

  /**
   * 获取版本描述
   */
  static getVersionDescription(version: CaseVersion): string {
    const time = new Date(version.createdAt).toLocaleString();
    return `v${version.version} - ${version.description} (${time})`;
  }

  /**
   * 检查是否有未保存的更改
   */
  static hasUnsavedChanges(case_: UnifiedCase): boolean {
    // 这里应该实现实际的变化检测逻辑
    // 暂时返回false
    return false;
  }

  /**
   * 获取协作摘要
   */
  static getCollaborationSummary(case_: UnifiedCase): {
    isShared: boolean;
    contributors: number;
    comments: number;
    versions: number;
    lastActivity: string;
  } {
    return {
      isShared: case_.collaboration.isShared,
      contributors: case_.collaboration.contributors.length,
      comments: case_.collaboration.comments.length,
      versions: case_.collaboration.versionHistory.length,
      lastActivity: case_.metadata.updatedAt
    };
  }
}
