<script lang="ts">
	import { resolveImageUrl } from '$lib/features/api/munchies';
	import type { Filter } from '$lib/features/domain/types';

	let {
		filter,
		active = false,
		priority = false,
		onclick
	}: { filter: Filter; active?: boolean; priority?: boolean; onclick: () => void } = $props();
</script>

<button
	type="button"
	class="relative flex h-20 w-40 shrink-0 items-start rounded-lg border p-3 text-left {active
		? 'border-[#00703A]'
		: 'border-gray-200'}"
	aria-pressed={active}
	data-testid={`filter-category-card-${filter.id}`}
	{onclick}
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
