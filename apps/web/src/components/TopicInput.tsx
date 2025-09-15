import React from 'react';
import { Input } from './ui/input';

interface TopicInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const TopicInput: React.FC<TopicInputProps> = ({ value, onChangeText, placeholder }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChangeText(e.target.value)}
      placeholder={placeholder}
      className="w-full"
    />
  );
};

export { TopicInput };
