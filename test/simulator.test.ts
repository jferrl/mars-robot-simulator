// import each from 'jest-each';
import { Command } from '../src/command';
import { Orientation } from '../src/position';
import Simulator from '../src/simulator';

import { aPoint, aRobot, marsSurface } from './helpers';

describe('Simulator', (): void => {
    const aSimulator = (width: number, height: number): Simulator => new Simulator(marsSurface(width, height));

    describe('constructor', (): void => {
        it('should create a defined instance', (): void => {
            expect(aSimulator(0, 0)).toBeDefined();
        });
    });

    describe('createSimulation', (): void => {
        it('should add new simulation without error', (): void => {
            const simulator = aSimulator(10, 10);

            expect(simulator.createSimulation(aRobot(aPoint(0, 0), Orientation.North), [Command.Forward, Command.Left])).toEqual(1);
            expect(simulator.createSimulation(aRobot(aPoint(0, 10), Orientation.South), [Command.Forward, Command.Right])).toEqual(2);
        });
    });

    describe('start', (): void => {
        // each([
        //     [marsSurface(43, 0), aPoint(44, 1), false],
        //     [marsSurface(0, 0), aPoint(0, 1), false],
        //     [marsSurface(12, 11), aPoint(-1, 1), false],
        //     [marsSurface(20, 11), aPoint(10, -1), false],
        //     [marsSurface(43, 1), aPoint(30, 0), true],
        //     [marsSurface(1, 1), aPoint(1, 1), true],
        //     [marsSurface(0, 0), aPoint(0, 0), true]
        // ]).test('should return if a point in inside the grid', (grid: MarsSurface, point: Point, expected: boolean): void => {
        //     expect(grid.hasPoint(point)).toBe(expected);
        // });
    });
});
