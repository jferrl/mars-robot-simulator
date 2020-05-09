import { Command } from './command';
import { Orientation, Rotation } from './position';
import RobotState from './robot-state';
import { Hint, State, Trace } from './state';

export default class Robot extends RobotState {
    private hints: Hint[];

    constructor(currentState: State) {
        super(currentState);
        this.hints = [];
    }

    execute(command: Command): Trace | undefined {
        switch (command) {
            case Command.Left:
                this.turnLeft();
                break;
            case Command.Right:
                this.turnRight();
                break;
            case Command.Forward:
                return this.forward() ? this.traces : undefined;
        }
        return undefined;
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

    private forward(): boolean {
        if (!this.canForward()) return false;

        const state = { ...this.currentState };
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
        return this.addState(state);
    }

    private canForward(): boolean {
        let isValidMovement: boolean = true;
        for (const hint of this.hints) {
            if (this.currentState === hint) {
                isValidMovement = false;
                break;
            }
        }
        return isValidMovement;
    }

    private rotate(rotation: Rotation): void {
        const state = { ...this.currentState };
        state.orientation = (this.orientation + rotation) % Object.keys(Orientation).length;
        this.addState(state);
    }
}
