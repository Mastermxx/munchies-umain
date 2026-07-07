import gsap from 'gsap';
import type { Attachment } from 'svelte/attachments';

export function bounceOnClick(): Attachment<HTMLElement> {
	return (node) => {
		function handleClick() {
			gsap.fromTo(node, { scale: 0.88 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' });
		}

		node.addEventListener('click', handleClick);

		return () => {
			node.removeEventListener('click', handleClick);
		};
	};
}
