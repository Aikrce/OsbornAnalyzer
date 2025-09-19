// 导出服务 - 用于导出分析结果
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export interface ExportData {
  topic: string;
  results: any[];
  metadata?: any;
}

export interface ExportOptions {
  format: 'json' | 'markdown' | 'html' | 'pdf' | 'image';
  includeMetadata?: boolean;
  cardStyle?: 'default' | 'minimal' | 'detailed';
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
      case 'pdf':
        return this.exportToPDF(data, options);
      case 'image':
        return this.exportToImage(data, options);
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
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background: #f8fafc;
          }
          .card-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 24px;
            margin: 20px 0;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
            text-align: center;
          }
          .result-item {
            background: #f9fafb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            border: 1px solid #e5e7eb;
          }
          .result-category {
            font-weight: 500;
            color: #374151;
            margin-bottom: 8px;
          }
          .result-content {
            color: #6b7280;
            line-height: 1.6;
          }
          .metadata {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
            font-size: 0.875rem;
            color: #9ca3af;
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <h1 class="card-title">${data.topic}</h1>
          
          <div class="results">
    `;

    data.results.forEach((result, index) => {
      html += `
            <div class="result-item">
              <h3 class="result-category">${result.category || `问题 ${index + 1}`}</h3>
              <p class="result-content">${this.escapeHtml(result.analysis || result.content || '')}</p>
            </div>
      `;
    });

    if (options.includeMetadata && data.metadata) {
      html += `
          </div>
          
          <div class="metadata">
            <p><strong>导出时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
            <p><strong>分析主题:</strong> ${data.topic}</p>
            ${data.metadata.analysisType ? `<p><strong>分析类型:</strong> ${data.metadata.analysisType}</p>` : ''}
          </div>
      `;
    } else {
      html += `
          </div>
      `;
    }

    html += `
        </div>
      </body>
      </html>
    `;

    return html;
  }

  // HTML转义工具函数
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 导出为PDF格式
  private async exportToPDF(data: ExportData, options: ExportOptions): Promise<Blob> {
    // 创建临时HTML元素用于渲染
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this.generateHTMLContent(data, options);
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);

    try {
      // 使用html2canvas将HTML转换为canvas
      const canvas = await html2canvas(tempElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // 创建PDF文档
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // 清理临时元素
      document.body.removeChild(tempElement);

      return new Blob([pdf.output('blob')], { type: 'application/pdf' });
    } catch (error) {
      document.body.removeChild(tempElement);
      throw new Error(`PDF导出失败: ${error}`);
    }
  }

  // 导出为图片格式
  private async exportToImage(data: ExportData, options: ExportOptions): Promise<Blob> {
    // 创建临时HTML元素用于渲染
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this.generateHTMLContent(data, options);
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);

    try {
      // 使用html2canvas将HTML转换为canvas
      const canvas = await html2canvas(tempElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // 清理临时元素
      document.body.removeChild(tempElement);

      // 转换为Blob
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('图片导出失败'));
          }
        }, 'image/png');
      });
    } catch (error) {
      document.body.removeChild(tempElement);
      throw new Error(`图片导出失败: ${error}`);
    }
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
