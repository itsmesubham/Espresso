import { apiClient } from '../src/api/client';

describe('API client', () => {
  it('returns stats with history', async () => {
    const result = await apiClient.fetchStats();
    expect(result.current).toBeDefined();
    expect(Array.isArray(result.history)).toBe(true);
    expect(result.history.length).toBeGreaterThan(0);
  });
});
