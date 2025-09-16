import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  websocketService, 
   
  
  CursorUpdate,
  ContentChange,
  TypingIndicator
} from '@/services/collaboration/websocketService';
import { 
  conflictResolver, 
  ConflictResolution 
} from '@/services/collaboration/conflictResolver';
import { 
  Collaborator, 
  WorkspaceMode 
} from '@/types/workspace';

interface UseCollaborationProps {
  sessionId: string;
  currentUser: Collaborator;
  mode: WorkspaceMode;
}

interface UseCollaborationReturn {
  // 连接状态
  connectionState: 'connecting' | 'connected' | 'disconnected' | 'error';
  connectionInfo: any;
  
  // 协作者管理
  collaborators: Collaborator[];
  activeCollaborators: Collaborator[];
  
  // 实时功能
  cursorPositions: Map<string, CursorUpdate>;
  typingIndicators: Map<string, TypingIndicator>;
  
  // 冲突解决
  pendingConflicts: ConflictResolution[];
  conflictStats: any;
  
  // 操作方法
  joinSession: () => Promise<boolean>;
  leaveSession: () => void;
  updateCursor: (position: CursorUpdate['position'], elementId?: string) => void;
  sendContentChange: (change: Omit<ContentChange, 'userId' | 'timestamp'>) => void;
  sendTypingIndicator: (isTyping: boolean) => void;
  resolveConflict: (conflictId: string, resolution: 'accept_original' | 'accept_conflict' | 'merge') => void;
  
  // 状态
  isConnected: boolean;
  isTyping: boolean;
  lastActivity: Date | null;
}

