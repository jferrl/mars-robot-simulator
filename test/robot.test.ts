import each from 'jest-each';

import { Command } from '../src/command';
import { Orientation } from '../src/position';
import Robot from '../src/robot';
import { Hint, Trace } from '../src/state';

import { aPoint, aRobot, aState } from './helpers';

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

    describe('execute', (): void => {
        each([
            [
                aRobot(aPoint(0, 0), Orientation.North),
                Command.Left,
                [],
                { from: aState(aPoint(0, 0), Orientation.North), to: aState(aPoint(0, 0), Orientation.West), isForward: false }
            ]
        ]).test('should return the actual trace of the robot', (robot: Robot, command: Command, hints: Hint[], expectedTrace: Trace): void => {
            expect(robot.withHints(hints).execute(command)).toEqual(expectedTrace);
        });
    });
});
