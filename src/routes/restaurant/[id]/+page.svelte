<script lang="ts">
	import { resolve } from '$app/paths';
	import { hideOnError, resolveImageUrl } from '$lib/features/api/munchies';
	import { getDeliveryTimeLabel } from '$lib/features/domain/delivery-time';
	import StarRating from '$lib/components/star-rating.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let deliveryTimeLabel = $derived(getDeliveryTimeLabel(data.restaurant.delivery_time_minutes));
</script>

<svelte:head>
	<title>{data.restaurant.name} — Munchies</title>
	<meta name="description" content={data.description} />
</svelte:head>

<main class="mx-auto w-full max-w-3xl flex-1 px-6 py-8 lg:px-8 lg:py-12">
	<a
		href={resolve('/')}
		class="mb-6 inline-flex items-center gap-1 text-sm font-normal text-gray-500 hover:text-gray-900"
	>
		<svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
			<path
				d="M13 8H3M7 4 3 8l4 4"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		Back to restaurants
	</a>

	<article
		class="overflow-hidden rounded-lg border-[0.6px] border-gray-200 bg-white"
		data-testid={`restaurant-page-${data.restaurant.id}`}
	>
		<div class="relative flex h-48 items-center justify-center bg-gray-50 lg:h-64">
			<img
				src={resolveImageUrl(data.restaurant.image_url)}
				alt={data.restaurant.name}
				onerror={hideOnError}
				class="h-36 w-36 object-contain lg:h-48 lg:w-48 {data.isOpen ? '' : 'grayscale opacity-40'}"
			/>
			<span
				class="absolute top-4 left-4 flex h-7 items-center gap-1 rounded-full border-[0.6px] border-gray-200 bg-white py-2 pr-3 pl-3 text-xs leading-none font-normal tracking-tightest text-gray-700"
			>
				<span
					class="h-2 w-2 rounded-full {data.isOpen ? 'bg-cta-green' : 'bg-gray-900'}"
					aria-hidden="true"
				></span>
				{data.isOpen ? 'Open' : 'Closed'}
			</span>
			{#if data.isOpen}
				<span
					class="absolute top-4 right-4 flex h-7 items-center rounded-full border-[0.6px] border-gray-200 bg-white py-2 pr-3 pl-3 text-xs leading-none font-normal tracking-tightest text-gray-700"
				>
					{deliveryTimeLabel}
				</span>
			{/if}
		</div>

		<div class="flex flex-col gap-4 p-6 lg:p-8">
			<div class="flex flex-col gap-1">
				<StarRating rating={data.restaurant.rating} size="md" />
				<h1 class="text-2xl leading-tight font-normal tracking-tightest lg:text-4xl">
					{data.restaurant.name}
				</h1>
			</div>

			{#if data.cuisineNames.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each data.cuisineNames as cuisine (cuisine)}
						<span
							class="rounded-full border-[0.6px] border-gray-200 bg-gray-50 px-3 py-1 text-xs font-normal tracking-tightest text-gray-700"
						>
							{cuisine}
						</span>
					{/each}
				</div>
			{/if}

			<p class="leading-relaxed text-gray-700">{data.description}</p>
		</div>
	</article>
</main>
