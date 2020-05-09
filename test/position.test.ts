import each from 'jest-each';

import { computeOrientation, Orientation } from '../src/position';

describe('computeOrientation', (): void => {
    each([
        [-1, Orientation.West],
        [0, Orientation.North],
        [1, Orientation.East],
        [2, Orientation.South],
        [3, Orientation.West],
        [4, Orientation.North]
    ]).test('returs the result of compute orientation if apply %d rotation', (rotation: number, orientation: Orientation): void => {
        expect(computeOrientation(rotation)).toEqual(orientation);
    });
});
