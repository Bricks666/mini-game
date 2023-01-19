import { Display } from '@/packages/display';
import { textRequestAdapter } from '@/packages/renderer';
import { Polygon, PolygonOptions } from '../polygon';
import { TextProperties, TextStyleProperties } from './types';

export interface TextOptions
	extends Partial<PolygonOptions>,
		Partial<TextProperties> {
	readonly text: string;
}

export class Text extends Polygon {
	text: string;
	styles: TextStyleProperties;

	static defaultStyle: TextStyleProperties = {
		fontFamily: "'Public Pixel', monospace",
		fontSize: 20,
		strokeWidth: 20,
		lineHeight: 1.2,
		color: 'black',
		variant: 'fill',
	};

	constructor(options: TextOptions) {
		const { text, height = 0, width = 0, x = 0, y = 0, ...styles } = options;
		super({
			height,
			width,
			x,
			y,
		});
		this.text = text;
		this.styles = { ...Text.defaultStyle, ...styles };
		this.width = this.text.length * this.styles.fontSize;
		this.height = this.styles.fontSize;
	}

	draw(display: Display, ...args: Partial<TextProperties>[]): void {
		const passedStyles = args[0] || {};
		const styles = { ...this.styles, ...passedStyles };
		display.draw(textRequestAdapter(this));
	}

	update(): void {}
}