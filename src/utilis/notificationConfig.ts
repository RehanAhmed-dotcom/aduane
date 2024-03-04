import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import {
  store,
  setDeliveryAddress,
  restaurantDetails,
  setCartFromNotification,
  sumCartTotal,
  setFriendData,
} from '@src/redux';
import { navigate } from '@src/navigator/navigationService';

const PushNotificationConfig = {
  configrations: () => {
    const dispatch = store.dispatch;

    PushNotification.configure({
      popInitialNotification: true,
  requestPermissions: true,
      onRegister: function (token) { 
        // console.log("check TTT",token)
      },

      onNotification: function (notification) {
        const clicked = notification.userInteraction;
        const { data } = notification;

        if (data.type === 'order_shared') {
          const friendData = JSON.parse(data.user);
          const cart = JSON.parse(data.cart);
          let newCartItems = [];
          cart.forEach((element, index) => {
            newCartItems[index] = { ...element, isShared: true };
          });
          const restaurant = JSON.parse(data.restaurant);
          setCartFromNotification({ cart: newCartItems, restaurant })(dispatch);
          setFriendData(friendData)(dispatch);
          sumCartTotal()(dispatch);
          setDeliveryAddress(data.address)(dispatch);
        }
        if (clicked) {
          if (data.type === 'order_shared') {


            // setCartFromNotification(JSON.parse(data.cart))(dispatch);
            // sumCartTotal()(dispatch);
            // setDeliveryAddress(data.address)(dispatch);
            // restaurantDetails(JSON.parse(data.restaurant))(dispatch);
            navigate('Delivery', { shared: true });
          }
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) { },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  },
};

export default PushNotificationConfig;
