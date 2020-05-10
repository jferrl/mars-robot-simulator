import { Command } from './command';
import { Grid } from './grid';
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
        this.simulations = [];
        this.invalidStates = [];
    }

    withSimulations(simulations: Simulation[]): void {
        this.simulations.push(...simulations);
    }

    createSimulation(robot: Robot, commands: Command[]): number {
        return this.simulations.push({ robot, commands });
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

    private isInvalidMovement(trace: Trace, command: Command): boolean {
        return command === Command.Forward && !this.grid.hasPoint(trace.to.coordinate);
    }

    private registerInvalidState(state: State): void {
        this.invalidStates.push(state);
    }
}

const formatStateResult = (state: State, isLost: boolean = false): string => {
    const template = `${state.coordinate.x}${state.coordinate.y}${Orientation[state.orientation]}`;
    return isLost ? `${template}LOST` : template;
};
