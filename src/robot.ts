import { Command } from './command';
import { computeOrientation, Orientation, Rotation } from './position';
import RobotState from './robot-state';
import { cloneState, Hint, State, Trace } from './state';

export interface Robot {
    execute(command: Command): Trace;
    withHints(hints: Hint[]): Robot;
}

export class Rover extends RobotState implements Robot {
    private hints: Hint[];

    constructor(state: State) {
        super(state);
        this.hints = [];
    }

    execute(command: Command): Trace {
        switch (command) {
            case Command.Left:
                this.turnLeft();
                break;
            case Command.Right:
                this.turnRight();
                break;
            case Command.Forward:
                this.forward();
                break;
        }
        return this.trace;
    }

    withHints(hints: Hint[]): Robot {
        this.hints = hints;
        return this;
    }

    private turnLeft(): void {
        this.rotate(Rotation.Left);
    }

    private turnRight(): void {
        this.rotate(Rotation.Right);
    }

    private forward(): void {
        const state = cloneState(this.currentState);
        if (!this.canForward()) {
            this.addState(state);
            return;
        }
        this.move(state);
        this.addState(state);
    }

    private move(state: State): void {
        switch (this.orientation) {
            case Orientation.North:
                state.coordinate.y++;
                break;
            case Orientation.South:
                state.coordinate.y--;
                break;
            case Orientation.East:
                state.coordinate.x++;
                break;
            case Orientation.West:
                state.coordinate.x--;
                break;
        }
    }

    private canForward(): boolean {
        for (const hint of this.hints) {
            if (this.isStateEquals(hint)) {
                return false;
            }
        }
        return true;
    }

    private rotate(rotation: Rotation): void {
        const state: State = cloneState(this.currentState);
        state.orientation = computeOrientation(this.orientation + rotation);
        this.addState(state);
    }
}
