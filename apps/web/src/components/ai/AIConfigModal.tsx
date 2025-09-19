import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import aiService from '../../services/ai/aiService';
import { AIConfig } from '../../hooks/useAIConfig';

interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AIConfig) => void;
}

const AIConfigModal: React.FC<AIConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [config, setConfig] = useState<AIConfig>({
    apiKey: '',
    model: 'deepseek-chat',
    temperature: 0.7,
    maxTokens: 2000,
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const currentConfig = aiService.getConfig();
      if (currentConfig) {
        setConfig(currentConfig);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setIsValid(config.apiKey.trim().length > 0);
  }, [config.apiKey]);

  const handleSave = () => {
    if (isValid) {
      onSave(config);
      onClose();
    }
  };

  const handleTestConnection = async () => {
    if (!isValid) return;

    try {
      aiService.configure(config);
      // 使用更友好的通知方式替代alert
      console.log('AI服务配置成功！');
      // TODO: 集成通知系统
    } catch (error) {
      console.error('AI服务配置失败:', error);
      // TODO: 集成错误通知系统
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI服务配置</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API密钥</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="请输入DeepSeek API密钥"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              您可以在 <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">DeepSeek平台</a> 获取API密钥
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">模型</Label>
            <Select value={config.model} onValueChange={(value: string) => setConfig({ ...config, model: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">创造性 (Temperature)</Label>
            <Input
              id="temperature"
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={config.temperature}
              onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              值越高，回答越有创造性；值越低，回答越保守
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTokens">最大令牌数</Label>
            <Input
              id="maxTokens"
              type="number"
              min="100"
              max="4000"
              step="100"
              value={config.maxTokens}
              onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              控制回答的最大长度
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleTestConnection} disabled={!isValid}>
            测试连接
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!isValid}>
              保存配置
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIConfigModal;
