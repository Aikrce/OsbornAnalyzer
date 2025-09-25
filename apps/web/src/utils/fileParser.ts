// 文件解析工具
export interface ParsedContent {
  title: string;
  content: string;
  metadata: {
    fileName: string;
    fileSize: number;
    fileType: string;
    lastModified: Date;
  };
}

// 解析文本文件
export const parseTextFile = async (file: File): Promise<ParsedContent> => {
  const content = await file.text();
  const lines = content.split('\n');
  const title = lines[0]?.trim() || file.name.replace(/\.[^/.]+$/, '');
  
  return {
    title,
    content,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: new Date(file.lastModified)
    }
  };
};

// 解析Markdown文件
export const parseMarkdownFile = async (file: File): Promise<ParsedContent> => {
  const content = await file.text();
  const lines = content.split('\n');
  
  // 尝试从Markdown中提取标题
  let title = file.name.replace(/\.[^/.]+$/, '');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      break;
    }
  }
  
  return {
    title,
    content,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: new Date(file.lastModified)
    }
  };
};

// 解析PDF文件（简化版本，实际项目中可能需要更复杂的PDF解析库）
export const parsePdfFile = async (file: File): Promise<ParsedContent> => {
  // 这里使用一个简化的PDF解析方法
  // 在实际项目中，您可能需要使用像pdf-parse或pdfjs-dist这样的库
  
  // 创建一个临时的解析结果
  const title = file.name.replace(/\.[^/.]+$/, '');
  const content = `PDF文件: ${file.name}\n\n注意：PDF文件解析需要专门的库支持。\n建议使用pdf-parse或pdfjs-dist等库来解析PDF内容。`;
  
  return {
    title,
    content,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: new Date(file.lastModified)
    }
  };
};

// 解析Word文档（简化版本）
export const parseWordFile = async (file: File): Promise<ParsedContent> => {
  // 这里使用一个简化的Word解析方法
  // 在实际项目中，您可能需要使用像mammoth.js这样的库
  
  const title = file.name.replace(/\.[^/.]+$/, '');
  const content = `Word文档: ${file.name}\n\n注意：Word文档解析需要专门的库支持。\n建议使用mammoth.js等库来解析Word内容。`;
  
  return {
    title,
    content,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: new Date(file.lastModified)
    }
  };
};

// 主解析函数
export const parseFile = async (file: File): Promise<ParsedContent> => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type;

  try {
    if (mimeType === 'text/markdown' || extension === 'md') {
      return await parseMarkdownFile(file);
    } else if (mimeType === 'application/pdf' || extension === 'pdf') {
      return await parsePdfFile(file);
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || extension === 'docx') {
      return await parseWordFile(file);
    } else if (mimeType === 'text/plain' || extension === 'txt') {
      return await parseTextFile(file);
    } else {
      // 默认按文本文件处理
      return await parseTextFile(file);
    }
  } catch (error) {
    console.error('文件解析失败:', error);
    throw new Error(`无法解析文件 ${file.name}: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

// 批量解析文件
export const parseFiles = async (files: File[]): Promise<ParsedContent[]> => {
  const results: ParsedContent[] = [];
  
  for (const file of files) {
    try {
      const parsed = await parseFile(file);
      results.push(parsed);
    } catch (error) {
      console.error(`解析文件 ${file.name} 失败:`, error);
      // 继续处理其他文件，不中断整个流程
    }
  }
  
  return results;
};
