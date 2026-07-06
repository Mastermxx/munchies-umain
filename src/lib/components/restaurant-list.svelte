<script lang="ts">
	import type { Restaurant } from '$lib/features/domain/types';
	import RestaurantCard from './restaurant-card.svelte';

	let {
		restaurants,
		openStatusByRestaurantId
	}: { restaurants: Restaurant[]; openStatusByRestaurantId: Map<string, boolean> } = $props();
</script>

<div
	class="flex flex-col gap-4 lg:max-w-253.75 lg:flex-row lg:flex-wrap lg:gap-4.25"
	data-testid="restaurant-list"
>
	{#each restaurants as restaurant (restaurant.id)}
		<RestaurantCard {restaurant} isOpen={openStatusByRestaurantId.get(restaurant.id) ?? false} />
	{/each}
</div>
