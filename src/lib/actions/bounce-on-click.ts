import gsap from 'gsap';

export function bounceOnClick(node: HTMLElement) {
	function handleClick() {
		gsap.fromTo(node, { scale: 0.88 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' });
	}

	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('click', handleClick);
		}
	};
}
