<script lang="ts">
	import { resolveImageUrl } from '$lib/features/api/munchies';
	import type { Filter } from '$lib/features/domain/types';

	let {
		filter,
		active = false,
		priority = false,
		onclick
	}: { filter: Filter; active?: boolean; priority?: boolean; onclick: () => void } = $props();

	function hideOnError(event: Event) {
		(event.currentTarget as HTMLImageElement).style.visibility = 'hidden';
	}
</script>

<button
	type="button"
	class="relative flex h-20 w-40 shrink-0 items-start rounded-lg border-[0.6px] p-3 text-left tracking-tightest shadow-floating transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:outline-none {active
		? 'border-cta-green bg-white text-gray-900 shadow-md hover:bg-gray-50'
		: 'border-hairline bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'}"
	aria-pressed={active}
	data-testid={`filter-category-card-${filter.id}`}
	{onclick}
>
	<span class="text-sm font-normal tracking-tightest">{filter.name}</span>
	<img
		src={resolveImageUrl(filter.image_url)}
		alt=""
		aria-hidden="true"
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : undefined}
		onerror={hideOnError}
		class="pointer-events-none absolute top-0 -right-3 bottom-0 w-20 object-contain"
	/>
</button>
