import { Point } from '../src/grid';
import { Orientation } from '../src/position';
import Robot from '../src/robot';
import { State } from '../src/state';

describe('Robot', (): void => {
    const aRobot = (currentState: State): Robot => new Robot(currentState);
    const aState = (coordinate: Point, orientation: Orientation): State => ({
        coordinate,
        orientation
    });
    const aPoint = (x: number, y: number): Point => ({ x, y });

    describe('constructor', (): void => {
        it('should create a defined instance', (): void => {
            expect(aRobot(aState(aPoint(0, 0), Orientation.North))).toBeDefined();
        });
    });
});
