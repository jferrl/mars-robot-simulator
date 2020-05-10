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

export const cloneState = (state: State): State => ({ coordinate: { ...state.coordinate }, orientation: state.orientation });

export type Hint = State;
