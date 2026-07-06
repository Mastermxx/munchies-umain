import type { Filter, OpenStatus, PriceRange, Restaurant } from '../domain/types';

/** Origin the API is served from — image paths must be resolved against this, not API_BASE_URL. */
export const API_ORIGIN = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
export const API_BASE_URL = `${API_ORIGIN}/api`;

export function resolveImageUrl(imageUrl: string): string {
	return `${API_ORIGIN}${imageUrl}`;
}

class ApiShapeError extends Error {
	constructor(context: string, value: unknown) {
		super(`Unexpected response shape from ${context}: ${JSON.stringify(value)}`);
		this.name = 'ApiShapeError';
	}
}

function isRestaurant(value: unknown): value is Restaurant {
	if (typeof value !== 'object' || value === null) return false;
	const v = value as Record<string, unknown>;
	return (
		typeof v.id === 'string' &&
		typeof v.name === 'string' &&
		typeof v.rating === 'number' &&
		Array.isArray(v.filter_ids) &&
		v.filter_ids.every((id) => typeof id === 'string') &&
		typeof v.image_url === 'string' &&
		typeof v.delivery_time_minutes === 'number' &&
		typeof v.price_range_id === 'string'
	);
}

function isFilter(value: unknown): value is Filter {
	if (typeof value !== 'object' || value === null) return false;
	const v = value as Record<string, unknown>;
	return typeof v.id === 'string' && typeof v.name === 'string' && typeof v.image_url === 'string';
}

function isPriceRange(value: unknown): value is PriceRange {
	if (typeof value !== 'object' || value === null) return false;
	const v = value as Record<string, unknown>;
	return typeof v.id === 'string' && typeof v.range === 'string';
}

function isOpenStatus(value: unknown): value is OpenStatus {
	if (typeof value !== 'object' || value === null) return false;
	const v = value as Record<string, unknown>;
	return typeof v.restaurant_id === 'string' && typeof v.is_open === 'boolean';
}

async function fetchJson(path: string): Promise<unknown> {
	const response = await fetch(`${API_BASE_URL}${path}`);
	if (!response.ok) {
		throw new Error(`Request to ${path} failed with status ${response.status}`);
	}
	return response.json();
}

export async function getRestaurants(): Promise<Restaurant[]> {
	const body = await fetchJson('/restaurants');
	const list = (body as { restaurants?: unknown }).restaurants;
	if (!Array.isArray(list) || !list.every(isRestaurant)) {
		throw new ApiShapeError('GET /restaurants', body);
	}
	return list;
}

export async function getFilters(): Promise<Filter[]> {
	const body = await fetchJson('/filter');
	const list = (body as { filters?: unknown }).filters;
	if (!Array.isArray(list) || !list.every(isFilter)) {
		throw new ApiShapeError('GET /filter', body);
	}
	return list;
}

export async function getPriceRanges(): Promise<PriceRange[]> {
	const body = await fetchJson('/price-range');
	if (!Array.isArray(body) || !body.every(isPriceRange)) {
		throw new ApiShapeError('GET /price-range', body);
	}
	return body;
}

export async function getOpenStatus(restaurantId: string): Promise<OpenStatus> {
	const body = await fetchJson(`/open/${restaurantId}`);
	if (!isOpenStatus(body)) {
		throw new ApiShapeError(`GET /open/${restaurantId}`, body);
	}
	return body;
}

/**
 * No bulk open-status endpoint exists — one request per restaurant, parallelized.
 * A single restaurant's lookup failing is treated as closed rather than failing the batch.
 */
export async function getOpenStatuses(restaurantIds: string[]): Promise<Map<string, boolean>> {
	const entries = await Promise.all(
		restaurantIds.map(async (id): Promise<[string, boolean]> => {
			try {
				const status = await getOpenStatus(id);
				return [id, status.is_open];
			} catch {
				return [id, false];
			}
		})
	);
	return new Map(entries);
}
