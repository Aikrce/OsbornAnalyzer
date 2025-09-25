import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  IconUser,
  IconHistory,
  IconTrendingUp, IconAward, IconTarget, IconClock, IconCheck,
  IconEdit, IconDeviceFloppy, IconX
} from '@tabler/icons-react';

// 用户活动记录接口
interface UserActivity {
  id: string;
  type: 'analysis' | 'collaboration' | 'export' | 'login';
  title: string;
  description: string;
  timestamp: Date;
  status: 'completed' | 'in_progress' | 'failed';
}

// 用户统计接口
interface UserStats {
  totalAnalyses: number;
  totalCollaborations: number;
  totalExports: number;
  lastLogin: Date;
  memberSince: Date;
}

const UserPage: React.FC = memo(() => {
  // 编辑状态管理
  const [isEditing, setIsEditing] = useState(false);
  
  // 用户信息状态（可编辑）
  const [userInfo, setUserInfo] = useState(() => {
    // 从localStorage加载用户信息，如果没有则使用默认数据
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse user profile:', error);
      }
    }
    // 默认数据
    return {
      name: '当前用户',
      email: 'user@example.com',
      phone: '+86 138 0000 0000',
      bio: '一位热爱创新的思考者，专注于奥斯本创新方法的研究与应用。',
      location: '中国',
      website: 'https://example.com',
      joinDate: '2024-01-01',
      lastLogin: '2024-12-19',
      avatar: null
    };
  });

  // 表单数据状态
  const [formData, setFormData] = useState(userInfo);

  // 同步formData与userInfo
  useEffect(() => {
    if (!isEditing) {
      setFormData(userInfo);
    }
  }, [userInfo, isEditing]);

  // 保存用户信息到localStorage
  const saveUserInfo = (newUserInfo: typeof userInfo) => {
    setUserInfo(newUserInfo);
    localStorage.setItem('userProfile', JSON.stringify(newUserInfo));
  };

  // 开始编辑
  const handleStartEdit = () => {
    // 确保formData是最新的userInfo数据
    const currentUserInfo = { ...userInfo };
    setFormData(currentUserInfo);
    setIsEditing(true);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  // 保存编辑
  const handleSaveEdit = () => {
    saveUserInfo(formData);
    setIsEditing(false);
  };

  // 表单字段更新
  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [field]: value
    }));
  };

  // 头像上传处理
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarUrl = e.target?.result as string;
        setFormData((prev: typeof formData) => ({ ...prev, avatar: avatarUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 移除头像
  const handleRemoveAvatar = () => {
    setFormData((prev: typeof formData) => ({ ...prev, avatar: null }));
  };

  // 用户统计
  const [userStats] = useState<UserStats>({
    totalAnalyses: 156,
    totalCollaborations: 23,
    totalExports: 45,
    lastLogin: new Date('2024-12-19T10:30:00'),
    memberSince: new Date('2024-01-01T00:00:00')
  });

  // 用户活动记录
  const [activities] = useState<UserActivity[]>([
    {
      id: '1',
      type: 'analysis',
      title: '奥斯本分析：智能家居产品创新',
      description: '完成了智能家居产品的奥斯本九宫格分析',
      timestamp: new Date('2024-12-19T14:30:00'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'collaboration',
      title: '团队协作：产品设计讨论',
      description: '参与了产品设计团队的协作讨论',
      timestamp: new Date('2024-12-19T10:15:00'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'export',
      title: '导出分析报告',
      description: '导出了深度分析报告为PDF格式',
      timestamp: new Date('2024-12-18T16:45:00'),
      status: 'completed'
    },
    {
      id: '4',
      type: 'login',
      title: '用户登录',
      description: '成功登录系统',
      timestamp: new Date('2024-12-19T09:00:00'),
      status: 'completed'
    }
  ]);


  // 获取活动类型图标
  const getActivityIcon = (type: UserActivity['type']) => {
    switch (type) {
      case 'analysis': return IconTrendingUp;
      case 'collaboration': return IconTarget;
      case 'export': return IconAward;
      case 'login': return IconCheck;
      default: return IconHistory;
    }
  };

  // 获取活动类型颜色
  const getActivityColor = (type: UserActivity['type']) => {
    switch (type) {
      case 'analysis': return 'text-blue-500';
      case 'collaboration': return 'text-green-500';
      case 'export': return 'text-purple-500';
      case 'login': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: UserActivity['status']) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-yellow-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          用户中心
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          管理您的个人信息、查看活动记录和统计数据
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <IconUser size={18} /> 个人资料
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <IconTrendingUp size={18} /> 统计数据
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <IconHistory size={18} /> 活动记录
          </TabsTrigger>
        </TabsList>

        {/* 个人资料 */}
        <TabsContent value="profile" className="mt-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconUser size={24} /> 个人资料
                </div>
                {!isEditing ? (
                  <Button onClick={handleStartEdit} variant="outline" size="sm">
                    <IconEdit size={16} className="mr-2" />
                    编辑
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      <IconX size={16} className="mr-2" />
                      取消
                    </Button>
                    <Button onClick={handleSaveEdit} size="sm">
                      <IconDeviceFloppy size={16} className="mr-2" />
                      保存
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {isEditing ? '编辑您的个人信息' : '查看您的个人信息'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 头像区域 */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {isEditing ? (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {formData.avatar ? (
                        <img 
                          src={formData.avatar} 
                          alt="头像" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-gray-500">
                          {formData.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {userInfo.avatar ? (
                        <img 
                          src={userInfo.avatar} 
                          alt="头像" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-gray-500">
                          {userInfo.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                        title="上传头像"
                      >
                        <IconEdit size={16} />
                      </label>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isEditing ? formData.name : userInfo.name}
                  </h3>
                  <p className="text-gray-600">
                    {isEditing ? formData.email : userInfo.email}
                  </p>
                  {isEditing && formData.avatar && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveAvatar}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      移除头像
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">用户名</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="请输入用户名"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userInfo.name}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="请输入邮箱"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userInfo.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">电话</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="请输入电话"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userInfo.phone}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">所在地</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      placeholder="请输入所在地"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userInfo.location}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">个人网站</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleFormChange('website', e.target.value)}
                      placeholder="请输入个人网站"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userInfo.website}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>注册时间</Label>
                  <p className="text-gray-900 font-medium">{userInfo.joinDate}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">个人简介</Label>
                {isEditing ? (
                  <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleFormChange('bio', e.target.value)}
                    placeholder="请输入个人简介"
                  />
                ) : (
                  <p className="text-gray-900">{userInfo.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* 统计数据 */}
        <TabsContent value="stats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">总分析次数</p>
                    <p className="text-3xl font-bold text-blue-600">{userStats.totalAnalyses}</p>
                  </div>
                  <IconTrendingUp size={32} className="text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">协作次数</p>
                    <p className="text-3xl font-bold text-green-600">{userStats.totalCollaborations}</p>
                  </div>
                  <IconTarget size={32} className="text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">导出次数</p>
                    <p className="text-3xl font-bold text-purple-600">{userStats.totalExports}</p>
                  </div>
                  <IconAward size={32} className="text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">使用天数</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {Math.floor((Date.now() - userStats.memberSince.getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                  <IconClock size={32} className="text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg rounded-xl mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold">使用概览</CardTitle>
              <CardDescription>您的使用情况和活跃度统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">最后登录时间</span>
                  <span className="text-sm font-medium">{userStats.lastLogin.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">注册时间</span>
                  <span className="text-sm font-medium">{userStats.memberSince.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">平均每日分析</span>
                  <span className="text-sm font-medium">
                    {(userStats.totalAnalyses / Math.max(1, Math.floor((Date.now() - userStats.memberSince.getTime()) / (1000 * 60 * 60 * 24)))).toFixed(1)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 活动记录 */}
        <TabsContent value="activity" className="mt-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <IconHistory size={24} /> 最近活动
              </CardTitle>
              <CardDescription>查看您最近的操作记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  const iconColor = getActivityColor(activity.type);
                  const statusColor = getStatusColor(activity.status);
                  
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-lg bg-gray-100 ${iconColor}`}>
                        <IconComponent size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {activity.title}
                          </h4>
                          <span className={`text-xs font-medium ${statusColor}`}>
                            {activity.status === 'completed' ? '已完成' : 
                             activity.status === 'in_progress' ? '进行中' : '失败'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

UserPage.displayName = 'UserPage';

export default UserPage;
