import { Collaborator, CursorPosition } from '@/types/workspace';

export interface WebSocketMessage {
  type: 'collaborator_join' | 'collaborator_leave' | 'cursor_update' | 'content_change' | 'typing' | 'ping' | 'pong';
  payload: any;
  timestamp: number;
  userId: string;
  sessionId: string;
}

export interface CollaborationSession {
  id: string;
  name: string;
  owner: string;
  collaborators: Collaborator[];
  createdAt: Date;
  lastActivity: Date;
  isActive: boolean;
}

export interface CursorUpdate {
  userId: string;
  position: CursorPosition;
  elementId?: string;
  timestamp: number;
}

export interface ContentChange {
  userId: string;
  changeType: 'insert' | 'delete' | 'replace';
  content: string;
  position: number;
  timestamp: number;
}

export interface TypingIndicator {
  userId: string;
  isTyping: boolean;
  timestamp: number;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private isConnecting = false;
  private messageQueue: WebSocketMessage[] = [];
  
  // 事件监听器
  private listeners: Map<string, Set<(...args: any[]) => void>> = new Map();
  
  // 配置
  private config = {
    url: process.env.NODE_ENV === 'production' 
      ? 'wss://api.huitu.com/ws' 
      : 'ws://localhost:3001/ws',
    heartbeatInterval: 30000, // 30秒
    reconnectDelay: 1000,
    maxReconnectAttempts: 5
  };

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // 监听网络状态变化
    window.addEventListener('online', () => {
      console.log('Network online, attempting to reconnect...');
      this.reconnect();
    });

    window.addEventListener('offline', () => {
      console.log('Network offline, pausing reconnection attempts...');
      this.disconnect();
    });

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseHeartbeat();
      } else {
        this.resumeHeartbeat();
      }
    });
  }

  // 连接到WebSocket服务器
  async connect(sessionId: string, userId: string): Promise<boolean> {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return true;
    }

    this.isConnecting = true;

    try {
      const wsUrl = `${this.config.url}?sessionId=${sessionId}&userId=${userId}`;
      this.ws = new WebSocket(wsUrl);

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 10000);

        this.ws!.onopen = () => {
          clearTimeout(timeout);
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          console.log('WebSocket connected');
          
          this.startHeartbeat();
          this.processMessageQueue();
          this.emit('connected');
          resolve(true);
        };

        this.ws!.onerror = (error) => {
          clearTimeout(timeout);
          this.isConnecting = false;
          console.error('WebSocket error:', error);
          this.emit('error', error);
          reject(error);
        };

        this.ws!.onclose = (event) => {
          clearTimeout(timeout);
          this.isConnecting = false;
          this.stopHeartbeat();
          console.log('WebSocket disconnected:', event.code, event.reason);
          this.emit('disconnected', event);
          
          if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect();
          }
        };

        this.ws!.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
      });
    } catch (error) {
      this.isConnecting = false;
      console.error('Failed to connect to WebSocket:', error);
      throw error;
    }
  }

  // 断开连接
  disconnect() {
    this.stopHeartbeat();
    
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }
    
    this.emit('disconnected');
  }

  // 发送消息
  send(type: WebSocketMessage['type'], payload: any, userId: string, sessionId: string) {
    const message: WebSocketMessage = {
      type,
      payload,
      timestamp: Date.now(),
      userId,
      sessionId
    };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // 如果连接未建立，将消息加入队列
      this.messageQueue.push(message);
    }
  }

  // 处理接收到的消息
  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case 'collaborator_join':
        this.emit('collaborator_join', message.payload);
        break;
      case 'collaborator_leave':
        this.emit('collaborator_leave', message.payload);
        break;
      case 'cursor_update':
        this.emit('cursor_update', message.payload);
        break;
      case 'content_change':
        this.emit('content_change', message.payload);
        break;
      case 'typing':
        this.emit('typing', message.payload);
        break;
      case 'pong':
        // 心跳响应
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  // 发送协作者加入消息
  sendCollaboratorJoin(collaborator: Collaborator, sessionId: string) {
    this.send('collaborator_join', collaborator, collaborator.id, sessionId);
  }

  // 发送协作者离开消息
  sendCollaboratorLeave(userId: string, sessionId: string) {
    this.send('collaborator_leave', { userId }, userId, sessionId);
  }

  // 发送光标位置更新
  sendCursorUpdate(cursorUpdate: CursorUpdate, sessionId: string) {
    this.send('cursor_update', cursorUpdate, cursorUpdate.userId, sessionId);
  }

  // 发送内容变更
  sendContentChange(contentChange: ContentChange, sessionId: string) {
    this.send('content_change', contentChange, contentChange.userId, sessionId);
  }

  // 发送打字指示器
  sendTypingIndicator(typingIndicator: TypingIndicator, sessionId: string) {
    this.send('typing', typingIndicator, typingIndicator.userId, sessionId);
  }

  // 开始心跳
  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send('ping', {}, '', '');
      }
    }, this.config.heartbeatInterval);
  }

  // 停止心跳
  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // 暂停心跳
  private pauseHeartbeat() {
    this.stopHeartbeat();
  }

  // 恢复心跳
  private resumeHeartbeat() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.startHeartbeat();
    }
  }

  // 处理消息队列
  private processMessageQueue() {
    while (this.messageQueue.length > 0 && this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = this.messageQueue.shift();
      if (message) {
        this.ws.send(JSON.stringify(message));
      }
    }
  }

  // 安排重连
  private scheduleReconnect() {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms`);
    
    setTimeout(() => {
      this.reconnect();
    }, delay);
  }

  // 重连
  private async reconnect() {
    if (this.isConnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
    
    try {
      // 这里需要从外部获取sessionId和userId
      // 在实际应用中，这些信息应该存储在状态管理中
      await this.connect('', '');
    } catch (error) {
      console.error('Reconnection failed:', error);
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.scheduleReconnect();
      } else {
        this.emit('reconnect_failed');
      }
    }
  }

  // 事件监听器管理
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: (...args: any[]) => void) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  private emit(event: string, data?: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  // 获取连接状态
  getConnectionState(): 'connecting' | 'connected' | 'disconnected' | 'error' {
    if (this.isConnecting) return 'connecting';
    if (this.ws) {
      switch (this.ws.readyState) {
        case WebSocket.CONNECTING:
          return 'connecting';
        case WebSocket.OPEN:
          return 'connected';
        case WebSocket.CLOSING:
        case WebSocket.CLOSED:
          return 'disconnected';
        default:
          return 'error';
      }
    }
    return 'disconnected';
  }

  // 获取连接信息
  getConnectionInfo() {
    return {
      state: this.getConnectionState(),
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
      isConnecting: this.isConnecting,
      queuedMessages: this.messageQueue.length
    };
  }
}

// 创建单例实例
export const websocketService = new WebSocketService();

// 导出类
export { WebSocketService };
