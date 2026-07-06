<script lang="ts">
	import type { Filter, PriceRange, Restaurant } from '$lib/features/domain/types';
	import FilterCategoryCard from './filter-category-card.svelte';
	import FilterSidebar from './filter-sidebar.svelte';
	import MobileDeliveryFilters from './mobile-delivery-filters.svelte';
	import RestaurantList from './restaurant-list.svelte';

	let {
		restaurants,
		filters,
		priceRanges,
		openStatusByRestaurantId
	}: {
		restaurants: Restaurant[];
		filters: Filter[];
		priceRanges: PriceRange[];
		openStatusByRestaurantId: Map<string, boolean>;
	} = $props();
</script>

<div class="flex flex-1">
	<FilterSidebar {filters} {priceRanges} />

	<main class="min-w-0 flex-1 px-6 pb-6 lg:px-8 lg:pb-8">
		<div
			class="mb-4 flex gap-3 overflow-x-auto pb-2"
			role="group"
			aria-label="Food category"
			data-testid="filter-category-card-row"
		>
			{#each filters as filter, index (filter.id)}
				<FilterCategoryCard {filter} priority={index === 0} />
			{/each}
		</div>

		<MobileDeliveryFilters />

		<h1 class="mb-6 text-xl font-normal">Restaurant's</h1>

		<RestaurantList {restaurants} {openStatusByRestaurantId} />
	</main>
</div>
