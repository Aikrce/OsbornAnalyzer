import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useResponsive } from '../../hooks/useResponsive';
import { 
  IconTag, 
  IconPlus, 
  IconX, 
  IconEdit, 
  IconTrash,
  IconStar,
  IconStarFilled
} from '@tabler/icons-react';

interface CaseTagManagerProps {
  tags: string[];
  customTags: string[];
  onTagsChange: (tags: string[]) => void;
  onCustomTagsChange: (customTags: string[]) => void;
  onTagClick?: (tag: string) => void;
  showManageMode?: boolean;
  className?: string;
}

const CaseTagManager: React.FC<CaseTagManagerProps> = ({
  tags,
  customTags,
  onTagsChange,
  onCustomTagsChange,
  onTagClick,
  showManageMode = false,
  className = ''
}) => {
  const { isMobile, isTablet } = useResponsive();
  const [newTag, setNewTag] = useState('');
  const [newCustomTag, setNewCustomTag] = useState('');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editingCustomTag, setEditingCustomTag] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // 添加预设标签
  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  }, [newTag, tags, onTagsChange]);

  // 添加自定义标签
  const handleAddCustomTag = useCallback(() => {
    if (newCustomTag.trim() && !customTags.includes(newCustomTag.trim())) {
      onCustomTagsChange([...customTags, newCustomTag.trim()]);
      setNewCustomTag('');
    }
  }, [newCustomTag, customTags, onCustomTagsChange]);

  // 删除预设标签
  const handleRemoveTag = useCallback((tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  }, [tags, onTagsChange]);

  // 删除自定义标签
  const handleRemoveCustomTag = useCallback((tagToRemove: string) => {
    onCustomTagsChange(customTags.filter(tag => tag !== tagToRemove));
  }, [customTags, onCustomTagsChange]);

  // 开始编辑标签
  const handleStartEditTag = useCallback((tag: string) => {
    setEditingTag(tag);
    setEditValue(tag);
  }, []);

  // 开始编辑自定义标签
  const handleStartEditCustomTag = useCallback((tag: string) => {
    setEditingCustomTag(tag);
    setEditValue(tag);
  }, []);

  // 保存编辑
  const handleSaveEdit = useCallback(() => {
    if (editValue.trim()) {
      if (editingTag) {
        const newTags = tags.map(tag => tag === editingTag ? editValue.trim() : tag);
        onTagsChange(newTags);
        setEditingTag(null);
      } else if (editingCustomTag) {
        const newCustomTags = customTags.map(tag => tag === editingCustomTag ? editValue.trim() : tag);
        onCustomTagsChange(newCustomTags);
        setEditingCustomTag(null);
      }
    }
    setEditValue('');
  }, [editValue, editingTag, editingCustomTag, tags, customTags, onTagsChange, onCustomTagsChange]);

  // 取消编辑
  const handleCancelEdit = useCallback(() => {
    setEditingTag(null);
    setEditingCustomTag(null);
    setEditValue('');
  }, []);

  // 处理键盘事件
  const handleKeyPress = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 预设标签 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className={`pb-3 ${isMobile ? 'p-4' : 'p-6'}`}>
          <CardTitle className={`font-semibold text-gray-900 flex items-center ${isMobile ? 'text-base' : 'text-lg'}`}>
            <IconTag size={isMobile ? 18 : 20} className="mr-2 text-blue-600" />
            预设标签
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}>
          <div className="space-y-3">
            {/* 标签显示 */}
            <div className={`flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center">
                  {editingTag === tag ? (
                    <div className="flex items-center space-x-1">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleSaveEdit)}
                        className="h-6 text-xs px-2 py-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSaveEdit}
                        className="h-6 w-6 p-0"
                      >
                        <IconEdit size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="h-6 w-6 p-0"
                      >
                        <IconX size={12} />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-blue-200"
                      onClick={() => onTagClick?.(tag)}
                    >
                      {tag}
                      {showManageMode && (
                        <div className="flex items-center ml-1 space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEditTag(tag);
                            }}
                            className="h-4 w-4 p-0 hover:bg-blue-300"
                          >
                            <IconEdit size={10} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(tag);
                            }}
                            className="h-4 w-4 p-0 hover:bg-red-300"
                          >
                            <IconTrash size={10} />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 添加标签 */}
            {showManageMode && (
              <div className="flex items-center space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
                  placeholder="添加预设标签..."
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                  className="px-3"
                >
                  <IconPlus size={16} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 自定义标签 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <IconStar size={20} className="mr-2 text-yellow-600" />
            自定义标签
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 自定义标签显示 */}
            <div className="flex flex-wrap gap-2">
              {customTags.map((tag, index) => (
                <div key={index} className="flex items-center">
                  {editingCustomTag === tag ? (
                    <div className="flex items-center space-x-1">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleSaveEdit)}
                        className="h-6 text-xs px-2 py-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSaveEdit}
                        className="h-6 w-6 p-0"
                      >
                        <IconEdit size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="h-6 w-6 p-0"
                      >
                        <IconX size={12} />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer transition-colors inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-yellow-200"
                      onClick={() => onTagClick?.(tag)}
                    >
                      <IconStarFilled size={12} className="mr-1" />
                      {tag}
                      {showManageMode && (
                        <div className="flex items-center ml-1 space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEditCustomTag(tag);
                            }}
                            className="h-4 w-4 p-0 hover:bg-yellow-300"
                          >
                            <IconEdit size={10} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCustomTag(tag);
                            }}
                            className="h-4 w-4 p-0 hover:bg-red-300"
                          >
                            <IconTrash size={10} />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 添加自定义标签 */}
            {showManageMode && (
              <div className="flex items-center space-x-2">
                <Input
                  value={newCustomTag}
                  onChange={(e) => setNewCustomTag(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddCustomTag)}
                  placeholder="添加自定义标签..."
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleAddCustomTag}
                  disabled={!newCustomTag.trim()}
                  className="px-3"
                >
                  <IconPlus size={16} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseTagManager;
