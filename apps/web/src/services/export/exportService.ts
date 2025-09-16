// 导出服务 - 用于导出分析结果
export interface ExportData {
  topic: string;
  results: any[];
  metadata?: any;
}

export interface ExportOptions {
  format: 'json' | 'markdown' | 'html';
  includeMetadata?: boolean;
}

class ExportService {
  // 导出单个分析结果
  async export(data: ExportData, options: ExportOptions): Promise<Blob> {
    switch (options.format) {
      case 'json':
        return this.exportToJSON(data, options);
      case 'markdown':
        return this.exportToMarkdown(data, options);
      case 'html':
        return this.exportToHTML(data, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  // 导出为JSON格式
  private async exportToJSON(data: ExportData, options: ExportOptions): Promise<Blob> {
    const exportData = {
      topic: data.topic,
      results: data.results,
      metadata: options.includeMetadata ? data.metadata : undefined,
      exportDate: new Date().toISOString(),
    };

    return new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  }

  // 导出为Markdown格式
  private async exportToMarkdown(data: ExportData, options: ExportOptions): Promise<Blob> {
    let markdown = `# ${data.topic}\n\n`;
    markdown += `## 奥斯本创新九问分析结果\n\n`;

    data.results.forEach((result, index) => {
      markdown += `### ${result.category || `问题 ${index + 1}`}\n\n`;
      markdown += `${result.analysis || result.content || ''}\n\n`;
    });

    if (options.includeMetadata && data.metadata) {
      markdown += `## 元数据\n\n`;
      markdown += `- 导出时间: ${new Date().toLocaleString()}\n`;
      markdown += `- 分析主题: ${data.topic}\n`;
    }

    return new Blob([markdown], { type: 'text/markdown' });
  }

  // 导出为HTML格式
  private async exportToHTML(data: ExportData, options: ExportOptions): Promise<Blob> {
    const html = this.generateHTMLContent(data, options);
    return new Blob([html], { type: 'text/html' });
  }

  // 生成HTML内容
  private generateHTMLContent(data: ExportData, options: ExportOptions): string {
    let html = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.topic} - 奥斯本分析结果</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; border-bottom: 2px solid #007acc; }
          h2 { color: #555; margin-top: 30px; }
          .result { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>${data.topic}</h1>
        <h2>奥斯本创新九问分析结果</h2>
    `;

    data.results.forEach((result, index) => {
      html += `
        <div class="result">
          <h3>${result.category || `问题 ${index + 1}`}</h3>
          <p>${result.analysis || result.content || ''}</p>
        </div>
      `;
    });

    if (options.includeMetadata && data.metadata) {
      html += `
        <h2>元数据</h2>
        <p>导出时间: ${new Date().toLocaleString()}</p>
        <p>分析主题: ${data.topic}</p>
      `;
    }

    html += `
      </body>
      </html>
    `;

    return html;
  }

  // 导出多个分析结果
  async exportMultiple(dataList: ExportData[], options: ExportOptions): Promise<Blob> {
    if (options.format === 'json') {
      return this.exportMultipleToJSON(dataList);
    }
    
    // 对于其他格式，合并所有数据
    const combinedData: ExportData = {
      topic: '多个分析结果',
      results: dataList.flatMap(data => data.results),
      metadata: {
        count: dataList.length,
        topics: dataList.map(data => data.topic),
        exportDate: new Date().toISOString(),
      },
    };

    return this.export(combinedData, options);
  }

  // 导出多个结果为JSON
  private async exportMultipleToJSON(dataList: ExportData[]): Promise<Blob> {
    const exportData = {
      type: 'multiple',
      count: dataList.length,
      data: dataList,
      exportDate: new Date().toISOString(),
    };

    return new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  }
}

export const exportService = new ExportService();
export default exportService;
