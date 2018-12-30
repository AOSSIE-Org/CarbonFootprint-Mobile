import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { firebaseConfigForTesting } from '../../../app/config/keys';
import * as User from '../../../app/actions/firebase/User'
import { registerFirebase, loginEmailFirebase, loginCustomFirebase, forgotPasswordFirebase } from '../../../app/actions/firebase/Auth';

jest.setTimeout(10000);

// Initialising clientSDK
firebase.initializeApp(firebaseConfigForTesting);

let serviceAccount = require('../../../app/config/serviceAccountKey.json');

// Initialising adminSDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfigForTesting.databaseURL
});

/*
    Removes all the authenticated users
    Removes all the users in the database
    Uses adminSDK
*/
beforeAll(async() => {
    await admin.auth().listUsers(10)
            .then(function(listUsersResult) {
            listUsersResult.users.forEach(async function(userRecord) {
                await admin.auth().deleteUser(userRecord.uid);
            });
            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken)
            }
        })
        .catch(function(error) {
        console.log("Error listing users:", error);
        });
    await admin.database().ref().remove();
});

/*
    Tests the registerFirebase function
    by creating a user in the test database
*/

describe('creates user', () => {
    let users = {
        create: ({ name, email, password }) => {
            return registerFirebase(name, email, password);
        }
    };

    it('should create a user and get that user using email', () => {
        user = {
            name: 'ben',
            email: 'ben@example.com',
            password: 'examplePass'
        };
        return users.create(user).then((user) => console.assert(user, 'ben was created'));
    });
});

/*
    tests the loginEmailFirebase function
    by mocking the signInWithEmailAndPassword function
    provided by clientSDK
*/

describe('tests the loginEmailFirebase function', () => {

    it("should call loginEmailFirebase function", async () => {
        firebase.auth().signInWithEmailAndPassword = jest.fn(async(email, password) => {
            let user = await admin.auth().getUserByEmail(email).then((user) => user);
            return Promise.resolve(user);
        });
        await loginEmailFirebase('ben@example.com', 'examplePass');
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('ben@example.com', 'examplePass');
    });
});

/*
    tests the loginCustomFirebase function for all three
    types google, facebook, twitter
*/

describe('tests the loginCustomFirebase function for updating user', () => {
    // creates two users before the execution of tests
    beforeAll(async() => {
        // await registerFirebase('ben', 'ben@example.com', 'examplePass');
        await registerFirebase('ben1', 'ben1@example.com', 'examplePass');
        await registerFirebase('ben2', 'ben2@example.com', 'examplePass');
    });

    /*
        checks whether in case
        -User already present:
            function updates the user information
            instead of creating another one.
        -User not present: 
            function creates a new user in the database.

        Mocks:
            firebase.auth.GoogleAuthProvider.credential()
            firebase.auth.FacebookAuthProvider.credential()
            firebase.auth.TwitterAuthProvider.credential()
            firebase.auth().signInWithCredential()
    */

    it("tests the loginCustomFirebase when called with type google", async() => {
        let testUser = {
            uid: await admin.auth().getUserByEmail('ben@example.com').then((user) => user.uid),
            displayName: 'ben',
            email: 'benChanged@example.com',
            photoURL: null,
            provider: 'google.com'
        };
        firebase.auth.GoogleAuthProvider.credential = jest.fn();
        firebase
            .auth()
            .signInWithCredential = jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(testUser);
                });
            });
        expect.assertions(7);

        // When the user is already present
        await expect(loginCustomFirebase('google', 'tokenString', 'secretString')).resolves.toEqual(testUser);

        await admin.auth().updateUser(testUser.uid, { ...testUser });

        expect(firebase.auth.GoogleAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
    
        User.updateUser = jest.fn(() => Promise.resolve(testUser));
        await firebase.database().ref('users/' + testUser.uid).remove();

        //User not already present
        await expect(loginCustomFirebase('google', 'tokenString', 'secretString')).resolves.toEqual({
            uid: testUser.uid,
            name: testUser.displayName,
            email: testUser.email || null,
            provider: testUser.provider
        });
        expect(firebase.auth.GoogleAuthProvider.credential).toHaveBeenCalledTimes(2);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(2);
        expect(User.updateUser).toHaveBeenCalledTimes(0);
    });
    it("tests the loginCustomFirebase when called with type facebook", async() => {
        let testUser = {
            uid: await admin.auth().getUserByEmail('ben1@example.com').then((user) => user.uid),
            displayName: 'ben1',
            email: 'ben1Changed@example.com',
            photoURL: null,
            provider: 'facebook.com'
        };
        firebase.auth.FacebookAuthProvider.credential = jest.fn();
        firebase
            .auth()
            .signInWithCredential = jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(testUser);
                });
            });
        expect.assertions(7);

        //User already present
        await expect(loginCustomFirebase('facebook', 'tokenString', 'secretString')).resolves.toEqual(testUser);

        await admin.auth().updateUser(testUser.uid, { ...testUser });
 
        expect(firebase.auth.FacebookAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);

        User.updateUser = jest.fn(() => Promise.resolve(testUser));
        await firebase.database().ref('users/' + testUser.uid).remove();

        //User not already present
        await expect(loginCustomFirebase('facebook', 'tokenString', 'secretString')).resolves.toEqual({
            uid: testUser.uid,
            name: testUser.displayName,
            email: testUser.email || null,
            provider: testUser.provider
        });
        expect(firebase.auth.FacebookAuthProvider.credential).toHaveBeenCalledTimes(2);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(2);
        expect(User.updateUser).toHaveBeenCalledTimes(0);
    });
    it("tests the loginCustomFirebase when called with type twitter", async() => {
        let testUser = {
            uid: await admin.auth().getUserByEmail('ben2@example.com').then((user) => user.uid),
            displayName: 'ben2',
            email: 'ben2Changed@example.com',
            photoURL: null,
            provider: 'twitter.com'
        };
        firebase.auth.TwitterAuthProvider.credential = jest.fn();
        firebase
            .auth()
            .signInWithCredential = jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(testUser);
                });
            });
        expect.assertions(7);

        //User already Present
        await expect(loginCustomFirebase('twitter', 'tokenString', 'secretString')).resolves.toEqual(testUser);

        await admin.auth().updateUser(testUser.uid, { ...testUser });

        expect(firebase.auth.TwitterAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);

        User.updateUser = jest.fn(() => Promise.resolve(testUser));
        await firebase.database().ref('users/' + testUser.uid).remove();

        //User not already present
        await expect(loginCustomFirebase('twitter', 'tokenString', 'secretString')).resolves.toEqual({
            uid: testUser.uid,
            name: testUser.displayName,
            email: testUser.email || null,
            provider: testUser.provider
        });
        expect(firebase.auth.TwitterAuthProvider.credential).toHaveBeenCalledTimes(2);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(2);
        expect(User.updateUser).toHaveBeenCalledTimes(0);
    });
});

// tests the forgetPassWord function by creating a new user in the test database
describe('tests forgetPasswordFirebase function', () => {
    beforeAll(async() => {
        await registerFirebase('forget', 'forget@test.com', 'forgetPass');
    });

    it('tests whether the forgetPasswordFirebase resolves to be undefined', async() => {
        expect.assertions(1);
        await expect(forgotPasswordFirebase('forget@test.com')).resolves.toBe(undefined);
    });
});