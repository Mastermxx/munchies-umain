<script lang="ts">
	import { bounceOnClick } from '$lib/actions/bounce-on-click';
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
	{@attach bounceOnClick()}
	type="button"
	class="relative flex h-20 w-40 shrink-0 items-start rounded-lg border-[0.6px] border-hairline p-3 text-left tracking-tightest shadow-floating transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:outline-none {active
		? 'bg-white text-gray-900 shadow-md hover:bg-gray-50'
		: 'bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'}"
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
	{#if active}
		<span
			class="absolute right-2 bottom-2 flex h-5 w-5 items-center justify-center rounded-full bg-cta-green ring-2 ring-white"
			aria-hidden="true"
		>
			<svg
				class="h-3 w-3 text-white"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M20 6 9 17l-5-5" />
			</svg>
		</span>
	{/if}
</button>
