<script lang="ts">
	let {
		rating,
		size = 'sm',
		dimmed = false
	}: { rating: number; size?: 'sm' | 'md'; dimmed?: boolean } = $props();

	function starFill(starIndex: number): number {
		return Math.max(0, Math.min(1, rating - starIndex)) * 100;
	}

	const starSizeClass = $derived(size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3');
	const textSizeClass = $derived(size === 'md' ? 'text-sm' : 'text-xs');
</script>

<div class="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
	{#each { length: 5 } as _star, i (i)}
		<span class="relative inline-block {starSizeClass} shrink-0" aria-hidden="true">
			<svg viewBox="0 0 20 20" class="absolute inset-0 h-full w-full text-gray-200">
				<path
					fill="currentColor"
					d="M10 1.5l2.5 5.6 6.1.6-4.6 4.1 1.4 6-5.4-3.2-5.4 3.2 1.4-6-4.6-4.1 6.1-.6z"
				/>
			</svg>
			<svg
				viewBox="0 0 20 20"
				class="absolute inset-0 h-full w-full {dimmed ? 'text-[#eeac2e]/40' : 'text-[#eeac2e]'}"
				style="clip-path: inset(0 {100 - starFill(i)}% 0 0)"
			>
				<path
					fill="currentColor"
					d="M10 1.5l2.5 5.6 6.1.6-4.6 4.1 1.4 6-5.4-3.2-5.4 3.2 1.4-6-4.6-4.1 6.1-.6z"
				/>
			</svg>
		</span>
	{/each}
	<span class="{textSizeClass} leading-none font-normal text-gray-500">
		{rating.toFixed(1)}
	</span>
</div>
