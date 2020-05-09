import deepEqual from 'deep-equal';

import { Point } from './grid';
import { Orientation } from './position';
import { State, Trace, cloneState } from './state';

export default class RobotState {
    protected readonly states: State[];

    constructor(state: State) {
        this.states = [state];
    }

    protected get currentState(): State {
        return this.states[this.states.length - 1];
    }

    protected get previousState(): State {
        return this.states[this.states.length - 2];
    }

    protected get orientation(): Orientation {
        return this.currentState.orientation;
    }

    protected get coordinate(): Point {
        return this.currentState.coordinate;
    }

    protected get trace(): Trace {
        return {
            from: cloneState(this.previousState),
            to: cloneState(this.currentState),
            isForward: !deepEqual(this.previousState.coordinate, this.coordinate)
        };
    }

    protected addState(state: State): void {
        this.states.push(state);
    }
}
