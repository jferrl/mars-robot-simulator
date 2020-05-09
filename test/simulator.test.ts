import each from 'jest-each';

import { Command } from '../src/command';
import { Orientation } from '../src/position';
import Simulator, { Simulation } from '../src/simulator';

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
        each([
            [
                5,
                3,
                [
                    {
                        commands: [
                            Command.Right,
                            Command.Forward,
                            Command.Right,
                            Command.Forward,
                            Command.Right,
                            Command.Forward,
                            Command.Right,
                            Command.Forward
                        ],
                        robot: aRobot(aPoint(1, 1), Orientation.East)
                    },
                    {
                        commands: [
                            Command.Forward,
                            Command.Right,
                            Command.Right,
                            Command.Forward,
                            Command.Left,
                            Command.Left,
                            Command.Forward,
                            Command.Forward,
                            Command.Right,
                            Command.Right,
                            Command.Forward,
                            Command.Left,
                            Command.Left
                        ],
                        robot: aRobot(aPoint(3, 2), Orientation.North)
                    },
                    {
                        commands: [
                            Command.Left,
                            Command.Left,
                            Command.Forward,
                            Command.Forward,
                            Command.Forward,
                            Command.Left,
                            Command.Forward,
                            Command.Left,
                            Command.Forward,
                            Command.Left
                        ],
                        robot: aRobot(aPoint(0, 3), Orientation.West)
                    }
                ],
                ['11East', '33NorthLOST', '23South']
            ]
        ]).test('should execute all simulations', (width: number, height: number, simulations: Simulation[], expected: string[]): void => {
            const simulator = aSimulator(width, height);
            simulator.withSimulations(simulations);
            expect(simulator.start()).toEqual(expected);
        });
    });
});
