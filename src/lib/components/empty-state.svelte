<script lang="ts">
	type Variant = 'empty' | 'error';

	let {
		variant = 'empty',
		subtext
	}: {
		variant?: Variant;
		subtext: string;
	} = $props();
</script>

<div
	class="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-200 p-12 text-center"
	role={variant === 'error' ? 'alert' : undefined}
	data-testid={variant === 'error' ? 'restaurant-list-error-state' : 'restaurant-list-empty-state'}
>
	{#if variant === 'error'}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			class="h-10 w-10 text-gray-300"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
			<path d="M12 8v5M12 16h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
		<p class="font-medium text-gray-700">Something went wrong</p>
	{:else}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			class="h-10 w-10 text-gray-300"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" />
			<path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
		<p class="font-medium text-gray-700">No restaurants found</p>
	{/if}
	<p class="text-sm text-gray-500">{subtext}</p>
</div>
