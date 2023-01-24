import { Audio } from '@/shared/packages/audio';
import { Entity, EntityOptions } from '../entity';

export interface BulletOptions extends Omit<EntityOptions, 'health'> {
	readonly damage: number;
}

export class Bullet extends Entity {
	readonly #damage: number;

	readonly #audio: Audio;

	constructor(options: BulletOptions) {
		const { damage, ...rest } = options;
		super({ ...rest, health: 1, });
		this.#damage = damage;
		this.#audio = new Audio({ src: 'musics/shoot.wav', volume: 0.5, });
	}

	get damage(): number {
		return this.damage;
	}

	onMount(): void {
		this.#audio.play();
	}

	onUnmount(): void {
		this.#audio.stop();
	}
}
