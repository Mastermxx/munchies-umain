<script lang="ts">
	import { DELIVERY_TIME_BUCKETS } from '$lib/features/domain/delivery-time';
</script>

<div
	class="flex gap-2 overflow-x-auto pb-2 lg:hidden"
	role="group"
	aria-label="Delivery time"
	data-testid="mobile-delivery-filters"
>
	{#each DELIVERY_TIME_BUCKETS as bucket (bucket.id)}
		<button
			type="button"
			class="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-xs whitespace-nowrap"
			aria-pressed="false"
			data-testid={`filter-chip-delivery-mobile-${bucket.id}`}
		>
			{bucket.label}
		</button>
	{/each}
</div>
