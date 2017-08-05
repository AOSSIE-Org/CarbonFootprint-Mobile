import {
    Platform
} from 'react-native';

export function getIcon(name) {
    return (Platform.OS === "android" ?
        "md-": "ios-") + name;
}
