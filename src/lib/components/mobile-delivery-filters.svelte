<script lang="ts">
	import { DELIVERY_TIME_BUCKETS } from '$lib/features/domain/delivery-time';
	import type { FilterSelection } from '$lib/features/domain/filter-selection.svelte';
	import FilterChip from './filter-chip.svelte';

	let { selection }: { selection: FilterSelection } = $props();
</script>

<div
	class="flex gap-2 overflow-x-auto pb-2 lg:hidden"
	role="group"
	aria-label="Delivery time"
	data-testid="mobile-delivery-filters"
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
