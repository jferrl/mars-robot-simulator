import each from 'jest-each';

import { Command } from '../src/command';
import { Orientation } from '../src/position';
import { Robot, Rover } from '../src/robot';
import { Hint, Trace } from '../src/state';

import { aPoint, aRobot, aState } from './helpers';

describe('Rover', (): void => {
    describe('constructor', (): void => {
        it('should throw an error if state is not defined', (): void => {
            const state: any = undefined;
            expect((): any => new Rover(state)).toThrow();
        });

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
                { from: aState(aPoint(0, 0), Orientation.North), to: aState(aPoint(0, 0), Orientation.West) }
            ],
            [
                aRobot(aPoint(0, 0), Orientation.East),
                Command.Right,
                [],
                { from: aState(aPoint(0, 0), Orientation.East), to: aState(aPoint(0, 0), Orientation.South) }
            ],
            [
                aRobot(aPoint(0, 0), Orientation.North),
                Command.Forward,
                [],
                { from: aState(aPoint(0, 0), Orientation.North), to: aState(aPoint(0, 1), Orientation.North) }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.South),
                Command.Forward,
                [],
                { from: aState(aPoint(2, 1), Orientation.South), to: aState(aPoint(2, 0), Orientation.South) }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.East),
                Command.Forward,
                [],
                { from: aState(aPoint(2, 1), Orientation.East), to: aState(aPoint(3, 1), Orientation.East) }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.West),
                Command.Forward,
                [],
                { from: aState(aPoint(2, 1), Orientation.West), to: aState(aPoint(1, 1), Orientation.West) }
            ],
            [
                aRobot(aPoint(2, 1), Orientation.West),
                Command.Forward,
                [aState(aPoint(4, 0), Orientation.North), aState(aPoint(2, 1), Orientation.West), aState(aPoint(4, 4), Orientation.South)],
                { from: aState(aPoint(2, 1), Orientation.West), to: aState(aPoint(2, 1), Orientation.West) }
            ]
        ]).test('should return the current state of the robot', (robot: Robot, command: Command, hints: Hint[], expectedTrace: Trace): void => {
            expect(robot.withHints(hints).execute(command)).toEqual(expectedTrace);
        });
    });
});
