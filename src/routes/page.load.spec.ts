import { describe, expect, it, vi } from 'vitest';

vi.mock('$lib/features/api/munchies', () => ({
	getRestaurants: vi.fn().mockRejectedValue(new Error('network down')),
	getFilters: vi.fn().mockResolvedValue([]),
	getPriceRanges: vi.fn().mockResolvedValue([]),
	getOpenStatuses: vi.fn().mockResolvedValue(new Map())
}));

describe('+page.ts load', () => {
	it('returns ok:false instead of throwing when the API is unreachable', async () => {
		const { load } = await import('./+page');
		// @ts-expect-error - the load function ignores its event argument
		const result = await load({});
		expect(result).toEqual({ ok: false });
	});
});
