import { SceneMachine } from './scene-machine';
import { Screen } from './screen';
import { Key } from './types';

export interface EngineOptions<K extends Key> {
	readonly screen: Screen;
	readonly sceneMachine: SceneMachine<K>;
}

export class Engine<K extends Key> {
	readonly screen: Screen;
	readonly sceneMachine: SceneMachine<K>;

	constructor(options: EngineOptions<K>) {
		const { screen, sceneMachine, } = options;
		this.screen = screen;
		this.sceneMachine = sceneMachine;
	}

	start(): void {
		requestAnimationFrame(this.update.bind(this));
	}

	update(): void {
		this.sceneMachine.update();
		this.sceneMachine.draw(this.screen);
		this.screen.update();
		requestAnimationFrame(this.update.bind(this));
	}
}
