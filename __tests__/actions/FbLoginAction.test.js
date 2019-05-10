import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import * as Auth from '../../app/actions/firebase/Auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureMockStore from 'redux-mock-store';
import { fbLogin } from '../../app/actions/FbLoginAction';

// Mocking store
const middlewares = [thunk, logger];
const mockStore = configureMockStore(middlewares);

// Testing fbLogin() function  in ./app/actions/FbLoginAction

describe('testing of fbLogin', () => {
    let credentials = {
        idToken: 'someRandomStringOfIdToken',
        accessToken: 'someRandomStringOfAccessToken'
    };

    // Mocking functions used in the fbLogin() function

    LoginManager.logInWithReadPermissions = jest.fn(() => Promise.resolve({
        isCancelled: false
    }));
    AccessToken.getCurrentAccessToken = jest.fn(() => Promise.resolve(credentials));
    Auth.loginCustomFirebase = jest.fn(() => new Promise((resolve) => {
        resolve(credentials);
    }));
    Actions.main = jest.fn();

    it('checks the working of facebook login', async() => {
        const store = mockStore({});
        expect.assertions(6);
        await store.dispatch(fbLogin()).then(() => {
            // The following mentioned snapshot is stored in __snapshots__ folder
            expect(store.getActions()).toMatchSnapshot();
        });
        expect(LoginManager.logInWithReadPermissions).toHaveBeenCalledTimes(1);
        expect(AccessToken.getCurrentAccessToken).toHaveBeenCalledTimes(1);
        expect(Auth.loginCustomFirebase).toHaveBeenCalledTimes(1);
        expect(Auth.loginCustomFirebase).toBeCalledWith('facebook', credentials.accessToken, null);
        expect(Actions.main).toHaveBeenCalledTimes(1);
    });
});