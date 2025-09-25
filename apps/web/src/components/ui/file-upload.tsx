import React, { useCallback, useRef, useState } from 'react';
import { Button } from './button';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

interface FilePreview {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*/*',
  multiple = false,
  maxSize = 10, // 10MB default
  onFilesSelected,
  className = '',
  disabled = false,
  placeholder = '选择文件或拖拽到此处'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);

  // 验证文件
  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `文件大小不能超过 ${maxSize}MB`;
    }
    return null;
  };

  // 处理文件选择
  const handleFiles = useCallback((selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    const newFiles: FilePreview[] = [];
    const validFiles: File[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          status: 'error',
          error
        });
      } else {
        newFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending'
        });
        validFiles.push(file);
      }
    });

    setFiles(prev => [...prev, ...newFiles]);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [maxSize, onFilesSelected]);

  // 处理文件输入变化
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // 处理拖拽
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  // 打开文件选择器
  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // 移除文件
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 文件上传区域 */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <IconUpload size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">上传文件</h3>
        <p className="text-gray-600 mb-4">{placeholder}</p>
        <Button disabled={disabled}>
          <IconUpload size={16} className="mr-2" />
          选择文件
        </Button>
        {maxSize && (
          <p className="text-sm text-gray-500 mt-2">
            最大文件大小: {maxSize}MB
          </p>
        )}
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* 文件列表 */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">
            已选择文件 ({files.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map((filePreview) => (
              <div
                key={filePreview.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <IconFile size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {filePreview.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(filePreview.file.size)}
                    </p>
                    {filePreview.error && (
                      <p className="text-xs text-red-500">{filePreview.error}</p>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(filePreview.id)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                >
                  <IconX size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { FileUpload };
