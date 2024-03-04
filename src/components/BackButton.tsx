import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {goBack} from '@src/navigator/navigationService';

export default function BackButton(props: any) {
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={{...styles.backButton, ...props.style}}>
      {props.cross ? (
        <Entypo name="cross" size={20} color="white" />
      ) : (
        <AntDesign name="left" color="white" size={15} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: Platform.OS === 'ios' ? 15 : 0,
  },
});
