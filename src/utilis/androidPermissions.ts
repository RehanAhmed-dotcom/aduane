import {PermissionsAndroid} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
}

export async function enableAndroidLocation() {
  try {
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    });
  } catch (error) {}
}
