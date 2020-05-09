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
            ],
            [
                aRobot(aPoint(0, 0), Orientation.East),
                Command.Right,
                [],
                { from: aState(aPoint(0, 0), Orientation.East), to: aState(aPoint(0, 0), Orientation.South), isForward: false }
            ],
            [
                aRobot(aPoint(0, 0), Orientation.North),
                Command.Forward,
                [],
                { from: aState(aPoint(0, 0), Orientation.North), to: aState(aPoint(0, 1), Orientation.North), isForward: true }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.South),
                Command.Forward,
                [],
                { from: aState(aPoint(2, 1), Orientation.South), to: aState(aPoint(2, 0), Orientation.South), isForward: true }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.East),
                Command.Forward,
                [],
                { from: aState(aPoint(2, 1), Orientation.East), to: aState(aPoint(3, 1), Orientation.East), isForward: true }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.West),
                Command.Forward,
                [],
                { from: aState(aPoint(2, 1), Orientation.West), to: aState(aPoint(1, 1), Orientation.West), isForward: true }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.West),
                Command.Forward,
                [aState(aPoint(4, 0), Orientation.North), aState(aPoint(2, 1), Orientation.West), aState(aPoint(4, 4), Orientation.South)],
                { from: aState(aPoint(2, 1), Orientation.West), to: aState(aPoint(2, 1), Orientation.West), isForward: false }
            ]
        ]).test('should return the actual trace of the robot', (robot: Robot, command: Command, hints: Hint[], expectedTrace: Trace): void => {
            expect(robot.withHints(hints).execute(command)).toEqual(expectedTrace);
        });
    });
});
