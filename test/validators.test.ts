import { isEvenNumber, isPositiveInteger } from '../src/validators';

describe('isPositiveInteger', (): void => {
    it('should be falsy if value is NaN', (): void => {
        expect(isPositiveInteger(NaN)).toBeFalsy();
    });

    it('should be falsy if value is a negative integer', (): void => {
        expect(isPositiveInteger(-1)).toBeFalsy();
    });

    it('should be falsy if value is a float', (): void => {
        expect(isPositiveInteger(0.999)).toBeFalsy();
    });

    it('should be falsy if value is not defined', (): void => {
        const value: any = undefined;
        expect(isPositiveInteger(value)).toBeFalsy();
    });

    it('should be truthy if value is 0', (): void => {
        expect(isPositiveInteger(0)).toBeTruthy();
    });

    it('should be truthy if value is a positive integer', (): void => {
        expect(isPositiveInteger(20)).toBeTruthy();
    });
});

describe('isEvenNumber', (): void => {
    it('should be falsy if value is NaN', (): void => {
        expect(isEvenNumber(NaN)).toBeFalsy();
    });

    it('should be falsy if value is a float', (): void => {
        expect(isEvenNumber(2.4)).toBeFalsy();
    });

    it('should be falsy if value is a negative float', (): void => {
        expect(isEvenNumber(-2.4)).toBeFalsy();
    });

    it('should be falsy if value is not even negative integer', (): void => {
        expect(isEvenNumber(-1)).toBeFalsy();
    });

    it('should be truthy if value is even negative integer', (): void => {
        expect(isEvenNumber(-2)).toBeTruthy();
    });

    it('should be truthy if value is even', (): void => {
        expect(isEvenNumber(2)).toBeTruthy();
    });
});
