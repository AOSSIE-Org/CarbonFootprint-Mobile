import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as User from '../../app/actions/firebase/User';
import { registerFirebase, loginEmailFirebase, loginCustomFirebase, forgotPasswordFirebase } from '../../app/actions/firebase/Auth';
import { sendFriendRequest, acceptFriendRequest, searchFriendsByEmail, searchFriendsByUserName } from '../../app/actions/firebase/Friends';
import { setFootprint } from '../../app/actions/firebase/Footprint';
import { getMultiple } from '../../app/actions/firebase/Helper';
import { initAdmin, initFirebase, wipeDatabase } from '../setup/setupFirebase';

jest.setTimeout(100000);

let user1, user2, user3, testUser, testFriend;

/*
    Initializes the client and admin sdk
    Removes all the authenticated users
    Removes all the users in the database
*/
beforeAll(async() => {
    initFirebase();
    initAdmin();
    wipeDatabase();
    user1 = await registerFirebase('user1', 'user1@test.com', 'testPass').then(user => user);
    user2 = await registerFirebase('user2', 'user2@test.com', 'testPass').then(user => user);
    user3 = await registerFirebase('user3', 'user3@test.com', 'testPass').then(user => user);
    testUser = await registerFirebase('user', 'user@test.com', 'testPass').then(user => user);
    testFriend = await registerFirebase('friend', 'friend@test.com', 'testPass').then(user => user);
});

// delete the initialized app
afterAll(() => {
    firebase.delete();
    admin.delete();
});

/*
    Tests the User.js functions
*/

describe('tests the setUser, getUser, updateUser functions', () => {
    let user;
    beforeAll(async() => {
        user = await firebase
            .auth()
            .createUserWithEmailAndPassword('userfunctions@test.com', 'testPass')
            .then(() => {
                let temp = {
                    name: 'userfunctions',
                    email: 'userfunctions@test.com',
                    picture: null,
                    provider: 'email'
                };
                temp.uid = firebase.auth().currentUser.uid;
                return temp;
            });
    });

    it('tests the setUser function', async() => {
        firebase.auth().onAuthStateChanged(async function(data) {
            if (data) {
                // If user is logged in 
                await expect(User.setUser(data.uid, data)).resolves.toBe(undefined);
            } else {
                /*
                    If user is not logged in first signIn function
                    is called then getUser function is tested
                */
                await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, 'testPass')
                .then((user) => {
                    return expect(User.setUser(user.uid, user)).resolves.toBe(undefined);
                })
            }
        });
    });

    it('tests the getUser function', () => {
        firebase.auth().onAuthStateChanged(async function(data) {
            if (data) {
                // If user is logged in 
                await expect(User.getUser(data.uid)).resolves.toEqual(data);
            } else {
                /*
                    If user is not logged in first signIn function
                    is called then getUser function is tested
                */
                await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, 'testPass')
                .then((user) => {
                    return expect(getUser(user.uid)).resolves.toEqual(user);
                })
            }
        });
    });

    it('tests the updateUser function for the the above tested user', async() => {
        let testUser = {
            name: 'userfunctionschanged',
            provider: 'email',
            email: 'userfunctions@test.com',
            provider: 'email',
        }
        firebase.auth().onAuthStateChanged(async function(data) {
            if (data) {
                // If user is logged in
                await expect(User.updateUser(data.uid, {...testUser})).resolves.toBe(undefined);
            } else {
                /*
                    If user is not logged in first signIn function
                    is called then update function is tested
                */
                await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, 'testPass')
                .then((user) => {
                    return expect(updateUser(user.uid, {...testUser})).resolves.toBe(undefined);
                });
            }
        });
    });
});

/*
    Tests the registerFirebase function
    by creating a user in the test database
*/


describe('creates user', () => {
    let users = {
        create: async({ name, email, password }) => {
            await registerFirebase(name, email, password);
        }
    };

    it('should create a user and get that user using email', () => {
        const user = {
            name: 'testuser',
            email: 'testuser@test.com',
            password: 'testPass'
        };
        return users.create(user).then((user) => console.assert(user, 'test user was created'));
    });
});

/*
    Tests the loginEmailFirebase function
*/

describe('tests the loginEmailFirebase function', () => {
    it("should call loginEmailFirebase function", async () => {
        firebase.auth().signInWithEmailAndPassword = jest.fn((email, password) => Promise.resolve(user1));
        await loginEmailFirebase('user1@test.com', 'testPass');
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('user1@test.com', 'testPass');
    });
});

/*
    Tests the loginCustom firebase function
    by testing it with different arguments
    (google, facebook, twitter)
    Uses three sample users user1, user2, user3
*/

