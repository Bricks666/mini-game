import { Coordinate, Size } from '@/packages/core';
import { Display } from '@/packages/display';
import { Drawable } from '../types';

export interface PolygonOptions extends Coordinate, Size {}

export type Center = [number, number];

export abstract class Polygon implements Drawable {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(options: PolygonOptions) {
		this.x = options.x;
		this.y = options.y;
		this.height = options.height;
		this.width = options.width;
	}

	get centerX(): number {
		return (this.x + this.width) / 2;
	}

	set centerX(otherCenterX: number) {
		this.x = otherCenterX - this.width / 2;
	}

	get centerY(): number {
		return (this.y + this.height) / 2;
	}

	set centerY(otherCenterY: number) {
		this.y = otherCenterY - this.height / 2;
	}

	get center(): Center {
		return [this.centerX, this.centerY];
	}

	set center(otherCenter: Center) {
		[this.centerX, this.centerY] = otherCenter;
	}

	moveTo(coordinate: Coordinate): this {
		this.x = coordinate.x;
		this.y = coordinate.y;

		return this;
	}

	moveOn(coordinate: Coordinate): this {
		this.x += coordinate.x;
		this.y += coordinate.y;

		return this;
	}

	abstract draw(screen: Display): void;
	abstract update(): void;
}