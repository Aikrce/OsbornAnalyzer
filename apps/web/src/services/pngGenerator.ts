export interface PNGGenerationOptions {
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  analysis: any;
  elementId?: string;
}

export class PNGGenerator {
  /**
   * 生成PNG卡片
   */
  async generateCard(options: PNGGenerationOptions): Promise<void> {
    const { title, description, tags, createdAt, analysis } = options;

    try {
      // 创建Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('无法创建Canvas上下文');
      }

      // 设置画布尺寸
      canvas.width = 800;
      canvas.height = 600;

      // 绘制背景
      this.drawBackground(ctx, canvas.width, canvas.height);

      // 绘制标题区域
      this.drawHeader(ctx, title, description, canvas.width);

      // 绘制分析内容
      this.drawAnalysisContent(ctx, analysis, canvas.width, 200);

      // 绘制底部信息
      this.drawFooter(ctx, tags, createdAt, canvas.width, canvas.height);

      // 下载PNG
      this.downloadPNG(canvas, `${title}_分析卡片.png`);
    } catch (error) {
      console.error('PNG生成失败:', error);
      throw new Error('PNG生成失败，请重试');
    }
  }

  /**
   * 生成单张维度PNG卡片
   */
  async generateSingleCard(
    options: PNGGenerationOptions,
    dimension?: string
  ): Promise<void> {
    const { title, description, tags, createdAt, analysis } = options;

    try {
      // 创建Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('无法创建Canvas上下文');
      }

      // 设置画布尺寸
      canvas.width = 800;
      canvas.height = 600;

      // 绘制背景
      this.drawBackground(ctx, canvas.width, canvas.height);

      // 绘制标题区域（包含维度信息）
      this.drawSingleCardHeader(
        ctx,
        title,
        description,
        dimension,
        canvas.width
      );

      // 绘制单张卡片内容
      this.drawSingleCardContent(ctx, analysis, dimension, canvas.width, 200);

      // 绘制底部信息
      this.drawFooter(ctx, tags, createdAt, canvas.width, canvas.height);

      // 下载PNG
      const filename = dimension
        ? `${title}_${dimension}_卡片.png`
        : `${title}_单张卡片.png`;
      this.downloadPNG(canvas, filename);
    } catch (error) {
      console.error('PNG生成失败:', error);
      throw new Error('PNG生成失败，请重试');
    }
  }

  /**
   * 绘制背景
   */
  private drawBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    // 渐变背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 白色卡片背景
    ctx.fillStyle = '#ffffff';
    ctx.roundRect(20, 20, width - 40, height - 40, 16);
    ctx.fill();

    // 阴影效果
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
  }

  /**
   * 绘制标题区域
   */
  private drawHeader(
    ctx: CanvasRenderingContext2D,
    title: string,
    description: string,
    width: number
  ): void {
    const headerHeight = 120;

    // 标题背景渐变
    const gradient = ctx.createLinearGradient(
      40,
      40,
      width - 40,
      40 + headerHeight
    );
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#1d4ed8');

    ctx.fillStyle = gradient;
    ctx.roundRect(40, 40, width - 80, headerHeight, 12);
    ctx.fill();

    // 重置阴影
    ctx.shadowColor = 'transparent';

    // 标题文字
    ctx.fillStyle = '#ffffff';
    ctx.font =
      'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 处理长标题
    const maxWidth = width - 120;
    const titleLines = this.wrapText(ctx, title, maxWidth);
    const lineHeight = 30;
    const startY =
      40 + headerHeight / 2 - ((titleLines.length - 1) * lineHeight) / 2;

    titleLines.forEach((line, index) => {
      ctx.fillText(line, width / 2, startY + index * lineHeight);
    });

    // 描述文字
    if (description) {
      ctx.font =
        '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

      const descLines = this.wrapText(ctx, description, maxWidth);
      const descStartY = startY + titleLines.length * lineHeight + 10;

      descLines.forEach((line, index) => {
        ctx.fillText(line, width / 2, descStartY + index * 18);
      });
    }
  }

  /**
   * 绘制分析内容
   */
  private drawAnalysisContent(
    ctx: CanvasRenderingContext2D,
    analysis: any,
    width: number,
    startY: number
  ): void {
    const cardWidth = (width - 100) / 2;
    const cardHeight = 120;
    const gap = 20;

    // 奥斯本分析卡片
    if (analysis.osbornAnalysis) {
      this.drawAnalysisCard(
        ctx,
        60,
        startY,
        cardWidth,
        cardHeight,
        '奥斯本九问分析',
        '#3b82f6',
        analysis.osbornAnalysis,
        'osborn'
      );
    }

    // 深度分析卡片
    if (analysis.deepAnalysis) {
      this.drawAnalysisCard(
        ctx,
        60 + cardWidth + gap,
        startY,
        cardWidth,
        cardHeight,
        '深度分析',
        '#8b5cf6',
        analysis.deepAnalysis,
        'deep'
      );
    }

    // 如果没有分析数据，显示提示信息
    if (!analysis.osbornAnalysis && !analysis.deepAnalysis) {
      this.drawNoAnalysisMessage(ctx, width, startY);
    }
  }

  /**
   * 绘制无分析数据提示
   */
  private drawNoAnalysisMessage(
    ctx: CanvasRenderingContext2D,
    width: number,
    startY: number
  ): void {
    ctx.fillStyle = '#6b7280';
    ctx.font = '16px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';

    const message = '暂无详细分析数据';
    const x = width / 2;
    const y = startY + 60;

    ctx.fillText(message, x, y);
  }

  /**
   * 绘制单张卡片标题区域
   */
  private drawSingleCardHeader(
    ctx: CanvasRenderingContext2D,
    title: string,
    description: string,
    dimension: string | undefined,
    width: number
  ): void {
    // 背景
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#1d4ed8');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, 120);

    // 标题
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 40);

    // 维度
    if (dimension) {
      ctx.font = 'bold 18px "Segoe UI", sans-serif';
      ctx.fillText(dimension, width / 2, 70);
    }

    // 描述
    ctx.font = '14px "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    const descLines = this.wrapText(ctx, description, width - 40);
    let y = 100;
    descLines.forEach(line => {
      ctx.fillText(line, width / 2 - ctx.measureText(line).width / 2, y);
      y += 16;
    });
  }

  /**
   * 绘制单张卡片内容
   */
  private drawSingleCardContent(
    ctx: CanvasRenderingContext2D,
    analysis: any,
    dimension: string | undefined,
    width: number,
    startY: number
  ): void {
    if (!dimension || !analysis.osbornAnalysis?.questions?.[dimension]) {
      this.drawNoAnalysisMessage(ctx, width, startY);
      return;
    }

    const dimensionContent = analysis.osbornAnalysis.questions[dimension];
    const insights = analysis.osbornAnalysis.insights || [];
    const suggestions = analysis.osbornAnalysis.suggestions || [];

    let currentY = startY;

    // 绘制维度内容
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('分析内容', 40, currentY);
    currentY += 25;

    ctx.fillStyle = '#374151';
    ctx.font = '14px "Segoe UI", sans-serif';
    const contentText = Array.isArray(dimensionContent)
      ? dimensionContent.join(' ')
      : dimensionContent;
    const contentLines = this.wrapText(ctx, contentText, width - 80);
    contentLines.forEach(line => {
      ctx.fillText(line, 40, currentY);
      currentY += 18;
    });
    currentY += 20;

    // 绘制洞察
    if (insights.length > 0) {
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px "Segoe UI", sans-serif';
      ctx.fillText('关键洞察', 40, currentY);
      currentY += 25;

      ctx.fillStyle = '#374151';
      ctx.font = '14px "Segoe UI", sans-serif';
      insights.slice(0, 3).forEach((insight: string) => {
        ctx.fillText('• ' + insight, 40, currentY);
        currentY += 20;
      });
      currentY += 10;
    }

    // 绘制建议
    if (suggestions.length > 0) {
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px "Segoe UI", sans-serif';
      ctx.fillText('实施建议', 40, currentY);
      currentY += 25;

      ctx.fillStyle = '#374151';
      ctx.font = '14px "Segoe UI", sans-serif';
      suggestions.slice(0, 3).forEach((suggestion: string) => {
        ctx.fillText('• ' + suggestion, 40, currentY);
        currentY += 20;
      });
    }
  }

  /**
   * 绘制分析卡片
   */
  private drawAnalysisCard(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    color: string,
    analysis: any,
    type: 'osborn' | 'deep'
  ): void {
    // 卡片背景
    ctx.fillStyle = '#f8fafc';
    ctx.roundRect(x, y, width, height, 12);
    ctx.fill();

    // 左边框
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 4, height);

    // 标题
    ctx.fillStyle = color;
    ctx.font =
      'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(title, x + 20, y + 20);

    // 内容
    ctx.fillStyle = '#374151';
    ctx.font =
      '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    let contentY = y + 50;

    if (type === 'osborn') {
      if (analysis.questions) {
        const questionCount = Object.keys(analysis.questions).length;
        ctx.fillText(`涵盖 ${questionCount} 个创新维度`, x + 20, contentY);
        contentY += 20;
      }

      if (analysis.suggestions && analysis.suggestions.length > 0) {
        ctx.fillText(
          `提供 ${analysis.suggestions.length} 条创新建议`,
          x + 20,
          contentY
        );
      }
    } else {
      if (analysis.insights) {
        const opportunityCount =
          analysis.insights.keyOpportunities?.length || 0;
        const riskCount = analysis.insights.potentialRisks?.length || 0;

        if (opportunityCount > 0) {
          ctx.fillText(`识别 ${opportunityCount} 个关键机会`, x + 20, contentY);
          contentY += 20;
        }

        if (riskCount > 0) {
          ctx.fillText(`发现 ${riskCount} 个潜在风险`, x + 20, contentY);
        }
      }
    }
  }

  /**
   * 绘制底部信息
   */
  private drawFooter(
    ctx: CanvasRenderingContext2D,
    tags: string[],
    createdAt: string,
    width: number,
    height: number
  ): void {
    const footerY = height - 80;

    // 分割线
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, footerY);
    ctx.lineTo(width - 60, footerY);
    ctx.stroke();

    // 标签
    if (tags.length > 0) {
      ctx.fillStyle = '#6b7280';
      ctx.font =
        '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      let tagX = 60;
      const tagY = footerY + 20;

      tags.forEach(tag => {
        // 标签背景
        ctx.fillStyle = '#e0e7ff';
        const tagWidth = ctx.measureText(tag).width + 16;
        ctx.roundRect(tagX, tagY - 12, tagWidth, 24, 12);
        ctx.fill();

        // 标签文字
        ctx.fillStyle = '#3730a3';
        ctx.fillText(tag, tagX + 8, tagY);

        tagX += tagWidth + 8;
      });
    }

    // 创建时间
    ctx.fillStyle = '#6b7280';
    ctx.font =
      '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(createdAt, width - 60, footerY + 20);
  }

  /**
   * 文字换行
   */
  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * 下载PNG
   */
  private downloadPNG(canvas: HTMLCanvasElement, filename: string): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}

export const pngGenerator = new PNGGenerator();
