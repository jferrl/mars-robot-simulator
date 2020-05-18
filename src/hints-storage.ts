import { Hint } from './state';

export interface HintsStorage {
    add(hint: Hint): void;
    getAll(): Hint[];
}

export class HintsRepository implements HintsStorage {
    private readonly hints: Hint[];

    constructor() {
        this.hints = [];
    }

    add(hint: Hint): void {
        this.hints.push(hint);
    }

    getAll(): Hint[] {
        return Array.from(this.hints);
    }
}
