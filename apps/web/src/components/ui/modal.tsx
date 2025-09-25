import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { IconX } from '@tabler/icons-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className = ''
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden ${className}`}>
        {(title || showCloseButton) && (
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              {title && <CardTitle className="text-xl font-semibold">{title}</CardTitle>}
              {description && <p className="text-gray-600 mt-1">{description}</p>}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <IconX size={16} />
              </Button>
            )}
          </CardHeader>
        )}
        
        <CardContent className="overflow-y-auto">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export { Modal };
