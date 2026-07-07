<script lang="ts">
	import { horizontalWheelScroll } from '$lib/actions/horizontal-wheel-scroll';
	import { DELIVERY_TIME_BUCKETS } from '$lib/features/domain/delivery-time';
	import type { FilterSelection } from '$lib/features/domain/filter-selection.svelte';
	import FilterChip from './filter-chip.svelte';

	let { selection }: { selection: FilterSelection } = $props();
</script>

<div class="mb-4 lg:hidden" data-testid="mobile-delivery-filters">
	<h3 class="mb-4 text-xs leading-none font-semibold tracking-tightest text-gray-400 uppercase">
		Delivery time
	</h3>
	<div
		class="flex gap-2 overflow-x-auto pb-2"
		role="group"
		aria-label="Delivery time filters"
		{@attach horizontalWheelScroll()}
	>
		{#each DELIVERY_TIME_BUCKETS as bucket (bucket.id)}
			<FilterChip
				label={bucket.label}
				active={selection.isSelected('deliveryTime', bucket.id)}
				testid={`filter-chip-delivery-mobile-${bucket.id}`}
				onclick={() => selection.toggle('deliveryTime', bucket.id)}
			/>
		{/each}
	</div>
</div>
