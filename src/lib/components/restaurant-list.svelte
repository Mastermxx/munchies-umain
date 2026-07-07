<script module lang="ts">
	import { Flip } from 'gsap/Flip';
	import gsap from 'gsap';

	gsap.registerPlugin(Flip);
</script>

<script lang="ts">
	import type { Restaurant } from '$lib/features/domain/types';
	import { animateFadeIn } from '$lib/actions/fade-in';
	import EmptyState from './empty-state.svelte';
	import RestaurantCard from './restaurant-card.svelte';

	let {
		restaurants,
		openStatusByRestaurantId
	}: { restaurants: Restaurant[]; openStatusByRestaurantId: Map<string, boolean> } = $props();

	let gridEl: HTMLDivElement | undefined = $state();
	let flipState: Flip.FlipState | undefined;
	let hasMounted = false;
	// Separate from `hasMounted`: this only drives the pre-hydrate CSS class
	// binding. It's written (never read) inside the effects below, so
	// toggling it doesn't cause them to re-trigger themselves.
	let showPreHydrateStyle = $state(true);

	let isAnimating = false;

	// The template renders `displayedRestaurants`, not `restaurants` directly.
	// A filter change while a FLIP transition is still animating must NOT
	// touch the DOM yet — Svelte's {#each} would rip elements out from under
	// GSAP mid-tween (corrupting positions/opacity permanently). So the raw
	// prop is only copied into the rendered snapshot when idle; while
	// animating, the change is deferred and applied once the current
	// transition completes (see the `onComplete` callbacks below).
	// svelte-ignore state_referenced_locally (intentional one-time snapshot of the initial prop value)
	let displayedRestaurants = $state(restaurants);

	$effect(() => {
		void restaurants;
		if (!isAnimating) {
			displayedRestaurants = restaurants;
		}
	});

	$effect.pre(() => {
		void displayedRestaurants;
		if (gridEl && hasMounted) {
			flipState = Flip.getState(gridEl.children);
		}
	});

	$effect(() => {
		void displayedRestaurants;
		if (!hasMounted) {
			hasMounted = true;
			showPreHydrateStyle = false;
			if (gridEl) {
				// Guard this the same way as runFlip(): a filter click during
				// the entrance stagger would otherwise start a FLIP transition
				// on elements this tween is still actively animating, and the
				// two fight over the same transform/opacity, corrupting the
				// final resting position.
				isAnimating = true;
				animateFadeIn(
					gridEl.children,
					{ y: 20 },
					{
						stagger: 0.05,
						duration: 0.4,
						onComplete: () => {
							isAnimating = false;
							displayedRestaurants = restaurants;
						}
					}
				);
			}
			return;
		}
		if (flipState && gridEl) {
			runFlip();
		}
	});

	function runFlip() {
		if (!flipState || !gridEl) return;
		isAnimating = true;
		Flip.from(flipState, {
			targets: gridEl.children,
			duration: 0,
			absolute: true,
			onLeave: (elements) =>
				gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power1.inOut' }),
			onComplete: () => {
				isAnimating = false;
				displayedRestaurants = restaurants;
			}
		});
	}
</script>

{#if displayedRestaurants.length === 0}
	<EmptyState variant="empty" subtext="Try adjusting or clearing your filters." />
{:else}
	<div
		bind:this={gridEl}
		class="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-4 lg:max-w-253.75 lg:gap-4.25 {showPreHydrateStyle
			? 'pre-hydrate'
			: ''}"
		data-testid="restaurant-list"
	>
		{#each displayedRestaurants as restaurant (restaurant.id)}
			<RestaurantCard {restaurant} isOpen={openStatusByRestaurantId.get(restaurant.id) ?? false} />
		{/each}
	</div>
{/if}

<style>
	/*
	 * Only hides cards for the pre-hydration SSR paint. Must be removed
	 * (via the `hasMounted` class toggle) once the entrance animation
	 * takes over, otherwise this permanent transform pollutes GSAP
	 * Flip's "natural position" measurements for later filter changes.
	 */
	div[data-testid='restaurant-list'].pre-hydrate > :global(*) {
		opacity: 0;
		transform: translateY(20px);
	}
</style>
