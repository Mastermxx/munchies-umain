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
		variant === 'price-range' ? 'border-[0.6px] px-2 py-2' : 'border px-3 py-2'
	);
	let inactiveBorderClass = $derived(
		variant === 'price-range' ? 'border-hairline' : 'border-gray-200'
	);
</script>

<button
	type="button"
	class="self-start rounded-lg text-left text-xs leading-tight font-normal whitespace-nowrap tracking-tightest transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:outline-none {variantClass} {active
		? 'border-cta-green bg-cta-green text-white shadow-md hover:bg-cta-green'
		: `${inactiveBorderClass} bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50`}"
	aria-pressed={active}
	data-testid={testid}
	{onclick}
>
	{label}
</button>
