<script lang="ts">
	import { Flip } from 'gsap/Flip';
	import gsap from 'gsap';
	import type { Restaurant } from '$lib/features/domain/types';
	import EmptyState from './empty-state.svelte';
	import RestaurantCard from './restaurant-card.svelte';

	gsap.registerPlugin(Flip);

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
	let hasPendingUpdate = false;

	// The template renders `displayedRestaurants`, not `restaurants` directly.
	// A filter change while a FLIP transition is still animating must NOT
	// touch the DOM yet — Svelte's {#each} would rip elements out from under
	// GSAP mid-tween (corrupting positions/opacity permanently). So the raw
	// prop is only copied into the rendered snapshot when idle; while
	// animating, the change is deferred and applied once the current
	// transition completes.
	let displayedRestaurants = $state(restaurants);

	$effect(() => {
		restaurants;
		if (isAnimating) {
			hasPendingUpdate = true;
		} else {
			displayedRestaurants = restaurants;
		}
	});

	$effect.pre(() => {
		displayedRestaurants;
		if (gridEl) {
			flipState = Flip.getState(gridEl.children);
		}
	});

	$effect(() => {
		displayedRestaurants;
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
				gsap.fromTo(
					gridEl.children,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: 0.4,
						ease: 'power1.out',
						onComplete: () => {
							isAnimating = false;
							if (hasPendingUpdate) {
								hasPendingUpdate = false;
								displayedRestaurants = restaurants;
							}
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
			duration: 0.4,
			ease: 'power1.inOut',
			absolute: true,
			stagger: 0.03,
			onEnter: (elements) =>
				gsap.fromTo(
					elements,
					{ opacity: 0, scale: 0.9, y: 20 },
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 0.35,
						delay: 0.2,
						stagger: 0.03,
						ease: 'power1.inOut'
					}
				),
			onLeave: (elements) =>
				gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power1.inOut' }),
			onComplete: () => {
				isAnimating = false;
				if (hasPendingUpdate) {
					hasPendingUpdate = false;
					displayedRestaurants = restaurants;
				}
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
