import { Display } from '@/packages/display';
import { Drawable } from '@/packages/primitives';
import { Unit } from '../unit';

export interface GroupOptions<T extends Unit> {
	readonly units?: T[];
}

export class Group<T extends Unit = Unit> implements Drawable {
	readonly units: Set<T>;

	constructor(options: GroupOptions<T> = {}) {
		const { units } = options;
		this.units = new Set<T>();

		if (units) {
			units.forEach((unit) => this.add(unit));
		}
	}

	update(): void {
		this.units.forEach((unit) => unit.update());
	}

	draw(screen: Display): void {
		this.units.forEach((unit) => unit.draw(screen));
	}

	add(sprite: T): void {
		this.units.add(sprite);
		sprite.add(this);
	}

	remove(unit: T): void {
		this.units.delete(unit);
		unit.remove(this);
	}

	has(unit: T): boolean {
		return this.units.has(unit);
	}

	clear(): void {
		this.units.forEach(this.remove.bind(this));
	}
}