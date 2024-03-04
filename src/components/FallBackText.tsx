import React from 'react';
import {Text, View, ViewStyle} from 'react-native';

interface IFallbackText {
  message: string;
  style?: ViewStyle;
}

export default function FallbackText(props: IFallbackText) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        ...props.style,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          letterSpacing: 1,
        }}>
        {props.message}
      </Text>
    </View>
  );
}
