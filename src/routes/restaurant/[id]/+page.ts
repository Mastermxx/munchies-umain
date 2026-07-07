import { error } from '@sveltejs/kit';
import {
	getFilters,
	getOpenStatus,
	getRestaurant,
	getRestaurants
} from '$lib/features/api/munchies';
import { buildRestaurantDescription } from '$lib/features/domain/restaurant-description';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const restaurants = await getRestaurants(fetch);
	return restaurants.map((restaurant) => ({ id: restaurant.id }));
};

export const load: PageLoad = async ({ params, fetch }) => {
	const [restaurant, filters] = await Promise.all([
		getRestaurant(params.id, fetch),
		getFilters(fetch)
	]);

	if (!restaurant) {
		error(404, 'Restaurant not found');
	}

	const cuisineNames = filters
		.filter((filter) => restaurant.filter_ids.includes(filter.id))
		.map((filter) => filter.name);

	const isOpen = await getOpenStatus(restaurant.id, fetch)
		.then((status) => status.is_open)
		.catch(() => false);

	return {
		restaurant,
		isOpen,
		cuisineNames,
		description: buildRestaurantDescription(restaurant, cuisineNames)
	};
};
