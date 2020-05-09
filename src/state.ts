import { Point } from './grid';
import { Orientation } from './position';

export interface State {
    coordinate: Point;
    orientation: Orientation;
}

export interface Trace {
    from: State;
    to: State;
}

export type EmptyTrace = undefined;
export type Hint = State;
