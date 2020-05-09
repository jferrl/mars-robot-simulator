import MarsSurface, { Point } from '../src/grid';
import { Orientation } from '../src/position';
import Robot from '../src/robot';
import { State } from '../src/state';

export const aRobot = (coordinate: Point, orientation: Orientation): Robot => new Robot(aState(coordinate, orientation));
export const aState = (coordinate: Point, orientation: Orientation): State => ({
    coordinate,
    orientation
});
export const aPoint = (x: number, y: number): Point => ({ x, y });

export const marsSurface = (width: number, height: number): MarsSurface => new MarsSurface(width, height);
