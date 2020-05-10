export const isDefined = (value: any, name: string): any => {
    if (!name) {
        throw new Error('name must be a valid instance');
    }
    if (name.trim().length === 0) {
        throw new Error('name value is empty');
    }
    if (value === undefined || value === null) {
        throw new Error(`${name} must be a valid instance`);
    }
    return value;
};
