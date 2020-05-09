import each from 'jest-each';

import MarsSurface, { Point } from '../src/grid';

import { aPoint } from './helpers';

describe('MarsSurface', (): void => {
    const marsSurface = (width: number, height: number): MarsSurface => new MarsSurface(width, height);

    describe('constructor', (): void => {
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
