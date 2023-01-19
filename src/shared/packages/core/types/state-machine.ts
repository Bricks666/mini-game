export type Key = string | number;

export type StateDict<K extends Key, T> = {
	[key in K]: T;
};

export interface StateMachineOptions<K extends Key, T> {
	readonly states: StateDict<K, T>;
	readonly startKey: K;
}

export abstract class StateMachine<K extends Key, T> {
	readonly states: StateDict<K, T>;

	current: T;

	constructor(options: StateMachineOptions<K, T>) {
		const { startKey, states, } = options;
		this.states = states;
		this.current = this.states[startKey];
	}

	changeState(key: K): void {
		this.current = this.states[key];
	}
}