<script lang="ts">
	import './layout.css';
	import { MediaQuery } from 'svelte/reactivity';
	import favicon from '$lib/assets/favicon.png';
	import AppHeader from '$lib/components/app-header.svelte';
	import WelcomeScreen from '$lib/components/welcome-screen.svelte';

	let { children } = $props();

	const isTouchNarrowViewport = new MediaQuery(
		'(pointer: coarse) and (hover: none) and (max-width: 1023px)',
		false
	);

	let dismissed = $state(false);
	let showWelcome = $derived(isTouchNarrowViewport.current && !dismissed);

	function dismissWelcome() {
		dismissed = true;
	}
</script>

<svelte:head>
	<title>Munchies — Find Your Next Restaurant</title>
	<meta
		name="description"
		content="Treat yourself. Find the best restaurants in your city and get it delivered to your place!"
	/>
	<link rel="icon" type="image/png" href={favicon} />
</svelte:head>
{#if showWelcome}
	<WelcomeScreen onContinue={dismissWelcome} />
{/if}
<div class="flex min-h-screen flex-col bg-gray-50">
	<AppHeader />
	{@render children()}
</div>
