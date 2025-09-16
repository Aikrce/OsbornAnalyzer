import { AnalysisResult } from '@huitu/shared/types';
import JSZip from 'jszip';

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'xlsx' | 'markdown' | 'json';
  includeMetadata?: boolean;
  includeCharts?: boolean;
  includeCases?: boolean;
  template?: string;
}

export interface ExportData {
  topic: string;
  results: AnalysisResult[];
  metadata?: {
    createdAt: Date;
    version: string;
    author?: string;
  };
}

class ExportService {
  /**
   * 导出分析结果
   */
  async exportAnalysis(
    data: ExportData,
    options: ExportOptions
  ): Promise<Blob> {
    switch (options.format) {
      case 'pdf':
        return this.exportToPDF(data, options);
      case 'docx':
        return this.exportToDOCX(data, options);
      case 'xlsx':
        return this.exportToXLSX(data, options);
      case 'markdown':
        return this.exportToMarkdown(data, options);
      case 'json':
        return this.exportToJSON(data, options);
      default:
        throw new Error(`不支持的导出格式: ${options.format}`);
    }
  }

  /**
   * 导出为PDF
   */
  private async exportToPDF(data: ExportData, options: ExportOptions): Promise<Blob> {
    // 创建HTML内容
    const htmlContent = this.generateHTMLContent(data, options);
    
    // 使用html2canvas和jsPDF生成PDF
    const { default: html2canvas } = await import('html2canvas');
    const { default: jsPDF } = await import('jspdf');
    
    // 创建临时容器
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '800px';
    container.style.backgroundColor = 'white';
    container.style.padding = '20px';
    document.body.appendChild(container);
    
    try {
      // 生成canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      // 创建PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      return pdf.output('blob');
    } finally {
      document.body.removeChild(container);
    }
  }

