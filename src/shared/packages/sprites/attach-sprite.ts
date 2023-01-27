/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GameObject } from '../game-objects';
import { Sprite } from './sprite';

type ExtractAttachSpriteSpriteOptions<S extends typeof Sprite> = Omit<
	ConstructorParameters<S>['0'],
	'gameObject'
>;

export type AttachSpriteOptions<S extends typeof Sprite> = {
	readonly Sprite: S;
} & ExtractAttachSpriteSpriteOptions<S>;

export const AttachSprite = <S extends typeof Sprite>(
	options: AttachSpriteOptions<S>
) => {
	const { Sprite: Spr, ...rest } = options;
	return <O extends typeof GameObject>(Constructor: O): O => {
		// @ts-ignore
		return class extends Constructor {
			constructor(...args: any[]) {
				// @ts-ignore
				super(...args);
				const { width, height, x, y, } = this;
				this.view = new Spr({
					width,
					height,
					x,
					y,
					...rest,
					gameObject: this,
				});
			}
		};
	};
};