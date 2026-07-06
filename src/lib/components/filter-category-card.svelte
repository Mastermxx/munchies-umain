<script lang="ts">
	import { resolveImageUrl } from '$lib/features/api/munchies';
	import type { Filter } from '$lib/features/domain/types';

	let {
		filter,
		active = false,
		priority = false
	}: { filter: Filter; active?: boolean; priority?: boolean } = $props();
</script>

<button
	type="button"
	class="relative flex h-20 w-40 shrink-0 items-start rounded-lg border border-gray-200 p-3 text-left"
	aria-pressed={active}
	data-testid={`filter-category-card-${filter.id}`}
>
	<span class="text-sm">{filter.name}</span>
	<img
		src={resolveImageUrl(filter.image_url)}
		alt=""
		aria-hidden="true"
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : undefined}
		class="pointer-events-none absolute top-0 -right-3 bottom-0 w-20 object-contain"
	/>
</button>
