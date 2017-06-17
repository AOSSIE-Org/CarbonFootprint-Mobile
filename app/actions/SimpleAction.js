export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECIEVE_LOGIN = "RECIEVE_LOGIN";

export function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

export function recieveLogin() {
    return {
        type: RECIEVE_LOGIN
    }
}

export function login() {
    return (dispatch) => {
        dispatch(requestLogin());
        console.log("Check states");
        dispatch(recieveLogin());
    }
}