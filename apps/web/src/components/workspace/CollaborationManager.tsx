import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
   
  UserPlus, 
  Settings, 
  Crown, 
  Edit, 
  Eye, 
  MoreVertical,
  Copy,
  
  Trash2,
  MessageCircle,
  Video,
  
  
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Collaborator, 
  WorkspaceMode 
} from '@/types/workspace';

interface CollaborationManagerProps {
  collaborators: Collaborator[];
  currentUser: Collaborator;
  mode: WorkspaceMode;
  onAddCollaborator: (email: string, role: 'editor' | 'viewer') => void;
  onRemoveCollaborator: (collaboratorId: string) => void;
  onUpdateCollaborator: (collaboratorId: string, updates: Partial<Collaborator>) => void;
  onInviteCollaborator: (email: string) => void;
  className?: string;
}

const CollaborationManager: React.FC<CollaborationManagerProps> = ({
  collaborators,
  currentUser,
  
  
  onRemoveCollaborator,
  onUpdateCollaborator,
  onInviteCollaborator,
  className = ''
}) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const inviteModalRef = useRef<HTMLDivElement>(null);
  const settingsModalRef = useRef<HTMLDivElement>(null);

  // 生成分享链接
  const generateShareLink = async () => {
    setIsGeneratingLink(true);
    try {
      // 模拟生成分享链接
      await new Promise(resolve => setTimeout(resolve, 1000));
      const link = `${window.location.origin}/collaborate/${Date.now()}`;
      setShareLink(link);
    } catch (error) {
      console.error('Error generating share link:', error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  // 复制分享链接
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      // 这里可以显示成功提示
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  // 发送邀请
  const handleSendInvite = () => {
    if (inviteEmail && inviteRole) {
      onInviteCollaborator(inviteEmail);
      setIsInviteModalOpen(false);
      setInviteEmail('');
      setInviteRole('editor');
    }
  };

  // 获取角色图标
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'editor':
        return <Edit className="w-4 h-4 text-blue-500" />;
      case 'viewer':
        return <Eye className="w-4 h-4 text-gray-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  // 点击外部关闭模态框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inviteModalRef.current && !inviteModalRef.current.contains(event.target as Node)) {
        setIsInviteModalOpen(false);
      }
      if (settingsModalRef.current && !settingsModalRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`collaboration-manager ${className}`}>
      {/* 协作头部 */}
      <div className="collaboration-header">
        <div className="header-left">
          <h3 className="collaboration-title">协作管理</h3>
          <span className="collaborator-count">
            {collaborators.length} 位协作者
          </span>
        </div>

        <div className="header-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="action-button"
          >
            <Settings className="w-4 h-4 mr-2" />
            设置
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsInviteModalOpen(true)}
            className="action-button"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            邀请
          </Button>
        </div>
      </div>

      {/* 协作者列表 */}
      <div className="collaborators-section">
        <div className="section-header">
          <h4 className="section-title">协作者列表</h4>
          <div className="online-indicator">
            <div className="indicator-dot bg-green-500" />
            <span className="indicator-text">
              {collaborators.filter(c => c.status === 'online').length} 在线
            </span>
          </div>
        </div>

        <div className="collaborators-list">
          {collaborators.map((collaborator) => (
            <motion.div
              key={collaborator.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="collaborator-card"
            >
              <div className="collaborator-main">
                <div className="collaborator-avatar">
                  <div 
                    className="avatar-circle"
                    style={{ backgroundColor: collaborator.color }}
                  >
                    {collaborator.name.charAt(0)}
                  </div>
                  <div className={`status-indicator ${getStatusColor(collaborator.status)}`} />
                </div>

                <div className="collaborator-info">
                  <div className="collaborator-name-row">
                    <h5 className="collaborator-name">{collaborator.name}</h5>
                    {getRoleIcon(collaborator.role)}
                  </div>
                  <p className="collaborator-email">{collaborator.email}</p>
                  <p className="collaborator-status">
                    {collaborator.status === 'online' && '在线'}
                    {collaborator.status === 'away' && '离开'}
                    {collaborator.status === 'offline' && '离线'}
                    {collaborator.lastActiveAt && (
                      <span className="last-active">
                        • 最后活跃: {new Date(collaborator.lastActiveAt).toLocaleTimeString()}
                      </span>
                    )}
                  </p>
                </div>

                <div className="collaborator-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCollaborator(collaborator)}
                    className="action-button"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 协作者操作菜单 */}
              {selectedCollaborator?.id === collaborator.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="collaborator-menu"
                >
                  <div className="menu-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // 发送消息
                        console.log('Send message to', collaborator.name);
                      }}
                      className="menu-action"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      发送消息
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // 视频通话
                        console.log('Start video call with', collaborator.name);
                      }}
                      className="menu-action"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      视频通话
                    </Button>
                    
                    {currentUser.role === 'owner' && collaborator.role !== 'owner' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            onUpdateCollaborator(collaborator.id, {
                              role: collaborator.role === 'editor' ? 'viewer' : 'editor'
                            });
                            setSelectedCollaborator(null);
                          }}
                          className="menu-action"
                        >
                          {collaborator.role === 'editor' ? (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              设为查看者
                            </>
                          ) : (
                            <>
                              <Edit className="w-4 h-4 mr-2" />
                              设为编辑者
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            onRemoveCollaborator(collaborator.id);
                            setSelectedCollaborator(null);
                          }}
                          className="menu-action text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          移除协作者
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 邀请模态框 */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <motion.div
              ref={inviteModalRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="invite-modal"
            >
              <div className="modal-header">
                <h3 className="modal-title">邀请协作者</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="modal-close"
                >
                  ×
                </Button>
              </div>

              <div className="modal-content">
                <div className="form-group">
                  <label className="form-label">邮箱地址</label>
                  <Input
                    type="email"
                    placeholder="输入协作者邮箱"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">权限级别</label>
                  <div className="role-options">
                    <label className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value="editor"
                        checked={inviteRole === 'editor'}
                        onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                      />
                      <div className="role-info">
                        <div className="role-title">
                          <Edit className="w-4 h-4" />
                          编辑者
                        </div>
                        <div className="role-description">可以编辑和修改内容</div>
                      </div>
                    </label>
                    
                    <label className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value="viewer"
                        checked={inviteRole === 'viewer'}
                        onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                      />
                      <div className="role-info">
                        <div className="role-title">
                          <Eye className="w-4 h-4" />
                          查看者
                        </div>
                        <div className="role-description">只能查看内容</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <Button
                  variant="outline"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="modal-button"
                >
                  取消
                </Button>
                <Button
                  variant="default"
                  onClick={handleSendInvite}
                  disabled={!inviteEmail}
                  className="modal-button"
                >
                  发送邀请
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 设置模态框 */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <motion.div
              ref={settingsModalRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="settings-modal"
            >
              <div className="modal-header">
                <h3 className="modal-title">协作设置</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSettingsOpen(false)}
                  className="modal-close"
                >
                  ×
                </Button>
              </div>

              <div className="modal-content">
                <div className="settings-section">
                  <h4 className="section-title">分享链接</h4>
                  <div className="share-link-container">
                    <Input
                      value={shareLink}
                      placeholder="点击生成分享链接"
                      readOnly
                      className="share-link-input"
                    />
                    <div className="share-link-actions">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateShareLink}
                        disabled={isGeneratingLink}
                        className="action-button"
                      >
                        {isGeneratingLink ? '生成中...' : '生成链接'}
                      </Button>
                      {shareLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyShareLink}
                          className="action-button"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h4 className="section-title">权限设置</h4>
                  <div className="permission-options">
                    <label className="permission-option">
                      <input type="checkbox" defaultChecked />
                      <span>允许协作者邀请其他人</span>
                    </label>
                    <label className="permission-option">
                      <input type="checkbox" defaultChecked />
                      <span>显示协作者光标位置</span>
                    </label>
                    <label className="permission-option">
                      <input type="checkbox" />
                      <span>需要批准新协作者</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <Button
                  variant="outline"
                  onClick={() => setIsSettingsOpen(false)}
                  className="modal-button"
                >
                  取消
                </Button>
                <Button
                  variant="default"
                  onClick={() => setIsSettingsOpen(false)}
                  className="modal-button"
                >
                  保存设置
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .collaboration-manager {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .collaboration-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .collaboration-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .collaborator-count {
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .action-button {
          font-size: 12px;
          height: 32px;
          padding: 0 12px;
        }

        .collaborators-section {
          padding: 20px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .online-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .indicator-text {
          font-size: 12px;
          color: #6b7280;
        }

        .collaborators-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .collaborator-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .collaborator-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .collaborator-main {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 12px;
        }

        .collaborator-avatar {
          position: relative;
        }

        .avatar-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 18px;
        }

        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .collaborator-info {
          flex: 1;
        }

        .collaborator-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .collaborator-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .collaborator-email {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 4px 0;
        }

        .collaborator-status {
          font-size: 12px;
          color: #9ca3af;
          margin: 0;
        }

        .last-active {
          color: #9ca3af;
        }

        .collaborator-actions {
          display: flex;
          align-items: center;
        }

        .collaborator-menu {
          border-top: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .menu-actions {
          display: flex;
          flex-direction: column;
          padding: 8px;
          gap: 4px;
        }

        .menu-action {
          justify-content: flex-start;
          font-size: 12px;
          height: 32px;
          padding: 0 12px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .invite-modal,
        .settings-modal {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .modal-close {
          width: 32px;
          height: 32px;
          padding: 0;
          font-size: 20px;
        }

        .modal-content {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
        }

        .role-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .role-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-option:hover {
          background: #f9fafb;
        }

        .role-option input[type="radio"] {
          margin: 0;
        }

        .role-info {
          flex: 1;
        }

        .role-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 4px;
        }

        .role-description {
          font-size: 12px;
          color: #6b7280;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #f3f4f6;
        }

        .modal-button {
          font-size: 14px;
          height: 36px;
          padding: 0 16px;
        }

        .settings-section {
          margin-bottom: 24px;
        }

        .share-link-container {
          display: flex;
          gap: 8px;
        }

        .share-link-input {
          flex: 1;
        }

        .share-link-actions {
          display: flex;
          gap: 4px;
        }

        .permission-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .permission-option {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #374151;
        }

        .permission-option input[type="checkbox"] {
          margin: 0;
        }

        @media (max-width: 768px) {
          .collaboration-header {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .header-actions {
            justify-content: center;
          }

          .collaborator-main {
            padding: 12px;
          }

          .collaborator-name-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .invite-modal,
          .settings-modal {
            width: 95%;
            margin: 20px;
          }

          .modal-content {
            padding: 16px;
          }

          .share-link-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default CollaborationManager;
