'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Progress } from '../ui/progress'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw,
  FileText,
  Settings,
  Package,
  Code
} from 'lucide-react'

interface DiagnosisResult {
  id: string
  title: string
  status: 'success' | 'error' | 'warning'
  message: string
  details?: string
  fixSuggestion?: string
}

export default function ProjectDiagnosisTool() {
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<DiagnosisResult[]>([])
  const [overallStatus, setOverallStatus] = useState<'healthy' | 'warning' | 'error'>('healthy')

  const diagnoseProject = async () => {
    setIsDiagnosing(true)
    setProgress(0)
    setResults([])

    // 模拟诊断过程
    const diagnosisSteps: DiagnosisResult[] = [
      {
        id: 'package-json',
        title: 'Package.json 检查',
        status: 'success',
        message: '依赖项配置完整',
        details: '所有必需的依赖项都已正确配置'
      },
      {
        id: 'vite-config',
        title: 'Vite 配置检查',
        status: 'warning',
        message: '路径别名配置需要调整',
        details: '当前配置路径可能存在解析问题',
        fixSuggestion: '检查 vite.config.ts 中的路径别名配置'
      },
      {
        id: 'typescript-config',
        title: 'TypeScript 配置检查',
        status: 'error',
        message: 'tsconfig.json 路径映射问题',
        details: '路径映射配置与项目结构不匹配',
        fixSuggestion: '更新 tsconfig.json 中的 paths 配置以匹配项目结构'
      },
      {
        id: 'tailwind-config',
        title: 'Tailwind CSS 配置检查',
        status: 'success',
        message: 'Tailwind 配置正常',
        details: '配置文件内容完整，类名引用正确'
      },
      {
        id: 'file-structure',
        title: '项目文件结构检查',
        status: 'warning',
        message: '文件结构存在潜在问题',
        details: '配置文件位置与常规项目结构不一致',
        fixSuggestion: '考虑将配置文件移动到标准位置或更新引用路径'
      }
    ]

    for (let i = 0; i < diagnosisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setProgress(((i + 1) / diagnosisSteps.length) * 100)
      setResults(prev => [...prev, diagnosisSteps[i]])
    }

    // 确定整体状态
    const hasError = results.some(r => r.status === 'error')
    const hasWarning = results.some(r => r.status === 'warning')
    
    if (hasError) {
      setOverallStatus('error')
    } else if (hasWarning) {
      setOverallStatus('warning')
    } else {
      setOverallStatus('healthy')
    }

    setIsDiagnosing(false)
  }

  const getStatusIcon = (status: DiagnosisResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: DiagnosisResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="bg-green-100 text-green-800">正常</Badge>
      case 'error':
        return <Badge variant="outline" className="bg-red-100 text-red-800">错误</Badge>
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">警告</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-8 w-8" />
                <div>
                  <CardTitle className="text-2xl">React 项目诊断工具</CardTitle>
                  <CardDescription className="text-blue-100">
                    检测和修复项目配置问题
                  </CardDescription>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={
                  overallStatus === 'healthy' ? 'bg-green-500' :
                  overallStatus === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }
              >
                {overallStatus === 'healthy' ? '健康' :
                 overallStatus === 'warning' ? '警告' : '错误'}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* 诊断控制区域 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">项目健康检查</h3>
                  <p className="text-sm text-gray-600">检测配置问题和依赖关系</p>
                </div>
              </div>
              
              <Button 
                onClick={diagnoseProject} 
                disabled={isDiagnosing}
                className="flex items-center space-x-2"
              >
                {isDiagnosing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span>{isDiagnosing ? '诊断中...' : '开始诊断'}</span>
              </Button>
            </div>

            {/* 进度条 */}
            {isDiagnosing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>诊断进度</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* 诊断结果 */}
            {results.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">诊断结果</h3>
                
                {results.map((result, index) => (
                  <Alert key={result.id} variant={result.status === 'error' ? 'destructive' : 'default'}>
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <AlertTitle className="flex items-center space-x-2">
                          <span>{result.title}</span>
                          {getStatusBadge(result.status)}
                        </AlertTitle>
                        <AlertDescription className="mt-2 space-y-2">
                          <p className="text-sm">{result.message}</p>
                          {result.details && (
                            <p className="text-xs text-gray-600">{result.details}</p>
                          )}
                          {result.fixSuggestion && (
                            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                              <p className="text-xs font-medium text-blue-800">修复建议:</p>
                              <p className="text-xs text-blue-700">{result.fixSuggestion}</p>
                            </div>
                          )}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            )}

            {/* 修复建议汇总 */}
            {results.some(r => r.fixSuggestion) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">修复建议汇总</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {results
                      .filter(r => r.fixSuggestion)
                      .map((result, index) => (
                        <li key={result.id} className="flex items-start space-x-2">
                          <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{result.fixSuggestion}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}