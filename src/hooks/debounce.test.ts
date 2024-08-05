import { renderHook } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { useDebouncedFunction } from './debounce';

describe('useDebouncedFunction', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should debounce function', () => {
    const myMethod = vi.fn(() => 0);
    const { result } = renderHook(() => useDebouncedFunction(myMethod, 300));
    result.current();
    result.current();
    expect(myMethod).toHaveBeenCalledTimes(0);
    vi.runAllTimers();
    expect(myMethod).toHaveBeenCalledTimes(1);
  });

  it('should support leading debounce', () => {
    const myMethod = vi.fn(() => 0);
    const { result } = renderHook(() => useDebouncedFunction(myMethod, 300, true));
    result.current();
    result.current();
    expect(myMethod).toHaveBeenCalledTimes(1);
    vi.runAllTimers();
    expect(myMethod).toHaveBeenCalledTimes(1);
  });
});
