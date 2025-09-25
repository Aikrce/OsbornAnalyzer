import React, { useState, memo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  IconUsers, 
  IconPlus, 
  IconMessageCircle, 
  IconShare, 
  IconEdit, 
  IconTrash,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconTarget
} from '@tabler/icons-react';

// 团队成员接口
interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  joinDate: Date;
  skills: string[];
}

// 项目接口
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date | undefined;
  members: string[];
  progress: number;
  tags: string[];
}

// 讨论话题接口
interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  replies: number;
  tags: string[];
  isPinned: boolean;
}

const CollaborationPage: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<'team' | 'projects' | 'discussions'>('team');
  
  // 状态管理
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // 表单状态管理
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    status: 'online',
    skills: []
  });
  const [newSkill, setNewSkill] = useState('');
  
  // 项目表单状态
  const [projectFormData, setProjectFormData] = useState<Partial<Project>>({
    name: '',
    description: '',
    status: 'planning',
    startDate: new Date(),
    members: [],
    progress: 0,
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  // 事件处理函数
  const handleAddMember = () => {
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      status: 'online',
      skills: []
    });
    setNewSkill('');
    setShowAddMemberModal(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone || '',
      location: member.location || '',
      status: member.status,
      skills: [...member.skills]
    });
    setNewSkill('');
    setShowEditMemberModal(true);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member);
    setShowDeleteConfirmModal(true);
  };

  const handleCreateProject = () => {
    setProjectFormData({
      name: '',
      description: '',
      status: 'planning',
      startDate: new Date(),
      members: [],
      progress: 0,
      tags: []
    });
    setNewTag('');
    setShowCreateProjectModal(true);
  };

  // 项目表单处理函数
  const handleProjectFormChange = (field: keyof Project, value: any) => {
    setProjectFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addProjectTag = () => {
    if (newTag.trim() && !projectFormData.tags?.includes(newTag.trim())) {
      setProjectFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeProjectTag = (tagToRemove: string) => {
    setProjectFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const saveProject = () => {
    if (!projectFormData.name || !projectFormData.description) {
      alert('请填写项目名称和描述');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectFormData.name!,
      description: projectFormData.description!,
      status: projectFormData.status || 'planning',
      startDate: projectFormData.startDate || new Date(),
      endDate: projectFormData.endDate,
      members: projectFormData.members || [],
      progress: projectFormData.progress || 0,
      tags: projectFormData.tags || []
    };

    saveProjects([...projects, newProject]);
    setShowCreateProjectModal(false);
    setProjectFormData({
      name: '',
      description: '',
      status: 'planning',
      startDate: new Date(),
      members: [],
      progress: 0,
      tags: []
    });
    setNewTag('');
  };

  const cancelProjectForm = () => {
    setShowCreateProjectModal(false);
    setProjectFormData({
      name: '',
      description: '',
      status: 'planning',
      startDate: new Date(),
      members: [],
      progress: 0,
      tags: []
    });
    setNewTag('');
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      const updatedMembers = teamMembers.filter(member => member.id !== memberToDelete.id);
      saveTeamMembers(updatedMembers);
    }
    setShowDeleteConfirmModal(false);
    setMemberToDelete(null);
  };

  const cancelDeleteMember = () => {
    setShowDeleteConfirmModal(false);
    setMemberToDelete(null);
  };

  // 表单处理函数
  const handleFormChange = (field: keyof TeamMember, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const saveMember = () => {
    if (!formData.name || !formData.role || !formData.email) {
      alert('请填写必填字段：姓名、角色、邮箱');
      return;
    }

    if (showEditMemberModal && selectedMember) {
      // 编辑现有成员
      const updatedMembers = teamMembers.map(member => 
        member.id === selectedMember.id 
          ? {
              ...member,
              ...formData,
              id: member.id, // 保持原有ID
              joinDate: member.joinDate // 保持原有加入日期
            }
          : member
      );
      saveTeamMembers(updatedMembers);
      setShowEditMemberModal(false);
      setSelectedMember(null);
    } else {
      // 添加新成员
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: formData.name!,
        role: formData.role!,
        email: formData.email!,
        phone: formData.phone || '',
        location: formData.location || '',
        status: formData.status || 'online',
        joinDate: new Date(),
        skills: formData.skills || []
      };
      saveTeamMembers([...teamMembers, newMember]);
      setShowAddMemberModal(false);
    }
  };

  const cancelForm = () => {
    setShowAddMemberModal(false);
    setShowEditMemberModal(false);
    setSelectedMember(null);
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      status: 'online',
      skills: []
    });
    setNewSkill('');
  };

  // 团队成员数据管理
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    // 从localStorage加载数据，如果没有则使用默认数据
    const saved = localStorage.getItem('teamMembers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 转换日期字符串为Date对象
        return parsed.map((member: any) => ({
          ...member,
          joinDate: new Date(member.joinDate)
        }));
      } catch (error) {
        console.error('Failed to parse team members:', error);
      }
    }
    // 默认数据
    return [
      {
        id: '1',
        name: '张三',
        role: '产品经理',
        email: 'zhangsan@example.com',
        phone: '138-0000-0001',
        location: '北京',
        status: 'online',
        joinDate: new Date('2024-01-15'),
        skills: ['产品设计', '用户研究', '项目管理']
      },
      {
        id: '2',
        name: '李四',
        role: 'UI设计师',
        email: 'lisi@example.com',
        phone: '138-0000-0002',
        location: '上海',
        status: 'busy',
        joinDate: new Date('2024-02-01'),
        skills: ['UI设计', '交互设计', '原型制作']
      },
      {
        id: '3',
        name: '王五',
        role: '前端开发',
        email: 'wangwu@example.com',
        phone: '138-0000-0003',
        location: '深圳',
        status: 'offline',
        joinDate: new Date('2024-01-20'),
        skills: ['React', 'TypeScript', 'Vue.js']
      }
    ];
  });

  // 保存数据到localStorage
  const saveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
    localStorage.setItem('teamMembers', JSON.stringify(members));
  };

  // 项目数据管理
  const [projects, setProjects] = useState<Project[]>(() => {
    // 从localStorage加载项目数据
    const saved = localStorage.getItem('collaborationProjects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((project: any) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : undefined
        }));
      } catch (error) {
        console.error('Failed to parse projects:', error);
      }
    }
    // 默认项目数据
    return [
    {
      id: '1',
      name: '奥斯本分析平台优化',
      description: '优化奥斯本分析平台的用户体验和功能',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-30'),
      members: ['1', '2', '3'],
      progress: 75,
      tags: ['产品优化', '用户体验', '功能开发']
    },
    {
      id: '2',
      name: '智能分析算法升级',
      description: '升级智能分析算法，提高分析准确性',
      status: 'planning',
      startDate: new Date('2024-03-01'),
      members: ['1', '3'],
      progress: 20,
      tags: ['算法优化', 'AI技术', '性能提升']
    }
  ];
  });

  // 保存项目数据到localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('collaborationProjects', JSON.stringify(newProjects));
  };

  // 模拟讨论数据
  const [discussions] = useState<Discussion[]>([
    {
      id: '1',
      title: '奥斯本分析结果展示优化建议',
      content: '大家觉得奥斯本分析的结果展示方式如何优化？目前的结果展示比较单调，希望能增加一些可视化元素。',
      author: '张三',
      createdAt: new Date('2024-01-20'),
      replies: 5,
      tags: ['UI优化', '用户体验'],
      isPinned: true
    },
    {
      id: '2',
      title: '深度分析功能需求讨论',
      content: '深度分析功能需要增加哪些维度？除了SWOT分析，还应该包含哪些分析框架？',
      author: '李四',
      createdAt: new Date('2024-01-18'),
      replies: 3,
      tags: ['功能需求', '产品规划'],
      isPinned: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '在线';
      case 'busy': return '忙碌';
      case 'offline': return '离线';
      default: return '未知';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProjectStatusText = (status: string) => {
    switch (status) {
      case 'planning': return '规划中';
      case 'active': return '进行中';
      case 'completed': return '已完成';
      case 'paused': return '已暂停';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      {/* 添加成员模态框 */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">添加团队成员</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">姓名 *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="请输入姓名"
                />
              </div>
              
              <div>
                <Label htmlFor="role">角色 *</Label>
                <Input
                  id="role"
                  value={formData.role || ''}
                  onChange={(e) => handleFormChange('role', e.target.value)}
                  placeholder="请输入角色"
                />
              </div>
              
              <div>
                <Label htmlFor="email">邮箱 *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="请输入邮箱"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">电话</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="请输入电话"
                />
              </div>
              
              <div>
                <Label htmlFor="location">位置</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  placeholder="请输入位置"
                />
              </div>
              
              <div>
                <Label htmlFor="status">状态</Label>
                <Select value={formData.status || 'online'} onValueChange={(value) => handleFormChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">在线</SelectItem>
                    <SelectItem value="busy">忙碌</SelectItem>
                    <SelectItem value="offline">离线</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>技能标签</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="输入技能"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <IconPlus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={cancelForm}>
                取消
              </Button>
              <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={saveMember}>
                添加
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑成员模态框 */}
      {showEditMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">编辑成员信息</h3>
            <p className="text-gray-600 mb-6">编辑 {selectedMember.name} 的信息</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">姓名 *</Label>
                <Input
                  id="edit-name"
                  value={formData.name || ''}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="请输入姓名"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-role">角色 *</Label>
                <Input
                  id="edit-role"
                  value={formData.role || ''}
                  onChange={(e) => handleFormChange('role', e.target.value)}
                  placeholder="请输入角色"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-email">邮箱 *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="请输入邮箱"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-phone">电话</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="请输入电话"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-location">位置</Label>
                <Input
                  id="edit-location"
                  value={formData.location || ''}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  placeholder="请输入位置"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-status">状态</Label>
                <Select value={formData.status || 'online'} onValueChange={(value) => handleFormChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">在线</SelectItem>
                    <SelectItem value="busy">忙碌</SelectItem>
                    <SelectItem value="offline">离线</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>技能标签</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="输入技能"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <IconPlus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={cancelForm}>
                取消
              </Button>
              <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={saveMember}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">确认删除</h3>
            <p className="text-gray-600 mb-4">
              确定要删除成员 <span className="font-semibold">{memberToDelete.name}</span> 吗？
            </p>
            <p className="text-sm text-red-600 mb-4">此操作不可撤销</p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={cancelDeleteMember}
              >
                取消
              </Button>
              <Button 
                className="bg-red-500 hover:bg-red-600"
                onClick={confirmDeleteMember}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCreateProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">创建新项目</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">项目名称 *</Label>
                <Input
                  id="projectName"
                  value={projectFormData.name || ''}
                  onChange={(e) => handleProjectFormChange('name', e.target.value)}
                  placeholder="请输入项目名称"
                />
              </div>
              
              <div>
                <Label htmlFor="projectDescription">项目描述 *</Label>
                <Input
                  id="projectDescription"
                  value={projectFormData.description || ''}
                  onChange={(e) => handleProjectFormChange('description', e.target.value)}
                  placeholder="请输入项目描述"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectStatus">项目状态</Label>
                  <Select 
                    value={projectFormData.status || 'planning'} 
                    onValueChange={(value) => handleProjectFormChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">规划中</SelectItem>
                      <SelectItem value="active">进行中</SelectItem>
                      <SelectItem value="paused">已暂停</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="projectProgress">进度 (%)</Label>
                  <Input
                    id="projectProgress"
                    type="number"
                    min="0"
                    max="100"
                    value={projectFormData.progress || 0}
                    onChange={(e) => handleProjectFormChange('progress', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">开始日期</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={projectFormData.startDate ? projectFormData.startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleProjectFormChange('startDate', new Date(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">结束日期</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={projectFormData.endDate ? projectFormData.endDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleProjectFormChange('endDate', e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
              </div>
              
              <div>
                <Label>项目标签</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="输入标签"
                    onKeyPress={(e) => e.key === 'Enter' && addProjectTag()}
                  />
                  <Button type="button" onClick={addProjectTag} size="sm">
                    <IconPlus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectFormData.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeProjectTag(tag)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={cancelProjectForm}>
                取消
              </Button>
              <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={saveProject}>
                创建项目
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl shadow-indigo-500/20">
            <IconUsers size={28} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            团队协作
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            管理团队成员，协作项目，分享想法，共同推进创新分析项目
          </p>
        </div>

        {/* 标签页导航 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-lg">
            <div className="flex space-x-2">
              {[
                { key: 'team', label: '团队成员', icon: IconUsers },
                { key: 'projects', label: '项目协作', icon: IconTarget },
                { key: 'discussions', label: '讨论交流', icon: IconMessageCircle }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={activeTab === key ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(key as any)}
                  className={`rounded-xl ${
                    activeTab === key 
                      ? 'bg-indigo-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 团队成员页面 */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">团队成员</h2>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 rounded-xl"
                onClick={handleAddMember}
              >
                <IconPlus size={16} className="mr-2" />
                添加成员
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2"
                          onClick={() => handleEditMember(member)}
                          title="编辑成员"
                        >
                          <IconEdit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteMember(member)}
                          title="删除成员"
                        >
                          <IconTrash size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <IconMail size={16} className="mr-2" />
                        {member.email}
                      </div>
                      {member.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <IconPhone size={16} className="mr-2" />
                          {member.phone}
                        </div>
                      )}
                      {member.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <IconMapPin size={16} className="mr-2" />
                          {member.location}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <IconCalendar size={16} className="mr-2" />
                        加入时间: {member.joinDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(member.status)}`}></span>
                        {getStatusText(member.status)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">技能标签</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-indigo-100 text-indigo-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 项目协作页面 */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">项目协作</h2>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 rounded-xl"
                onClick={handleCreateProject}
              >
                <IconPlus size={16} className="mr-2" />
                创建项目
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <Badge className={getProjectStatusColor(project.status)}>
                            {getProjectStatusText(project.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="p-2">
                          <IconEdit size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <IconShare size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <IconCalendar size={16} className="mr-2" />
                        开始时间: {project.startDate.toLocaleDateString()}
                      </div>
                      
                      {project.endDate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <IconTarget size={16} className="mr-2" />
                          结束时间: {project.endDate.toLocaleDateString()}
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">项目标签</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 讨论交流页面 */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">讨论交流</h2>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 rounded-xl"
              >
                <IconPlus size={16} className="mr-2" />
                发起讨论
              </Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                              置顶
                            </Badge>
                          )}
                          <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{discussion.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>作者: {discussion.author}</span>
                          <span>发布时间: {discussion.createdAt.toLocaleDateString()}</span>
                          <span>回复: {discussion.replies}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="p-2">
                          <IconMessageCircle size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <IconShare size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {discussion.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CollaborationPage.displayName = 'CollaborationPage';

export default CollaborationPage;
