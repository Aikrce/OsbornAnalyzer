'use client';

import React, { useState, useEffect } from 'react';
import { 
  aiConfigManager, 
  type AIServiceConfig, 
  type AIServiceStatus 
} from '@huitu/shared';
import { Button } from '../ui/button';

// 简单的UI组件定义
const Badge: React.FC<{ children: React.ReactNode; variant?: string }> = ({ children, variant }) => (
  <span className={`px-2 py-1 text-xs rounded ${variant === 'destructive' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
    {children}
  </span>
);

const Switch: React.FC<{ checked: boolean; onCheckedChange: (checked: boolean) => void }> = ({ checked, onCheckedChange }) => (
  <input 
    type="checkbox" 
    checked={checked} 
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="w-4 h-4"
  />
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="text-sm font-medium">{children}</label>
);


const Slider: React.FC<{ value: number[]; onValueChange: (value: number[]) => void; min?: number; max?: number }> = ({ value, onValueChange, min = 0, max = 100 }) => (
  <input 
    type="range" 
    value={value[0]} 
    onChange={(e) => onValueChange([parseInt(e.target.value)])}
    min={min} 
    max={max}
    className="w-full"
  />
);

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface AIIntegrationProps {
  onConfigChange?: (config: AIServiceConfig) => void;
  onStatusChange?: (status: AIServiceStatus) => void;
}

export const AIIntegration: React.FC<AIIntegrationProps> = ({
  onConfigChange,
  onStatusChange
}) => {
  const [config, setConfig] = useState<AIServiceConfig>(aiConfigManager.getConfig());
  const [status, setStatus] = useState<AIServiceStatus>(aiConfigManager.getStatus());
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 初始加载状态
    updateStatus();
    
    // 设置状态更新监听
    const interval = setInterval(updateStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async () => {
    const currentStatus = aiConfigManager.getStatus();
    setStatus(currentStatus);
    onStatusChange?.(currentStatus);
  };

  const updateConfig = async (newConfig: Partial<AIServiceConfig>) => {
    aiConfigManager.updateConfig(newConfig);
    const updatedConfig = aiConfigManager.getConfig();
    setConfig(updatedConfig);
    onConfigChange?.(updatedConfig);
    await updateStatus();
  };

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      aiConfigManager.setApiKey(apiKey.trim());
      setApiKey('');
      updateStatus();
    }
  };

  const handleDownloadModel = async () => {
    setIsLoading(true);
    try {
      const success = await aiConfigManager.downloadModel();
      if (success) {
              } else {
              }
    } catch (error) {
          } finally {
      setIsLoading(false);
      updateStatus();
    }
  };

  const getProviderBadge = (provider: string) => {
    const variants = {
      cloud: 'default',
      local: 'secondary',
      hybrid: 'outline'
    } as const;

    return (
      <Badge variant={variants[provider as keyof typeof variants] || 'default'}>
        {provider.toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (available: boolean) => (
    <Badge variant={available ? 'success' : 'destructive'}>
      {available ? '可用' : '不可用'}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI服务配置</CardTitle>
          <CardDescription>
            配置AI分析服务的提供方式和参数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 服务提供商选择 */}
          <div className="space-y-2">
            <Label>AI服务提供商</Label>
            <div className="flex gap-4">
              {(['cloud', 'local', 'hybrid'] as const).map((provider) => (
                <Button
                  key={provider}
                  variant={config.provider === provider ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateConfig({ provider })}
                >
                  {provider === 'cloud' && '☁️ 云端'}
                  {provider === 'local' && '💻 本地'}
                  {provider === 'hybrid' && '🔀 混合'}
                </Button>
              ))}
            </div>
          </div>

          {/* API密钥设置 */}
          <div className="space-y-2">
            <Label>API密钥</Label>
            <div className="flex gap-2">
              <input type="password"
                placeholder="输入AI服务API密钥"
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSetApiKey} disabled={!apiKey.trim()}>
                设置
              </Button>
            </div>
          </div>

          {/* 离线模式 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>离线模式</Label>
              <div className="text-sm text-muted-foreground">
                仅使用本地AI模型
              </div>
            </div>
            <Switch
              checked={config.offlineMode}
              onCheckedChange={(checked: boolean) => {
                if (checked) {
                  aiConfigManager.enableOfflineMode();
                } else {
                  aiConfigManager.disableOfflineMode();
                }
                updateStatus();
              }}
            />
          </div>

          {/* 缓存设置 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>启用缓存</Label>
              <div className="text-sm text-muted-foreground">
                缓存AI分析结果以提高性能
              </div>
            </div>
            <Switch
              checked={config.cacheEnabled}
              onCheckedChange={(checked) => updateConfig({ cacheEnabled: checked })}
            />
          </div>

          {/* 回退机制 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>启用回退</Label>
              <div className="text-sm text-muted-foreground">
                在当前服务不可用时自动回退
              </div>
            </div>
            <Switch
              checked={config.fallbackEnabled}
              onCheckedChange={(checked) => updateConfig({ fallbackEnabled: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>服务状态</CardTitle>
          <CardDescription>
            当前AI服务的运行状态和可用性
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>当前提供商</Label>
              <div className="mt-1">{getProviderBadge(status.provider)}</div>
            </div>
            
            <div>
              <Label>云端服务</Label>
              <div className="mt-1">{getStatusBadge(status.cloudAvailable)}</div>
            </div>

            <div>
              <Label>本地模型</Label>
              <div className="mt-1">{getStatusBadge(status.localAvailable)}</div>
            </div>

            <div>
              <Label>模型加载</Label>
              <div className="mt-1">{getStatusBadge(status.modelLoaded)}</div>
            </div>

            <div>
              <Label>使用次数</Label>
              <div className="mt-1 text-sm">{status.usageCount} 次</div>
            </div>

            <div>
              <Label>最后使用</Label>
              <div className="mt-1 text-sm">
                {status.lastUsed.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* 本地模型操作 */}
          {!status.localAvailable && (
            <div className="pt-4">
              <Button 
                onClick={handleDownloadModel} 
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? '下载中...' : '下载本地AI模型'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>性能优化</CardTitle>
          <CardDescription>
            AI服务的性能调优选项
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>缓存时间 (小时)</Label>
            <Slider
              value={[24]}
              max={168}
              min={1}
              
              onValueChange={([_value]: number[]) => {
                updateConfig({ cacheEnabled: true });
              }}
            />
            <div className="text-sm text-muted-foreground">
              分析结果缓存时间：{24} 小时
            </div>
          </div>

          <div className="space-y-2">
            <Label>最大缓存条目</Label>
            <Slider
              value={[1000]}
              max={5000}
              min={100}
              
              onValueChange={([_value]: number[]) => {
                updateConfig({ cacheEnabled: true });
              }}
            />
            <div className="text-sm text-muted-foreground">
              最多缓存 {1000} 个分析结果
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};