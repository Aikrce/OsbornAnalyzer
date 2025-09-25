import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { 
  IconSettings, 
  IconBell, 
  IconShield, 
  IconPalette, 
  IconDatabase,
  IconDownload,
  IconUpload,
  IconTrash,
  IconDeviceFloppy,
  IconKey,
  IconMail,
  IconPhone,
  IconMoon,
  IconSun,
  IconBrain
} from '@tabler/icons-react';
import { useAIConfig } from '../hooks/useAIConfig';
import { useNotification } from '../providers/notification-provider';

// 应用偏好设置接口
interface AppPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'zh' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    analysisPublic: boolean;
    dataSharing: boolean;
  };
}

const SettingsPage: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<'ai' | 'preferences' | 'notifications' | 'security' | 'data'>('ai');

  // AI配置相关
  const { 
    config, 
    updateConfig, 
    apiConfigs, 
    addApiConfig, 
    updateApiConfig, 
    deleteApiConfig, 
    setActiveApiConfig, 
    getActiveApiConfig 
  } = useAIConfig();
  // const { theme, setTheme } = useTheme();
  const { showNotification } = useNotification();

  const [apiKey, setApiKey] = useState(config.apiKey);
  const [model, setModel] = useState(config.model);
  const [temperature, setTemperature] = useState(config.temperature);
  const [maxTokens, setMaxTokens] = useState(config.maxTokens);

  // 同步配置状态
  useEffect(() => {
    setApiKey(config.apiKey);
    setModel(config.model);
    setTemperature(config.temperature);
    setMaxTokens(config.maxTokens);
  }, [config]);

  // 多API配置状态
  const [showAddApiForm, setShowAddApiForm] = useState(false);
  const [newApiConfig, setNewApiConfig] = useState({
    name: '',
    provider: 'deepseek' as const,
    apiKey: '',
    model: 'deepseek-chat',
    temperature: 0.7,
    maxTokens: 2000
  });

  // 应用偏好设置
  const [appPreferences, setAppPreferences] = useState<AppPreferences>(() => {
    // 从localStorage加载设置
    const saved = localStorage.getItem('appPreferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse app preferences:', error);
      }
    }
    // 默认设置
    return {
      theme: 'light',
      language: 'zh',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisible: true,
        analysisPublic: false,
        dataSharing: false
      }
    };
  });

  // 保存AI配置
  const handleSaveAIConfig = useCallback(() => {
    updateConfig({ apiKey, model, temperature, maxTokens });
    showNotification('AI配置已保存', 'success');
  }, [apiKey, model, temperature, maxTokens, updateConfig, showNotification]);

  // 添加新的API配置
  const handleAddApiConfig = useCallback(() => {
    if (!newApiConfig.name.trim() || !newApiConfig.apiKey.trim()) {
      showNotification('请填写API配置名称和密钥', 'error');
      return;
    }

    addApiConfig({
      ...newApiConfig,
      isActive: apiConfigs.length === 0 // 如果是第一个配置，自动设为活跃
    });
    
    setNewApiConfig({
      name: '',
      provider: 'deepseek',
      apiKey: '',
      model: 'deepseek-chat',
      temperature: 0.7,
      maxTokens: 2000
    });
    setShowAddApiForm(false);
    showNotification('API配置已添加', 'success');
  }, [newApiConfig, addApiConfig, apiConfigs.length, showNotification]);

  // 删除API配置
  const handleDeleteApiConfig = useCallback((id: string) => {
    if (window.confirm('确定要删除这个API配置吗？')) {
      deleteApiConfig(id);
      showNotification('API配置已删除', 'success');
    }
  }, [deleteApiConfig, showNotification]);

  // 设置活跃的API配置
  const handleSetActiveApiConfig = useCallback((id: string) => {
    setActiveApiConfig(id);
    showNotification('已切换API配置', 'success');
  }, [setActiveApiConfig, showNotification]);


  // 更新偏好设置
  const updatePreference = useCallback((key: string, value: any) => {
    const newPreferences = {
      ...appPreferences,
      [key]: value
    };
    setAppPreferences(newPreferences);
    // 保存到localStorage
    localStorage.setItem('appPreferences', JSON.stringify(newPreferences));
    showNotification('偏好设置已保存', 'success');
  }, [appPreferences, showNotification]);

  // 更新通知设置
  const updateNotification = useCallback((key: string, value: boolean) => {
    const newPreferences = {
      ...appPreferences,
      notifications: {
        ...appPreferences.notifications,
        [key]: value
      }
    };
    setAppPreferences(newPreferences);
    localStorage.setItem('appPreferences', JSON.stringify(newPreferences));
    showNotification('通知设置已保存', 'success');
  }, [appPreferences, showNotification]);

  // 更新隐私设置
  const updatePrivacy = useCallback((key: string, value: boolean) => {
    const newPreferences = {
      ...appPreferences,
      privacy: {
        ...appPreferences.privacy,
        [key]: value
      }
    };
    setAppPreferences(newPreferences);
    localStorage.setItem('appPreferences', JSON.stringify(newPreferences));
    showNotification('隐私设置已保存', 'success');
  }, [appPreferences, showNotification]);

  // 导出数据
  const handleExportData = useCallback(() => {
    const data = {
      preferences: appPreferences,
      aiConfig: config,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [appPreferences, config]);

  // 清除数据
  const handleClearData = useCallback(() => {
    if (window.confirm('确定要清除所有本地数据吗？此操作不可恢复。')) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/30 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-blue-600 rounded-2xl mb-6 shadow-xl shadow-gray-500/20">
            <IconSettings size={28} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            设置
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            管理您的个人信息、AI配置、偏好设置、安全选项和数据
          </p>
        </div>

        {/* 标签页导航 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-lg">
            <div className="flex space-x-2">
              {[
                { key: 'ai', label: 'AI配置', icon: IconBrain },
                { key: 'preferences', label: '偏好设置', icon: IconPalette },
                { key: 'notifications', label: '通知设置', icon: IconBell },
                { key: 'security', label: '安全隐私', icon: IconShield },
                { key: 'data', label: '数据管理', icon: IconDatabase }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={activeTab === key ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(key as any)}
                  className={`rounded-xl ${
                    activeTab === key 
                      ? 'bg-gray-500 text-white' 
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

        {/* AI配置页面 */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto">
            {/* 多API配置管理 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <IconBrain size={24} className="mr-3 text-purple-600" />
                    多API配置管理
                  </div>
                  <Button 
                    onClick={() => setShowAddApiForm(!showAddApiForm)}
                    variant="outline"
                    size="sm"
                  >
                    {showAddApiForm ? '取消' : '添加API配置'}
                  </Button>
                </CardTitle>
                <p className="text-gray-600">管理多个AI服务提供商的API配置，支持快速切换</p>
              </CardHeader>
              <CardContent>
                {/* 已保存的API配置列表 */}
                {apiConfigs.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">已保存的API配置</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {apiConfigs.map((apiConfig) => (
                        <div 
                          key={apiConfig.id} 
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            apiConfig.isActive 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{apiConfig.name}</h4>
                              <p className="text-sm text-gray-600 capitalize">{apiConfig.provider}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {apiConfig.isActive && (
                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                  当前使用
                                </span>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteApiConfig(apiConfig.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <IconTrash size={16} />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">API密钥:</span>
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {apiConfig.apiKey.substring(0, 8)}...{apiConfig.apiKey.substring(apiConfig.apiKey.length - 4)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">模型:</span>
                              <span className="font-medium">{apiConfig.model}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">温度:</span>
                              <span className="font-medium">{apiConfig.temperature}</span>
                            </div>
                          </div>
                          
                          {!apiConfig.isActive && (
                            <Button
                              size="sm"
                              onClick={() => handleSetActiveApiConfig(apiConfig.id)}
                              className="w-full mt-3"
                            >
                              设为当前使用
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <IconBrain size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">还没有配置任何API</p>
                    <Button onClick={() => setShowAddApiForm(true)}>
                      添加第一个API配置
                    </Button>
                  </div>
                )}

                {/* 添加新API配置表单 */}
                {showAddApiForm && (
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">添加新的API配置</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="configName">配置名称</Label>
                        <Input
                          id="configName"
                          value={newApiConfig.name}
                          onChange={(e) => setNewApiConfig({ ...newApiConfig, name: e.target.value })}
                          placeholder="例如：DeepSeek生产环境"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="provider">服务提供商</Label>
                        <Select 
                          value={newApiConfig.provider} 
                          onValueChange={(value: any) => setNewApiConfig({ ...newApiConfig, provider: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deepseek">DeepSeek</SelectItem>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                            <SelectItem value="custom">自定义</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="newApiKey">API密钥</Label>
                        <Input
                          id="newApiKey"
                          type="password"
                          value={newApiConfig.apiKey}
                          onChange={(e) => setNewApiConfig({ ...newApiConfig, apiKey: e.target.value })}
                          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newModel">模型</Label>
                        <Select 
                          value={newApiConfig.model} 
                          onValueChange={(value) => setNewApiConfig({ ...newApiConfig, model: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                            <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setShowAddApiForm(false)}>
                        取消
                      </Button>
                      <Button onClick={handleAddApiConfig}>
                        添加配置
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 传统AI配置（保持向后兼容） */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <IconBrain size={24} className="mr-3 text-purple-600" />
                  默认AI配置
                </CardTitle>
                <p className="text-gray-600">配置默认的AI服务接口（向后兼容）</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="apiKey">DeepSeek API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      请输入您的DeepSeek API密钥，用于增强分析功能
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="model">AI 模型</Label>
                    <Select value={model} onValueChange={(value) => setModel(value as typeof config.model)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="选择AI模型" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]">
                        <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                        <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="temperature">温度 (Temperature)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={temperature}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperature(parseFloat(e.target.value))}
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-1">控制输出的随机性，0-1之间</p>
                    </div>
                    <div>
                      <Label htmlFor="maxTokens">最大 Token 数</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        step="1"
                        min="1"
                        value={maxTokens}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxTokens(parseInt(e.target.value))}
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-1">控制输出长度</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">配置说明</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• API密钥用于调用DeepSeek AI服务，提供更智能的分析结果</li>
                      <li>• 不配置API密钥也可以使用本地分析功能</li>
                      <li>• 配置后可以享受更深入的AI驱动分析</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={handleSaveAIConfig} 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <IconDeviceFloppy size={16} className="mr-2" />
                    保存AI配置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}


        {/* 偏好设置页面 */}
        {activeTab === 'preferences' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* 主题设置 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconPalette size={20} className="mr-3 text-purple-600" />
                  主题设置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>主题模式</Label>
                    <Select 
                      value={appPreferences.theme} 
                      onValueChange={(value) => updatePreference('theme', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]">
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <IconSun size={16} className="mr-2" />
                            浅色模式
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <IconMoon size={16} className="mr-2" />
                            深色模式
                          </div>
                        </SelectItem>
                        <SelectItem value="auto">跟随系统</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>语言</Label>
                    <Select 
                      value={appPreferences.language} 
                      onValueChange={(value) => updatePreference('language', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]">
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 通知设置 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconBell size={20} className="mr-3 text-blue-600" />
                  通知设置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">邮件通知</p>
                      <p className="text-sm text-gray-600">接收邮件通知</p>
                    </div>
                    <Switch
                      checked={appPreferences.notifications.email}
                      onCheckedChange={(checked) => updateNotification('email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">推送通知</p>
                      <p className="text-sm text-gray-600">接收浏览器推送通知</p>
                    </div>
                    <Switch
                      checked={appPreferences.notifications.push}
                      onCheckedChange={(checked) => updateNotification('push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">短信通知</p>
                      <p className="text-sm text-gray-600">接收短信通知</p>
                    </div>
                    <Switch
                      checked={appPreferences.notifications.sms}
                      onCheckedChange={(checked) => updateNotification('sms', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 通知设置页面 */}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconBell size={20} className="mr-3 text-blue-600" />
                  通知设置
                </CardTitle>
                <p className="text-gray-600">管理您接收通知的方式和频率</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">通知类型</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">邮件通知</p>
                          <p className="text-sm text-gray-600">接收邮件通知</p>
                        </div>
                        <Switch
                          checked={appPreferences.notifications.email}
                          onCheckedChange={(checked) => updateNotification('email', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">推送通知</p>
                          <p className="text-sm text-gray-600">接收浏览器推送通知</p>
                        </div>
                        <Switch
                          checked={appPreferences.notifications.push}
                          onCheckedChange={(checked) => updateNotification('push', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">短信通知</p>
                          <p className="text-sm text-gray-600">接收短信通知</p>
                        </div>
                        <Switch
                          checked={appPreferences.notifications.sms}
                          onCheckedChange={(checked) => updateNotification('sms', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">通知频率</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">分析完成通知</p>
                          <p className="text-sm text-gray-600">分析任务完成时通知</p>
                        </div>
                        <Switch
                          checked={true}
                          onCheckedChange={() => {}}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">协作邀请通知</p>
                          <p className="text-sm text-gray-600">收到协作邀请时通知</p>
                        </div>
                        <Switch
                          checked={true}
                          onCheckedChange={() => {}}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">系统更新通知</p>
                          <p className="text-sm text-gray-600">系统功能更新时通知</p>
                        </div>
                        <Switch
                          checked={false}
                          onCheckedChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 安全隐私页面 */}
        {activeTab === 'security' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconShield size={20} className="mr-3 text-green-600" />
                  隐私设置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">公开个人资料</p>
                      <p className="text-sm text-gray-600">允许其他用户查看您的个人资料</p>
                    </div>
                    <Switch
                      checked={appPreferences.privacy.profileVisible}
                      onCheckedChange={(checked) => updatePrivacy('profileVisible', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">公开分析结果</p>
                      <p className="text-sm text-gray-600">允许其他用户查看您的分析结果</p>
                    </div>
                    <Switch
                      checked={appPreferences.privacy.analysisPublic}
                      onCheckedChange={(checked) => updatePrivacy('analysisPublic', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">数据共享</p>
                      <p className="text-sm text-gray-600">允许匿名数据用于产品改进</p>
                    </div>
                    <Switch
                      checked={appPreferences.privacy.dataSharing}
                      onCheckedChange={(checked) => updatePrivacy('dataSharing', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconKey size={20} className="mr-3 text-red-600" />
                  安全设置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-medium text-blue-900 mb-2">修改密码</h4>
                    <p className="text-sm text-blue-700 mb-3">定期更新密码以保护账户安全</p>
                    <Button variant="outline" className="w-full rounded-xl border-blue-200 text-blue-700 hover:bg-blue-100">
                      <IconKey size={16} className="mr-2" />
                      修改密码
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-medium text-green-900 mb-2">绑定邮箱</h4>
                    <p className="text-sm text-green-700 mb-3">绑定邮箱用于接收重要通知和找回密码</p>
                    <Button variant="outline" className="w-full rounded-xl border-green-200 text-green-700 hover:bg-green-100">
                      <IconMail size={16} className="mr-2" />
                      绑定邮箱
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-medium text-purple-900 mb-2">绑定手机</h4>
                    <p className="text-sm text-purple-700 mb-3">绑定手机号码用于双重验证</p>
                    <Button variant="outline" className="w-full rounded-xl border-purple-200 text-purple-700 hover:bg-purple-100">
                      <IconPhone size={16} className="mr-2" />
                      绑定手机
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 数据管理页面 */}
        {activeTab === 'data' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <IconDatabase size={20} className="mr-3 text-blue-600" />
                  数据管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="font-medium text-blue-900">导出数据</p>
                      <p className="text-sm text-blue-700">下载您的所有数据</p>
                    </div>
                    <Button 
                      onClick={handleExportData}
                      variant="outline"
                      className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-100"
                    >
                      <IconDownload size={16} className="mr-2" />
                      导出
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-green-900">导入数据</p>
                      <p className="text-sm text-green-700">从文件导入数据</p>
                    </div>
                    <Button 
                      variant="outline"
                      className="rounded-xl border-green-200 text-green-700 hover:bg-green-100"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.json';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              try {
                                const data = JSON.parse(e.target?.result as string);
                                if (data.preferences) {
                                  setAppPreferences(data.preferences);
                                  localStorage.setItem('appPreferences', JSON.stringify(data.preferences));
                                }
                                if (data.aiConfig) {
                                  updateConfig(data.aiConfig);
                                }
                                showNotification('数据导入成功', 'success');
                              } catch (error) {
                                showNotification('数据格式错误', 'error');
                              }
                            };
                            reader.readAsText(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <IconUpload size={16} className="mr-2" />
                      导入
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                    <div>
                      <p className="font-medium text-red-900">清除数据</p>
                      <p className="text-sm text-red-700">删除所有本地数据</p>
                    </div>
                    <Button 
                      onClick={handleClearData}
                      variant="outline"
                      className="rounded-xl border-red-200 text-red-700 hover:bg-red-100"
                    >
                      <IconTrash size={16} className="mr-2" />
                      清除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-gray-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">存储使用情况</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>本地案例库</span>
                      <span>2.3 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>用户设置</span>
                      <span>0.1 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>缓存数据</span>
                      <span>5.2 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
