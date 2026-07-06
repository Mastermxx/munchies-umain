export interface DeliveryTimeBucket {
	id: string;
	label: string;
	maxMinutes: number;
}

/**
 * The API only returns a raw minutes number per restaurant — these labeled
 * buckets are a client-side UI decision, not API-provided data.
 */
export const DELIVERY_TIME_BUCKETS: DeliveryTimeBucket[] = [
	{ id: 'under-10', label: '0-10 min', maxMinutes: 10 },
	{ id: 'under-30', label: '10-30 min', maxMinutes: 30 },
	{ id: 'under-60', label: '30-60 min', maxMinutes: 60 },
	{ id: 'over-60', label: '1 hour+', maxMinutes: Infinity }
];
