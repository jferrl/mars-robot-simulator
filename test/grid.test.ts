// import each from 'jest-each';

import MarsSurface from '../src/grid';

describe('MarsSurface', (): void => {
    const marsSurface = (width: number, height: number): MarsSurface => new MarsSurface(width, height);

    describe('constructor', (): void => {
        it('should create a defined instance', (): void => {
            expect(marsSurface(0, 0)).toBeDefined();
        });
    });

    // TODO: convert test to jest eah

    describe('hasPoint', (): void => {
        it('should be falsy if a point in not inside the grid', (): void => {
            expect(marsSurface(43, 0).hasPoint({ x: 44, y: 1 })).toBeFalsy();
            expect(marsSurface(0, 0).hasPoint({ x: 0, y: 1 })).toBeFalsy();
            expect(marsSurface(12, 11).hasPoint({ x: -1, y: 1 })).toBeFalsy();
            expect(marsSurface(20, 11).hasPoint({ x: 10, y: -1 })).toBeFalsy();
        });

        it('should be truthy if a point in inside the grid', (): void => {
            expect(marsSurface(43, 0).hasPoint({ x: 30, y: 0 })).toBeTruthy();
            expect(marsSurface(1, 1).hasPoint({ x: 1, y: 1 })).toBeTruthy();
            expect(marsSurface(0, 0).hasPoint({ x: 0, y: 0 })).toBeTruthy();
        });
    });
});
