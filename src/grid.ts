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
        if (point.x < MarsSurface.zero || point.y < MarsSurface.zero) return false;
        return point.x <= this.width && point.y <= this.height;
    }
}
