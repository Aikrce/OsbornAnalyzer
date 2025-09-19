/**
 * 统一分析状态管理器
 * 解决 AnalysisResultPage 同时从状态和 localStorage 读取数据的问题
 */

import { useState, useEffect, useCallback } from 'react';
import { DualAnalysisResult } from './useDualAnalysis';
import { unifiedDataManager } from '../services/data/unifiedDataManager';
import { ErrorHandler } from '../services/error/errorHandler';

export interface UseAnalysisStateReturn {
  results: DualAnalysisResult[];
  isLoading: boolean;
  error: string | null;
  addResult: (result: DualAnalysisResult) => void;
  updateResult: (id: string, updates: Partial<DualAnalysisResult>) => void;
  removeResult: (id: string) => void;
  getResultById: (id: string) => DualAnalysisResult | undefined;
  getResultsByTopic: (topic: string) => DualAnalysisResult[];
  getResultsByType: (type: 'local' | 'api') => DualAnalysisResult[];
  setError: (error: string | null) => void;
  refreshResults: () => Promise<void>;
  loadResults: () => Promise<void>;
}

export const useAnalysisState = (): UseAnalysisStateReturn => {
  const [results, setResults] = useState<DualAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 从统一数据管理器加载结果
   */
  const loadResults = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const savedResults = unifiedDataManager.getDualResults();
      setResults(savedResults);
    } catch (err) {
      const userMessage = ErrorHandler.handleStorageError(err, {
        component: 'useAnalysisState',
        action: 'loadResults'
      });
      setError(userMessage);
      
      ErrorHandler.logError(err, {
        component: 'useAnalysisState',
        action: 'loadResults'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 添加新结果
   */
  const addResult = useCallback((result: DualAnalysisResult) => {
    setResults(prev => {
      // 避免重复添加
      const exists = prev.some(r => r.analysisId === result.analysisId);
      if (exists) {
        return prev;
      }
      return [result, ...prev];
    });
    
    // 异步保存到统一数据管理器
    unifiedDataManager.saveAnalysisResult(result).catch(err => {
      ErrorHandler.logError(err, {
        component: 'useAnalysisState',
        action: 'addResult',
        additionalData: { analysisId: result.analysisId }
      });
    });
  }, []);

  /**
   * 更新结果
   */
  const updateResult = useCallback((id: string, updates: Partial<DualAnalysisResult>) => {
    setResults(prev => prev.map(result => 
      result.analysisId === id 
        ? { ...result, ...updates, timestamp: new Date() }
        : result
    ));
    
    // 异步更新到统一数据管理器
    unifiedDataManager.updateDualResult(id, updates);
  }, []);

  /**
   * 删除结果
   */
  const removeResult = useCallback((id: string) => {
    setResults(prev => prev.filter(result => result.analysisId !== id));
    
    // 异步删除
    unifiedDataManager.deleteDualResult(id);
  }, []);

  /**
   * 根据ID获取结果
   */
  const getResultById = useCallback((id: string): DualAnalysisResult | undefined => {
    return results.find(result => result.analysisId === id);
  }, [results]);

  /**
   * 根据主题获取结果
   */
  const getResultsByTopic = useCallback((topic: string): DualAnalysisResult[] => {
    return results.filter(result => 
      result.topic.toLowerCase().includes(topic.toLowerCase())
    );
  }, [results]);

  /**
   * 根据类型获取结果
   */
  const getResultsByType = useCallback((type: 'local' | 'api'): DualAnalysisResult[] => {
    return results.filter(result => 
      result.analysisId.startsWith(type)
    );
  }, [results]);

  /**
   * 刷新结果
   */
  const refreshResults = useCallback(async () => {
    await loadResults();
  }, [loadResults]);

  // 初始化时加载结果
  useEffect(() => {
    loadResults();
  }, [loadResults]);

  return {
    results,
    isLoading,
    error,
    addResult,
    updateResult,
    removeResult,
    getResultById,
    getResultsByTopic,
    getResultsByType,
    setError,
    refreshResults,
    loadResults
  };
};
