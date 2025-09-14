import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAnalysis } from '../hooks/useAnalysis';

describe('useAnalysis Hook', () => {
  it('should initialize with empty results', () => {
    const { result } = renderHook(() => useAnalysis());
    
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
