<script lang="ts">
	import { DELIVERY_TIME_BUCKETS } from '$lib/features/domain/delivery-time';
	import type { Filter, PriceRange } from '$lib/features/domain/types';

	let { filters, priceRanges }: { filters: Filter[]; priceRanges: PriceRange[] } = $props();
</script>

<aside
	class="hidden w-56 shrink-0 flex-col rounded-xl border border-gray-200 bg-white p-6 lg:flex"
	data-testid="filter-sidebar"
>
	<h2 class="mb-6 text-2xl font-normal">Filter</h2>

	<section class="flex flex-col pb-6">
		<h3 class="mb-4 text-xs font-semibold text-gray-400 uppercase">Food category</h3>
		<div class="flex flex-col gap-2" role="group" aria-label="Food category">
			{#each filters as filter (filter.id)}
				<button
					type="button"
					class="rounded-lg border border-gray-200 px-3 py-2 text-left text-xs"
					aria-pressed="false"
					data-testid={`filter-chip-category-sidebar-${filter.id}`}
				>
					{filter.name}
				</button>
			{/each}
		</div>
	</section>

	<section class="flex flex-col pb-6">
		<h3 class="mb-4 text-xs font-semibold text-gray-400 uppercase">Delivery time</h3>
		<div class="grid grid-cols-2 gap-2" role="group" aria-label="Delivery time">
			{#each DELIVERY_TIME_BUCKETS as bucket (bucket.id)}
				<button
					type="button"
					class="rounded-lg border border-gray-200 px-3 py-2 text-left text-xs"
					aria-pressed="false"
					data-testid={`filter-chip-delivery-sidebar-${bucket.id}`}
				>
					{bucket.label}
				</button>
			{/each}
		</div>
	</section>

	<section class="flex flex-col">
		<h3 class="mb-4 text-xs font-semibold text-gray-400 uppercase">Price range</h3>
		<div class="flex flex-wrap gap-2" role="group" aria-label="Price range">
			{#each priceRanges as priceRange (priceRange.id)}
				<button
					type="button"
					class="rounded-lg border border-gray-200 p-2 text-xs"
					aria-pressed="false"
					data-testid={`filter-chip-price-${priceRange.id}`}
				>
					{priceRange.range}
				</button>
			{/each}
		</div>
	</section>
</aside>
