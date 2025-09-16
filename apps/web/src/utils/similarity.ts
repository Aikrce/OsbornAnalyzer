// 相似度计算工具

export const similarity = {
  // 计算文本相似度（Jaccard相似度）
  textSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/[\s\-_]+/).filter(word => word.length > 1));
    const words2 = new Set(text2.toLowerCase().split(/[\s\-_]+/).filter(word => word.length > 1));
    
    if (words1.size === 0 || words2.size === 0) return 0;
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  },

  // 计算余弦相似度
  cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) return 0;
    
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * (vec2[i] || 0), 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    
    return dotProduct / (magnitude1 * magnitude2);
  },

  // 计算标签相似度
  tagSimilarity(tags1: string[], tags2: string[]): number {
    if (tags1.length === 0 || tags2.length === 0) return 0;
    
    const set1 = new Set(tags1.map(tag => tag.toLowerCase()));
    const set2 = new Set(tags2.map(tag => tag.toLowerCase()));
    
    const intersection = new Set([...set1].filter(tag => set2.has(tag)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  },

  // 综合相似度计算
  comprehensiveSimilarity(
    text1: string, 
    text2: string, 
    tags1: string[] = [], 
    tags2: string[] = [],
    weights = { text: 0.6, tags: 0.4 }
  ): number {
    const textSim = this.textSimilarity(text1, text2);
    const tagSim = this.tagSimilarity(tags1, tags2);
    
    return textSim * weights.text + tagSim * weights.tags;
  },

  // 找到最相似的项
  findMostSimilar<T>(
    target: string,
    items: T[],
    getText: (item: T) => string,
    getTags: (item: T) => string[] = () => [],
    threshold = 0.3
  ): { item: T; similarity: number }[] {
    return items
      .map(item => ({
        item,
        similarity: this.comprehensiveSimilarity(
          target,
          getText(item),
          [],
          getTags(item)
        )
      }))
      .filter(result => result.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity);
  }
};