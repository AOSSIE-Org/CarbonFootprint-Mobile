export const FIRST_OPEN = 'FIRST_OPEN';
export function first_open() {
    return {
        type: FIRST_OPEN
    };
}

export function firstOpen() {
    return (dispatch, getState) => {
        dispatch(first_open());
    };
}
