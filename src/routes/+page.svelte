<script lang="ts">
	import EmptyState from '$lib/components/empty-state.svelte';
	import RestaurantBrowser from '$lib/components/restaurant-browser.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#if data.ok}
	<RestaurantBrowser
		restaurants={data.restaurants}
		filters={data.filters}
		priceRanges={data.priceRanges}
		openStatusByRestaurantId={data.openStatusByRestaurantId}
	/>
{:else}
	<main class="flex-1 px-6 py-12 lg:px-8">
		<EmptyState
			variant="error"
			subtext="We couldn't load restaurants right now. Please try again later."
		/>
	</main>
{/if}
