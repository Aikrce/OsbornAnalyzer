import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {AnalysisResult} from '@osborn/shared';
import AnalysisCard from './AnalysisCard';

interface ResultListProps {
  results: AnalysisResult[];
  onItemPress?: (result: AnalysisResult) => void;
}

const ResultList: React.FC<ResultListProps> = ({results, onItemPress}) => {
  const renderItem = ({item}: {item: AnalysisResult}) => (
    <AnalysisCard
      result={item}
      onPress={() => onItemPress?.(item)}
    />
  );

  return (
    <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});

export default ResultList;
