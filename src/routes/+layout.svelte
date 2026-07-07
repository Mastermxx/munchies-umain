<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/app-header.svelte';
	import WelcomeScreen from '$lib/components/welcome-screen.svelte';

	let { children } = $props();

	let showWelcome = $state(false);

	onMount(() => {
		if (sessionStorage.getItem('welcomeSeen') !== '1') {
			showWelcome = true;
		}
	});

	$effect(() => {
		document.documentElement.classList.toggle('overflow-hidden', showWelcome);
	});

	function dismissWelcome() {
		showWelcome = false;
		sessionStorage.setItem('welcomeSeen', '1');
	}
</script>

<svelte:head>
	<title>Munchies — Find Your Next Restaurant</title>
	<meta
		name="description"
		content="Treat yourself. Find the best restaurants in your city and get it delivered to your place!"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>
{#if showWelcome}
	<WelcomeScreen onContinue={dismissWelcome} />
{/if}
<div class="flex min-h-screen flex-col bg-gray-50">
	<AppHeader />
	{@render children()}
</div>
