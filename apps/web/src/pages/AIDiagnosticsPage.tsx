import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
// import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Settings } from 'lucide-react';
import { useAIConfig } from '../hooks/useAIConfig';
import { NetworkDiagnostics } from '../utils/networkDiagnostics';
import { aiDiagnosticTool, DiagnosticResult as AIDiagnosticResult } from '../utils/aiDiagnosticTool';
import { APIKeyValidator } from '../utils/apiKeyValidator';

interface DiagnosticResult {
  configStatus: {
    hasConfig: boolean;
    hasApiKey: boolean;
    apiKeyLength: number;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  networkStatus: {
    canReachAPI: boolean;
    responseTime?: number;
    error?: string;
  };
  localStorageStatus: {
    hasStoredConfig: boolean;
    hasMultiConfig: boolean;
    activeConfigId?: string;
  };
  recommendations: string[];
}

const AIDiagnosticsPage: React.FC = () => {
  const { config, isConfigured, apiConfigs, getEffectiveConfig } = useAIConfig();
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string; response?: any } | null>(null);
  const [aiDiagnosticResults, setAiDiagnosticResults] = useState<AIDiagnosticResult[]>([]);
  const [isRunningAIDiagnostic, setIsRunningAIDiagnostic] = useState(false);
  const [apiKeyValidationResult, setApiKeyValidationResult] = useState<any>(null);
  const [isValidatingApiKey, setIsValidatingApiKey] = useState(false);
  const [networkDiagnostics, setNetworkDiagnostics] = useState<any>(null);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics(null);
    setTestResult(null);

