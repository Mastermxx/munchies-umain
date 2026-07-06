<script lang="ts">
	import RestaurantBrowser from '$lib/components/restaurant-browser.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<RestaurantBrowser
	restaurants={data.restaurants}
	filters={data.filters}
	priceRanges={data.priceRanges}
	openStatusByRestaurantId={data.openStatusByRestaurantId}
/>
