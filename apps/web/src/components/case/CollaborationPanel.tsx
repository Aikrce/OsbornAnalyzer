/**
 * 协作面板组件
 * 处理实时协作、评论、版本控制等功能
 */

import React, { useState, useCallback, memo, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  IconMessageCircle, 
  IconHistory, 
  IconUsers, 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconCheck,
  IconX,
  IconClock,
  IconUser,
  IconEye,
  IconDownload
} from '@tabler/icons-react';
import { Comment, CaseVersion, User } from '../../types/unifiedCase';
import { CollaborationUtils } from '../../utils/collaborationManager';

interface CollaborationPanelProps {
  caseId: string;
  currentUser: User | null;
  users: User[];
  comments: Comment[];
  versions: CaseVersion[];
  activeUsers: User[];
  onAddComment: (content: string) => void;
  onUpdateComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onCreateVersion: (description: string) => void;
  onRestoreVersion: (versionId: string) => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = memo(({
  caseId,
  currentUser,
  users,
  comments,
  versions,
  activeUsers,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onCreateVersion,
  onRestoreVersion,
  onStartEdit,
  onStopEdit,
  isOpen,
  onClose,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'versions' | 'collaborators'>('comments');
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');
  const [showVersionModal, setShowVersionModal] = useState(false);

  // 处理添加评论
  const handleAddComment = useCallback(() => {
    if (newComment.trim() && currentUser) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  }, [newComment, currentUser, onAddComment]);

  // 处理编辑评论
  const handleEditComment = useCallback((comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  }, []);

  // 处理保存编辑
  const handleSaveEdit = useCallback(() => {
    if (editingComment && editContent.trim()) {
      onUpdateComment(editingComment, editContent.trim());
      setEditingComment(null);
      setEditContent('');
    }
  }, [editingComment, editContent, onUpdateComment]);

  // 处理取消编辑
  const handleCancelEdit = useCallback(() => {
    setEditingComment(null);
    setEditContent('');
  }, []);

  // 处理删除评论
  const handleDeleteComment = useCallback((commentId: string) => {
    if (window.confirm('确定要删除这条评论吗？')) {
      onDeleteComment(commentId);
    }
  }, [onDeleteComment]);

  // 处理创建版本
  const handleCreateVersion = useCallback(() => {
    if (newVersionDescription.trim()) {
      onCreateVersion(newVersionDescription.trim());
      setNewVersionDescription('');
      setShowVersionModal(false);
    }
  }, [newVersionDescription, onCreateVersion]);

  // 处理恢复版本
  const handleRestoreVersion = useCallback((versionId: string) => {
    if (window.confirm('确定要恢复到这个版本吗？这将覆盖当前内容。')) {
      onRestoreVersion(versionId);
    }
  }, [onRestoreVersion]);

  // 获取用户信息
  const getUser = useCallback((userId: string) => {
    return users.find(user => user.id === userId) || { id: userId, name: '未知用户', email: '', avatar: '' };
  }, [users]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`bg-white rounded-2xl shadow-2xl border-0 max-w-4xl w-full max-h-[90vh] overflow-hidden ${
        isMobile ? 'mx-4' : 'mx-8'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <IconUsers size={20} className="text-blue-500" />
              协作面板
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <IconX size={16} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 活跃用户状态 */}
          {activeUsers.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <IconUsers size={16} className="text-blue-500" />
                <span className="font-medium text-blue-700">正在编辑</span>
              </div>
              <div className="flex items-center gap-2">
                {activeUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-2">
                    <Avatar size="sm" src={user.avatar}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="text-sm text-blue-600">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 标签页 */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <IconMessageCircle size={16} />
                {isMobile ? '评论' : '评论讨论'}
              </TabsTrigger>
              <TabsTrigger value="versions" className="flex items-center gap-2">
                <IconHistory size={16} />
                {isMobile ? '版本' : '版本历史'}
              </TabsTrigger>
              <TabsTrigger value="collaborators" className="flex items-center gap-2">
                <IconUsers size={16} />
                {isMobile ? '协作者' : '协作者管理'}
              </TabsTrigger>
            </TabsList>

            {/* 评论标签页 */}
            <TabsContent value="comments" className="space-y-4">
              {/* 添加评论 */}
              <div className="space-y-3">
                <Textarea
                  placeholder="添加评论..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="rounded-xl min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="rounded-xl"
                  >
                    <IconPlus size={16} className="mr-2" />
                    添加评论
                  </Button>
                </div>
              </div>

              {/* 评论列表 */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.map(comment => {
                  const user = getUser(comment.userId);
                  const isEditing = editingComment === comment.id;
                  
                  return (
                    <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                      <Avatar size="sm" src={user.avatar}>
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{user.name}</span>
                          <span className="text-xs text-gray-500">
                            {CollaborationUtils.formatCommentTime(comment.createdAt)}
                          </span>
                          {comment.updatedAt !== comment.createdAt && (
                            <Badge variant="outline" className="text-xs">
                              已编辑
                            </Badge>
                          )}
                        </div>
                        
                        {isEditing ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="rounded-xl"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleSaveEdit}
                                className="rounded-xl"
                              >
                                <IconCheck size={14} className="mr-1" />
                                保存
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="rounded-xl"
                              >
                                <IconX size={14} className="mr-1" />
                                取消
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-700">{comment.content}</p>
                            {currentUser && currentUser.id === comment.userId && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditComment(comment)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <IconEdit size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <IconTrash size={14} />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {comments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <IconMessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>暂无评论</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 版本历史标签页 */}
            <TabsContent value="versions" className="space-y-4">
              {/* 创建版本按钮 */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowVersionModal(true)}
                  className="rounded-xl"
                >
                  <IconPlus size={16} className="mr-2" />
                  创建版本
                </Button>
              </div>

              {/* 版本列表 */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {versions.map(version => {
                  const user = getUser(version.createdBy);
                  
                  return (
                    <div key={version.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                          v{version.version}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{version.description}</div>
                          <div className="text-sm text-gray-500">
                            由 {user.name} 创建于 {new Date(version.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRestoreVersion(version.id)}
                          className="rounded-xl"
                        >
                          <IconDownload size={14} className="mr-1" />
                          恢复
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {versions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <IconHistory size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>暂无版本历史</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 协作者标签页 */}
            <TabsContent value="collaborators" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <IconUsers size={48} className="mx-auto mb-4 text-gray-300" />
                <p>协作者管理功能开发中...</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 创建版本模态框 */}
      {showVersionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
          <Card className="bg-white rounded-2xl shadow-2xl border-0 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">
                创建版本
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  版本描述
                </label>
                <Textarea
                  placeholder="描述这个版本的主要变化..."
                  value={newVersionDescription}
                  onChange={(e) => setNewVersionDescription(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowVersionModal(false)}
                  className="rounded-xl"
                >
                  取消
                </Button>
                <Button
                  onClick={handleCreateVersion}
                  disabled={!newVersionDescription.trim()}
                  className="rounded-xl"
                >
                  <IconCheck size={16} className="mr-2" />
                  创建版本
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
});

CollaborationPanel.displayName = 'CollaborationPanel';

export default CollaborationPanel;
