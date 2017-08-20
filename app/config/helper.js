import {
    Platform
} from 'react-native';

export function getIcon(name) {
    return (Platform.OS === "android" ?
        "md-": "ios-") + name;
}

export const ZOOM_DELTA = 0.0030;

export const color = {
    primary: "#2f8e92",
    lightPrimary: "#30999e",
    darkPrimary: "#2e8286",
    secondary: "#92492f",
    error: "#cc0000",
    black: "#343434",
    white: "#fff",
    greyBack: "#f7f7f7",
    shadowGrey: "#ddd",
    borderGrey: "#ddd",
    grey: "#eee",
    lightBlack: "#777",
}
