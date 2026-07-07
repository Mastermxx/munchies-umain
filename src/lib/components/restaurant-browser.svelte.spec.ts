import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import type { Filter, PriceRange, Restaurant } from '$lib/features/domain/types';
import RestaurantBrowser from './restaurant-browser.svelte';

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

const pizzaFilter: Filter = { id: 'pizza-id', name: 'Pizza', image_url: '/images/pizza.png' };
const tacosFilter: Filter = { id: 'tacos-id', name: 'Tacos', image_url: '/images/tacos.png' };
const sushiFilter: Filter = { id: 'sushi-id', name: 'Sushi', image_url: '/images/sushi.png' };
const priceRanges: PriceRange[] = [{ id: 'price-1', range: '$' }];

const pizzaPlace = makeRestaurant({ id: 'pizza-place', filter_ids: ['pizza-id'] });
const tacoPlace = makeRestaurant({ id: 'taco-place', filter_ids: ['tacos-id'] });

function renderBrowser() {
	return render(RestaurantBrowser, {
		restaurants: [pizzaPlace, tacoPlace],
		filters: [pizzaFilter, tacosFilter, sushiFilter],
		priceRanges,
		openStatusByRestaurantId: new Map([
			['pizza-place', true],
			['taco-place', true]
		])
	});
}

describe('RestaurantBrowser filtering', () => {
	it('shows every restaurant when no filter is selected', async () => {
		renderBrowser();

		await expect.element(page.getByTestId('restaurant-card-pizza-place')).toBeInTheDocument();
		await expect.element(page.getByTestId('restaurant-card-taco-place')).toBeInTheDocument();
	});

	it('narrows the list to matches when a category filter chip is selected', async () => {
		renderBrowser();

		await page.getByTestId('filter-chip-category-sidebar-pizza-id').click();

		await expect.element(page.getByTestId('restaurant-card-pizza-place')).toBeInTheDocument();
		await expect.element(page.getByTestId('restaurant-card-taco-place')).not.toBeInTheDocument();
	});

	it('restores every restaurant when the active filter is toggled off again', async () => {
		renderBrowser();

		const chip = page.getByTestId('filter-chip-category-sidebar-pizza-id');
		await chip.click();
		await expect.element(page.getByTestId('restaurant-card-taco-place')).not.toBeInTheDocument();

		await chip.click();

		await expect.element(page.getByTestId('restaurant-card-pizza-place')).toBeInTheDocument();
		await expect.element(page.getByTestId('restaurant-card-taco-place')).toBeInTheDocument();
	});

	it('shows the empty state when the selected filter matches no restaurant', async () => {
		renderBrowser();

		await page.getByTestId('filter-chip-category-sidebar-sushi-id').click();

		await expect.element(page.getByTestId('restaurant-list-empty-state')).toBeInTheDocument();
	});
});
