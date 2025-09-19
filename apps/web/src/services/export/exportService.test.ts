import { describe, it, expect, vi } from 'vitest';
import { exportService, ExportData, ExportOptions } from './exportService';

// Mock html2canvas and jsPDF for testing
vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue({
    toDataURL: () => 'data:image/png;base64,test',
    toBlob: (callback: (blob: Blob | null) => void) => callback(new Blob(['test'], { type: 'image/png' }))
  })
}));

vi.mock('jspdf', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      addImage: vi.fn(),
      output: vi.fn().mockReturnValue(new Blob(['test'], { type: 'application/pdf' }))
    }))
  };
});

// 模拟测试数据
const mockData: ExportData = {
  topic: '测试分析主题',
  results: [
    { category: '问题1', analysis: '这是第一个问题的分析内容' },
    { category: '问题2', analysis: '这是第二个问题的分析内容' },
    { category: '问题3', analysis: '这是第三个问题的分析内容' }
  ],
  metadata: {
    analysisType: '奥斯本九问',
    timestamp: new Date().toISOString()
  }
};

describe('ExportService', () => {
  describe('JSON导出', () => {
    it('应该成功导出JSON格式', async () => {
      const options: ExportOptions = { format: 'json', includeMetadata: true };
      const blob = await exportService.export(mockData, options);
      
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('application/json');
      expect(blob.size).toBeGreaterThan(0);
    });
  });

  describe('Markdown导出', () => {
    it('应该成功导出Markdown格式', async () => {
      const options: ExportOptions = { format: 'markdown', includeMetadata: true };
      const blob = await exportService.export(mockData, options);
      
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/markdown');
      expect(blob.size).toBeGreaterThan(0);
    });
  });

  describe('HTML导出', () => {
    it('应该成功导出HTML格式', async () => {
      const options: ExportOptions = { format: 'html', includeMetadata: true };
      const blob = await exportService.export(mockData, options);
      
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/html');
      expect(blob.size).toBeGreaterThan(0);
    });
  });

  describe('PDF导出', () => {
    it('应该成功导出PDF格式', async () => {
      const options: ExportOptions = { format: 'pdf', includeMetadata: true };
      const blob = await exportService.export(mockData, options);
      
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('application/pdf');
      expect(blob.size).toBeGreaterThan(0);
    });
  });

  describe('图片导出', () => {
    it('应该成功导出图片格式', async () => {
      const options: ExportOptions = { format: 'image', includeMetadata: true };
      const blob = await exportService.export(mockData, options);
      
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('image/png');
      expect(blob.size).toBeGreaterThan(0);
    });
  });

  describe('多格式导出', () => {
    it('应该支持不同的卡片样式', async () => {
      const styles: ExportOptions['cardStyle'][] = ['default', 'minimal', 'detailed'];
      
      for (const style of styles) {
        const options: ExportOptions = { 
          format: 'html', 
          includeMetadata: true,
          cardStyle: style as 'default' | 'minimal' | 'detailed'
        };
        const blob = await exportService.export(mockData, options);
        
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.size).toBeGreaterThan(0);
      }
    });
  });

  describe('错误处理', () => {
    it('应该抛出错误当格式不支持时', async () => {
      const options = { format: 'unsupported' as any };
      
      await expect(exportService.export(mockData, options))
        .rejects
        .toThrow('Unsupported export format: unsupported');
    });
  });
});