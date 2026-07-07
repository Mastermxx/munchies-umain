<script lang="ts">
	import { asset } from '$app/paths';

	let { onContinue }: { onContinue: () => void } = $props();
</script>

<div
	class="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-cta-green px-6 pt-24 pb-6"
	role="dialog"
	aria-modal="true"
	aria-label="Welcome"
>
	<img src={asset('/logo-white.png')} alt="Munchies" class="h-6 w-auto self-start" />

	<div class="flex flex-1 flex-col justify-center">
		<h1
			class="max-inline-56 text-[64px] leading-none font-black tracking-[-1px] text-white"
			style="font-family: 'SF Pro Expanded', var(--font-sans);"
		>
			Treat yourself.
		</h1>
		<p
			class="mt-4 max-inline-64 text-[16px] leading-[150%] font-normal tracking-tightest text-white/90 align-middle"
		>
			Find the best restaurants in your city and get it delivered to your place!
		</p>
	</div>

	<button
		type="button"
		class="h-14 w-full rounded-lg border border-white text-base leading-none font-semibold text-white"
		onclick={onContinue}
	>
		Continue
	</button>
</div>
