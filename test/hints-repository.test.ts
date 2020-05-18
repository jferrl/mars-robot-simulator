import { Orientation } from '../src/position';

import { aHint, aHintsStorage, aPoint } from './helpers';

describe('HintsRepository', (): void => {
    describe('constructor', (): void => {
        it('should create a defined instance', (): void => {
            expect(aHintsStorage()).toBeDefined();
        });
    });

    describe('getAll', (): void => {
        it('should return all stored hints', (): void => {
            const storage = aHintsStorage();
            expect(storage.getAll()).toEqual([]);
            const hint = aHint(aPoint(4, 0), Orientation.North);
            storage.add(hint);
            expect(storage.getAll()).toEqual([hint]);
        });
    });
});
