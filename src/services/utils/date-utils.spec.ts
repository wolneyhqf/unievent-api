import { describe, it, expect } from 'vitest';
import { isFirstDateGreaterThanSecond } from './date-utils';

describe('date-utils: function isFirstDateGreaterThanSecond', () => {
	it('should return true', () => {
		const isGreater = isFirstDateGreaterThanSecond(new Date('2024-01-23'), new Date('2024-01-22'));

		expect(isGreater).eq(true);
	});

	it('should return false', () => {
		const isGreater = isFirstDateGreaterThanSecond(new Date('2024-01-23'), new Date('2024-01-24'));

		expect(isGreater).eq(false);
	});
});