/* 
    Tests the loginCustom firebase
    function for type google
*/
describe('tests the loginCustomFirebase function with provider google', () => {
    let user;
    beforeAll(async() => {
        user = {
            uid: user1.uid,
            displayName: user1.name,
            email: 'user1Changed@test.com',
            photoURL: null,
            provider: 'google.com'
        };
        firebase.auth.GoogleAuthProvider.credential = jest.fn();
        firebase
            .auth()
            .signInWithCredential = jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(user);
                });
            });
    });

    it("tests the loginCustomFirebase when the user is already present", async() => {
        expect.assertions();
        await expect(loginCustomFirebase('google', 'tokenString', 'secretString')).resolves.toEqual(user);
        /*
            If the user is still logged in after the update
            the user data needs to be updated where the
            authenticated users data is stored
        */
        firebase.auth().onAuthStateChanged(async function(data) {
            if (data) {
                await admin.auth().updateUser(user.uid, { ...user });
            }
        });
        expect(firebase.auth.GoogleAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
    });

    it('tests the loginCustomFirebase when the user is not present', async() => {
        User.updateUser = jest.fn(() => Promise.resolve(user));
        /*
            Deleting user from database to check the flow of
            the function when the user is not already present
        */
        await firebase.database().ref('users/' + user.uid).remove();
        await expect(loginCustomFirebase('google', 'tokenString', 'secretString')).resolves.toEqual({
            uid: user.uid,
            name: user.displayName,
            email: user.email || null,
            provider: user.provider
        });
        expect(firebase.auth.GoogleAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
        expect(User.updateUser).toHaveBeenCalledTimes(0);
    });
});
    
/* 
    Tests the loginCustom firebase
    function for type facebook
*/
describe('tests the loginCustomFirebase function with provider facebook', () => {
    let user;
    beforeAll(async() => {
        user = {
            uid: user2.uid,
            displayName: user2.name,
            email: 'user2changed@test.com',
            photoURL: null,
            provider: 'facebook.com'
        };
        firebase.auth.FacebookAuthProvider.credential = jest.fn();
        firebase
            .auth()
            .signInWithCredential = jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(user);
                });
            });
    });

    it("tests the loginCustomFirebase when the user is already present", async() => {
        expect.assertions();
        await expect(loginCustomFirebase('facebook', 'tokenString', 'secretString')).resolves.toEqual(user);
        /*
            If the user is still logged in after the update
            the user data needs to be updated where the
            authenticated users data is stored
        */
        firebase.auth().onAuthStateChanged(async function(data) {
            if (data) {
                await admin.auth().updateUser(user.uid, { ...user });
            }
        });
        expect(firebase.auth.FacebookAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
    });

    it('tests the loginCustomFirebase when the user is not present', async() => {
        User.updateUser = jest.fn(() => Promise.resolve(user));
        /*
            Deleting user from database to check the flow of
            the function when the user is not already present
        */
        await firebase.database().ref('users/' + user.uid).remove();
        await expect(loginCustomFirebase('facebook', 'tokenString', 'secretString')).resolves.toEqual({
            uid: user.uid,
            name: user.displayName,
            email: user.email || null,
            provider: user.provider
        });
        expect(firebase.auth.FacebookAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
        expect(User.updateUser).toHaveBeenCalledTimes(0);
    });
});

/* 
    Tests the loginCustom firebase
    function for type twitter
*/
describe('tests the loginCustomFirebase function with provider twitter', () => {
    let user;
    beforeAll(async() => {
        user = {
            uid: user3.uid,
            displayName: user3.name,
            email: 'user3changed@test.com',
            photoURL: null,
            provider: 'twitter.com'
        };
        firebase.auth.TwitterAuthProvider.credential = jest.fn();
        firebase
            .auth()
            .signInWithCredential = jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(user);
                });
            });
    });

    it("tests the loginCustomFirebase when the user is already present", async() => {
        await expect(loginCustomFirebase('twitter', 'tokenString', 'secretString')).resolves.toEqual(user);
        /*
            If the user is still logged in after the update
            the user data needs to be updated where the
            authenticated users data is stored
        */
        firebase.auth().onAuthStateChanged(async function(data) {
            if (data) {
                await admin.auth().updateUser(user.uid, { ...user });
            }
        });
        expect(firebase.auth.TwitterAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
    });

    it('tests the loginCustomFirebase when the user is not present', async() => {
        User.updateUser = jest.fn(() => Promise.resolve(user));
        /*
            Deleting user from database to check the flow of
            the function when the user is not already present
        */
        await firebase.database().ref('users/' + user.uid).remove();
        await expect(loginCustomFirebase('twitter', 'tokenString', 'secretString')).resolves.toEqual({
            uid: user.uid,
            name: user.displayName,
            email: user.email || null,
            provider: user.provider
        });
        expect(firebase.auth.TwitterAuthProvider.credential).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInWithCredential).toHaveBeenCalledTimes(1);
        expect(User.updateUser).toHaveBeenCalledTimes(0);
    });
});

