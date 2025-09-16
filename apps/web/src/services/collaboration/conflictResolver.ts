import { ContentChange, CursorUpdate } from './websocketService';

export interface ConflictResolution {
  type: 'content' | 'cursor' | 'selection';
  conflictId: string;
  originalChange: ContentChange | CursorUpdate;
  conflictingChange: ContentChange | CursorUpdate;
  resolution: 'accept_original' | 'accept_conflict' | 'merge' | 'manual';
  resolvedAt: Date;
  resolvedBy: string;
}

export interface ConflictResolutionStrategy {
  id: string;
  name: string;
  description: string;
  canResolve: (conflict: ConflictResolution) => boolean;
  resolve: (conflict: ConflictResolution) => ConflictResolution;
}

export interface OperationalTransform {
  type: 'insert' | 'delete' | 'retain';
  content?: string;
  length: number;
  attributes?: Record<string, any>;
}

class ConflictResolver {
  private strategies: ConflictResolutionStrategy[] = [];
  private conflictHistory: ConflictResolution[] = [];
  private pendingConflicts: Map<string, ConflictResolution> = new Map();

  constructor() {
    this.initializeStrategies();
  }

  private initializeStrategies() {
    // 内容冲突解决策略
    this.strategies.push({
      id: 'last_write_wins',
      name: '最后写入获胜',
      description: '接受最后写入的更改',
      canResolve: (conflict) => conflict.type === 'content',
      resolve: (conflict) => {
        const original = conflict.originalChange as ContentChange;
        const conflicting = conflict.conflictingChange as ContentChange;
        
        return {
          ...conflict,
          resolution: original.timestamp > conflicting.timestamp ? 'accept_original' : 'accept_conflict',
          resolvedAt: new Date(),
          resolvedBy: 'system'
        };
      }
    });

    // 位置冲突解决策略
    this.strategies.push({
      id: 'position_based',
      name: '基于位置解决',
      description: '根据操作位置自动解决冲突',
      canResolve: (conflict) => conflict.type === 'content',
      resolve: (conflict) => {
        const original = conflict.originalChange as ContentChange;
        const conflicting = conflict.conflictingChange as ContentChange;
        
        // 如果操作位置不重叠，可以合并
        if (this.canMergePositions(original, conflicting)) {
          return {
            ...conflict,
            resolution: 'merge',
            resolvedAt: new Date(),
            resolvedBy: 'system'
          };
        }
        
        // 否则使用最后写入获胜
        return {
          ...conflict,
          resolution: original.timestamp > conflicting.timestamp ? 'accept_original' : 'accept_conflict',
          resolvedAt: new Date(),
          resolvedBy: 'system'
        };
      }
    });

    // 光标冲突解决策略
    this.strategies.push({
      id: 'cursor_merge',
      name: '光标合并',
      description: '合并多个光标位置',
      canResolve: (conflict) => conflict.type === 'cursor',
      resolve: (conflict) => {
        return {
          ...conflict,
          resolution: 'merge',
          resolvedAt: new Date(),
          resolvedBy: 'system'
        };
      }
    });

    // 用户优先级策略
    this.strategies.push({
      id: 'user_priority',
      name: '用户优先级',
      description: '根据用户角色优先级解决冲突',
      canResolve: (conflict) => conflict.type === 'content',
      resolve: (conflict) => {
        // 这里需要用户角色信息，实际应用中从状态管理获取
        const original = conflict.originalChange as ContentChange;
        const conflicting = conflict.conflictingChange as ContentChange;
        
        // 简化处理：使用时间戳
        return {
          ...conflict,
          resolution: original.timestamp > conflicting.timestamp ? 'accept_original' : 'accept_conflict',
          resolvedAt: new Date(),
          resolvedBy: 'system'
        };
      }
    });
  }

  // 检测冲突
  detectConflict(change1: ContentChange | CursorUpdate, change2: ContentChange | CursorUpdate): ConflictResolution | null {
    // 如果是同一个用户的操作，不产生冲突
    if (change1.userId === change2.userId) {
      return null;
    }

    // 检查时间重叠（操作时间接近）
    const timeDiff = Math.abs(change1.timestamp - change2.timestamp);
    if (timeDiff > 5000) { // 5秒内的操作才可能冲突
      return null;
    }

    // 内容冲突检测
    if (this.isContentChange(change1) && this.isContentChange(change2)) {
      if (this.hasContentConflict(change1, change2)) {
        return {
          type: 'content',
          conflictId: this.generateConflictId(),
          originalChange: change1,
          conflictingChange: change2,
          resolution: 'manual',
          resolvedAt: new Date(),
          resolvedBy: 'system'
        };
      }
    }

    // 光标冲突检测
    if (this.isCursorUpdate(change1) && this.isCursorUpdate(change2)) {
      if (this.hasCursorConflict(change1, change2)) {
        return {
          type: 'cursor',
          conflictId: this.generateConflictId(),
          originalChange: change1,
          conflictingChange: change2,
          resolution: 'merge',
          resolvedAt: new Date(),
          resolvedBy: 'system'
        };
      }
    }

    return null;
  }

  // 解决冲突
  resolveConflict(conflict: ConflictResolution): ConflictResolution {
    // 查找适用的解决策略
    const applicableStrategies = this.strategies.filter(strategy => 
      strategy.canResolve(conflict)
    );

    if (applicableStrategies.length === 0) {
      // 没有自动解决策略，标记为需要手动解决
      return {
        ...conflict,
        resolution: 'manual',
        resolvedAt: new Date(),
        resolvedBy: 'system'
      };
    }

    // 使用第一个适用的策略
    const strategy = applicableStrategies[0];
    const resolvedConflict = strategy?.resolve(conflict) || conflict;
    
    // 记录解决历史
    this.conflictHistory.push(resolvedConflict);
    
    return resolvedConflict;
  }

