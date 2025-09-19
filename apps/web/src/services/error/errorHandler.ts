/**
 * 统一错误处理服务
 * 提供用户友好的错误提示和错误日志记录
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: Date;
  additionalData?: Record<string, any>;
}

export class ErrorHandler {
  /**
   * 处理分析相关错误
   */
  static handleAnalysisError(error: any, _context?: ErrorContext): string {
    const errorMessage = error?.message || error?.toString() || '未知错误';
    
    // 网络相关错误
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return '网络连接失败，请检查网络设置后重试';
    }
    
    // 超时错误
    if (errorMessage.includes('timeout') || errorMessage.includes('time out')) {
      return '分析超时，请重试或尝试更简单的主题';
    }
    
    // 存储空间错误
    if (errorMessage.includes('quota') || errorMessage.includes('storage')) {
      return '存储空间不足，请清理浏览器缓存后重试';
    }
    
    // API相关错误
    if (errorMessage.includes('api') || errorMessage.includes('API')) {
      return 'API服务暂时不可用，请稍后重试';
    }
    
    // 权限相关错误
    if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
      return '权限不足，请检查您的访问权限';
    }
    
    // 参数错误
    if (errorMessage.includes('invalid') || errorMessage.includes('参数')) {
      return '输入参数有误，请检查后重试';
    }
    
    // 默认错误消息
    return '分析失败，请重试';
  }

  /**
   * 处理存储相关错误
   */
  static handleStorageError(error: any, _context?: ErrorContext): string {
    const errorMessage = error?.message || error?.toString() || '未知错误';
    
    if (error.name === 'QuotaExceededError' || errorMessage.includes('quota')) {
      return '存储空间不足，请清理浏览器缓存';
    }
    
    if (errorMessage.includes('permission') || errorMessage.includes('denied')) {
      return '没有存储权限，请检查浏览器设置';
    }
    
    if (errorMessage.includes('corrupted') || errorMessage.includes('invalid')) {
      return '数据损坏，正在尝试修复...';
    }
    
    return '保存失败，请重试';
  }

  /**
   * 处理网络相关错误
   */
  static handleNetworkError(error: any, _context?: ErrorContext): string {
    const errorMessage = error?.message || error?.toString() || '未知错误';
    
    if (errorMessage.includes('offline') || !navigator.onLine) {
      return '网络连接已断开，请检查网络连接';
    }
    
    if (errorMessage.includes('timeout')) {
      return '请求超时，请检查网络连接后重试';
    }
    
    if (errorMessage.includes('404')) {
      return '请求的资源不存在';
    }
    
    if (errorMessage.includes('500')) {
      return '服务器内部错误，请稍后重试';
    }
    
    if (errorMessage.includes('403')) {
      return '访问被拒绝，请检查权限';
    }
    
    return '网络错误，请重试';
  }

  /**
   * 记录错误日志
   */
  static logError(error: any, context: ErrorContext = {}): void {
    const errorInfo = {
      message: error?.message || error?.toString() || '未知错误',
      stack: error?.stack,
      name: error?.name,
      context: {
        component: context.component || 'Unknown',
        action: context.action || 'Unknown',
        userId: context.userId,
        timestamp: context.timestamp || new Date(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...context.additionalData
      }
    };

    // 控制台输出
    console.error(`[${errorInfo.context.component}] ${errorInfo.context.action}:`, errorInfo);

    // 可以集成错误报告服务
    // 例如：Sentry, LogRocket, 或自定义错误收集服务
    this.reportError(errorInfo);
  }

  /**
   * 报告错误到外部服务
   */
  private static reportError(errorInfo: any): void {
    // 这里可以集成实际的错误报告服务
    // 例如：
    // - Sentry.captureException(error)
    // - LogRocket.captureException(error)
    // - 发送到自定义API端点
    
    // 暂时只在开发环境下记录
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Report');
      console.log('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  /**
   * 创建用户友好的错误对象
   */
  static createUserFriendlyError(
    originalError: any,
    userMessage: string,
    context?: ErrorContext
  ): Error {
    const error = new Error(userMessage);
    error.name = 'UserFriendlyError';
    (error as any).originalError = originalError;
    (error as any).context = context;
    
    this.logError(originalError, context);
    
    return error;
  }

  /**
   * 处理异步操作错误
   */
  static async handleAsyncError<T>(
    asyncOperation: () => Promise<T>,
    errorHandler: (error: any) => string,
    context?: ErrorContext
  ): Promise<T> {
    try {
      return await asyncOperation();
    } catch (error) {
      const userMessage = errorHandler(error);
      this.logError(error, context);
      throw this.createUserFriendlyError(error, userMessage, context);
    }
  }

  /**
   * 重试机制
   */
  static async retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    context?: ErrorContext
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          this.logError(error, {
            ...context,
            action: `${context?.action || 'operation'}_retry_failed`,
            additionalData: { attempts: maxRetries, finalError: error }
          });
          throw error;
        }
        
        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError;
  }
}

/**
 * 错误边界组件使用的错误处理工具
 */
export const getErrorBoundaryFallback = (error: Error, errorInfo: any) => {
  ErrorHandler.logError(error, {
    component: 'ErrorBoundary',
    action: 'component_error',
    additionalData: { errorInfo }
  });

  return {
    title: '应用出现错误',
    message: '很抱歉，应用遇到了一个错误。我们已经记录了这个问题，请刷新页面重试。',
    canRetry: true
  };
};

export default ErrorHandler;
