import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface TopicInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const TopicInput: React.FC<TopicInputProps> = ({
  value,
  onChangeText,
  placeholder = '请输入分析主题...',
  multiline = true,
  numberOfLines = 3,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>分析主题</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#374151',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default TopicInput;
