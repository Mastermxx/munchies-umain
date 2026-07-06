export interface DeliveryTimeBucket {
	id: string;
	label: string;
	minMinutes: number;
	maxMinutes: number;
}

/**
 * The API only returns a raw minutes number per restaurant — these labeled,
 * non-overlapping ranges are a client-side UI decision, not API-provided data.
 */
export const DELIVERY_TIME_BUCKETS: DeliveryTimeBucket[] = [
	{ id: 'under-10', label: '0-10 min', minMinutes: 0, maxMinutes: 10 },
	{ id: 'under-30', label: '10-30 min', minMinutes: 10, maxMinutes: 30 },
	{ id: 'under-60', label: '30-60 min', minMinutes: 30, maxMinutes: 60 },
	{ id: 'over-60', label: '1 hour+', minMinutes: 60, maxMinutes: Infinity }
];

export function getDeliveryTimeBucketId(minutes: number): string | undefined {
	return DELIVERY_TIME_BUCKETS.find(
		(bucket) => minutes >= bucket.minMinutes && minutes <= bucket.maxMinutes
	)?.id;
}
