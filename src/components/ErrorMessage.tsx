import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

interface IErrorMessage {
  message: string;
  style?: ViewStyle;
}

export default function ErrorMessage(props: IErrorMessage) {
  return (
    <View style={{...styles.errorContainer, ...props.style}}>
      <Text style={styles.error}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 20,
    // top: -20,
  },
  error: {
    fontSize: 14,
    letterSpacing: 1,
    color: 'red',
    textAlign: 'center',
  },
});
