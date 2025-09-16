import { useState, useCallback, useRef } from 'react';
import { APIState } from '@/types/workspace';

interface UseAPIStateReturn {
  state: APIState;
  execute: <T>(operation: string, apiCall: () => Promise<T>) => Promise<T>;
  retry: () => void;
  reset: () => void;
  updateProgress: (progress: number) => void;
}

export const useAPIState = (): UseAPIStateReturn => {
  const [state, setState] = useState<APIState>({
    isLoading: false,
    isError: false,
    error: null,
    progress: 0,
    retryCount: 0,
    lastUpdated: null,
    currentOperation: ''
  });

  const retryRef = useRef<(() => Promise<any>) | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress: Math.max(0, Math.min(100, progress)) }));
  }, []);

  const execute = useCallback(async <T>(
    operation: string, 
    apiCall: () => Promise<T>
  ): Promise<T> => {
    // 清除之前的进度定时器
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      isError: false, 
      error: null,
      currentOperation: operation,
      progress: 0
    }));

    // 保存重试函数
    retryRef.current = apiCall;

    try {
      // 模拟进度更新（实际项目中可以根据具体API调用情况调整）
      progressIntervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.progress < 90) {
            return { ...prev, progress: prev.progress + Math.random() * 10 };
          }
          return prev;
        });
      }, 200);

      const result = await apiCall();
      
      // 清除进度定时器
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        progress: 100,
        lastUpdated: new Date(),
        retryCount: 0
      }));
      
      return result;
    } catch (error) {
      // 清除进度定时器
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      const errorMessage = error instanceof Error ? error.message : '操作失败';
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: errorMessage,
        retryCount: prev.retryCount + 1
      }));
      
      throw error;
    }
  }, []);

  const retry = useCallback(async () => {
    if (retryRef.current && state.retryCount < 3) {
      try {
        await execute(state.currentOperation, retryRef.current);
      } catch (error) {
        // 重试失败，错误状态已在execute中处理
      }
    }
  }, [state.currentOperation, state.retryCount, execute]);

  const reset = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    setState({
      isLoading: false,
      isError: false,
      error: null,
      progress: 0,
      retryCount: 0,
      lastUpdated: null,
      currentOperation: ''
    });
    
    retryRef.current = null;
  }, []);

  return { 
    state, 
    execute, 
    retry, 
    reset, 
    updateProgress 
  };
};

export default useAPIState;
