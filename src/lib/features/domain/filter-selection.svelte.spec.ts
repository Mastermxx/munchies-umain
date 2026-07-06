import { describe, expect, it } from 'vitest';
import { FilterSelection } from './filter-selection.svelte';

describe('FilterSelection', () => {
	it('starts with nothing selected in any dimension', () => {
		const selection = new FilterSelection();

		expect(selection.isSelected('category', 'pizza-id')).toBe(false);
		expect(selection.isSelected('deliveryTime', 'under-30')).toBe(false);
		expect(selection.isSelected('priceRange', 'price-1')).toBe(false);
	});

	it('toggling an id on marks it selected', () => {
		const selection = new FilterSelection();

		selection.toggle('category', 'pizza-id');

		expect(selection.isSelected('category', 'pizza-id')).toBe(true);
		expect(selection.categoryIds.has('pizza-id')).toBe(true);
	});

	it('toggling a selected id off removes it', () => {
		const selection = new FilterSelection();

		selection.toggle('category', 'pizza-id');
		selection.toggle('category', 'pizza-id');

		expect(selection.isSelected('category', 'pizza-id')).toBe(false);
		expect(selection.categoryIds.size).toBe(0);
	});

	it('keeps selections in different dimensions independent', () => {
		const selection = new FilterSelection();

		selection.toggle('category', 'pizza-id');
		selection.toggle('deliveryTime', 'under-30');
		selection.toggle('priceRange', 'price-1');

		expect(selection.categoryIds.has('pizza-id')).toBe(true);
		expect(selection.deliveryTimeBucketIds.has('under-30')).toBe(true);
		expect(selection.priceRangeIds.has('price-1')).toBe(true);
		expect(selection.categoryIds.size).toBe(1);
		expect(selection.deliveryTimeBucketIds.size).toBe(1);
		expect(selection.priceRangeIds.size).toBe(1);
	});

	it('allows multiple ids selected at once within the same dimension', () => {
		const selection = new FilterSelection();

		selection.toggle('category', 'pizza-id');
		selection.toggle('category', 'tacos-id');

		expect(selection.isSelected('category', 'pizza-id')).toBe(true);
		expect(selection.isSelected('category', 'tacos-id')).toBe(true);
		expect(selection.categoryIds.size).toBe(2);
	});
});
