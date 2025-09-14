import { nanoid } from 'nanoid';

/**
 * 分析事件接口
 */
export interface AnalyticsEvent {
  id: string;
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId?: string;
}

/**
 * 分析管理器
 */
export class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private userId?: string;
  private sessionId: string;
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = nanoid();
  }

  /**
   * 设置用户ID
   */
  setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * 启用/禁用分析
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * 记录事件
   */
  track(name: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) {
      return;
    }

    const event: AnalyticsEvent = {
      id: nanoid(),
      name,
      properties,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.events.push(event);

    // 限制事件数量，防止内存溢出
    if (this.events.length > 1000) {
      this.events = this.events.slice(-500);
    }
  }

  /**
   * 记录页面访问
   */
  page(pageName: string, properties?: Record<string, any>): void {
    this.track('page_view', {
      page: pageName,
      ...properties,
    });
  }

  /**
   * 记录用户行为
   */
  action(actionName: string, properties?: Record<string, any>): void {
    this.track('user_action', {
      action: actionName,
      ...properties,
    });
  }

  /**
   * 获取事件列表
   */
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  /**
   * 获取分析报告
   */
  getReport(timeRange?: { start: number; end: number }) {
    let filteredEvents = this.events;

    if (timeRange) {
      filteredEvents = this.events.filter(
        event => event.timestamp >= timeRange.start && event.timestamp <= timeRange.end
      );
    }

    const eventCounts = filteredEvents.reduce((acc, event) => {
      acc[event.name] = (acc[event.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const uniqueUsers = new Set(filteredEvents.map(event => event.userId).filter(Boolean)).size;

    return {
      totalEvents: filteredEvents.length,
      eventCounts,
      uniqueUsers,
      sessionId: this.sessionId,
      timeRange: timeRange || {
        start: Math.min(...filteredEvents.map(e => e.timestamp)),
        end: Math.max(...filteredEvents.map(e => e.timestamp)),
      },
    };
  }

  /**
   * 清空事件
   */
  clear(): void {
    this.events = [];
  }
}

/**
 * 全局分析实例
 */
export const analytics = new AnalyticsManager();
