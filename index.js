import { AppRegistry } from 'react-native';
import CarbonFootprint from './app/index';
import { name as AppName } from './app.json';
import 'babel-polyfill'; // TODO: To be removed in future, whenever a better fix is available

AppRegistry.registerComponent(AppName, () => CarbonFootprint);
