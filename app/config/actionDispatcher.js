import * as AuthAction from '../actions/AuthAction';
import * as ActivityDetailsAction from '../actions/ActivityDetailsAction';
import ActivityDetection from '../actions/ActivityDetectionAction';
import * as DirectionAction from '../actions/DirectionAction';
import * as FbLoginAction from '../actions/FbLoginAction';
import * as FriendsAction from '../actions/FriendsAction';
import * as GoogleLoginAction from '../actions/GoogleLoginAction';
import * as LoaderAction from '../actions/LoaderAction';
import * as LocationAction from '../actions/LocationAction';
import * as ProfileAction from '../actions/ProfileAction';
import * as StorageAction from '../actions/StorageAction';

//For Home
export const fbLogin = () => FbLoginAction.fbLogin();
export const googleSignIn = () => GoogleLoginAction.googleSignIn();
export const login = (email, password) => AuthAction.login(email, password);

//For Register
export const register = (name, email, password) => AuthAction.register(name, email, password);

//For Calculate
export const getRedMarkerDetails = (location, placename) =>
    DirectionAction.getRedMarkerDetails(location, placename);
export const getGreenMarkerDetails = (location, placename) =>
    DirectionAction.getGreenMarkerDetails(location, placename);
export const getDirections = (source, destination, code) =>
    DirectionAction.getDirections(source, destination, code);
export const getLocation = () => LocationAction.getLocation();
export const getStorage = () => StorageAction.getStorage();
export const set_destination = (json, name) => DirectionAction.set_destination(json, name);

//For Activity
export const startActivityDetection = () => ActivityDetection.startActivityDetection();
export const closeActivityDetection = () => ActivityDetection.closeActivityDetection();
export const setCO2 = val => ActivityDetailsAction.setCO2(val);
export const setDest = val => ActivityDetailsAction.setDest(val);
export const setDistance = val => ActivityDetailsAction.setDistance(val);
export const setSrc = val => ActivityDetailsAction.setSrc(val);

//For More
export const updateUserFirebase = user => AuthAction.updateUserFirebase(user);
export const logout = () => AuthAction.logout();
export const getFriendList = choice => FriendsAction.getFriendList(choice);

//For Dashboard
export const getProfile = () => ProfileAction.getProfile();

//For Friends
export const loaderToggle = () => LoaderAction.loaderToggle();

//For Settings
export const setStorage = data => StorageAction.setStorage(data);

//For Forgot
export const forgotPassword = email => AuthAction.forgotPassword(email);
