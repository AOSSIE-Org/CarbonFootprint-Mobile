import { AppRegistry } from 'react-native';
import CarbonFootprint from './app/index';
import { name as AppName } from './app.json';
import 'babel-polyfill';

AppRegistry.registerComponent(AppName, () => CarbonFootprint);
