import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from './BackButton';

export default function Header(props: any) {
  return (
    <View style={styles.header}>
      <BackButton />
      <Text style={styles.title}>{props.title}</Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
