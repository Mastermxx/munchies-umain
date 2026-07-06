import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import type { Restaurant } from '$lib/features/domain/types';
import RestaurantList from './restaurant-list.svelte';

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

describe('RestaurantList', () => {
	it('renders a card per restaurant when there are matches', async () => {
		render(RestaurantList, {
			restaurants: [makeRestaurant({ id: 'a' }), makeRestaurant({ id: 'b' })],
			openStatusByRestaurantId: new Map([
				['a', true],
				['b', false]
			])
		});

		await expect.element(page.getByTestId('restaurant-list')).toBeInTheDocument();
		await expect.element(page.getByTestId('restaurant-card-a')).toBeInTheDocument();
		await expect.element(page.getByTestId('restaurant-card-b')).toBeInTheDocument();
	});

	it('renders the empty state when no restaurants match the current filters', async () => {
		render(RestaurantList, { restaurants: [], openStatusByRestaurantId: new Map() });

		await expect.element(page.getByTestId('restaurant-list-empty-state')).toBeInTheDocument();
	});
});
