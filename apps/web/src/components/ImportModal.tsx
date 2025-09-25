import React, { useState, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  IconUpload, 
  IconFile, 
  IconFileText, 
  IconFileTypePdf, 
  IconMarkdown,
  IconX,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react';
import { useResponsive } from '../hooks/useResponsive';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (files: File[]) => Promise<void>;
}

interface FilePreview {
  file: File;
  status: 'pending' | 'processing' | 'success' | 'error';
  error?: string;
  content?: string;
}

const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const { isMobile } = useResponsive();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isImporting, setIsImporting] = useState(false);

  // 支持的文件类型
  const supportedTypes = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      name: 'Word文档',
      icon: IconFileText,
      color: 'blue'
    },
    'application/pdf': {
      name: 'PDF文档',
      icon: IconFileTypePdf,
      color: 'red'
    },
    'text/markdown': {
      name: 'Markdown',
      icon: IconMarkdown,
      color: 'green'
    },
    'text/plain': {
      name: '文本文件',
      icon: IconFile,
      color: 'gray'
    }
  };

  // 处理文件选择
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles: FilePreview[] = selectedFiles.map(file => ({
      file,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  // 移除文件
  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  // 处理文件导入
  const handleImport = useCallback(async () => {
    if (files.length === 0) return;

    setIsImporting(true);
    try {
      await onImport(files.map(f => f.file));
      onClose();
      setFiles([]);
    } catch (error) {
      console.error('导入失败:', error);
    } finally {
      setIsImporting(false);
    }
  }, [files, onImport, onClose]);

  // 打开文件选择器
  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 获取文件类型信息
  const getFileTypeInfo = (file: File) => {
    const typeInfo = supportedTypes[file.type as keyof typeof supportedTypes];
    if (typeInfo) return typeInfo;
    
    // 根据文件扩展名判断
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'docx':
        return { name: 'Word文档', icon: IconFileText, color: 'blue' };
      case 'pdf':
        return { name: 'PDF文档', icon: IconFileTypePdf, color: 'red' };
      case 'md':
        return { name: 'Markdown', icon: IconMarkdown, color: 'green' };
      default:
        return { name: '未知格式', icon: IconFile, color: 'gray' };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">导入案例</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <IconX size={16} />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 文件选择区域 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <IconUpload size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">选择文件</h3>
            <p className="text-gray-600 mb-4">
              支持 Word (.docx)、PDF (.pdf)、Markdown (.md) 格式
            </p>
            <Button onClick={openFileDialog} className="mb-4">
              <IconUpload size={16} className="mr-2" />
              选择文件
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".docx,.pdf,.md,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* 支持的文件格式 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">支持的文件格式</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(supportedTypes).map(([type, info]) => {
                const IconComponent = info.icon;
                return (
                  <Badge key={type} variant="outline" className="flex items-center gap-1">
                    <IconComponent size={14} />
                    {info.name}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* 文件列表 */}
          {files.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                已选择文件 ({files.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((filePreview, index) => {
                  const typeInfo = getFileTypeInfo(filePreview.file);
                  const IconComponent = typeInfo.icon;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent size={20} className={`text-${typeInfo.color}-500`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {filePreview.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {typeInfo.name} • {(filePreview.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {filePreview.status === 'pending' && (
                          <Badge variant="secondary">待处理</Badge>
                        )}
                        {filePreview.status === 'processing' && (
                          <Badge variant="outline" className="text-blue-600">
                            <IconAlertCircle size={12} className="mr-1" />
                            处理中
                          </Badge>
                        )}
                        {filePreview.status === 'success' && (
                          <Badge variant="outline" className="text-green-600">
                            <IconCheck size={12} className="mr-1" />
                            成功
                          </Badge>
                        )}
                        {filePreview.status === 'error' && (
                          <Badge variant="outline" className="text-red-600">
                            <IconX size={12} className="mr-1" />
                            失败
                          </Badge>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                        >
                          <IconX size={14} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isImporting}>
              取消
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={files.length === 0 || isImporting}
              className="min-w-24"
            >
              {isImporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  导入中...
                </>
              ) : (
                '开始导入'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportModal;
