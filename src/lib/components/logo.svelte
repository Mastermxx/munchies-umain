<script lang="ts">
	import logo from '$lib/assets/logo.png';

	let { variant = 'default' }: { variant?: 'default' | 'white' } = $props();

	let filterClass = $derived(variant === 'white' ? 'brightness-0 invert' : '');
</script>

<img src={logo} alt="Munchies" class="h-6 w-auto sm:h-8 {filterClass}" />
