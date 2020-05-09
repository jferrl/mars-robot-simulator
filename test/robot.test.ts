import { Orientation } from '../src/position';

import { aPoint, aRobot } from './helpers';

describe('Robot', (): void => {
    describe('constructor', (): void => {
        it('should create a defined instance', (): void => {
            expect(aRobot(aPoint(0, 0), Orientation.North)).toBeDefined();
        });
    });

    describe('withHints', (): void => {
        it('should return the current instance', (): void => {
            const robot = aRobot(aPoint(0, 0), Orientation.North);
            expect(robot.withHints([])).toBeDefined();
        });
    });
});
