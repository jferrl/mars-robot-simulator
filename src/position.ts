const cardinalPointsLen: number = 4;

export enum Orientation {
    North = 0,
    East = 1,
    South = 2,
    West = 3
}

export enum Rotation {
    Left = -1,
    Right = 1
}

export const computeOrientation = (position: number): number => ((position % cardinalPointsLen) + cardinalPointsLen) % cardinalPointsLen;
