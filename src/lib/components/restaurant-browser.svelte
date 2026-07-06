<script lang="ts">
	import { FilterSelection } from '$lib/features/domain/filter-selection.svelte';
	import { filterRestaurants, sortByOpenStatus } from '$lib/features/domain/filtering';
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

	const selection = new FilterSelection();

	let visibleRestaurants = $derived(
		sortByOpenStatus(filterRestaurants(restaurants, selection), openStatusByRestaurantId)
	);
</script>

<div class="flex flex-1">
	<FilterSidebar {filters} {priceRanges} {selection} />

	<main class="min-w-0 flex-1 px-6 pb-6 lg:px-8 lg:pb-8">
		<div
			class="mb-4 flex gap-3 overflow-x-auto pb-2"
			role="group"
			aria-label="Food category"
			data-testid="filter-category-card-row"
		>
			{#each filters as filter, index (filter.id)}
				<FilterCategoryCard
					{filter}
					priority={index === 0}
					active={selection.isSelected('category', filter.id)}
					onclick={() => selection.toggle('category', filter.id)}
				/>
			{/each}
		</div>

		<MobileDeliveryFilters {selection} />

		<h1 class="mb-6 text-xl font-normal">Restaurant's</h1>

		<RestaurantList restaurants={visibleRestaurants} {openStatusByRestaurantId} />
	</main>
</div>
