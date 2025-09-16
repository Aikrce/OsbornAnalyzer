import React, { useState, memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  IconUser,
  IconHistory,
  IconTrendingUp, IconAward, IconTarget, IconClock, IconCheck,
  IconEdit
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
  // 用户信息状态（只读）
  const userInfo = {
    name: '当前用户',
    email: 'user@example.com',
    phone: '+86 138 0000 0000',
    bio: '一位热爱创新的思考者，专注于奥斯本创新方法的研究与应用。',
    location: '中国',
    website: 'https://example.com',
    joinDate: '2024-01-01',
    lastLogin: '2024-12-19'
  };

  // 用户偏好设置（只读）
  const preferences = {
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    language: 'zh',
    timezone: 'Asia/Shanghai',
    theme: 'light'
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <IconUser size={18} /> 个人资料
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <IconEdit size={18} /> 偏好设置
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
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <IconUser size={24} /> 个人资料
              </CardTitle>
              <CardDescription>查看您的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <p className="text-sm font-medium text-gray-600">用户名</p>
                  <p className="text-gray-900 font-medium">{userInfo.name}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium text-gray-600">邮箱</p>
                  <p className="text-gray-900 font-medium">{userInfo.email}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium text-gray-600">电话</p>
                  <p className="text-gray-900 font-medium">{userInfo.phone}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium text-gray-600">所在地</p>
                  <p className="text-gray-900 font-medium">{userInfo.location}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium text-gray-600">个人网站</p>
                  <p className="text-gray-900 font-medium">{userInfo.website}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium text-gray-600">注册时间</p>
                  <p className="text-gray-900 font-medium">{userInfo.joinDate}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <p className="text-sm font-medium text-gray-600">个人简介</p>
                <p className="text-gray-900">{userInfo.bio}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 偏好设置 */}
        <TabsContent value="preferences" className="mt-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <IconUser size={24} /> 偏好设置
              </CardTitle>
              <CardDescription>查看您的当前设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">通知设置</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">邮件通知</p>
                  <p className="text-gray-900 font-medium">{preferences.emailNotifications ? '开启' : '关闭'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">推送通知</p>
                  <p className="text-gray-900 font-medium">{preferences.pushNotifications ? '开启' : '关闭'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">周报提醒</p>
                  <p className="text-gray-900 font-medium">{preferences.weeklyReport ? '开启' : '关闭'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">界面设置</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <p className="text-sm font-medium text-gray-600">语言</p>
                    <p className="text-gray-900 font-medium">{preferences.language === 'zh' ? '简体中文' : 'English'}</p>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium text-gray-600">时区</p>
                    <p className="text-gray-900 font-medium">{preferences.timezone === 'Asia/Shanghai' ? '北京时间' : preferences.timezone}</p>
                  </div>
                </div>
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
