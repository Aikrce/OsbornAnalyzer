// 简单的工具函数实现
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN');
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}