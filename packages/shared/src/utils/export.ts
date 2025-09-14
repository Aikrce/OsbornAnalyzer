import type { AnalysisResult, ExportOptions } from '../types';
import JSZip from 'jszip';

// 导出格式处理器
export class ExportManager {
  static async exportToJSON(result: AnalysisResult): Promise<string> {
    return JSON.stringify(result, null, 2);
  }

  static async exportToMarkdown(result: AnalysisResult): Promise<string> {
    let markdown = `# ${result.title}\n\n`;
    markdown += `> ${result.description}\n\n`;
    markdown += `## 奥斯本九问分析\n\n`;
    
    Object.entries(result.questions).forEach(([category, questions]) => {
      markdown += `### ${getCategoryTitle(category)}\n`;
      questions.forEach((question, index) => {
        markdown += `${index + 1}. ${question}\n`;
      });
      markdown += '\n';
    });
    
    markdown += `---\n`;
    markdown += `创建时间: ${result.createdAt.toLocaleString()}\n`;
    markdown += `更新时间: ${result.updatedAt.toLocaleString()}\n`;
    
    return markdown;
  }

  static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async exportAnalysis(result: AnalysisResult, options: ExportOptions): Promise<void> {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (options.format) {
      case 'markdown':
        content = await this.exportToMarkdown(result);
        filename = `${result.title}.md`;
        mimeType = 'text/markdown';
        break;
      
      default:
        throw new Error(`不支持的导出格式: ${options.format}`);
    }

    this.downloadFile(content, filename, mimeType);
  }
}

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    'alternative': '替代',
    'adaptation': '适应',
    'modification': '修改',
    'magnification': '放大',
    'minification': '缩小',
    'substitution': '替代',
    'rearrangement': '重排',
    'reversal': '逆转',
    'combination': '组合',
  };
  return titles[category] || category;
}

// 批量导出管理器
export class BatchExportManager {
  static async exportMultiple(
    results: AnalysisResult[],
    format: 'pdf' | 'word' | 'excel' | 'markdown'
  ): Promise<void> {
    if (results.length === 1) {
      await ExportManager.exportAnalysis(results[0], {
        format,
        includeTimestamp: true,
        includeScore: true,
        includeInsights: true,
        includeMetadata: true,
        quality: 'high',
      });
      return;
    }

    // 批量导出为压缩包
    const zip = new JSZip();

    for (const result of results) {
      let content: string;
      
      switch (format) {
        case 'markdown':
          content = await ExportManager.exportToMarkdown(result);
          break;
        default:
          throw new Error(`不支持的导出格式: ${format}`);
      }
      
      const filename = `${result.title}.md`;
      zip.file(filename, content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `huitu-analysis-${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}