import each from 'jest-each';

import { Command } from '../src/command';
import { Orientation } from '../src/position';
import Simulator, { Simulation } from '../src/simulator';

import { aHintsStorage, aPoint, aState, marsSurface, roverFactory } from './helpers';

describe('Simulator', (): void => {
    const aSimulator = (width: number, height: number): Simulator => new Simulator(marsSurface(width, height), roverFactory(), aHintsStorage());

    describe('constructor', (): void => {
        it('should throw an error if grid is not defined', (): void => {
            const grid: any = undefined;
            expect((): any => new Simulator(grid, roverFactory(), aHintsStorage())).toThrow();
        });

        it('should throw an error if factory is not defined', (): void => {
            const factory: any = undefined;
            expect((): any => new Simulator(marsSurface(0, 0), factory, aHintsStorage())).toThrow();
        });

        it('should throw an error if hintsStorage is not defined', (): void => {
            const hintsStorage: any = undefined;
            expect((): any => new Simulator(marsSurface(0, 0), roverFactory(), hintsStorage)).toThrow();
        });

        it('should create a defined instance', (): void => {
            expect(aSimulator(0, 0)).toBeDefined();
        });
    });

    describe('createSimulation', (): void => {
        it('should throw an error if robot is not defined', (): void => {
            const simulator = aSimulator(10, 10);
            const robot: any = undefined;
            expect((): any => simulator.createSimulation([Command.Forward, Command.Left], robot)).toThrow();
        });

        it('should throw an error if commands are not defined', (): void => {
            const simulator = aSimulator(10, 10);
            const commands: any = undefined;
            expect((): any => simulator.createSimulation(commands, aState(aPoint(0, 0), Orientation.North))).toThrow();
        });

        it('should throw an error if robot coordinate is not in the grid scope', (): void => {
            const simulator = aSimulator(10, 10);
            expect((): any => simulator.createSimulation([Command.Forward, Command.Left], aState(aPoint(11, 10), Orientation.North))).toThrow();
        });

        it('should add new simulation without error', (): void => {
            const simulator = aSimulator(10, 10);

            expect(simulator.createSimulation([Command.Forward, Command.Left], aState(aPoint(0, 0), Orientation.North))).toEqual(1);
            expect(simulator.createSimulation([Command.Forward, Command.Right], aState(aPoint(0, 10), Orientation.South))).toEqual(2);
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
                        robotState: aState(aPoint(1, 1), Orientation.East)
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
                        robotState: aState(aPoint(3, 2), Orientation.North)
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
                        robotState: aState(aPoint(0, 3), Orientation.West)
                    }
                ] as Simulation[],
                ['11East', '33NorthLOST', '23South']
            ],
            [
                0,
                0,
                [
                    {
                        commands: [Command.Right, Command.Right, Command.Left],
                        robotState: aState(aPoint(0, 0), Orientation.North)
                    },
                    {
                        commands: [Command.Right, Command.Forward, Command.Left],
                        robotState: aState(aPoint(0, 0), Orientation.South)
                    }
                ] as Simulation[],
                ['00East', '00WestLOST']
            ]
        ]).test('should execute all simulations', (width: number, height: number, simulations: Simulation[], expected: string[]): void => {
            const simulator = aSimulator(width, height);
            simulator.withSimulations(simulations);
            expect(simulator.start()).toEqual(expected);
        });
    });
});
