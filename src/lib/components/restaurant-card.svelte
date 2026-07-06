<script lang="ts">
	import { resolveImageUrl } from '$lib/features/api/munchies';
	import type { Restaurant } from '$lib/features/domain/types';

	let { restaurant, isOpen }: { restaurant: Restaurant; isOpen: boolean } = $props();
</script>

<article
	class="relative flex h-50.5 w-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white p-4 lg:w-81.75"
	data-testid={`restaurant-card-${restaurant.id}`}
>
	<div class="relative z-10 flex flex-wrap items-center gap-2">
		<span
			class="flex h-7 items-center gap-1 rounded-full border border-gray-200 px-3 text-xs"
			data-testid={`restaurant-status-${restaurant.id}`}
		>
			<span
				class="h-2 w-2 rounded-full {isOpen ? 'bg-[#00703A]' : 'bg-gray-900'}"
				aria-hidden="true"
			></span>
			{isOpen ? 'Open' : 'Closed'}
		</span>
		{#if isOpen}
			<span class="flex h-7 items-center rounded-full border border-gray-200 px-3 text-xs">
				{restaurant.delivery_time_minutes} min
			</span>
		{/if}
	</div>

	<img
		src={resolveImageUrl(restaurant.image_url)}
		alt={restaurant.name}
		loading="lazy"
		class="pointer-events-none absolute -top-7.5 -right-6.5 h-35 w-35 object-contain lg:-right-8.5 {isOpen
			? ''
			: 'grayscale opacity-40'}"
	/>

	<div class="relative z-10 mt-6 flex items-end justify-between gap-2">
		<span class="min-w-0 truncate text-xl {isOpen ? '' : 'text-gray-300'}">{restaurant.name}</span>
		<span
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white {isOpen
				? 'bg-[#00703A]'
				: 'bg-[#00703A]/40'}"
			aria-hidden="true"
		>
			&rarr;
		</span>
	</div>
</article>
