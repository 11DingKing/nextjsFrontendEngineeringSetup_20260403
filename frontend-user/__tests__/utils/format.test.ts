import { formatDate, formatNumber, truncateText, formatCurrency } from '@/utils/format';

describe('format utilities', () => {
  describe('formatDate', () => {
    it('should format date with default format', () => {
      const result = formatDate('2025-01-15');
      expect(result).toBe('2025-01-15');
    });

    it('should format date with custom format', () => {
      const result = formatDate('2025-01-15', 'YYYY/MM/DD');
      expect(result).toBe('2025/01/15');
    });
  });

  describe('formatNumber', () => {
    it('should format number with thousand separators', () => {
      const result = formatNumber(1234567);
      expect(result).toBe('1,234,567');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency in CNY', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1,234.56');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const result = truncateText('Hello World, this is a long text', 10);
      expect(result).toBe('Hello Worl...');
    });

    it('should not truncate short text', () => {
      const result = truncateText('Short', 10);
      expect(result).toBe('Short');
    });
  });
});
