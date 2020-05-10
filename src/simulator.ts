import { Command } from './command';
import { Grid, Point } from './grid';
import { isDefined } from './guard';
import { Orientation } from './position';
import Robot from './robot';
import { Hint, State, Trace } from './state';

export interface Simulation {
    robot: Robot;
    commands: Command[];
}

export default class Simulator {
    private readonly simulations: Simulation[];
    private readonly invalidStates: Hint[];

    constructor(private readonly grid: Grid) {
        isDefined(grid, 'grid');
        this.simulations = [];
        this.invalidStates = [];
    }

    // bulk insert of simulations ready for test Simulator
    withSimulations(simulations: Simulation[]): void {
        isDefined(simulations, 'simulations');
        this.simulations.push(...simulations);
    }

    createSimulation(robotState: State, commands: Command[]): number {
        isDefined(robotState, 'robotState');
        isDefined(commands, 'commands');

        if (!this.isValidCoordinate(robotState.coordinate)) {
            throw new Error('invalid robot coordinate: out of map scope');
        }
        return this.simulations.push({ robot: new Robot(robotState), commands });
    }

    start(): string[] {
        const results: string[] = [];
        this.simulations.forEach((simulation: Simulation): void => {
            const result = this.runSimulation(simulation.robot.withHints(this.invalidStates), simulation.commands);
            results.push(result);
        });
        return results;
    }

    private runSimulation(robot: Robot, commands: Command[]): string {
        let trace: any = {};
        for (const command of commands) {
            trace = robot.execute(command);

            if (this.isInvalidMovement(trace, command)) {
                this.registerInvalidState(trace.from);
                return formatStateResult(trace.from, true);
            }
        }
        return formatStateResult(trace.to);
    }

    private isValidCoordinate(point: Point): boolean {
        return this.grid.hasPoint(point);
    }

    private isInvalidMovement(trace: Trace, command: Command): boolean {
        return command === Command.Forward && !this.isValidCoordinate(trace.to.coordinate);
    }

    private registerInvalidState(state: State): void {
        this.invalidStates.push(state);
    }
}

const formatStateResult = (state: State, isLost: boolean = false): string => {
    const template = `${state.coordinate.x}${state.coordinate.y}${Orientation[state.orientation]}`;
    return isLost ? `${template}LOST` : template;
};
