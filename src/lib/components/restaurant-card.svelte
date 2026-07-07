<script lang="ts">
	import { resolveImageUrl } from '$lib/features/api/munchies';
	import {
		DELIVERY_TIME_BUCKETS,
		getDeliveryTimeBucketId
	} from '$lib/features/domain/delivery-time';
	import type { Restaurant } from '$lib/features/domain/types';

	let { restaurant, isOpen }: { restaurant: Restaurant; isOpen: boolean } = $props();

	let deliveryTimeLabel = $derived(
		DELIVERY_TIME_BUCKETS.find(
			(bucket) => bucket.id === getDeliveryTimeBucketId(restaurant.delivery_time_minutes)
		)?.label ?? `${restaurant.delivery_time_minutes} min`
	);

	function hideOnError(event: Event) {
		(event.currentTarget as HTMLImageElement).style.visibility = 'hidden';
	}

	function starFill(starIndex: number, rating: number): number {
		return Math.max(0, Math.min(1, rating - starIndex)) * 100;
	}
</script>

<article
	class="group relative flex h-50.5 w-full flex-col justify-between overflow-hidden rounded-lg border-[0.6px] border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
	data-testid={`restaurant-card-${restaurant.id}`}
>
	<div class="relative z-10 flex flex-wrap items-center gap-2">
		<span
			class="flex h-7 items-center gap-1 rounded-full border-[0.6px] border-gray-200 bg-white py-2 pr-3 pl-3 text-xs leading-none font-normal tracking-tightest text-gray-700"
			data-testid={`restaurant-status-${restaurant.id}`}
		>
			<span
				class="h-2 w-2 rounded-full {isOpen ? 'bg-cta-green' : 'bg-gray-900'}"
				aria-hidden="true"
			></span>
			{isOpen ? 'Open' : 'Closed'}
		</span>
		{#if isOpen}
			<span
				class="flex h-7 items-center rounded-full border-[0.6px] border-gray-200 bg-white py-2 pr-3 pl-3 text-xs leading-none font-normal tracking-tightest text-gray-700"
			>
				{deliveryTimeLabel}
			</span>
		{/if}
	</div>

	{#if !isOpen}
		<!-- The API has no reopen-time data (see API.md) — this is a static placeholder string. -->
		<span
			class="pointer-events-none absolute inset-0 z-10 m-auto flex h-7 w-39.25 items-center justify-center gap-1 rounded border-[0.6px] border-hairline bg-pill-closed py-2 pr-3 pl-2.5 text-xs leading-none font-normal tracking-tightest text-gray-700 shadow-floating"
		>
			Opens tomorrow at 12 pm
		</span>
	{/if}

	<img
		src={resolveImageUrl(restaurant.image_url)}
		alt={restaurant.name}
		loading="lazy"
		onerror={hideOnError}
		class="pointer-events-none absolute -top-7.5 -right-6.5 h-35 w-35 shrink-0 object-contain lg:-right-8.5 {isOpen
			? ''
			: 'grayscale opacity-40'}"
	/>

	<div class="relative z-10 mt-6 flex min-w-0 flex-col gap-1">
		<div class="flex items-center gap-1" aria-label={`Rated ${restaurant.rating} out of 5`}>
			{#each { length: 5 } as _star, i (i)}
				<span class="relative inline-block h-3 w-3 shrink-0" aria-hidden="true">
					<svg viewBox="0 0 20 20" class="absolute inset-0 h-full w-full text-gray-200">
						<path
							fill="currentColor"
							d="M10 1.5l2.5 5.6 6.1.6-4.6 4.1 1.4 6-5.4-3.2-5.4 3.2 1.4-6-4.6-4.1 6.1-.6z"
						/>
					</svg>
					<svg
						viewBox="0 0 20 20"
						class="absolute inset-0 h-full w-full {isOpen ? 'text-[#eeac2e]' : 'text-[#eeac2e]/40'}"
						style="clip-path: inset(0 {100 - starFill(i, restaurant.rating)}% 0 0)"
					>
						<path
							fill="currentColor"
							d="M10 1.5l2.5 5.6 6.1.6-4.6 4.1 1.4 6-5.4-3.2-5.4 3.2 1.4-6-4.6-4.1 6.1-.6z"
						/>
					</svg>
				</span>
			{/each}
			<span class="text-xs leading-none font-normal text-gray-500">
				{restaurant.rating.toFixed(1)}
			</span>
		</div>
		<div class="flex items-center justify-between gap-2">
			<span
				class="min-w-0 truncate pb-0.5 text-xl leading-tight font-normal tracking-tightest {isOpen
					? ''
					: 'text-gray-300'}"
			>
				{restaurant.name}
			</span>
			<span
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors {isOpen
					? 'bg-cta-green group-hover:brightness-90'
					: 'bg-cta-green/40'}"
				aria-hidden="true"
			>
				<svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
					<path
						d="M3 8h10M9 4l4 4-4 4"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</div>
	</div>
</article>
