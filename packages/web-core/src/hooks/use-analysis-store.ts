import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnalysisResult } from '@osborn/shared';

interface AnalysisState {
  // 当前分析结果
  currentResult: AnalysisResult | null;
  // 历史记录
  history: AnalysisResult[];
  // 是否正在分析
  isAnalyzing: boolean;
  // 分析错误
  error: string | null;
  
  // 方法
  setCurrentResult: (result: AnalysisResult | null) => void;
  addToHistory: (result: AnalysisResult) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  
  // 选择器
  getHistoryByDate: (date: Date) => AnalysisResult[];
  getHistoryCount: () => number;
}

const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set, get) => ({
      currentResult: null,
      history: [],
      isAnalyzing: false,
      error: null,
      
      setCurrentResult: (result) => set({ currentResult: result }),
      
      addToHistory: (result) => set((state) => ({
        history: [result, ...state.history].slice(0, 100) // 最多保留100条记录
      })),
      
      removeFromHistory: (id) => set((state) => ({
        history: state.history.filter(item => item.id !== id)
      })),
      
      clearHistory: () => set({ history: [] }),
      
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      
      setError: (error) => set({ error }),
      
      getHistoryByDate: (date) => {
        const { history } = get();
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        return history.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= startOfDay && itemDate <= endOfDay;
        });
      },
      
      getHistoryCount: () => get().history.length,
    }),
    {
      name: 'huitu-analysis-store',
      partialize: (state) => ({
        history: state.history,
        // 不持久化当前结果和临时状态
      }),
    }
  )
);

export default useAnalysisStore;