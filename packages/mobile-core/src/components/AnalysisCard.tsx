import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AnalysisResult} from '@huitu/shared';

interface AnalysisCardProps {
  result: AnalysisResult;
  onPress?: () => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({result, onPress}) => {
  // 获取第一个类别的问题作为示例
  const firstCategory = Object.keys(result.questions)[0];
  const sampleQuestion = result.questions[firstCategory]?.[0] || '暂无问题';
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{result.title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.summary}>{result.summary}</Text>
        <Text style={styles.sampleQuestion}>示例问题: {sampleQuestion}</Text>
        <View style={styles.stats}>
          <Text style={styles.score}>得分: {result.totalScore}/100</Text>
          <Text style={styles.quality}>质量: {result.quality}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  content: {
    flex: 1,
  },
  summary: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  sampleQuestion: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  quality: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default AnalysisCard;
