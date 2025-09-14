import { AnalysisResult } from '@huitu/shared/types';

export interface CollaborationSession {
  id: string;
  name: string;
  topic: string;
  participants: Participant[];
  analysisResults: AnalysisResult[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: Date;
  lastActiveAt: Date;
}

export interface CollaborationInvite {
  id: string;
  sessionId: string;
  email: string;
  role: 'editor' | 'viewer';
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

class CollaborationService {
  private sessions: Map<string, CollaborationSession> = new Map();
  private invites: Map<string, CollaborationInvite> = new Map();

  /**
   * 创建协作会话
   */
  async createSession(
    name: string,
    topic: string,
    owner: Omit<Participant, 'id' | 'joinedAt' | 'lastActiveAt'>
  ): Promise<CollaborationSession> {
    const sessionId = this.generateId();
    const now = new Date();
    
    const session: CollaborationSession = {
      id: sessionId,
      name,
      topic,
      participants: [
        {
          id: this.generateId(),
          ...owner,
          joinedAt: now,
          lastActiveAt: now,
        },
      ],
      analysisResults: [],
      createdAt: now,
      updatedAt: now,
      isActive: true,
    };

    this.sessions.set(sessionId, session);
    
    // 这里可以保存到数据库
    await this.saveSession(session);
    
    return session;
  }

  /**
   * 获取会话信息
   */
  async getSession(sessionId: string): Promise<CollaborationSession | null> {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      // 尝试从数据库加载
      return await this.loadSession(sessionId);
    }
    
    return session;
  }

  /**
   * 邀请参与者
   */
  async inviteParticipant(
    sessionId: string,
    email: string,
    role: 'editor' | 'viewer'
  ): Promise<CollaborationInvite> {
    const session = await this.getSession(sessionId);
    
    if (!session) {
      throw new Error('会话不存在');
    }

    const invite: CollaborationInvite = {
      id: this.generateId(),
      sessionId,
      email,
      role,
      token: this.generateToken(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后过期
      createdAt: new Date(),
    };

    this.invites.set(invite.id, invite);
    
    // 发送邀请邮件
    await this.sendInviteEmail(invite);
    
    return invite;
  }

  /**
   * 接受邀请
   */
  async acceptInvite(
    token: string,
    participant: Omit<Participant, 'id' | 'joinedAt' | 'lastActiveAt'>
  ): Promise<CollaborationSession> {
    const invite = Array.from(this.invites.values()).find(inv => inv.token === token);
    
    if (!invite) {
      throw new Error('邀请不存在或已过期');
    }

    if (invite.expiresAt < new Date()) {
      throw new Error('邀请已过期');
    }

    const session = await this.getSession(invite.sessionId);
    
    if (!session) {
      throw new Error('会话不存在');
    }

    // 添加参与者
    const newParticipant: Participant = {
      id: this.generateId(),
      ...participant,
      role: invite.role,
      joinedAt: new Date(),
      lastActiveAt: new Date(),
    };

    session.participants.push(newParticipant);
    session.updatedAt = new Date();

    // 移除邀请
    this.invites.delete(invite.id);
    
    // 保存会话
    await this.saveSession(session);
    
    return session;
  }

  /**
   * 更新分析结果
   */
  async updateAnalysisResults(
    sessionId: string,
    results: AnalysisResult[],
    userId: string
  ): Promise<CollaborationSession> {
    const session = await this.getSession(sessionId);
    
    if (!session) {
      throw new Error('会话不存在');
    }

    // 检查用户权限
    const participant = session.participants.find(p => p.id === userId);
    
    if (!participant) {
      throw new Error('用户不在会话中');
    }

    if (participant.role === 'viewer') {
      throw new Error('没有编辑权限');
    }

    // 更新分析结果
    session.analysisResults = results;
    session.updatedAt = new Date();

    // 更新用户最后活跃时间
    participant.lastActiveAt = new Date();

    // 保存会话
    await this.saveSession(session);
    
    return session;
  }

  /**
   * 获取用户的所有会话
   */
  async getUserSessions(userId: string): Promise<CollaborationSession[]> {
    const userSessions: CollaborationSession[] = [];
    
    for (const session of this.sessions.values()) {
      if (session.participants.some(p => p.id === userId)) {
        userSessions.push(session);
      }
    }
    
    return userSessions.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  /**
   * 离开会话
   */
  async leaveSession(sessionId: string, userId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    
    if (!session) {
      throw new Error('会话不存在');
    }

    // 移除参与者
    session.participants = session.participants.filter(p => p.id !== userId);
    session.updatedAt = new Date();

    // 如果没有参与者了，关闭会话
    if (session.participants.length === 0) {
      session.isActive = false;
    }

    // 保存会话
    await this.saveSession(session);
  }

  /**
   * 删除会话
   */
  async deleteSession(sessionId: string, userId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    
    if (!session) {
      throw new Error('会话不存在');
    }

    // 检查用户权限（只有创建者可以删除）
    const participant = session.participants.find(p => p.id === userId);
    
    if (!participant || participant.role !== 'owner') {
      throw new Error('没有删除权限');
    }

    // 删除会话
    this.sessions.delete(sessionId);
    
    // 从数据库删除
    await this.deleteSessionFromDB(sessionId);
  }

  /**
   * 生成唯一ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * 生成邀请令牌
   */
  private generateToken(): string {
    return Math.random().toString(36).substr(2, 16);
  }

  /**
   * 保存会话到数据库
   */
  private async saveSession(session: CollaborationSession): Promise<void> {
    // 这里实现数据库保存逻辑
    console.log('Saving session:', session.id);
  }

  /**
   * 从数据库加载会话
   */
  private async loadSession(sessionId: string): Promise<CollaborationSession | null> {
    // 这里实现数据库加载逻辑
    console.log('Loading session:', sessionId);
    return null;
  }

  /**
   * 从数据库删除会话
   */
  private async deleteSessionFromDB(sessionId: string): Promise<void> {
    // 这里实现数据库删除逻辑
    console.log('Deleting session:', sessionId);
  }

  /**
   * 发送邀请邮件
   */
  private async sendInviteEmail(invite: CollaborationInvite): Promise<void> {
    // 这里实现邮件发送逻辑
    console.log('Sending invite email to:', invite.email);
  }
}

export default new CollaborationService();
