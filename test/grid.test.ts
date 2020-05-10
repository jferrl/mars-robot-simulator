import each from 'jest-each';

import MarsSurface, { Point } from '../src/grid';

import { aPoint, marsSurface } from './helpers';

describe('MarsSurface', (): void => {
    describe('constructor', (): void => {
        it('should throw an error if width is not defined', (): void => {
            const width: any = undefined;
            expect((): any => new MarsSurface(width, 8)).toThrow();
        });

        it('should throw an error if height is not defined', (): void => {
            const height: any = undefined;
            expect((): any => new MarsSurface(8, height)).toThrow();
        });

        it('should create a defined instance', (): void => {
            expect(marsSurface(0, 0)).toBeDefined();
        });
    });

    describe('hasPoint', (): void => {
        each([
            [marsSurface(43, 0), aPoint(44, 1), false],
            [marsSurface(0, 0), aPoint(0, 1), false],
            [marsSurface(12, 11), aPoint(-1, 1), false],
            [marsSurface(20, 11), aPoint(10, -1), false],
            [marsSurface(43, 1), aPoint(30, 0), true],
            [marsSurface(1, 1), aPoint(1, 1), true],
            [marsSurface(0, 0), aPoint(0, 0), true]
        ]).test('should return if a point in inside the grid', (grid: MarsSurface, point: Point, expected: boolean): void => {
            expect(grid.hasPoint(point)).toBe(expected);
        });
    });
});
