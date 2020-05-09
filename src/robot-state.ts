import { Point } from './grid';
import { Orientation } from './position';
import { State, Trace } from './state';

export default class RobotState {
    private readonly states: State[];

    constructor(currentState: State) {
        this.states = [currentState];
    }

    protected get currentState(): State {
        return this.states[this.states.length - 1];
    }

    protected get previousState(): State {
        return this.states[this.states.length - 2];
    }

    protected addState(state: State): boolean {
        this.states.push(state);
        return true;
    }

    protected get orientation(): Orientation {
        return this.currentState.orientation;
    }

    protected get coordinate(): Point {
        return this.currentState.coordinate;
    }

    protected get traces(): Trace {
        return {
            from: this.previousState,
            to: this.currentState
        };
    }
}
