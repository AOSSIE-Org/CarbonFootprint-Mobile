import { googleSignIn } from '../../app/actions/GoogleLoginAction';
import GoogleSignIn from 'react-native-google-sign-in';
import { Actions } from 'react-native-router-flux';
import { googleSignInConfig } from '../../app/config/keys';
import * as Auth from '../../app/actions/firebase/Auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureMockStore from 'redux-mock-store';

// Mocking store
const middlewares = [thunk, logger];
const mockStore = configureMockStore(middlewares);

// Testing googleSignIn() function in ./app/actions/GoogleLoginAction

describe('testing of googleSignIn', () => {
    let credentials = {
        idToken: 'someRandomStringOfIdToken',
        accessToken: 'someRandomStringOfAccessToken'
    };

    // Mocking functions used in googleSignIn function

    GoogleSignIn.configure = jest.fn((googleSignInConfig) => new Promise((resolve) => {
        resolve();
    }));
    GoogleSignIn.signInPromise = jest.fn(() => new Promise((resolve) => {
        resolve(credentials);
    }));
    Auth.loginCustomFirebase = jest.fn(() => new Promise((resolve) => {
        resolve(credentials);
    }));
    Actions.main = jest.fn();

    it('checks the working of google sign in', async() => {
        const store = mockStore({});
        expect.assertions(8);
        await store.dispatch(googleSignIn()).then(() => {
            // The following snapshot is stored in __snapshots__ folder
            expect(store.getActions()).toMatchSnapshot();
        });
        expect(GoogleSignIn.configure).toHaveBeenCalledTimes(1);
        expect(GoogleSignIn.configure).toHaveBeenCalledWith(googleSignInConfig);
        expect(GoogleSignIn.signInPromise).toHaveBeenCalledTimes(1);
        await GoogleSignIn.signInPromise().then((res) => expect(res).toEqual(credentials));
        expect(Auth.loginCustomFirebase).toHaveBeenCalledTimes(1);
        expect(Auth.loginCustomFirebase).toBeCalledWith('google', credentials.idToken, credentials.accessToken);
        expect(Actions.main).toHaveBeenCalledTimes(1);
    });
});