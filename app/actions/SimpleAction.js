export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";

export function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

export function receiveLogin() {
    return {
        type: RECEIVE_LOGIN
    }
}

export function login() {
    return (dispatch) => {
        dispatch(requestLogin());
        console.log("Check states");
        dispatch(receiveLogin());
    }
}