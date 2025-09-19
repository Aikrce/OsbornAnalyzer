export interface PDFGenerationOptions {
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  analysis: any;
  type: 'report' | 'card';
}

export class PDFGenerator {
  /**
   * 生成完整的PDF报告
   */
  generateReport(options: PDFGenerationOptions): void {
    const { title, description, tags, createdAt, analysis } = options;
    
    // 创建HTML内容
    const htmlContent = this.generateReportHTML(title, description, tags, createdAt, analysis);
    
    // 使用浏览器打印功能生成PDF
    this.printToPDF(htmlContent, `${title}_分析报告.pdf`);
  }

  /**
   * 生成PDF卡片
   */
  generateCard(options: PDFGenerationOptions): void {
    const { title, description, tags, createdAt, analysis } = options;
    
    // 创建HTML内容
    const htmlContent = this.generateCardHTML(title, description, tags, createdAt, analysis);
    
    // 使用浏览器打印功能生成PDF
    this.printToPDF(htmlContent, `${title}_分析卡片.pdf`);
  }

  /**
   * 生成报告HTML
   */
  private generateReportHTML(title: string, description: string, tags: string[], createdAt: string, analysis: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${title} - 分析报告</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0 0 15px 0;
            font-size: 28px;
            font-weight: bold;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
          }
          .meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
          }
          .section {
            margin-bottom: 40px;
          }
          .section h2 {
            color: #3b82f6;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .section h3 {
            color: #1f2937;
            margin-top: 25px;
            margin-bottom: 15px;
          }
          .questions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .question-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .question-card h4 {
            margin: 0 0 10px 0;
            color: #1f2937;
            font-size: 16px;
          }
          .question-card ul {
            margin: 0;
            padding-left: 20px;
          }
          .question-card li {
            margin-bottom: 5px;
            font-size: 14px;
          }
          .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .insight-card {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0ea5e9;
          }
          .insight-card h4 {
            margin: 0 0 10px 0;
            color: #0c4a6e;
            font-size: 16px;
          }
          .insight-card ul {
            margin: 0;
            padding-left: 20px;
          }
          .insight-card li {
            margin-bottom: 5px;
            font-size: 14px;
            color: #0c4a6e;
          }
          .recommendations {
            background: #f0fdf4;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #22c55e;
          }
          .recommendations h3 {
            color: #166534;
            margin-top: 0;
          }
          .recommendations ul {
            margin: 0;
            padding-left: 20px;
          }
          .recommendations li {
            margin-bottom: 8px;
            color: #166534;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 20px;
          }
          .tag {
            background: #e0e7ff;
            color: #3730a3;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
          }
          @media print {
            body { margin: 0; padding: 15px; }
            .header { break-inside: avoid; }
            .section { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p>${description}</p>
        </div>
        
        <div class="meta">
          <div>
            <strong>创建时间:</strong> ${createdAt}
          </div>
          <div class="tags">
            ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>

        ${analysis.osbornAnalysis ? this.generateOsbornAnalysisHTML(analysis.osbornAnalysis) : ''}
        ${analysis.deepAnalysis ? this.generateDeepAnalysisHTML(analysis.deepAnalysis) : ''}
      </body>
      </html>
    `;
  }

  /**
   * 生成卡片HTML
   */
  private generateCardHTML(title: string, description: string, tags: string[], createdAt: string, analysis: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${title} - 分析卡片</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
          }
          .card {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 15px 0;
            font-size: 24px;
            font-weight: bold;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content {
            padding: 30px;
          }
          .analysis-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .analysis-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
          }
          .analysis-card h3 {
            margin: 0 0 10px 0;
            font-size: 16px;
            font-weight: bold;
          }
          .analysis-card.osborn h3 {
            color: #3b82f6;
          }
          .analysis-card.deep h3 {
            color: #8b5cf6;
          }
          .analysis-card p {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            background: #f8fafc;
            border-top: 1px solid #e5e7eb;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .tag {
            background: #e0e7ff;
            color: #3730a3;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
          }
          .time {
            font-size: 12px;
            color: #6b7280;
          }
          @media print {
            body { margin: 0; padding: 0; background: white; }
            .card { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>${title}</h1>
            <p>${description}</p>
          </div>
          
          <div class="content">
            <div class="analysis-grid">
              ${analysis.osbornAnalysis ? `
                <div class="analysis-card osborn">
                  <h3>奥斯本九问分析</h3>
                  <p>涵盖 ${Object.keys(analysis.osbornAnalysis.questions || {}).length} 个创新维度</p>
                  <p>提供 ${(analysis.osbornAnalysis.suggestions || []).length} 条创新建议</p>
                </div>
              ` : ''}
              
              ${analysis.deepAnalysis ? `
                <div class="analysis-card deep">
                  <h3>深度分析</h3>
                  <p>识别 ${(analysis.deepAnalysis.insights?.keyOpportunities || []).length} 个关键机会</p>
                  <p>发现 ${(analysis.deepAnalysis.insights?.potentialRisks || []).length} 个潜在风险</p>
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="footer">
            <div class="tags">
              ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="time">${createdAt}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * 生成奥斯本分析HTML
   */
  private generateOsbornAnalysisHTML(osbornAnalysis: any): string {
    if (!osbornAnalysis) return '';
    
    let html = `
      <div class="section">
        <h2>奥斯本九问分析</h2>
    `;
    
    if (osbornAnalysis.analysis) {
      html += `<p>${osbornAnalysis.analysis}</p>`;
    }
    
    if (osbornAnalysis.questions) {
      html += '<div class="questions-grid">';
      Object.entries(osbornAnalysis.questions).forEach(([category, questions]: [string, any]) => {
        html += `
          <div class="question-card">
            <h4>${category}</h4>
            <ul>
              ${Array.isArray(questions) ? questions.map((q: string) => `<li>${q}</li>`).join('') : `<li>${questions}</li>`}
            </ul>
          </div>
        `;
      });
      html += '</div>';
    }
    
    if (osbornAnalysis.suggestions && osbornAnalysis.suggestions.length > 0) {
      html += `
        <div class="recommendations">
          <h3>创新建议</h3>
          <ul>
            ${osbornAnalysis.suggestions.map((suggestion: string) => `<li>${suggestion}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    html += '</div>';
    return html;
  }

  /**
   * 生成深度分析HTML
   */
  private generateDeepAnalysisHTML(deepAnalysis: any): string {
    if (!deepAnalysis) return '';
    
    let html = `
      <div class="section">
        <h2>深度分析</h2>
    `;
    
    if (deepAnalysis.analysis) {
      html += `<p>${deepAnalysis.analysis}</p>`;
    }
    
    if (deepAnalysis.insights) {
      html += '<div class="insights-grid">';
      
      if (deepAnalysis.insights.keyOpportunities && deepAnalysis.insights.keyOpportunities.length > 0) {
        html += `
          <div class="insight-card">
            <h4>关键机会</h4>
            <ul>
              ${deepAnalysis.insights.keyOpportunities.map((opportunity: string) => `<li>${opportunity}</li>`).join('')}
            </ul>
          </div>
        `;
      }
      
      if (deepAnalysis.insights.potentialRisks && deepAnalysis.insights.potentialRisks.length > 0) {
        html += `
          <div class="insight-card">
            <h4>潜在风险</h4>
            <ul>
              ${deepAnalysis.insights.potentialRisks.map((risk: string) => `<li>${risk}</li>`).join('')}
            </ul>
          </div>
        `;
      }
      
      html += '</div>';
    }
    
    if (deepAnalysis.recommendations && deepAnalysis.recommendations.length > 0) {
      html += `
        <div class="recommendations">
          <h3>实施建议</h3>
          <ul>
            ${deepAnalysis.recommendations.map((recommendation: string) => `<li>${recommendation}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    html += '</div>';
    return html;
  }

  /**
   * 打印为PDF
   */
  private printToPDF(htmlContent: string, filename: string): void {
    // 创建新窗口
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('无法打开打印窗口，请检查浏览器设置');
      return;
    }
    
    // 写入HTML内容
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // 等待内容加载完成后打印
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // 打印完成后关闭窗口
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    };
  }
}

export const pdfGenerator = new PDFGenerator();