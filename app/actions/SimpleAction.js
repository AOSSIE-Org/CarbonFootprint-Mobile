export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECIEVE_LOGIN = "RECIEVE_LOGIN";
export const STORE_USER_INFO = "STORE_USER_INFO"; 

function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

function recieveLogin() {
    return {
        type: RECIEVE_LOGIN
    }
}

export function storeUserInfo(userName) { // To store username in state
    return {
        type: STORE_USER_INFO,
        username: userName
    }
}

export function login() {
    return (dispatch) => {
        dispatch(requestLogin());
        console.log("Check states");
        dispatch(recieveLogin());
    }
}