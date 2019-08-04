/*
 * Thanks to this stackoverflow question.
 * https://stackoverflow.com/questions/42610264/querying-by-multiple-keys-in-firebase
 */

import firebase from 'react-native-firebase';
import { formatEmail } from '../../config/helper';
import { googleSignIn } from '../GoogleLoginAction';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { fbLogin } from '../FbLoginAction';

/**
 * querying using multiple keys in firebase
 * @param keys
 * @return {Promise}
 */

export function getMultiple(keys) {
    return new Promise(function(resolve, reject) {
        var promises = keys.map(function(key) {
            return firebase
                .database()
                .ref('/users/')
                .child(key)
                .once('value');
        });
        Promise.all(promises).then(function(snapshots) {
            var users = [];
            snapshots.forEach(function(snapshot) {
                let key = snapshot.key;
                let value = snapshot.val();
                users.push(value);
            });
            resolve(users);
        });
    });
}

/**
 * check for validity of email i.e. if it is not already assosciated with another account
 * @param email email of requesting user
 * @param provider auth provider with user is currently trying to access the account
 * @return {Promise}
 */

export async function checkValidityForSignIn(email, provider) {
    return new Promise(function(resolve, reject) {
        firebase
            .database()
            .ref(`users/${formatEmail(email)}`)
            .once('value', function(snapshot) {
                if (snapshot.exists()) {
                    if (snapshot.val().provider != provider)
                        reject({
                            code: 'REDIRECT_SIGN_IN',
                            userInfo: snapshot.val()
                        });
                }
                resolve(true);
            });
    });
}

/**
 * handles redirection to the original provider to which email was already linked
 * @param provider auth provider to which user has to be redirected
 */

export function redirectSignIn(provider) {
    provider = provider.split('.')[0];
    return dispatch => {
        Alert.alert(
            'Invalid Login',
            `You have previously used this email id to sign in with ${provider}.`,
            [
                {
                    text: `Continue with ${provider}`,
                    onPress:
                        provider == 'email'
                            ? () => Actions.login()
                            : provider == 'google'
                            ? () => dispatch(googleSignIn())
                            : () => dispatch(fbLogin())
                },
                { text: 'Stay here' }
            ]
        );
    };
}
