import {KeyboardAvoidingView, Platform, View} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const shadow = {
  elevation: 5,
  shadowColor: 'grey',
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 1,
  },
};

export const Form = isIOS ? KeyboardAvoidingView : View;