  /**
   * 导出为DOCX
   */
  private async exportToDOCX(data: ExportData, options: ExportOptions): Promise<Blob> {
    const docx = await import('docx');
    
    const children = [
      new docx.Paragraph({
        children: [
          new docx.TextRun({
            text: data.topic,
            bold: true,
            size: 32,
          }),
        ],
        alignment: docx.AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
    ];

    // 添加分析结果
    data.results.forEach((result, index) => {
      children.push(
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: `${index + 1}. ${result.title}`,
              bold: true,
              size: 24,
            }),
          ],
          spacing: { before: 200, after: 100 },
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: result.summary,
              size: 20,
            }),
          ],
          spacing: { after: 200 },
        })
      );

      // 添加建议
      if (Object.values(result.questions || {}).flat().length > 0) {
        children.push(
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: '建议：',
                bold: true,
                size: 20,
              }),
            ],
            spacing: { before: 100 },
          })
        );

        result.questions ? Object.values(result.questions).flat() : [].forEach(suggestion => {
          children.push(
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: `• ${suggestion}`,
                  size: 18,
                }),
              ],
              spacing: { after: 50 },
            })
          );
        });
      }
    });

    // 添加元数据
    if (options.includeMetadata && data.metadata) {
      children.push(
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: `生成时间: ${data.metadata.createdAt.toLocaleString()}`,
              size: 16,
              italics: true,
            }),
          ],
          spacing: { before: 400 },
        })
      );
    }

    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
    });

    return docx.Packer.toBlob(doc);
  }

  /**
   * 导出为XLSX
   */
  private async exportToXLSX(data: ExportData, options: ExportOptions): Promise<Blob> {
    const { default: XLSX } = await import('xlsx');
    
    // 创建工作表数据
    const worksheetData = [
      ['分析主题', data.topic],
      [''],
      ['维度', '问题', '分析结果', '建议'],
    ];

    data.results.forEach((result, index) => {
      worksheetData.push([
        String(index + 1),
        result.title,
        result.summary,
        Object.values(result.questions || {}).flat().join('; ') || '',
      ]);
    });

    // 添加元数据
    if (options.includeMetadata && data.metadata) {
      worksheetData.push(['']);
      worksheetData.push(['生成时间', data.metadata.createdAt.toLocaleString()]);
      if (data.metadata.author) {
        worksheetData.push(['作者', data.metadata.author]);
      }
    }

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '奥斯本分析结果');

    return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  }

  /**
   * 导出为Markdown
   */
  private async exportToMarkdown(data: ExportData, options: ExportOptions): Promise<Blob> {
    let markdown = `# ${data.topic}\n\n`;
    markdown += `## 奥斯本创新九问分析结果\n\n`;

    data.results.forEach((result, index) => {
      markdown += `### ${index + 1}. ${result.title}\n\n`;
      markdown += `${result.summary}\n\n`;

      if (Object.values(result.questions || {}).flat().length > 0) {
        markdown += `**建议：**\n`;
        result.questions ? Object.values(result.questions).flat() : [].forEach(suggestion => {
          markdown += `- ${suggestion}\n`;
        });
        markdown += '\n';
      }
    });

    // 添加元数据
    if (options.includeMetadata && data.metadata) {
      markdown += `---\n\n`;
      markdown += `**生成时间：** ${data.metadata.createdAt.toLocaleString()}\n`;
      if (data.metadata.author) {
        markdown += `**作者：** ${data.metadata.author}\n`;
      }
    }

    return new Blob([markdown], { type: 'text/markdown' });
  }

  /**
   * 导出为JSON
   */
  private async exportToJSON(data: ExportData, options: ExportOptions): Promise<Blob> {
    const exportData = {
      topic: data.topic,
      results: data.results,
      metadata: options.includeMetadata ? data.metadata : undefined,
      exportedAt: new Date().toISOString(),
      format: 'json',
    };

    return new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  }

  /**
   * 生成HTML内容
   */
  private generateHTMLContent(data: ExportData, options: ExportOptions): string {
    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h1 style="text-align: center; color: #1e40af; margin-bottom: 30px;">${data.topic}</h1>
        <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">奥斯本创新九问分析结果</h2>
    `;

    data.results.forEach((result, index) => {
      html += `
        <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-bottom: 15px;">${index + 1}. ${result.title}</h3>
          <p style="line-height: 1.6; color: #374151; margin-bottom: 15px;">${result.summary}</p>
      `;

      if (Object.values(result.questions || {}).flat().length > 0) {
        html += `
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px;">
            <h4 style="color: #6b7280; margin-bottom: 10px;">建议：</h4>
            <ul style="margin: 0; padding-left: 20px;">
        `;
        result.questions ? Object.values(result.questions).flat() : [].forEach(suggestion => {
          html += `<li style="color: #6b7280; margin-bottom: 5px;">${suggestion}</li>`;
        });
        html += `</ul></div>`;
      }

      html += `</div>`;
    });

    // 添加元数据
    if (options.includeMetadata && data.metadata) {
      html += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>生成时间: ${data.metadata.createdAt.toLocaleString()}</p>
          ${data.metadata.author ? `<p>作者: ${data.metadata.author}</p>` : ''}
        </div>
      `;
    }

    html += `</div>`;
    return html;
  }

  /**
   * 批量导出多个分析结果
   */
  async exportMultiple(
    dataList: ExportData[],
    options: ExportOptions
  ): Promise<Blob> {
    if (options.format === 'json') {
      return this.exportMultipleToJSON(dataList);
    }

    // 对于其他格式，创建ZIP文件
    const zip = new JSZip();
    
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      const filename = `${data.topic.replace(/[^a-zA-Z0-9]/g, '_')}_${i + 1}.${options.format}`;
      const blob = await this.exportAnalysis(data, options);
      zip.file(filename, blob);
    }

    return zip.generateAsync({ type: 'blob' });
  }

  /**
   * 导出多个分析结果为JSON
   */
  private async exportMultipleToJSON(
    dataList: ExportData[]
  ): Promise<Blob> {
    const exportData = {
      analyses: dataList,
      exportedAt: new Date().toISOString(),
      format: 'json',
      count: dataList.length,
    };

    return new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  }
}

export default new ExportService();