    try {
      console.log('🔍 开始AI服务诊断...');
      
      // 检查配置状态 - 使用getEffectiveConfig获取有效配置
      const effectiveConfig = getEffectiveConfig();
      
      console.log('📋 当前配置状态:', { 
        config: config ? { ...config, apiKey: config.apiKey ? '***' : 'null' } : 'null',
        apiConfigs: apiConfigs.length,
        isConfigured,
        effectiveConfig: effectiveConfig ? { 
          ...effectiveConfig, 
          apiKey: effectiveConfig.apiKey ? '***' : 'null',
          source: effectiveConfig.source
        } : 'null'
      });
      
      const configStatus = {
        hasConfig: !!effectiveConfig,
        hasApiKey: !!(effectiveConfig?.apiKey && effectiveConfig.apiKey.trim().length > 0),
        apiKeyLength: effectiveConfig?.apiKey?.length || 0,
        model: effectiveConfig?.model || 'unknown',
        temperature: effectiveConfig?.temperature || 0,
        maxTokens: effectiveConfig?.maxTokens || 0
      };
      
      console.log('🔍 配置状态检查结果:', configStatus);

      // 检查localStorage状态
      const localStorageStatus = {
        hasStoredConfig: !!localStorage.getItem('huitu-ai-config'),
        hasMultiConfig: !!localStorage.getItem('huitu-multi-api-configs')
      };

      // 测试网络连接
      let networkStatus: {
        canReachAPI: boolean;
        responseTime?: number;
        error?: string;
      } = {
        canReachAPI: false,
        error: '未测试'
      };

      try {
        console.log('🌐 测试网络连接...');
        const startTime = Date.now();
        
        // 获取用户API密钥进行测试 - 使用有效配置
        const userApiKey = effectiveConfig?.apiKey;
        
        if (!userApiKey) {
          networkStatus = {
            canReachAPI: false,
            error: '未找到API密钥，无法测试API连接'
          };
        } else {
          console.log('🔑 使用用户API密钥进行网络测试');
          
          const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userApiKey}`,
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [{ role: 'user', content: 'test' }],
              max_tokens: 10
            })
          });
          
          const responseTime = Date.now() - startTime;
          
          if (response.ok) {
            networkStatus = {
              canReachAPI: true,
              responseTime
            };
          } else if (response.status === 401) {
            networkStatus = {
              canReachAPI: true,
              responseTime,
              error: 'API端点可达，但API密钥无效'
            };
          } else if (response.status === 403) {
            networkStatus = {
              canReachAPI: true,
              responseTime,
              error: 'API端点可达，但API密钥权限不足'
            };
          } else {
            networkStatus = {
              canReachAPI: false,
              responseTime,
              error: `HTTP ${response.status}: ${response.statusText}`
            };
          }
        }
      } catch (error) {
        console.error('网络连接测试失败:', error);
        networkStatus = {
          canReachAPI: false,
          error: error instanceof Error ? error.message : '未知网络错误'
        };
      }

      // 生成建议
      const recommendations: string[] = [];
      
      if (!configStatus.hasConfig) {
        recommendations.push('❌ AI服务未配置，请前往设置页面配置API密钥');
        recommendations.push('💡 点击右上角设置按钮，输入您的DeepSeek API密钥');
      } else if (!configStatus.hasApiKey) {
        recommendations.push('❌ API密钥未设置，请检查配置');
        if (effectiveConfig?.source === 'multi-api') {
          recommendations.push('💡 您使用的是多API配置，请检查活跃配置的API密钥');
        } else {
          recommendations.push('💡 请确保基础配置中的API密钥不为空且格式正确');
        }
      } else if (configStatus.apiKeyLength < 10) {
        recommendations.push('⚠️ API密钥长度异常，请检查密钥是否正确');
        recommendations.push('💡 DeepSeek API密钥通常以"sk-"开头，长度约35-50字符');
      } else {
        recommendations.push('✅ API密钥已设置');
        if (effectiveConfig?.source === 'multi-api') {
          const activeApiConfig = apiConfigs.find(c => c.isActive);
          recommendations.push(`💡 当前使用多API配置: ${activeApiConfig?.name || '未知'}`);
        } else {
          recommendations.push('💡 当前使用基础配置');
        }
      }
      
      if (!networkStatus.canReachAPI) {
        recommendations.push('❌ 无法连接到DeepSeek API，请检查网络连接');
        if (networkStatus.error) {
          recommendations.push(`   错误详情: ${networkStatus.error}`);
        }
      } else {
        recommendations.push('✅ 网络连接正常');
        if (networkStatus.responseTime) {
          recommendations.push(`   响应时间: ${networkStatus.responseTime}ms`);
        }
      }
      
      if (!localStorageStatus.hasStoredConfig && !localStorageStatus.hasMultiConfig) {
        recommendations.push('⚠️ 未找到存储的AI配置，请重新配置');
      }
      
      if (configStatus.hasApiKey && networkStatus.canReachAPI) {
        recommendations.push('✅ 配置和网络都正常，如果仍有问题，可能是API密钥无效或配额不足');
      }

      const result: DiagnosticResult = {
        configStatus,
        networkStatus,
        localStorageStatus,
        recommendations
      };

      setDiagnostics(result);
      console.log('✅ AI服务诊断完成:', result);
    } catch (error) {
      console.error('诊断失败:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const runNetworkDiagnostics = async () => {
    setIsRunning(true);
    setNetworkDiagnostics(null);

    try {
      console.log('🌐 开始网络诊断...');
      const networkResult = await NetworkDiagnostics.runFullDiagnostics();
      setNetworkDiagnostics(networkResult);
      console.log('✅ 网络诊断完成:', networkResult);
    } catch (error) {
      console.error('网络诊断失败:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const testAPICall = async () => {
    setIsRunning(true);
    setTestResult(null);

    try {
      console.log('🧪 测试实际API调用...');
      
      const aiServiceModule = await import('../services/ai/aiService');
      const aiService = aiServiceModule.default;
      
      if (!aiService.isConfigured()) {
        setTestResult({ success: false, error: 'AI服务未配置' });
        return;
      }
      
      const testRequest = {
        topic: '测试主题',
        context: '这是一个测试请求',
        previousResults: []
      };
      
      const response = await aiService.performEnhancedAnalysis(testRequest);
      setTestResult({ success: true, response });
    } catch (error) {
      console.error('API调用测试失败:', error);
      setTestResult({ 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      });
    } finally {
      setIsRunning(false);
    }
  };

  const runAIDiagnostic = async () => {
    setIsRunningAIDiagnostic(true);
    setAiDiagnosticResults([]);
    
    try {
      const results = await aiDiagnosticTool.runFullDiagnostic();
      setAiDiagnosticResults(results);
    } catch (error) {
      console.error('AI诊断失败:', error);
    } finally {
      setIsRunningAIDiagnostic(false);
    }
  };

  const validateCurrentApiKey = async () => {
    if (!config?.apiKey) {
      alert('请先配置API密钥');
      return;
    }

    setIsValidatingApiKey(true);
    setApiKeyValidationResult(null);
    
    try {
      console.log('🔍 开始验证当前API密钥...');
      
      // 先同步配置到AI服务
      const { default: aiService } = await import('../services/ai/aiService');
      aiService.configure(config);
      console.log('🔄 已同步配置到AI服务');
      
      const result = await APIKeyValidator.testAPIKey(config.apiKey, 'deepseek');
      setApiKeyValidationResult(result);
      
      if (result.isValid) {
        console.log('✅ API密钥验证成功');
        console.log('✅ AI服务配置已同步');
      } else {
        console.log('❌ API密钥验证失败:', result.error);
      }
    } catch (error) {
      console.error('API密钥验证异常:', error);
      setApiKeyValidationResult({
        isValid: false,
        error: `验证异常: ${(error as Error).message}`,
        keyLength: config.apiKey.length,
        keyPrefix: config.apiKey.substring(0, 5) + '...',
        provider: 'deepseek'
      });
    } finally {
      setIsValidatingApiKey(false);
    }
  };

  // 强制同步配置到AI服务
  const forceSyncConfig = async () => {
    try {
      console.log('🔄 强制同步配置到AI服务...');
      
      const effectiveConfig = getEffectiveConfig();
      
      if (effectiveConfig && effectiveConfig.apiKey) {
        console.log('📋 使用有效配置:', { 
          ...effectiveConfig, 
          apiKey: effectiveConfig.apiKey ? '***' : 'null',
          source: effectiveConfig.source
        });
        
        // 同步到AI服务
        const { default: aiService } = await import('../services/ai/aiService');
        aiService.configure({
          apiKey: effectiveConfig.apiKey,
          model: effectiveConfig.model,
          temperature: effectiveConfig.temperature,
          maxTokens: effectiveConfig.maxTokens
        });
        
        console.log('✅ 配置已强制同步到AI服务');
        console.log('🔍 AI服务配置状态:', aiService.isConfigured());
        
        alert(`配置已强制同步到AI服务 (${effectiveConfig.source === 'multi-api' ? '多API配置' : '基础配置'})`);
      } else {
        console.log('⚠️ 未找到有效的配置');
        alert('未找到有效的API配置');
      }
    } catch (error) {
      console.error('❌ 强制同步配置失败:', error);
      alert('同步配置失败: ' + (error as Error).message);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">AI服务诊断</h1>
        <p className="text-muted-foreground">
          检查AI服务配置、网络连接和API调用状态
        </p>
      </div>

      <div className="grid gap-6">
        {/* 当前配置状态 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              当前配置状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">配置状态:</span>
                <Badge variant={isConfigured ? "default" : "destructive"}>
                  {isConfigured ? "已配置" : "未配置"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">API密钥:</span>
                <Badge variant={config?.apiKey ? "default" : "destructive"}>
                  {config?.apiKey ? `已设置 (${config.apiKey.length}字符)` : "未设置"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">模型:</span>
                <Badge variant="outline">{config?.model || "未知"}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 诊断结果 */}
        {diagnostics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                诊断结果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 配置状态 */}
              <div>
                <h4 className="font-medium mb-2">配置状态</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    {diagnostics.configStatus.hasConfig ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>配置存在</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {diagnostics.configStatus.hasApiKey ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>API密钥 ({diagnostics.configStatus.apiKeyLength}字符)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{diagnostics.configStatus.model}</Badge>
                  </div>
                </div>
              </div>

              {/* 网络状态 */}
              <div>
                <h4 className="font-medium mb-2">网络状态</h4>
                <div className="flex items-center gap-2">
                  {diagnostics.networkStatus.canReachAPI ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span>API可达: {diagnostics.networkStatus.canReachAPI ? "是" : "否"}</span>
                  {diagnostics.networkStatus.responseTime && (
                    <Badge variant="outline">{diagnostics.networkStatus.responseTime}ms</Badge>
                  )}
                </div>
                {diagnostics.networkStatus.error && (
                  <p className="text-sm text-muted-foreground mt-1">
                    错误: {diagnostics.networkStatus.error}
                  </p>
                )}
              </div>

              {/* 存储状态 */}
              <div>
                <h4 className="font-medium mb-2">存储状态</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    {diagnostics.localStorageStatus.hasStoredConfig ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>基础配置</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {diagnostics.localStorageStatus.hasMultiConfig ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>多API配置</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 建议 */}
        {diagnostics && diagnostics.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {diagnostics.recommendations.map((rec, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    rec.startsWith('✅') ? 'bg-green-50 border-green-200 text-green-800' : 
                    rec.startsWith('❌') ? 'bg-red-50 border-red-200 text-red-800' : 
                    'bg-blue-50 border-blue-200 text-blue-800'
                  }`}>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API调用测试结果 */}
        {testResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {testResult.success ? 
                  <CheckCircle className="h-5 w-5 text-green-500" /> : 
                  <XCircle className="h-5 w-5 text-red-500" />
                }
                API调用测试结果
              </CardTitle>
            </CardHeader>
            <CardContent>
              {testResult.success ? (
                <div className="p-3 rounded-lg border bg-green-50 border-green-200 text-green-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <p className="text-sm">API调用成功！AI服务工作正常。</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg border bg-red-50 border-red-200 text-red-800">
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2" />
                    <p className="text-sm">API调用失败: {testResult.error}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 网络诊断结果 */}
        {networkDiagnostics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                网络诊断结果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">诊断摘要</h4>
                <p className="text-sm text-gray-600">{networkDiagnostics.summary}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">测试结果</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {networkDiagnostics.basicConnectivity.success ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>基本连接</span>
                    {networkDiagnostics.basicConnectivity.responseTime && (
                      <Badge variant="outline">{networkDiagnostics.basicConnectivity.responseTime}ms</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {networkDiagnostics.dnsResolution.success ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>DNS解析</span>
                    {networkDiagnostics.dnsResolution.responseTime && (
                      <Badge variant="outline">{networkDiagnostics.dnsResolution.responseTime}ms</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {networkDiagnostics.deepSeekAPI.success ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>API连接</span>
                    {networkDiagnostics.deepSeekAPI.responseTime && (
                      <Badge variant="outline">{networkDiagnostics.deepSeekAPI.responseTime}ms</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">建议</h4>
                <div className="space-y-2">
                  {networkDiagnostics.recommendations.map((rec: string, index: number) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      rec.startsWith('✅') ? 'bg-green-50 border-green-200 text-green-800' : 
                      rec.startsWith('❌') ? 'bg-red-50 border-red-200 text-red-800' : 
                      'bg-blue-50 border-blue-200 text-blue-800'
                    }`}>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-4">
          <Button 
            onClick={runDiagnostics} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            重新诊断
          </Button>
          
          <Button 
            onClick={runNetworkDiagnostics} 
            disabled={isRunning}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            网络诊断
          </Button>
          
          <Button 
            onClick={testAPICall} 
            disabled={isRunning || !isConfigured}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            测试API调用
          </Button>
          
          <Button 
            onClick={runAIDiagnostic} 
            disabled={isRunningAIDiagnostic}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className={`h-4 w-4 ${isRunningAIDiagnostic ? 'animate-spin' : ''}`} />
            {isRunningAIDiagnostic ? 'AI诊断中...' : '完整AI诊断'}
          </Button>
          
          <Button 
            onClick={validateCurrentApiKey} 
            disabled={isValidatingApiKey || !config?.apiKey}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <RefreshCw className={`h-4 w-4 ${isValidatingApiKey ? 'animate-spin' : ''}`} />
            {isValidatingApiKey ? '验证中...' : '验证API密钥'}
          </Button>
          
          <Button 
            onClick={async () => {
              if (!config?.apiKey) {
                alert('请先配置API密钥');
                return;
              }
              try {
                const { default: aiService } = await import('../services/ai/aiService');
                aiService.configure(config);
                alert('配置已同步到AI服务');
                console.log('✅ 配置已同步到AI服务');
              } catch (error) {
                console.error('同步配置失败:', error);
                alert('同步配置失败');
              }
            }}
            disabled={!config?.apiKey}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Settings className="h-4 w-4" />
            同步配置到AI服务
          </Button>
          
          <Button 
            onClick={forceSyncConfig}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <RefreshCw className="h-4 w-4" />
            强制同步配置
          </Button>
        </div>

        {/* API密钥验证结果 */}
        {apiKeyValidationResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {apiKeyValidationResult.isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                API密钥验证结果
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">验证状态:</span>
                    <Badge variant={apiKeyValidationResult.isValid ? "default" : "destructive"}>
                      {apiKeyValidationResult.isValid ? "有效" : "无效"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">密钥长度:</span>
                    <Badge variant="outline">{apiKeyValidationResult.keyLength}字符</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">密钥前缀:</span>
                    <Badge variant="outline">{apiKeyValidationResult.keyPrefix}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">提供商:</span>
                    <Badge variant="outline">{apiKeyValidationResult.provider}</Badge>
                  </div>
                </div>
                
                {apiKeyValidationResult.testResult && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">测试详情</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">状态码:</span> {apiKeyValidationResult.testResult.status}
                      </div>
                      <div>
                        <span className="font-medium">响应时间:</span> {apiKeyValidationResult.testResult.responseTime}ms
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">消息:</span> {apiKeyValidationResult.testResult.message}
                      </div>
                    </div>
                  </div>
                )}
                
                {apiKeyValidationResult.error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">错误信息</h4>
                    <p className="text-red-700">{apiKeyValidationResult.error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIDiagnosticsPage;
