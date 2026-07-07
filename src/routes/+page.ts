import {
	getFilters,
	getOpenStatuses,
	getPriceRanges,
	getRestaurants
} from '$lib/features/api/munchies';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	try {
		const [restaurants, filters, priceRanges] = await Promise.all([
			getRestaurants(fetch),
			getFilters(fetch),
			getPriceRanges(fetch)
		]);
		const openStatusByRestaurantId = await getOpenStatuses(
			restaurants.map((r) => r.id),
			fetch
		);

		return { ok: true as const, restaurants, filters, priceRanges, openStatusByRestaurantId };
	} catch (error) {
		console.error('Failed to load restaurant data', error);
		return { ok: false as const };
	}
};
