import {
	getFilters,
	getOpenStatuses,
	getPriceRanges,
	getRestaurants
} from '$lib/features/api/munchies';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const [restaurants, filters, priceRanges] = await Promise.all([
			getRestaurants(),
			getFilters(),
			getPriceRanges()
		]);
		const openStatusByRestaurantId = await getOpenStatuses(restaurants.map((r) => r.id));

		return { ok: true as const, restaurants, filters, priceRanges, openStatusByRestaurantId };
	} catch (error) {
		console.error('Failed to load restaurant data', error);
		return { ok: false as const };
	}
};
