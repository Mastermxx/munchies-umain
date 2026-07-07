<script lang="ts">
	import { asset } from '$app/paths';

	let { variant = 'default' }: { variant?: 'default' | 'white' } = $props();

	let filterClass = $derived(variant === 'white' ? 'brightness-0 invert' : '');
</script>

<img src={asset('/logo.png')} alt="Munchies" class="h-6 w-auto sm:h-8 {filterClass}" />
