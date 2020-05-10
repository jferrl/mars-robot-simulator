export interface Point {
    x: number;
    y: number;
}

export interface Grid {
    hasPoint(point: Point): boolean;
}

export default class MarsSurface implements Grid {
    private static readonly zero: number = 0;

    constructor(private readonly width: number, private readonly height: number) {}

    hasPoint(point: Point): boolean {
        return this.isInXAxisScope(point.x) && this.isInYAxisScope(point.y);
    }

    private isInXAxisScope(x: number): boolean {
        return x >= MarsSurface.zero && x <= this.width;
    }

    private isInYAxisScope(y: number): boolean {
        return y >= MarsSurface.zero && y <= this.height;
    }
}
