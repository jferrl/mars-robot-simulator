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

export const formatStateResult = (state: State, isLost: boolean = false): string => {
    const template = `${state.coordinate.x}${state.coordinate.y}${Orientation[state.orientation]}`;
    return isLost ? `${template}LOST` : template;
};

export type Hint = State;
