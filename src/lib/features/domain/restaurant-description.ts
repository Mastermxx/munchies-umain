import type { Restaurant } from './types';

/**
 * The API has no restaurant description field (see API.md) — these are
 * placeholder blurbs generated from the restaurant's name and cuisine
 * filters, picked deterministically by id so a given restaurant always
 * reads the same way across renders/builds.
 */
const INTROS = [
	'A neighborhood favorite that keeps regulars coming back for more.',
	'A cozy spot with a big reputation, loved for generous portions and bold flavor.',
	'A modern kitchen putting a fresh spin on classic recipes.',
	'A family-run kitchen serving up recipes passed down for generations.',
	'A bustling favorite known for fast service without cutting corners on taste.'
];

const CLOSERS = [
	'Every dish is made fresh to order, so it always tastes like it just left the kitchen.',
	'Expect generous portions, friendly service, and a menu built for sharing.',
	'Whether you are ordering for one or the whole table, there is something for everyone.',
	'It is the kind of place you bookmark after the first bite.',
	'Consistent, comforting, and always worth the order.'
];

function hashString(value: string): number {
	let hash = 0;
	for (let i = 0; i < value.length; i++) {
		hash = (hash * 31 + value.charCodeAt(i)) | 0;
	}
	return Math.abs(hash);
}

export function buildRestaurantDescription(restaurant: Restaurant, cuisineNames: string[]): string {
	const intro = INTROS[hashString(restaurant.id) % INTROS.length];
	const closer = CLOSERS[hashString(`${restaurant.id}:closer`) % CLOSERS.length];

	const cuisineLine =
		cuisineNames.length > 0
			? `${restaurant.name} specializes in ${formatList(cuisineNames)}, dished up for delivery straight to your door.`
			: `${restaurant.name} serves up a menu made for delivery, straight to your door.`;

	return `${intro} ${cuisineLine} ${closer}`;
}

function formatList(items: string[]): string {
	const lower = items.map((item) => item.toLowerCase());
	if (lower.length === 1) return lower[0];
	if (lower.length === 2) return `${lower[0]} and ${lower[1]}`;
	return `${lower.slice(0, -1).join(', ')}, and ${lower[lower.length - 1]}`;
}
