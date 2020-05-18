import deepEqual from 'deep-equal';

import { isDefined } from './guard';
import { Orientation } from './position';
import { cloneState, State, Trace } from './state';

export default class RobotState {
    private readonly states: State[];

    constructor(state: State) {
        isDefined(state, 'state');
        isDefined(state.orientation, 'orientation');
        isDefined(state.coordinate, 'coordinate');
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

    protected get trace(): Trace {
        return {
            from: cloneState(this.previousState),
            to: cloneState(this.currentState)
        };
    }

    protected isStateEquals(state: State): boolean {
        return deepEqual(this.currentState, state, { strict: true });
    }

    protected addState(state: State): void {
        this.states.push(state);
    }
}
