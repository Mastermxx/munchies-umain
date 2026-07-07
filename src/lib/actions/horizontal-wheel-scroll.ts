import type { Attachment } from 'svelte/attachments';

export function horizontalWheelScroll(): Attachment<HTMLElement> {
	return (node) => {
		function handleWheel(event: WheelEvent) {
			const maxScrollLeft = node.scrollWidth - node.clientWidth;
			if (maxScrollLeft <= 0) return;

			const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
			if (delta === 0) return;

			const atStart = node.scrollLeft <= 0 && delta < 0;
			const atEnd = node.scrollLeft >= maxScrollLeft && delta > 0;
			if (atStart || atEnd) return;

			node.scrollLeft += delta;
			event.preventDefault();
		}

		node.addEventListener('wheel', handleWheel);

		return () => {
			node.removeEventListener('wheel', handleWheel);
		};
	};
}
