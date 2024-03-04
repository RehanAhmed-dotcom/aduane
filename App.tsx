import React, { useEffect } from 'react';
import { LogBox, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PushNotification from 'react-native-push-notification';

import Root from '@src/navigator/root';
import { store, persistor } from '@src/redux';
import { StripeProvider } from '@stripe/stripe-react-native';
const App = () => {
  LogBox.ignoreAllLogs();
  useEffect(() => {
    _createChannel();
  }, []);

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {

      },
    );
  };

  const stripeKey = "pk_test_51JzGFSIQ5jtZj5qxHaxY2wnpVnLQZ54GXkq4U0vIYyJuYApQzOugmA5VmkFSzbz7xxWiRs9WUlg8ZhLfi1LZyvYt00H7PioqkR"
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS == "ios" ? '#FB0808' : null }}>
      <StripeProvider publishableKey={stripeKey}>
        <StatusBar backgroundColor={"#FB0808"} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </StripeProvider>
    </SafeAreaView>

  );
};
export default App;
