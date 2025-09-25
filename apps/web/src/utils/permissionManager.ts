/**
 * 权限管理系统
 * 处理案例的权限控制、分享和协作权限
 */

import { 
  UnifiedCase, 
  Permission, 
  PermissionLevel, 
  CasePermissions, 
  Ownership,
  PermissionManager,
  User,
  Team
} from '../types/unifiedCase';

export class CasePermissionManager implements PermissionManager {
  private cases: Map<string, UnifiedCase> = new Map();
  private users: Map<string, User> = new Map();
  private teams: Map<string, Team> = new Map();

  constructor(cases: UnifiedCase[] = [], users: User[] = [], teams: Team[] = []) {
    // 初始化数据
    cases.forEach(case_ => this.cases.set(case_.id, case_));
    users.forEach(user => this.users.set(user.id, user));
    teams.forEach(team => this.teams.set(team.id, team));
  }

  /**
   * 检查用户是否可以查看案例
   */
  canView(userId: string, caseId: string): boolean {
    const case_ = this.cases.get(caseId);
    if (!case_) return false;

    const user = this.users.get(userId);
    if (!user) return false;

    // 检查所有权
    if (this.isOwner(userId, case_)) return true;

    // 检查权限
    if (case_.permissions.view.includes(userId)) return true;

    // 检查团队权限
    if (this.hasTeamPermission(userId, case_, 'view')) return true;

    // 检查组织权限
    if (this.hasOrganizationPermission(userId, case_, 'view')) return true;

    return false;
  }

  /**
   * 检查用户是否可以编辑案例
   */
  canEdit(userId: string, caseId: string): boolean {
    const case_ = this.cases.get(caseId);
    if (!case_) return false;

    const user = this.users.get(userId);
    if (!user) return false;

    // 检查所有权
    if (this.isOwner(userId, case_)) return true;

    // 检查权限
    if (case_.permissions.edit.includes(userId)) return true;

    // 检查团队权限
    if (this.hasTeamPermission(userId, case_, 'edit')) return true;

    // 检查组织权限
    if (this.hasOrganizationPermission(userId, case_, 'edit')) return true;

    return false;
  }

  /**
   * 检查用户是否可以删除案例
   */
  canDelete(userId: string, caseId: string): boolean {
    const case_ = this.cases.get(caseId);
    if (!case_) return false;

    const user = this.users.get(userId);
    if (!user) return false;

    // 只有所有者和管理员可以删除
    if (this.isOwner(userId, case_)) return true;
    if (case_.permissions.admin.includes(userId)) return true;

    return false;
  }

  /**
   * 检查用户是否可以分享案例
   */
  canShare(userId: string, caseId: string): boolean {
    const case_ = this.cases.get(caseId);
    if (!case_) return false;

    const user = this.users.get(userId);
    if (!user) return false;

    // 检查所有权
    if (this.isOwner(userId, case_)) return true;

    // 检查权限
    if (case_.permissions.share.includes(userId)) return true;

    // 检查团队权限
    if (this.hasTeamPermission(userId, case_, 'share')) return true;

    // 检查组织权限
    if (this.hasOrganizationPermission(userId, case_, 'share')) return true;

    return false;
  }

  /**
   * 检查用户是否是管理员
   */
  canAdmin(userId: string, caseId: string): boolean {
    const case_ = this.cases.get(caseId);
    if (!case_) return false;

    const user = this.users.get(userId);
    if (!user) return false;

    // 检查所有权
    if (this.isOwner(userId, case_)) return true;

    // 检查管理员权限
    if (case_.permissions.admin.includes(userId)) return true;

    return false;
  }

  /**
   * 授予权限
   */
  grantPermission(caseId: string, userId: string, permission: Permission): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    // 检查当前用户是否有权限授予此权限
    if (!this.canGrantPermission(case_.ownership.ownerId, caseId, permission)) {
      throw new Error('没有权限授予此权限');
    }

