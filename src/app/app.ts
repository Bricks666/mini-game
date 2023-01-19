import { Level, MainMenu } from '@/pages';
import { DISPLAY_SIZE } from '@/shared/configs';
import { Engine, SceneDict, SceneMachine } from '@/shared/packages/core';
import { Display } from '@/shared/packages/display';
import { domEventEmitter, eventBus } from '@/shared/packages/events';
import { Loading } from '@/shared/ui';

type Scenes = 'level' | 'mainMenu' | 'loading';

export class Game extends Engine<Scenes> {
	constructor() {
		const display = new Display({
			...DISPLAY_SIZE,
			style: {
				display: 'block',
				margin: '0 auto',
				border: '1px solid black',
			},
		});

		const states: SceneDict<Scenes> = {
			level: new Level({ ...display.rect.sizes, }),
			mainMenu: new MainMenu({ ...display.rect.sizes, }),
			loading: new Loading({
				...display.rect.sizes,
				color: 'tomato',
				createParts: () => [],
			}),
		};
		const sceneMachine = new SceneMachine<Scenes>({
			states,
			startKey: 'loading',
		});
		super({ sceneMachine, display, });

		domEventEmitter.setDisplay(display);

		this.#subscribe();
	}

	update() {
		super.update();
	}

	#subscribe() {
		eventBus.onChangeScene<Scenes>((key) => {
			this.sceneMachine.changeState(key);
		});
	}
}