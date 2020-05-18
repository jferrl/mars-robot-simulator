import MarsSurface, { Point } from '../src/grid';
import { HintsRepository, HintsStorage } from '../src/hints-storage';
import { Orientation } from '../src/position';
import { Robot, Rover } from '../src/robot';
import { RobotFactory, RoverFactory } from '../src/robot-factory';
import { Hint, State } from '../src/state';

export const aRobot = (coordinate: Point, orientation: Orientation, hints: Hint[]): Robot => new Rover(aState(coordinate, orientation), hints);
export const aState = (coordinate: Point, orientation: Orientation): State => ({
    coordinate,
    orientation
});
export const aHint = (coordinate: Point, orientation: Orientation): Hint => ({
    coordinate,
    orientation
});
export const aHintsStorage = (): HintsStorage => new HintsRepository();
export const aPoint = (x: number, y: number): Point => ({ x, y });
export const marsSurface = (width: number, height: number): MarsSurface => new MarsSurface(width, height);
export const roverFactory = (): RobotFactory => new RoverFactory();
