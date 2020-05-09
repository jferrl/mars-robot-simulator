export const isPositiveInteger = (value: number): boolean => {
    return value >= 0 && Number.isInteger(value);
};

export const isEvenNumber = (value: number): boolean => {
    return value % 2 === 0;
};
