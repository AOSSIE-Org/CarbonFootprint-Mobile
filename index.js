import { AppRegistry } from 'react-native';
import CarbonFootprint from './app/index';
import { name as AppName } from './app.json';
import 'babel-polyfill'; // TODO: To be removed in future, whenever a better fix is available

function noop() {}

if (process.env.NODE_ENV !== 'development') {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
}

AppRegistry.registerComponent(AppName, () => CarbonFootprint);
