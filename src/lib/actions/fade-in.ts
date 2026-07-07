import gsap from 'gsap';
import type { Attachment } from 'svelte/attachments';

export function animateFadeIn(
	targets: gsap.TweenTarget,
	fromVars: gsap.TweenVars = {},
	toVars: gsap.TweenVars = {}
) {
	return gsap.fromTo(
		targets,
		{ opacity: 0, ...fromVars },
		{
			opacity: 1,
			duration: 0.35,
			ease: 'power1.out',
			...('y' in fromVars ? { y: 0 } : {}),
			...('scale' in fromVars ? { scale: 1 } : {}),
			...toVars
		}
	);
}

export function fadeIn(fromVars: gsap.TweenVars = {}): Attachment {
	return (node) => {
		animateFadeIn(node, fromVars);
	};
}
