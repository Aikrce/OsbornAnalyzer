import { renderHook } from '@testing-library/react';
import { useAnalysis } from '../hooks/useAnalysis';
import { expect, describe, it } from 'vitest';

describe('useAnalysis', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useAnalysis());
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});