export const useCollaboration = ({
  sessionId,
  currentUser,
  
}: UseCollaborationProps): UseCollaborationReturn => {
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [cursorPositions, setCursorPositions] = useState<Map<string, CursorUpdate>>(new Map());
  const [typingIndicators, setTypingIndicators] = useState<Map<string, TypingIndicator>>(new Map());
  const [pendingConflicts, setPendingConflicts] = useState<ConflictResolution[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCursorUpdateRef = useRef<number>(0);

  // 连接状态管理
  useEffect(() => {
    const updateConnectionState = () => {
      setConnectionState(websocketService.getConnectionState());
    };

    websocketService.on('connected', updateConnectionState);
    websocketService.on('disconnected', updateConnectionState);
    websocketService.on('error', updateConnectionState);

    return () => {
      websocketService.off('connected', updateConnectionState);
      websocketService.off('disconnected', updateConnectionState);
      websocketService.off('error', updateConnectionState);
    };
  }, []);

  // 协作者管理
  useEffect(() => {
    const handleCollaboratorJoin = (collaborator: Collaborator) => {
      setCollaborators(prev => {
        const existing = prev.find(c => c.id === collaborator.id);
        if (existing) {
          return prev.map(c => c.id === collaborator.id ? collaborator : c);
        }
        return [...prev, collaborator];
      });
      setLastActivity(new Date());
    };

    const handleCollaboratorLeave = (payload: { userId: string }) => {
      setCollaborators(prev => prev.filter(c => c.id !== payload.userId));
      setCursorPositions(prev => {
        const newMap = new Map(prev);
        newMap.delete(payload.userId);
        return newMap;
      });
      setTypingIndicators(prev => {
        const newMap = new Map(prev);
        newMap.delete(payload.userId);
        return newMap;
      });
      setLastActivity(new Date());
    };

    websocketService.on('collaborator_join', handleCollaboratorJoin);
    websocketService.on('collaborator_leave', handleCollaboratorLeave);

    return () => {
      websocketService.off('collaborator_join', handleCollaboratorJoin);
      websocketService.off('collaborator_leave', handleCollaboratorLeave);
    };
  }, []);

  // 光标位置管理
  useEffect(() => {
    const handleCursorUpdate = (cursorUpdate: CursorUpdate) => {
      if (cursorUpdate.userId !== currentUser.id) {
        setCursorPositions(prev => {
          const newMap = new Map(prev);
          newMap.set(cursorUpdate.userId, cursorUpdate);
          return newMap;
        });
        setLastActivity(new Date());
      }
    };

    websocketService.on('cursor_update', handleCursorUpdate);

    return () => {
      websocketService.off('cursor_update', handleCursorUpdate);
    };
  }, [currentUser.id]);

  // 内容变更管理
  useEffect(() => {
    const handleContentChange = (contentChange: ContentChange) => {
      if (contentChange.userId !== currentUser.id) {
        // 检测冲突
        const conflict = conflictResolver.detectConflict(
          contentChange,
          { userId: currentUser.id, timestamp: Date.now() } as ContentChange
        );

        if (conflict) {
          const resolvedConflict = conflictResolver.resolveConflict(conflict);
          if (resolvedConflict.resolution === 'manual') {
            setPendingConflicts(prev => [...prev, resolvedConflict]);
          }
        }

        setLastActivity(new Date());
      }
    };

    websocketService.on('content_change', handleContentChange);

    return () => {
      websocketService.off('content_change', handleContentChange);
    };
  }, [currentUser.id]);

  // 打字指示器管理
  useEffect(() => {
    const handleTyping = (typingIndicator: TypingIndicator) => {
      if (typingIndicator.userId !== currentUser.id) {
        setTypingIndicators(prev => {
          const newMap = new Map(prev);
          if (typingIndicator.isTyping) {
            newMap.set(typingIndicator.userId, typingIndicator);
          } else {
            newMap.delete(typingIndicator.userId);
          }
          return newMap;
        });
        setLastActivity(new Date());
      }
    };

    websocketService.on('typing', handleTyping);

    return () => {
      websocketService.off('typing', handleTyping);
    };
  }, [currentUser.id]);

  // 加入会话
  const joinSession = useCallback(async (): Promise<boolean> => {
    try {
      setConnectionState('connecting');
      const success = await websocketService.connect(sessionId, currentUser.id);
      
      if (success) {
        // 发送协作者加入消息
        websocketService.sendCollaboratorJoin(currentUser, sessionId);
        setLastActivity(new Date());
      }
      
      return success;
    } catch (error) {
      console.error('Failed to join session:', error);
      setConnectionState('error');
      return false;
    }
  }, [sessionId, currentUser]);

  // 离开会话
  const leaveSession = useCallback(() => {
    websocketService.sendCollaboratorLeave(currentUser.id, sessionId);
    websocketService.disconnect();
    setConnectionState('disconnected');
    setCollaborators([]);
    setCursorPositions(new Map());
    setTypingIndicators(new Map());
    setPendingConflicts([]);
  }, [sessionId, currentUser.id]);

  // 更新光标位置
  const updateCursor = useCallback((position: CursorUpdate['position'], elementId?: string) => {
    const now = Date.now();
    
    // 节流光标更新（最多每100ms更新一次）
    if (now - lastCursorUpdateRef.current < 100) {
      return;
    }
    
    lastCursorUpdateRef.current = now;
    
    const cursorUpdate: CursorUpdate = {
      userId: currentUser.id,
      position,
      elementId: elementId || '',
      timestamp: now
    };
    
    websocketService.sendCursorUpdate(cursorUpdate, sessionId);
    setLastActivity(new Date());
  }, [currentUser.id, sessionId]);

  // 发送内容变更
  const sendContentChange = useCallback((change: Omit<ContentChange, 'userId' | 'timestamp'>) => {
    const contentChange: ContentChange = {
      ...change,
      userId: currentUser.id,
      timestamp: Date.now()
    };
    
    websocketService.sendContentChange(contentChange, sessionId);
    setLastActivity(new Date());
  }, [currentUser.id, sessionId]);

  // 发送打字指示器
  const sendTypingIndicator = useCallback((typing: boolean) => {
    if (typing === isTyping) {
      return;
    }
    
    setIsTyping(typing);
    
    const typingIndicator: TypingIndicator = {
      userId: currentUser.id,
      isTyping: typing,
      timestamp: Date.now()
    };
    
    websocketService.sendTypingIndicator(typingIndicator, sessionId);
    
    // 自动停止打字指示器
    if (typing) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingIndicator(false);
      }, 3000);
    }
  }, [currentUser.id, sessionId, isTyping]);

  // 解决冲突
  const resolveConflict = useCallback((conflictId: string, resolution: 'accept_original' | 'accept_conflict' | 'merge') => {
    const resolvedConflict = conflictResolver.manualResolveConflict(conflictId, resolution, currentUser.id);
    
    if (resolvedConflict) {
      setPendingConflicts(prev => prev.filter(c => c.conflictId !== conflictId));
      setLastActivity(new Date());
    }
  }, [currentUser.id]);

  // 计算派生状态
  const activeCollaborators = collaborators.filter(c => c.status === 'online');
  const isConnected = connectionState === 'connected';
  const connectionInfo = websocketService.getConnectionInfo();
  const conflictStats = conflictResolver.getConflictStats();

  // 清理定时器
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // 组件卸载时离开会话
  useEffect(() => {
    return () => {
      leaveSession();
    };
  }, [leaveSession]);

  return {
    // 连接状态
    connectionState,
    connectionInfo,
    
    // 协作者管理
    collaborators,
    activeCollaborators,
    
    // 实时功能
    cursorPositions,
    typingIndicators,
    
    // 冲突解决
    pendingConflicts,
    conflictStats,
    
    // 操作方法
    joinSession,
    leaveSession,
    updateCursor,
    sendContentChange,
    sendTypingIndicator,
    resolveConflict,
    
    // 状态
    isConnected,
    isTyping,
    lastActivity
  };
};

export default useCollaboration;
