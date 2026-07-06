import { getDeliveryTimeBucketId } from './delivery-time';
import type { Restaurant } from './types';

export interface FilterSelectionState {
	categoryIds: ReadonlySet<string>;
	deliveryTimeBucketIds: ReadonlySet<string>;
	priceRangeIds: ReadonlySet<string>;
}

function matchesCategory(restaurant: Restaurant, categoryIds: ReadonlySet<string>): boolean {
	if (categoryIds.size === 0) return true;
	return restaurant.filter_ids.some((id) => categoryIds.has(id));
}

function matchesDeliveryTime(
	restaurant: Restaurant,
	deliveryTimeBucketIds: ReadonlySet<string>
): boolean {
	if (deliveryTimeBucketIds.size === 0) return true;
	const bucketId = getDeliveryTimeBucketId(restaurant.delivery_time_minutes);
	return bucketId !== undefined && deliveryTimeBucketIds.has(bucketId);
}

function matchesPriceRange(restaurant: Restaurant, priceRangeIds: ReadonlySet<string>): boolean {
	if (priceRangeIds.size === 0) return true;
	return priceRangeIds.has(restaurant.price_range_id);
}

/**
 * OR within a dimension (category/delivery-time/price-range), AND across
 * dimensions. An empty selection in a dimension imposes no constraint.
 */
export function filterRestaurants(
	restaurants: Restaurant[],
	selection: FilterSelectionState
): Restaurant[] {
	return restaurants.filter(
		(restaurant) =>
			matchesCategory(restaurant, selection.categoryIds) &&
			matchesDeliveryTime(restaurant, selection.deliveryTimeBucketIds) &&
			matchesPriceRange(restaurant, selection.priceRangeIds)
	);
}

/** Stable sort: open restaurants surface before closed ones. */
export function sortByOpenStatus(
	restaurants: Restaurant[],
	openStatusByRestaurantId: ReadonlyMap<string, boolean>
): Restaurant[] {
	return restaurants
		.map((restaurant, index) => ({ restaurant, index }))
		.sort((a, b) => {
			const aOpen = openStatusByRestaurantId.get(a.restaurant.id) ?? false;
			const bOpen = openStatusByRestaurantId.get(b.restaurant.id) ?? false;
			if (aOpen === bOpen) return a.index - b.index;
			return aOpen ? -1 : 1;
		})
		.map(({ restaurant }) => restaurant);
}
