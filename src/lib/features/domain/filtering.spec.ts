import { describe, expect, it } from 'vitest';
import { filterRestaurants, sortByOpenStatus, type FilterSelectionState } from './filtering';
import type { Restaurant } from './types';

function makeRestaurant(overrides: Partial<Restaurant>): Restaurant {
	return {
		id: 'r1',
		name: 'Test Restaurant',
		rating: 4,
		filter_ids: [],
		image_url: '/images/test.png',
		delivery_time_minutes: 20,
		price_range_id: 'price-1',
		...overrides
	};
}

function emptySelection(): FilterSelectionState {
	return { categoryIds: new Set(), deliveryTimeBucketIds: new Set(), priceRangeIds: new Set() };
}

describe('filterRestaurants', () => {
	const pizza = makeRestaurant({ id: 'pizza', filter_ids: ['pizza-id'] });
	const tacos = makeRestaurant({ id: 'tacos', filter_ids: ['tacos-id'] });
	const burger = makeRestaurant({
		id: 'burger',
		filter_ids: ['burger-id'],
		delivery_time_minutes: 45,
		price_range_id: 'price-2'
	});

	const all = [pizza, tacos, burger];

	it('returns every restaurant when no filters are selected', () => {
		expect(filterRestaurants(all, emptySelection())).toEqual(all);
	});

	it('matches any restaurant satisfying at least one selected filter within a dimension (OR)', () => {
		const selection = emptySelection();
		selection.categoryIds = new Set(['pizza-id', 'tacos-id']);
		expect(filterRestaurants(all, selection)).toEqual([pizza, tacos]);
	});

	it('requires every dimension with an active selection to match (AND across dimensions)', () => {
		const selection = emptySelection();
		selection.categoryIds = new Set(['burger-id']);
		selection.priceRangeIds = new Set(['price-2']);
		expect(filterRestaurants(all, selection)).toEqual([burger]);
	});

	it('excludes a restaurant that matches one dimension but not another', () => {
		const selection = emptySelection();
		selection.categoryIds = new Set(['burger-id']);
		selection.priceRangeIds = new Set(['price-1']);
		expect(filterRestaurants(all, selection)).toEqual([]);
	});

	it('buckets delivery time into labeled ranges', () => {
		const selection = emptySelection();
		selection.deliveryTimeBucketIds = new Set(['under-30']);
		expect(filterRestaurants(all, selection)).toEqual([pizza, tacos]);
	});

	it('returns no matches when a combination satisfies nothing', () => {
		const selection = emptySelection();
		selection.categoryIds = new Set(['pizza-id']);
		selection.priceRangeIds = new Set(['price-2']);
		expect(filterRestaurants(all, selection)).toEqual([]);
	});
});

describe('sortByOpenStatus', () => {
	it('stably surfaces open restaurants before closed ones', () => {
		const a = makeRestaurant({ id: 'a' });
		const b = makeRestaurant({ id: 'b' });
		const c = makeRestaurant({ id: 'c' });
		const openStatus = new Map([
			['a', false],
			['b', true],
			['c', false]
		]);
		expect(sortByOpenStatus([a, b, c], openStatus).map((r) => r.id)).toEqual(['b', 'a', 'c']);
	});

	it('treats a restaurant missing from the open-status map as closed', () => {
		const a = makeRestaurant({ id: 'a' });
		const b = makeRestaurant({ id: 'b' });
		expect(sortByOpenStatus([a, b], new Map([['b', true]])).map((r) => r.id)).toEqual(['b', 'a']);
	});
});