    // 添加权限
    if (!case_.permissions[permission].includes(userId)) {
      case_.permissions[permission].push(userId);
      this.updateCase(case_);
    }
  }

  /**
   * 撤销权限
   */
  revokePermission(caseId: string, userId: string, permission: Permission): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    // 检查当前用户是否有权限撤销此权限
    if (!this.canGrantPermission(case_.ownership.ownerId, caseId, permission)) {
      throw new Error('没有权限撤销此权限');
    }

    // 移除权限
    const index = case_.permissions[permission].indexOf(userId);
    if (index > -1) {
      case_.permissions[permission].splice(index, 1);
      this.updateCase(case_);
    }
  }

  /**
   * 转移所有权
   */
  transferOwnership(caseId: string, fromUserId: string, toUserId: string): void {
    const case_ = this.cases.get(caseId);
    if (!case_) return;

    // 检查当前用户是否是所有者
    if (case_.ownership.ownerId !== fromUserId) {
      throw new Error('只有所有者可以转移所有权');
    }

    // 检查目标用户是否存在
    const targetUser = this.users.get(toUserId);
    if (!targetUser) {
      throw new Error('目标用户不存在');
    }

    // 转移所有权
    case_.ownership.ownerId = toUserId;
    
    // 清除所有权限，新所有者拥有所有权限
    case_.permissions = {
      view: [toUserId],
      edit: [toUserId],
      delete: [toUserId],
      share: [toUserId],
      admin: [toUserId]
    };

    this.updateCase(case_);
  }

  /**
   * 检查是否是所有者
   */
  private isOwner(userId: string, case_: UnifiedCase): boolean {
    return case_.ownership.ownerId === userId;
  }

  /**
   * 检查团队权限
   */
  private hasTeamPermission(userId: string, case_: UnifiedCase, permission: string): boolean {
    if (case_.ownership.type !== 'team' || !case_.ownership.teamId) return false;

    const team = this.teams.get(case_.ownership.teamId);
    if (!team) return false;

    // 检查用户是否是团队成员
    if (!team.members.includes(userId)) return false;

    // 根据权限级别检查
    switch (case_.category.permissions) {
      case PermissionLevel.TEAM_READ:
        return permission === 'view';
      case PermissionLevel.TEAM_WRITE:
        return permission === 'view' || permission === 'edit';
      case PermissionLevel.ORGANIZATION:
        return true;
      default:
        return false;
    }
  }

  /**
   * 检查组织权限
   */
  private hasOrganizationPermission(userId: string, case_: UnifiedCase, permission: string): boolean {
    if (case_.ownership.type !== 'organization' || !case_.ownership.organizationId) return false;

    // 这里需要根据实际的组织权限逻辑来实现
    // 暂时返回false，需要根据具体的组织权限模型来实现
    return false;
  }

  /**
   * 检查是否可以授予权限
   */
  private canGrantPermission(currentUserId: string, caseId: string, permission: Permission): boolean {
    const case_ = this.cases.get(caseId);
    if (!case_) return false;

    // 所有者可以授予任何权限
    if (this.isOwner(currentUserId, case_)) return true;

    // 管理员可以授予除admin外的权限
    if (case_.permissions.admin.includes(currentUserId)) {
      return permission !== Permission.ADMIN;
    }

    return false;
  }

  /**
   * 更新案例
   */
  private updateCase(case_: UnifiedCase): void {
    this.cases.set(case_.id, case_);
    // 这里可以添加持久化逻辑
  }

  /**
   * 获取用户的所有权限
   */
  getUserPermissions(userId: string, caseId: string): Permission[] {
    const permissions: Permission[] = [];

    if (this.canView(userId, caseId)) permissions.push(Permission.VIEW);
    if (this.canEdit(userId, caseId)) permissions.push(Permission.EDIT);
    if (this.canDelete(userId, caseId)) permissions.push(Permission.DELETE);
    if (this.canShare(userId, caseId)) permissions.push(Permission.SHARE);
    if (this.canAdmin(userId, caseId)) permissions.push(Permission.ADMIN);

    return permissions;
  }

  /**
   * 获取案例的权限摘要
   */
  getPermissionSummary(caseId: string): {
    totalUsers: number;
    viewUsers: number;
    editUsers: number;
    adminUsers: number;
    isPublic: boolean;
  } {
    const case_ = this.cases.get(caseId);
    if (!case_) {
      return {
        totalUsers: 0,
        viewUsers: 0,
        editUsers: 0,
        adminUsers: 0,
        isPublic: false
      };
    }

    const allUsers = new Set([
      ...case_.permissions.view,
      ...case_.permissions.edit,
      ...case_.permissions.delete,
      ...case_.permissions.share,
      ...case_.permissions.admin
    ]);

    return {
      totalUsers: allUsers.size,
      viewUsers: case_.permissions.view.length,
      editUsers: case_.permissions.edit.length,
      adminUsers: case_.permissions.admin.length,
      isPublic: case_.collaboration.isShared
    };
  }
}

/**
 * 权限工具函数
 */
export class PermissionUtils {
  /**
   * 检查权限级别
   */
  static getPermissionLevel(permissions: Permission[]): PermissionLevel {
    if (permissions.includes(Permission.ADMIN)) {
      return PermissionLevel.ORGANIZATION;
    }
    if (permissions.includes(Permission.EDIT)) {
      return PermissionLevel.TEAM_WRITE;
    }
    if (permissions.includes(Permission.VIEW)) {
      return PermissionLevel.TEAM_READ;
    }
    return PermissionLevel.PRIVATE;
  }

  /**
   * 获取权限显示文本
   */
  static getPermissionLabel(permission: Permission): string {
    const labels = {
      [Permission.VIEW]: '查看',
      [Permission.EDIT]: '编辑',
      [Permission.DELETE]: '删除',
      [Permission.SHARE]: '分享',
      [Permission.ADMIN]: '管理'
    };
    return labels[permission] || '未知';
  }

  /**
   * 获取权限级别显示文本
   */
  static getPermissionLevelLabel(level: PermissionLevel): string {
    const labels = {
      [PermissionLevel.PRIVATE]: '私有',
      [PermissionLevel.TEAM_READ]: '团队可读',
      [PermissionLevel.TEAM_WRITE]: '团队可写',
      [PermissionLevel.ORGANIZATION]: '组织级别'
    };
    return labels[level] || '未知';
  }

  /**
   * 获取权限颜色
   */
  static getPermissionColor(permission: Permission): string {
    const colors = {
      [Permission.VIEW]: 'bg-blue-100 text-blue-700',
      [Permission.EDIT]: 'bg-green-100 text-green-700',
      [Permission.DELETE]: 'bg-red-100 text-red-700',
      [Permission.SHARE]: 'bg-purple-100 text-purple-700',
      [Permission.ADMIN]: 'bg-orange-100 text-orange-700'
    };
    return colors[permission] || 'bg-gray-100 text-gray-700';
  }

  /**
   * 获取权限级别颜色
   */
  static getPermissionLevelColor(level: PermissionLevel): string {
    const colors = {
      [PermissionLevel.PRIVATE]: 'bg-gray-100 text-gray-700',
      [PermissionLevel.TEAM_READ]: 'bg-blue-100 text-blue-700',
      [PermissionLevel.TEAM_WRITE]: 'bg-green-100 text-green-700',
      [PermissionLevel.ORGANIZATION]: 'bg-purple-100 text-purple-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  }
}
