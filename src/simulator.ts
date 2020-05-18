import { Command } from './command';
import { Grid, Point } from './grid';
import { isDefined } from './guard';
import { HintsStorage } from './hints-storage';
import { Robot } from './robot';
import { RobotFactory } from './robot-factory';
import { formatStateResult, State, Trace } from './state';

export interface Simulation {
    commands: Command[];
    robotState: State;
}

export default class Simulator {
    private readonly simulations: Simulation[];

    constructor(private readonly grid: Grid, private readonly robotFactory: RobotFactory, private readonly hintsStorage: HintsStorage) {
        isDefined(grid, 'grid');
        isDefined(robotFactory, 'robotFactory');
        isDefined(hintsStorage, 'hintsStorage');
        this.simulations = [];
    }

    // bulk insert of simulations (only for test Simulator)
    withSimulations(simulations: Simulation[]): void {
        isDefined(simulations, 'simulations');
        this.simulations.push(...simulations);
    }

    createSimulation(commands: Command[], robotState: State): number {
        isDefined(robotState, 'robotState');
        isDefined(commands, 'commands');

        if (!this.isValidCoordinate(robotState.coordinate)) {
            throw new Error('invalid robot coordinate: out of map scope');
        }
        return this.simulations.push({ commands, robotState });
    }

    start(): string[] {
        const results: string[] = [];
        this.simulations.forEach((simulation: Simulation): void => {
            const robot = this.robotFactory.createRobot(simulation.robotState, this.hintsStorage.getAll());
            const result = this.runSimulation(robot, simulation.commands);
            results.push(result);
        });
        return results;
    }

    private runSimulation(robot: Robot, commands: Command[]): string {
        let trace: Trace = {} as any;
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
        this.hintsStorage.add(state);
    }
}
