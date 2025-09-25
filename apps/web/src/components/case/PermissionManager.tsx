/**
 * 权限管理组件
 * 处理案例的权限设置、用户管理、团队协作
 */

import React, { useState, useCallback, memo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  IconUser, 
  IconUsers, 
  IconBuilding, 
  IconPlus, 
  IconTrash, 
  IconEdit, 
  IconCheck,
  IconX,
  IconShield,
  IconShare,
  IconLock,
  IconUnlock
} from '@tabler/icons-react';
import { Permission, PermissionLevel, User, Team, Organization } from '../../types/unifiedCase';
import { PermissionUtils } from '../../utils/permissionManager';

interface PermissionManagerProps {
  caseId: string;
  currentUser: User | null;
  users: User[];
  teams: Team[];
  organizations: Organization[];
  permissions: {
    view: string[];
    edit: string[];
    delete: string[];
    share: string[];
    admin: string[];
  };
  onPermissionChange: (caseId: string, userId: string, permission: Permission, granted: boolean) => void;
  onBulkPermissionChange: (caseId: string, userIds: string[], permission: Permission, granted: boolean) => void;
  onTransferOwnership: (caseId: string, toUserId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const PermissionManager: React.FC<PermissionManagerProps> = memo(({
  caseId,
  currentUser,
  users,
  teams,
  organizations,
  permissions,
  onPermissionChange,
  onBulkPermissionChange,
  onTransferOwnership,
  isOpen,
  onClose,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'teams' | 'organizations'>('users');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<Permission>(Permission.VIEW);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferToUser, setTransferToUser] = useState('');

  // 获取用户权限
  const getUserPermissions = useCallback((userId: string): Permission[] => {
    const userPermissions: Permission[] = [];
    if (permissions.view.includes(userId)) userPermissions.push(Permission.VIEW);
    if (permissions.edit.includes(userId)) userPermissions.push(Permission.EDIT);
    if (permissions.delete.includes(userId)) userPermissions.push(Permission.DELETE);
    if (permissions.share.includes(userId)) userPermissions.push(Permission.SHARE);
    if (permissions.admin.includes(userId)) userPermissions.push(Permission.ADMIN);
    return userPermissions;
  }, [permissions]);

  // 处理权限变更
  const handlePermissionChange = useCallback((userId: string, permission: Permission, granted: boolean) => {
    onPermissionChange(caseId, userId, permission, granted);
  }, [caseId, onPermissionChange]);

  // 处理批量权限变更
  const handleBulkPermissionChange = useCallback((permission: Permission, granted: boolean) => {
    if (selectedUsers.length === 0) return;
    onBulkPermissionChange(caseId, selectedUsers, permission, granted);
    setSelectedUsers([]);
  }, [caseId, selectedUsers, onBulkPermissionChange]);

  // 处理所有权转移
  const handleTransferOwnership = useCallback(() => {
    if (transferToUser && currentUser) {
      onTransferOwnership(caseId, transferToUser);
      setShowTransferModal(false);
      setTransferToUser('');
    }
  }, [caseId, transferToUser, currentUser, onTransferOwnership]);

  // 筛选用户
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`bg-white rounded-2xl shadow-2xl border-0 max-w-4xl w-full max-h-[90vh] overflow-hidden ${
        isMobile ? 'mx-4' : 'mx-8'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <IconShield size={20} className="text-blue-500" />
              权限管理
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
          {/* 标签页 */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <IconUser size={16} />
                {isMobile ? '用户' : '用户权限'}
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <IconUsers size={16} />
                {isMobile ? '团队' : '团队权限'}
              </TabsTrigger>
              <TabsTrigger value="organizations" className="flex items-center gap-2">
                <IconBuilding size={16} />
                {isMobile ? '组织' : '组织权限'}
              </TabsTrigger>
            </TabsList>

            {/* 用户权限标签页 */}
            <TabsContent value="users" className="space-y-4">
              {/* 搜索和批量操作 */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="搜索用户..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedPermission} onValueChange={(value: any) => setSelectedPermission(value)}>
                    <SelectTrigger className="w-32 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Permission.VIEW}>查看</SelectItem>
                      <SelectItem value={Permission.EDIT}>编辑</SelectItem>
                      <SelectItem value={Permission.DELETE}>删除</SelectItem>
                      <SelectItem value={Permission.SHARE}>分享</SelectItem>
                      <SelectItem value={Permission.ADMIN}>管理</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={() => handleBulkPermissionChange(selectedPermission, true)}
                    disabled={selectedUsers.length === 0}
                    className="rounded-xl"
                  >
                    <IconPlus size={16} className="mr-1" />
                    授予
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkPermissionChange(selectedPermission, false)}
                    disabled={selectedUsers.length === 0}
                    className="rounded-xl"
                  >
                    <IconX size={16} className="mr-1" />
                    撤销
                  </Button>
                </div>
              </div>

              {/* 用户列表 */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredUsers.map(user => {
                  const userPermissions = getUserPermissions(user.id);
                  const isSelected = selectedUsers.includes(user.id);
                  
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(prev => [...prev, user.id]);
                            } else {
                              setSelectedUsers(prev => prev.filter(id => id !== user.id));
                            }
                          }}
                          className="rounded"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {userPermissions.map(permission => (
                          <Badge
                            key={permission}
                            variant="secondary"
                            className={`text-xs ${PermissionUtils.getPermissionColor(permission)}`}
                          >
                            {PermissionUtils.getPermissionLabel(permission)}
                          </Badge>
                        ))}
                        {userPermissions.length === 0 && (
                          <span className="text-xs text-gray-400">无权限</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* 团队权限标签页 */}
            <TabsContent value="teams" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <IconUsers size={48} className="mx-auto mb-4 text-gray-300" />
                <p>团队权限管理功能开发中...</p>
              </div>
            </TabsContent>

            {/* 组织权限标签页 */}
            <TabsContent value="organizations" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <IconBuilding size={48} className="mx-auto mb-4 text-gray-300" />
                <p>组织权限管理功能开发中...</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* 所有权转移 */}
          {currentUser && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">所有权转移</h4>
                  <p className="text-sm text-gray-500">将案例的所有权转移给其他用户</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowTransferModal(true)}
                  className="rounded-xl"
                >
                  <IconShare size={16} className="mr-2" />
                  转移所有权
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 所有权转移模态框 */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
          <Card className="bg-white rounded-2xl shadow-2xl border-0 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">
                转移所有权
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transfer-user">选择新所有者</Label>
                <Select value={transferToUser} onValueChange={setTransferToUser}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="选择用户" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(user => user.id !== currentUser?.id).map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowTransferModal(false)}
                  className="rounded-xl"
                >
                  取消
                </Button>
                <Button
                  onClick={handleTransferOwnership}
                  disabled={!transferToUser}
                  className="rounded-xl"
                >
                  <IconCheck size={16} className="mr-2" />
                  确认转移
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
});

PermissionManager.displayName = 'PermissionManager';

export default PermissionManager;
