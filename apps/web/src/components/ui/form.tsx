import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: (value: any) => string | null;
}

export interface FormProps {
  title?: string;
  description?: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  title,
  description,
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitText = '提交',
  cancelText = '取消',
  isLoading = false,
  className = ''
}) => {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // 更新表单数据
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // 清除该字段的错误
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = formData[field.name];
      
      // 必填验证
      if (field.required && (!value || value.toString().trim() === '')) {
        newErrors[field.name] = `${field.label}是必填项`;
        return;
      }
      
      // 自定义验证
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // 渲染字段
  const renderField = (field: FormField) => {
    const hasError = !!errors[field.name];
    
    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={hasError ? 'border-red-500' : ''}
            />
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={formData[field.name] || ''}
              onValueChange={(value) => handleFieldChange(field.name, value)}
            >
              <SelectTrigger className={hasError ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
        
      default:
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={hasError ? 'border-red-500' : ''}
            />
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <p className="text-gray-600">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(renderField)}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '提交中...' : submitText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { Form };
