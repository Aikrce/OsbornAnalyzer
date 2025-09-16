import React, { useState, memo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
  endDate?: Date;
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

  // 模拟团队成员数据
  const [teamMembers] = useState<TeamMember[]>([
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
  ]);

  // 模拟项目数据
  const [projects] = useState<Project[]>([
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
  ]);

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
                        <Button size="sm" variant="ghost" className="p-2">
                          <IconEdit size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2 text-red-600 hover:text-red-700">
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
