import { Command } from './command';
import { Grid } from './grid';
import Robot from './robot';
import { Hint } from './state';

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

    createSimulation(robot: Robot, commands: Command[]): number {
        return this.simulations.push({ robot, commands });
    }

    start(): void {
        this.simulations.forEach((simulation: Simulation): void => {
            this.runSimulation(simulation.robot.withHints(this.invalidStates), simulation.commands);
        });
    }

    private runSimulation(robot: Robot, commands: Command[]): void {
        for (const command of commands) {
            const trace = robot.execute(command);
            if (trace.isForward && !this.grid.hasPoint(trace.to.coordinate)) {
                this.invalidStates.push(trace.from);
                break;
            }
        }
    }
}
