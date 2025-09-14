import { AnalysisResult } from '../types';

// 协作会话接口
export interface CollaborationSession {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  participants: CollaborationParticipant[];
  analysisResult: AnalysisResult;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  comments: CollaborationComment[];
  status: 'active' | 'archived' | 'completed';
}

// 协作者信息
export interface CollaborationParticipant {
  userId: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: Date;
  lastActive: Date;
}

// 协作评论
export interface CollaborationComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  replies: CollaborationReply[];
  resolved: boolean;
  category: string;
}

// 评论回复
export interface CollaborationReply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

// 实时协作管理器
export class CollaborationManager {
  private sessions: Map<string, CollaborationSession> = new Map();
  private realtimeConnections: Map<string, Set<string>> = new Map();

  /**
   * 创建新的协作会话
   */
  createSession(
    title: string,
    description: string,
    ownerId: string,
    ownerName: string,
    analysisResult: AnalysisResult
  ): CollaborationSession {
    const session: CollaborationSession = {
      id: this.generateSessionId(),
      title,
      description,
      ownerId,
      participants: [{
        userId: ownerId,
        name: ownerName,
        email: '',
        role: 'owner',
        joinedAt: new Date(),
        lastActive: new Date()
      }],
      analysisResult,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      comments: [],
      status: 'active'
    };

    this.sessions.set(session.id, session);
    return session;
  }

  /**
   * 获取会话信息
   */
  getSession(sessionId: string): CollaborationSession | null {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * 添加参与者
   */
  addParticipant(
    sessionId: string,
    userId: string,
    name: string,
    email: string,
    role: 'editor' | 'viewer' = 'viewer'
  ): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    // 检查是否已经是参与者
    const existingParticipant = session.participants.find(p => p.userId === userId);
    if (existingParticipant) {
      existingParticipant.lastActive = new Date();
      return true;
    }

    session.participants.push({
      userId,
      name,
      email,
      role,
      joinedAt: new Date(),
      lastActive: new Date()
    });

    session.updatedAt = new Date();
    session.version++;

    return true;
  }

  /**
   * 添加评论
   */
  addComment(
    sessionId: string,
    userId: string,
    userName: string,
    content: string,
    category: string = 'general'
  ): CollaborationComment | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const comment: CollaborationComment = {
      id: this.generateCommentId(),
      userId,
      userName,
      content,
      createdAt: new Date(),
      replies: [],
      resolved: false,
      category
    };

    session.comments.push(comment);
    session.updatedAt = new Date();
    session.version++;

    this.notifyParticipants(sessionId, 'comment_added', { comment });

    return comment;
  }

  /**
   * 回复评论
   */
  addReply(
    sessionId: string,
    commentId: string,
    userId: string,
    userName: string,
    content: string
  ): CollaborationReply | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const comment = session.comments.find(c => c.id === commentId);
    if (!comment) return null;

    const reply: CollaborationReply = {
      id: this.generateReplyId(),
      userId,
      userName,
      content,
      createdAt: new Date()
    };

    comment.replies.push(reply);
    session.updatedAt = new Date();
    session.version++;

    this.notifyParticipants(sessionId, 'reply_added', { commentId, reply });

    return reply;
  }

  /**
   * 标记评论为已解决
   */
  resolveComment(sessionId: string, commentId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    const comment = session.comments.find(c => c.id === commentId);
    if (!comment) return false;

    comment.resolved = true;
    session.updatedAt = new Date();
    session.version++;

    this.notifyParticipants(sessionId, 'comment_resolved', { commentId });

    return true;
  }

  /**
   * 更新分析结果
   */
  updateAnalysisResult(sessionId: string, result: AnalysisResult): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.analysisResult = result;
    session.updatedAt = new Date();
    session.version++;

    this.notifyParticipants(sessionId, 'analysis_updated', { result });

    return true;
  }

  /**
   * 建立实时连接
   */
  connectRealtime(sessionId: string, connectionId: string): void {
    if (!this.realtimeConnections.has(sessionId)) {
      this.realtimeConnections.set(sessionId, new Set());
    }
    this.realtimeConnections.get(sessionId)!.add(connectionId);
  }

  /**
   * 断开实时连接
   */
  disconnectRealtime(sessionId: string, connectionId: string): void {
    const connections = this.realtimeConnections.get(sessionId);
    if (connections) {
      connections.delete(connectionId);
      if (connections.size === 0) {
        this.realtimeConnections.delete(sessionId);
      }
    }
  }

  /**
   * 通知所有参与者
   */
  private notifyParticipants(
    sessionId: string,
    event: string,
    data: any
  ): void {
    // 在实际项目中，这里会通过WebSocket或其他实时通信方式通知参与者
    console.log(`通知会话 ${sessionId}: ${event}`, data);
    
    const connections = this.realtimeConnections.get(sessionId);
    if (connections) {
      // 模拟实时通知
      connections.forEach(connectionId => {
        console.log(`发送到连接 ${connectionId}:`, { event, data });
      });
    }
  }

  /**
   * 生成唯一的会话ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 生成唯一的评论ID
   */
  private generateCommentId(): string {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 生成唯一的回复ID
   */
  private generateReplyId(): string {
    return `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 获取用户的所有会话
   */
  getUserSessions(userId: string): CollaborationSession[] {
    return Array.from(this.sessions.values()).filter(session =>
      session.participants.some(p => p.userId === userId)
    );
  }

  /**
   * 归档会话
   */
  archiveSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.status = 'archived';
    session.updatedAt = new Date();
    session.version++;

    return true;
  }

  /**
   * 删除会话
   */
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * 导出会话数据
   */
  exportSession(sessionId: string): string {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('会话不存在');

    return JSON.stringify({
      session: {
        ...session,
        participants: session.participants.map(p => ({
          ...p,
          joinedAt: p.joinedAt.toISOString(),
          lastActive: p.lastActive.toISOString()
        })),
        comments: session.comments.map(c => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
          replies: c.replies.map(r => ({
            ...r,
            createdAt: r.createdAt.toISOString()
          }))
        })),
        createdAt: session.createdAt.toISOString(),
        updatedAt: session.updatedAt.toISOString()
      }
    }, null, 2);
  }

  /**
   * 获取会话统计信息
   */
  getSessionStats(sessionId: string): {
    participantCount: number;
    commentCount: number;
    replyCount: number;
    activeParticipants: number;
  } | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    return {
      participantCount: session.participants.length,
      commentCount: session.comments.length,
      replyCount: session.comments.reduce((total, comment) => 
        total + comment.replies.length, 0),
      activeParticipants: session.participants.filter(p => 
        p.lastActive > oneHourAgo).length
    };
  }
}

// 创建默认协作管理器实例
export const collaborationManager = new CollaborationManager();

// 协作相关的工具函数
export const collaborationUtils = {
  /**
   * 验证用户权限
   */
  hasEditPermission(session: CollaborationSession, userId: string): boolean {
    const participant = session.participants.find(p => p.userId === userId);
    return participant ? ['owner', 'editor'].includes(participant.role) : false;
  },

  /**
   * 格式化协作时间
   */
  formatCollaborationTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
    
    return date.toLocaleDateString('zh-CN');
  },

  /**
   * 生成邀请链接
   */
  generateInviteLink(sessionId: string, baseUrl: string = window.location.origin): string {
    return `${baseUrl}/collaborate/${sessionId}`;
  }
};