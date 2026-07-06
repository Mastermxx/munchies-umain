import { SvelteSet } from 'svelte/reactivity';
import type { FilterSelectionState } from './filtering';

export type FilterDimension = 'category' | 'deliveryTime' | 'priceRange';

export class FilterSelection implements FilterSelectionState {
	categoryIds = new SvelteSet<string>();
	deliveryTimeBucketIds = new SvelteSet<string>();
	priceRangeIds = new SvelteSet<string>();

	private setFor(dimension: FilterDimension): SvelteSet<string> {
		switch (dimension) {
			case 'category':
				return this.categoryIds;
			case 'deliveryTime':
				return this.deliveryTimeBucketIds;
			case 'priceRange':
				return this.priceRangeIds;
		}
	}

	isSelected(dimension: FilterDimension, id: string): boolean {
		return this.setFor(dimension).has(id);
	}

	toggle(dimension: FilterDimension, id: string): void {
		const set = this.setFor(dimension);
		if (set.has(id)) {
			set.delete(id);
		} else {
			set.add(id);
		}
	}
}
