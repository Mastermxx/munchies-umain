<script lang="ts">
	import { resolveImageUrl } from '$lib/features/api/munchies';
	import type { Restaurant } from '$lib/features/domain/types';

	let { restaurant, isOpen }: { restaurant: Restaurant; isOpen: boolean } = $props();
</script>

<article
	class="group relative flex h-50.5 w-full flex-col justify-between overflow-hidden rounded-lg border-[0.6px] border-gray-200 bg-white p-4 transition-shadow hover:shadow-md lg:w-81.75"
	data-testid={`restaurant-card-${restaurant.id}`}
>
	<div class="relative z-10 flex flex-wrap items-center gap-2">
		<span
			class="flex h-7 items-center gap-1 rounded-full border-[0.6px] border-gray-200 bg-white py-2 pr-3 pl-3 text-xs leading-none font-normal tracking-tightest text-gray-700"
			data-testid={`restaurant-status-${restaurant.id}`}
		>
			<span
				class="h-2 w-2 rounded-full {isOpen ? 'bg-cta-green' : 'bg-gray-900'}"
				aria-hidden="true"
			></span>
			{isOpen ? 'Open' : 'Closed'}
		</span>
		{#if isOpen}
			<span
				class="flex h-7 items-center rounded-full border-[0.6px] border-gray-200 bg-white py-2 pr-3 pl-3 text-xs leading-none font-normal tracking-tightest text-gray-700"
			>
				{restaurant.delivery_time_minutes} min
			</span>
		{/if}
	</div>

	{#if !isOpen}
		<!-- The API has no reopen-time data (see API.md) — this is a static placeholder string. -->
		<span
			class="pointer-events-none absolute inset-0 z-10 m-auto flex h-7 w-39.25 items-center justify-center gap-1 rounded border-[0.6px] border-hairline bg-pill-closed py-2 pr-3 pl-2.5 text-xs leading-none font-normal tracking-tightest text-gray-700 shadow-floating"
		>
			Opens tomorrow at 12 pm
		</span>
	{/if}

	<img
		src={resolveImageUrl(restaurant.image_url)}
		alt={restaurant.name}
		loading="lazy"
		class="pointer-events-none absolute -top-7.5 -right-6.5 h-35 w-35 shrink-0 object-contain lg:-right-8.5 {isOpen
			? ''
			: 'grayscale opacity-40'}"
	/>

	<div class="relative z-10 mt-6 flex items-end justify-between gap-2">
		<span
			class="min-w-0 truncate text-xl leading-none font-normal tracking-tightest {isOpen
				? ''
				: 'text-gray-300'}"
		>
			{restaurant.name}
		</span>
		<span
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors {isOpen
				? 'bg-cta-green group-hover:brightness-90'
				: 'bg-cta-green/40'}"
			aria-hidden="true"
		>
			<svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
				<path
					d="M3 8h10M9 4l4 4-4 4"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</div>
</article>
