export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";

function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

function recieveLogin() {
    return {
        type: RECEIVE_LOGIN
    }
}

export function login() {
    return (dispatch) => {
        dispatch(requestLogin());
        console.log("Check states");
        dispatch(recieveLogin());
    }
}
