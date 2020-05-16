import { isDefined } from './guard';
import { Robot, Rover } from './robot';
import { State } from './state';

export interface RobotFactory {
    createRobot(state: State): Robot;
}

export class RoverFactory implements RobotFactory {
    createRobot(state: State): Robot {
        isDefined(state, 'state');
        return new Rover(state);
    }
}
