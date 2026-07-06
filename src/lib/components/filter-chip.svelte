<script lang="ts">
	type Variant = 'default' | 'price-range';

	let {
		label,
		active = false,
		variant = 'default',
		testid,
		onclick
	}: {
		label: string;
		active?: boolean;
		variant?: Variant;
		testid: string;
		onclick: () => void;
	} = $props();

	let variantClass = $derived(
		variant === 'price-range' ? 'border-[0.6px] p-2' : 'border px-3 py-2'
	);
</script>

<button
	type="button"
	class="self-start rounded-lg text-left text-xs whitespace-nowrap {variantClass} {active
		? 'border-[#00703A] bg-white'
		: 'border-gray-200 bg-white hover:border-gray-300'}"
	aria-pressed={active}
	data-testid={testid}
	{onclick}
>
	{label}
</button>
