import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsServer } from './isServer';

describe('useIsServer', () => {
  const originalWindow = global.window;
  
  afterEach(() => {
    // Restore the original window after each test
    global.window = originalWindow;
  });
  
  it('should return true when window is undefined', () => {
    // Mock window as undefined
    vi.stubGlobal('window', undefined);
    
    const result = useIsServer();
    expect(result).toBe(true);
  });
  
  it('should return false when window is defined', () => {
    // Ensure window is defined
    if (typeof window === 'undefined') {
      vi.stubGlobal('window', { location: {} });
    }
    
    const result = useIsServer();
    expect(result).toBe(false);
  });
});
