import {
	getFilters,
	getOpenStatuses,
	getPriceRanges,
	getRestaurants
} from '$lib/features/api/munchies';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	const [restaurants, filters, priceRanges] = await Promise.all([
		getRestaurants(),
		getFilters(),
		getPriceRanges()
	]);
	const openStatusByRestaurantId = await getOpenStatuses(restaurants.map((r) => r.id));

	return { restaurants, filters, priceRanges, openStatusByRestaurantId };
};