/*
    Tests the forgetPassWord function of Auth.js
    by creating a new user in the test database
*/
describe('tests forgetPasswordFirebase function', () => {

    it('tests whether the forgetPasswordFirebase resolves to be undefined', async() => {
        expect.assertions(1);
        await expect(forgotPasswordFirebase('user@test.com')).resolves.toBe(undefined);
    });
});

/*
    Tests the functon sendFriendRequest of Friend.js
    using two sample users testUser and testFriend
*/
describe('tests the flow of sendFriendRequest function', () => {
    let updatedUser;
    beforeAll(() => {
        updatedUser = {
            uid: testUser.uid,
            email: testUser.email,
            friends: {
                [testFriend.uid]: 1,
            },
            name: testUser.name,
            provider: testUser.provider
        };
    });
    // When the user sends friend request to himself
    it('checks the function for arguments having same value', async() => {
        alert = jest.fn();
        expect.assertions(1);
        await expect(sendFriendRequest(testUser.uid, testUser.uid)).rejects.toBe('You can not send friend request to yourself');
    });

    // When the user sends friend request to another user who is not his friend
    it('checks the function for arguments having different value', async() => {
        alert = jest.fn();
        expect.assertions(1);
        await expect(sendFriendRequest(testUser.uid, testFriend.uid)).resolves.toEqual(updatedUser);
    });

    // When the user has already sent friend request to another user
    it('checks the function when the user has already sent a friend request', async() => {
        alert = jest.fn();
        expect.assertions(1);
        await expect(sendFriendRequest(testUser.uid, testFriend.uid)).rejects.toBe('You have already sent a friend request to this user.');
    });

    // When the user has already been send friend request by another user
    it('checks the function when the friend has already sent a request to user', async() => {
        alert = jest.fn();
        expect.assertions(1);
        await expect(sendFriendRequest(testFriend.uid, testUser.uid)).rejects.toBe('This user has already sent you a request.');
    });
});

/*
    Tests the acceptFriendRequest function of Friends.js
    with two sample users testUser annd testFriend
*/
describe('tests the flow of acceptFriendRequest function', () => {
    let updatedUser;
    beforeAll(() => {
        updatedUser = {
            uid: testFriend.uid,
            email: testFriend.email,
            friends: {
                [testUser.uid]: 0,
            },
            name: testFriend.name,
            provider: testFriend.provider
        };
    });
    it('checks if the function resolves to equal the updatedUser object with frienId value 0', async() => {
        expect.assertions(1);
        await expect(acceptFriendRequest(testFriend.uid, testUser.uid)).resolves.toEqual(updatedUser);
    });
});

/*
    Tests the search functions of Friends.js
*/
describe('tests the flow of searchFriendsByEmail and searchFriendsByUserName', () => {
    let users = [];
    beforeAll(() => {
        users = [{
            uid: testUser.uid,
            name: testUser.name,
            email: testUser.email,
            picture: undefined
        }];
    })
    it('checks if the function searchFriendsByEmail resolves to equal the searched user', async() => {
        expect.assertions(1);
        await expect(searchFriendsByEmail('user@test.com')).resolves.toEqual(users);
    });
    it('checks if the function searchFriendsByUserName resolves to equal the searched user', async() => {
        expect.assertions(1);
        await expect(searchFriendsByUserName('user')).resolves.toEqual(users);
    });
});

/*
    Tests whether the setFootprint function of Footprint.js
    sets the data property properly using a sample user
*/
describe('tests the flow of setFootprint function', () => {
    let user;
    beforeAll(async() => {
        user =  await registerFirebase('footprint', 'footprint@test.com', 'testPass').then(data => data);
    });
    it('checks whether the function resolves to equal user object with footprint value updated', async() => {
        user.data = 100;
        await expect(setFootprint(100, user.uid)).resolves.toEqual(user);
    });
});

/*
    Tests the getMultiple function of Helper.js
    using three sample users test1, test2, test3
*/
describe('tests the flow of getMultiple function', () => {
    let test1, test2, test3;
    beforeAll(async() => {
        test1 =  await registerFirebase('test1', 'test1@test.com', 'testPass').then(user => user);
        test2 =  await registerFirebase('test2', 'test2@test.com', 'testPass').then(user => user);
        test3 =  await registerFirebase('test3', 'test3@test.com', 'testPass').then(user => user);
    });
    it('checks whether the function resolved to an array of users', async() => {
        await expect(getMultiple([
            test1.uid,
            test2.uid,
            test3.uid
        ])).resolves.toEqual([
            test1,
            test2,
            test3
        ]);
    });
});