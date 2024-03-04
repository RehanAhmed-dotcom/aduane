/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationConfig from '@src/utilis/notificationConfig';

messaging().setBackgroundMessageHandler(async remoteMessage => {});
PushNotificationConfig.configrations();

AppRegistry.registerComponent(appName, () => App);
