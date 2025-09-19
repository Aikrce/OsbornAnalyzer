import React from 'react';
import { ExportData } from '../../services/export/exportService';

interface CardTemplateProps {
  data: ExportData;
  style?: 'default' | 'minimal' | 'detailed';
}

export const CardTemplate: React.FC<CardTemplateProps> = ({ data, style = 'default' }) => {
  const getCardStyle = () => {
    switch (style) {
      case 'minimal':
        return {
          container: 'bg-white rounded-lg shadow-md p-4 border',
          title: 'text-lg font-semibold text-gray-800 mb-2',
          content: 'text-sm text-gray-600',
          result: 'mb-3 last:mb-0'
        };
      case 'detailed':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-gray-200',
          title: 'text-xl font-bold text-gray-900 mb-4 text-center',
          content: 'text-base text-gray-700 leading-relaxed',
          result: 'bg-white rounded-lg p-4 mb-4 shadow-sm border last:mb-0'
        };
      default:
        return {
          container: 'bg-white rounded-lg shadow-sm p-5 border',
          title: 'text-xl font-semibold text-gray-900 mb-3',
          content: 'text-sm text-gray-700',
          result: 'mb-4 last:mb-0'
        };
    }
  };

  const styles = getCardStyle();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.topic}</h1>
      
      <div className="space-y-3">
        {data.results.map((result, index) => (
          <div key={index} className={styles.result}>
            <h3 className="font-medium text-gray-800 mb-2">
              {result.category || `问题 ${index + 1}`}
            </h3>
            <p className={styles.content}>
              {result.analysis || result.content || ''}
            </p>
          </div>
        ))}
      </div>

      {data.metadata && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">元数据</h4>
          <div className="text-xs text-gray-500 space-y-1">
            <div>导出时间: {new Date().toLocaleString('zh-CN')}</div>
            <div>分析主题: {data.topic}</div>
            {data.metadata.analysisType && (
              <div>分析类型: {data.metadata.analysisType}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTemplate;