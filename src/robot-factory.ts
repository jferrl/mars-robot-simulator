import { isDefined } from './guard';
import { Robot, Rover } from './robot';
import { Hint, State } from './state';

export interface RobotFactory {
    createRobot(state: State, hints: Hint[]): Robot;
}

export class RoverFactory implements RobotFactory {
    createRobot(state: State, hints: Hint[]): Robot {
        isDefined(state, 'state');
        isDefined(hints, 'hints');
        return new Rover(state, hints);
    }
}