  // 手动解决冲突
  manualResolveConflict(conflictId: string, resolution: 'accept_original' | 'accept_conflict' | 'merge', resolvedBy: string): ConflictResolution | null {
    const conflict = this.pendingConflicts.get(conflictId);
    if (!conflict) {
      return null;
    }

    const resolvedConflict: ConflictResolution = {
      ...conflict,
      resolution,
      resolvedAt: new Date(),
      resolvedBy
    };

    this.conflictHistory.push(resolvedConflict);
    this.pendingConflicts.delete(conflictId);

    return resolvedConflict;
  }

  // 应用操作变换
  applyOperationalTransform(operations: OperationalTransform[], change: ContentChange): ContentChange {
    let newPosition = change.position;
    const newContent = change.content;

    for (const op of operations) {
      switch (op.type) {
        case 'insert':
          if (newPosition >= op.length) {
            newPosition += op.content?.length || 0;
          }
          break;
        case 'delete':
          if (newPosition >= op.length) {
            newPosition = Math.max(0, newPosition - op.length);
          }
          break;
        case 'retain':
          // 保留操作，位置不变
          break;
      }
    }

    return {
      ...change,
      position: newPosition,
      content: newContent
    };
  }

  // 生成操作变换
  generateOperationalTransform(originalChange: ContentChange, conflictingChange: ContentChange): OperationalTransform[] {
    const operations: OperationalTransform[] = [];
    
    // 根据冲突类型生成变换操作
    if (conflictingChange.position < originalChange.position) {
      // 冲突操作在原始操作之前
      if (conflictingChange.changeType === 'insert') {
        operations.push({
          type: 'insert',
          content: conflictingChange.content,
          length: conflictingChange.content.length
        });
        operations.push({
          type: 'retain',
          length: originalChange.position - conflictingChange.position
        });
      } else if (conflictingChange.changeType === 'delete') {
        operations.push({
          type: 'delete',
          length: conflictingChange.content.length
        });
        operations.push({
          type: 'retain',
          length: originalChange.position - conflictingChange.position
        });
      }
    } else if (conflictingChange.position > originalChange.position) {
      // 冲突操作在原始操作之后
      operations.push({
        type: 'retain',
        length: conflictingChange.position - originalChange.position
      });
      
      if (conflictingChange.changeType === 'insert') {
        operations.push({
          type: 'insert',
          content: conflictingChange.content,
          length: conflictingChange.content.length
        });
      } else if (conflictingChange.changeType === 'delete') {
        operations.push({
          type: 'delete',
          length: conflictingChange.content.length
        });
      }
    } else {
      // 相同位置的操作
      if (conflictingChange.changeType === 'insert' && originalChange.changeType === 'insert') {
        // 两个插入操作，合并内容
        operations.push({
          type: 'insert',
          content: conflictingChange.content + originalChange.content,
          length: conflictingChange.content.length + originalChange.content.length
        });
      } else if (conflictingChange.changeType === 'delete' && originalChange.changeType === 'delete') {
        // 两个删除操作，取较长的删除
        const maxLength = Math.max(conflictingChange.content.length, originalChange.content.length);
        operations.push({
          type: 'delete',
          length: maxLength
        });
      }
    }

    return operations;
  }

  // 私有辅助方法
  private isContentChange(change: any): change is ContentChange {
    return 'changeType' in change && 'content' in change && 'position' in change;
  }

  private isCursorUpdate(change: any): change is CursorUpdate {
    return 'position' in change && 'x' in change.position && 'y' in change.position;
  }

  private hasContentConflict(change1: ContentChange, change2: ContentChange): boolean {
    // 检查位置重叠
    const change1End = change1.position + change1.content.length;
    const change2End = change2.position + change2.content.length;
    
    return !(change1End <= change2.position || change2End <= change1.position);
  }

  private hasCursorConflict(_change1: CursorUpdate, _change2: CursorUpdate): boolean {
    // 光标冲突通常可以合并，这里简化处理
    return true;
  }

  private canMergePositions(change1: ContentChange, change2: ContentChange): boolean {
    const change1End = change1.position + change1.content.length;
    const change2End = change2.position + change2.content.length;
    
    // 如果操作位置不重叠，可以合并
    return change1End <= change2.position || change2End <= change1.position;
  }

  private generateConflictId(): string {
    return `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 获取冲突统计
  getConflictStats() {
    return {
      totalConflicts: this.conflictHistory.length,
      pendingConflicts: this.pendingConflicts.size,
      resolvedConflicts: this.conflictHistory.filter(c => c.resolution !== 'manual').length,
      manualConflicts: this.conflictHistory.filter(c => c.resolution === 'manual').length,
      resolutionTypes: this.conflictHistory.reduce((acc, conflict) => {
        acc[conflict.resolution] = (acc[conflict.resolution] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  // 获取待解决的冲突
  getPendingConflicts(): ConflictResolution[] {
    return Array.from(this.pendingConflicts.values());
  }

  // 清除冲突历史
  clearConflictHistory() {
    this.conflictHistory = [];
    this.pendingConflicts.clear();
  }
}

// 创建单例实例
export const conflictResolver = new ConflictResolver();

// 导出类
export { ConflictResolver };
