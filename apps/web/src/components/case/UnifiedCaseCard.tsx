/**
 * 统一案例卡片组件
 * 支持权限显示、协作状态、操作按钮
 */

import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { 
  IconEye, 
  IconEdit, 
  IconTrash, 
  IconShare, 
  IconDownload,
  IconClock,
  IconTag,
  IconUsers,
  IconMessageCircle,
  IconHistory
} from '@tabler/icons-react';
import { UnifiedCase, User, Permission } from '../../types/unifiedCase';
import { PermissionUtils } from '../../utils/permissionManager';
import { CollaborationUtils } from '../../utils/collaborationManager';

interface UnifiedCaseCardProps {
  case_: UnifiedCase;
  currentUser: User | null;
  users: User[];
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canShare: boolean;
    canAdmin: boolean;
  };
  onCaseClick: (caseId: string) => void;
  onCaseEdit: (caseId: string) => void;
  onCaseDelete: (caseId: string) => void;
  onCaseShare: (caseId: string) => void;
  onCaseDownload: (caseId: string) => void;
  onCaseComment: (caseId: string) => void;
  onCaseHistory: (caseId: string) => void;
  isMobile?: boolean;
}

const UnifiedCaseCard: React.FC<UnifiedCaseCardProps> = memo(({
  case_,
  currentUser,
  users,
  permissions,
  onCaseClick,
  onCaseEdit,
  onCaseDelete,
  onCaseShare,
  onCaseDownload,
  onCaseComment,
  onCaseHistory,
  isMobile = false
}) => {
  // 获取活跃编辑者信息
  const activeEditors = case_.collaboration.activeUsers
    .map(userId => users.find(user => user.id === userId))
    .filter(Boolean) as User[];

  // 获取协作统计
  const collaborationStats = {
    totalComments: case_.collaboration.comments.length,
    activeEditors: case_.collaboration.activeUsers.length,
    totalVersions: case_.collaboration.versionHistory.length,
    lastActivity: case_.metadata.updatedAt
  };

  // 获取权限显示信息
  const permissionLevel = PermissionUtils.getPermissionLevel(
    Object.keys(permissions).filter(key => permissions[key as keyof typeof permissions]) as Permission[]
  );

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl">
      <CardHeader className={isMobile ? 'pb-3' : 'pb-4'}>
        <div className="flex items-start justify-between mb-3">
          <CardTitle className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 ${
            isMobile ? 'text-base' : 'text-lg'
          }`}>
            {case_.title}
          </CardTitle>
          <div className="flex items-center space-x-1 ml-2">
            {permissions.canDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onCaseDelete(case_.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-red-600 hover:text-red-700"
              >
                <IconTrash size={16} />
              </Button>
            )}
          </div>
        </div>
        
        <p className={`text-gray-600 leading-relaxed line-clamp-3 ${
          isMobile ? 'text-sm' : 'text-sm'
        }`}>
          {case_.description}
        </p>
        
        {/* 权限和状态标签 */}
        <div className="flex items-center gap-2 mt-3">
          <Badge 
            variant="secondary" 
            className={`text-xs ${PermissionUtils.getPermissionLevelColor(permissionLevel)}`}
          >
            {PermissionUtils.getPermissionLevelLabel(permissionLevel)}
          </Badge>
          {case_.collaboration.isShared && (
            <Badge variant="outline" className="text-xs">
              已分享
            </Badge>
          )}
          {case_.metadata.isTemplate && (
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
              模板
            </Badge>
          )}
        </div>
        
        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mt-3">
          {case_.tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
              {tag}
            </Badge>
          ))}
          {case_.tags.length > (isMobile ? 2 : 3) && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              +{case_.tags.length - (isMobile ? 2 : 3)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={isMobile ? 'pt-0' : 'pt-0'}>
        {/* 元数据信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <IconClock size={14} className="mr-1" />
            {new Date(case_.metadata.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <IconTag size={14} className="mr-1" />
            {case_.category.name}
          </div>
        </div>
        
        {/* 协作状态 */}
        {activeEditors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-1">
              {activeEditors.slice(0, 3).map(user => (
                <Avatar key={user.id} size="sm" src={user.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              ))}
              {activeEditors.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  +{activeEditors.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {CollaborationUtils.formatCollaborationStatus(activeEditors)}
            </span>
          </div>
        )}
        
        {/* 协作统计 */}
        {(collaborationStats.totalComments > 0 || collaborationStats.totalVersions > 0) && (
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            {collaborationStats.totalComments > 0 && (
              <div className="flex items-center gap-1">
                <IconMessageCircle size={12} />
                <span>{collaborationStats.totalComments}</span>
              </div>
            )}
            {collaborationStats.totalVersions > 0 && (
              <div className="flex items-center gap-1">
                <IconHistory size={12} />
                <span>{collaborationStats.totalVersions}</span>
              </div>
            )}
          </div>
        )}
        
        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCaseClick(case_.id);
            }}
            className="rounded-xl"
          >
            <IconEye size={14} className="mr-1" />
            查看详情
          </Button>
          
          <div className="flex items-center space-x-1">
            {permissions.canEdit && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCaseEdit(case_.id);
                }}
                className="p-2"
                title="编辑案例"
              >
                <IconEdit size={14} className="text-gray-600" />
              </Button>
            )}
            {permissions.canShare && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCaseShare(case_.id);
                }}
                className="p-2"
                title="分享案例"
              >
                <IconShare size={14} className="text-gray-600" />
              </Button>
            )}
            {permissions.canView && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCaseDownload(case_.id);
                }}
                className="p-2"
                title="下载案例"
              >
                <IconDownload size={14} className="text-gray-600" />
              </Button>
            )}
            {collaborationStats.totalComments > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCaseComment(case_.id);
                }}
                className="p-2"
                title="查看评论"
              >
                <IconMessageCircle size={14} className="text-gray-600" />
              </Button>
            )}
            {collaborationStats.totalVersions > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCaseHistory(case_.id);
                }}
                className="p-2"
                title="查看历史"
              >
                <IconHistory size={14} className="text-gray-600" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

UnifiedCaseCard.displayName = 'UnifiedCaseCard';

export default UnifiedCaseCard;
