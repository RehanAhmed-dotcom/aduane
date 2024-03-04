import messaging from '@react-native-firebase/messaging';
import {store} from '@src/redux/config';
import {updateFcmToken} from '@src/utilis/APIs';

const _updateFcmToken = async (fcm_token: string) => {
  const {
    USER: {user},
  } = store.getState();

  try {
    const token = user.api_token;
    const data = new FormData();
    data.append('fcm_token', fcm_token);
    await updateFcmToken({data, token});
  } catch (error) {
    
  }
};

const _getToken = async () => {
  let fcmToken = await messaging().getToken();
  console.log("check fcm",fcmToken)
  _updateFcmToken(fcmToken);
  await messaging().onTokenRefresh(token => {
    _updateFcmToken(token);
  });
};

export {_getToken};
