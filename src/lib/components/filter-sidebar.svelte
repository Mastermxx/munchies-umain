<script lang="ts">
	import { DELIVERY_TIME_BUCKETS } from '$lib/features/domain/delivery-time';
	import type { FilterSelection } from '$lib/features/domain/filter-selection.svelte';
	import type { Filter, PriceRange } from '$lib/features/domain/types';
	import FilterChip from './filter-chip.svelte';

	let {
		filters,
		priceRanges,
		selection
	}: { filters: Filter[]; priceRanges: PriceRange[]; selection: FilterSelection } = $props();
</script>

<aside
	class="hidden w-56 shrink-0 flex-col self-start rounded-xl border-[0.6px] border-hairline bg-white p-6 shadow-floating lg:mt-0 lg:mr-0 lg:mb-6 lg:ml-6 lg:flex"
	data-testid="filter-sidebar"
>
	<h2 class="mb-6 text-2xl leading-none font-normal tracking-tightest">Filter</h2>

	<section class="flex flex-col pb-6">
		<h3 class="mb-4 text-xs leading-none font-semibold tracking-tightest text-gray-400 uppercase">
			Food category
		</h3>
		<div class="flex flex-col gap-2" role="group" aria-label="Food category">
			{#each filters as filter (filter.id)}
				<FilterChip
					label={filter.name}
					active={selection.isSelected('category', filter.id)}
					testid={`filter-chip-category-sidebar-${filter.id}`}
					onclick={() => selection.toggle('category', filter.id)}
				/>
			{/each}
		</div>
	</section>

	<section class="flex flex-col pb-6">
		<h3 class="mb-4 text-xs leading-none font-semibold tracking-tightest text-gray-400 uppercase">
			Delivery time
		</h3>
		<div class="grid grid-cols-2 gap-2" role="group" aria-label="Delivery time">
			{#each DELIVERY_TIME_BUCKETS as bucket (bucket.id)}
				<FilterChip
					label={bucket.label}
					active={selection.isSelected('deliveryTime', bucket.id)}
					testid={`filter-chip-delivery-sidebar-${bucket.id}`}
					onclick={() => selection.toggle('deliveryTime', bucket.id)}
				/>
			{/each}
		</div>
	</section>

	<section class="flex flex-col">
		<h3 class="mb-4 text-xs leading-none font-semibold tracking-tightest text-gray-400 uppercase">
			Price range
		</h3>
		<div class="flex flex-wrap gap-2" role="group" aria-label="Price range">
			{#each priceRanges as priceRange (priceRange.id)}
				<FilterChip
					label={priceRange.range}
					variant="price-range"
					active={selection.isSelected('priceRange', priceRange.id)}
					testid={`filter-chip-price-${priceRange.id}`}
					onclick={() => selection.toggle('priceRange', priceRange.id)}
				/>
			{/each}
		</div>
	</section>
</aside>
