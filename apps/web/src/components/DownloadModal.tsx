import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  IconDownload, 
  IconFileText, 
  IconPhoto, 
  IconX,
  IconCheck
} from '@tabler/icons-react';

export interface DownloadOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  format: 'pdf' | 'png';
  type: 'report' | 'card' | 'single-card';
  dimension?: string; // 单张卡片时指定维度
}

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (option: DownloadOption) => void;
  caseTitle: string;
  isLoading?: boolean;
  analysisData?: any; // 分析数据，用于生成单张卡片选项
}

const downloadOptions: DownloadOption[] = [
  {
    id: 'pdf-report',
    name: '完整PDF报告',
    description: '包含奥斯本分析和深度分析的完整PDF文档',
    icon: <IconFileText size={24} className="text-red-600" />,
    format: 'pdf',
    type: 'report'
  },
  {
    id: 'pdf-card',
    name: 'PDF卡片',
    description: '单页PDF格式的分析卡片，适合快速分享',
    icon: <IconFileText size={24} className="text-blue-600" />,
    format: 'pdf',
    type: 'card'
  },
  {
    id: 'png-card',
    name: 'PNG卡片',
    description: '高清PNG图片格式的分析卡片，适合社交媒体分享',
    icon: <IconPhoto size={24} className="text-green-600" />,
    format: 'png',
    type: 'card'
  }
];

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  caseTitle,
  isLoading = false,
  analysisData
}) => {
  // 生成单张卡片下载选项
  const generateSingleCardOptions = (): DownloadOption[] => {
    if (!analysisData?.osbornAnalysis?.questions) return [];
    
    const singleCardOptions: DownloadOption[] = [];
    Object.keys(analysisData.osbornAnalysis.questions).forEach((dimension, index) => {
      singleCardOptions.push(
        {
          id: `single-pdf-${index}`,
          name: `${dimension} - PDF`,
          description: `下载"${dimension}"维度的PDF卡片`,
          icon: <IconFileText size={24} className="text-purple-600" />,
          format: 'pdf',
          type: 'single-card',
          dimension: dimension
        },
        {
          id: `single-png-${index}`,
          name: `${dimension} - PNG`,
          description: `下载"${dimension}"维度的PNG卡片`,
          icon: <IconPhoto size={24} className="text-purple-600" />,
          format: 'png',
          type: 'single-card',
          dimension: dimension
        }
      );
    });
    return singleCardOptions;
  };

  const allDownloadOptions = [...downloadOptions, ...generateSingleCardOptions()];
  const [selectedOption, setSelectedOption] = useState<DownloadOption | null>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (selectedOption) {
      onDownload(selectedOption);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">
            下载分析报告
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IconX size={20} />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 案例信息 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">案例标题</h3>
            <p className="text-gray-700">{caseTitle}</p>
          </div>

          {/* 下载选项 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">选择下载格式</h3>
            <div className="grid gap-3">
              {allDownloadOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption?.id === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{option.name}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            option.format === 'pdf' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {option.format.toUpperCase()}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                        >
                          {option.type === 'report' ? '完整报告' : '卡片'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    {selectedOption?.id === option.id && (
                      <div className="flex-shrink-0">
                        <IconCheck size={20} className="text-blue-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!selectedOption || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  生成中...
                </>
              ) : (
                <>
                  <IconDownload size={16} className="mr-2" />
                  下载
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadModal;
