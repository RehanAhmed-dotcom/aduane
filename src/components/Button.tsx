import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {IButtonProps} from '@src/utilis/types';

const Button = (props: IButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          alignItems: 'center',
          backgroundColor: 'red',
          justifyContent: 'center',
          height: 50,
          borderRadius: 15,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
