import { Orientation } from '../src/position';

import { aPoint, aState, roverFactory } from './helpers';

describe('RoverFactory', (): void => {
    describe('constructor', (): void => {
        it('should create a defined instance', (): void => {
            expect(roverFactory()).toBeDefined();
        });
    });

    describe('createRobot', (): void => {
        it('should throw an error if state is not defined', (): void => {
            const state: any = undefined;
            expect((): any => roverFactory().createRobot(state, [])).toThrow();
        });
        it('should throw an error if hints are not defined', (): void => {
            const hints: any = undefined;
            expect((): any => roverFactory().createRobot(aState(aPoint(0, 0), Orientation.North), hints)).toThrow();
        });
        it('should create a defined robot instance', (): void => {
            expect(roverFactory().createRobot(aState(aPoint(0, 0), Orientation.North), [])).toBeDefined();
        });
    });
});
