import * as firebase from "firebase";
import { Actions, ActionConst } from 'react-native-router-flux';
import { setStorage } from './StorageAction';

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";

export function requestLogin(email, pass) {
    return {
        type: REQUEST_LOGIN,
        email: email,
        pass: pass
    }
}

export function receiveLogin() {
    return {
        type: RECEIVE_LOGIN
    }
}

async function firebaseSignin(email, pass) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        alert("Logged In!");
        // Navigate to the Home page
        Actions.main({type: ActionConst.RESET});
        Actions.calculate();
        return true;
    } catch (error) {
        alert(error.toString());
        return false;
    }
}

export function login(email, pass) {
    return (dispatch) => {
        dispatch(requestLogin(email, pass));
        let success = firebaseSignin(email, pass);
        if(success) {
            // Storing user's email in Local storage by dispatching setStorage action 
            dispatch(setStorage(email));
        }
        console.log("Check states");
        dispatch(receiveLogin());
    }
}

async function firebaseSignup(email, pass) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, pass);
        alert("Account created");
        // Navigate to the Home page, the user is auto logged in
        Actions.main({type: ActionConst.RESET});
        Actions.calculate();
        // Storing user's email in Local storage by dispatching setStorage action 
        dispatch(setStorage(email));
        return true;
    } catch (error) {
        alert(error.toString());
        return false;
    }
}

export function signup(name, email, pass) {
    return (dispatch) => {
        let success = firebaseSignup(email, pass);
        if(success) {
            // Storing user's email in Local storage by dispatching setStorage action 
            dispatch(setStorage(json.email));
        }
    }
}

async function firebaseLogout() {
    try {
        await firebase.auth().signOut();
        // Navigate to login view
        Actions.landing();
    } catch (error) {
        console.log(error);
    }
}

export function logout() {
    return (dispatch) => {
        firebaseLogout();
    }
}