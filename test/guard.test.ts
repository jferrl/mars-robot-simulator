import each from 'jest-each';

import { isDefined } from '../src/guard';

describe('isDefined', (): void => {
    const fakeObject: any = {};
    each([
        [fakeObject, undefined, true],
        [fakeObject, '', true],
        [undefined, 'fakeObject', true],
        [null, 'fakeObject', true],
        [fakeObject, 'fakeObject', false]
    ]).test('returs the passed value if it is defined', (value: any, name: string, error: boolean): void => {
        error ? expect((): void => isDefined(value, name)).toThrow() : expect(isDefined(value, name)).toEqual(value);
    });
});
