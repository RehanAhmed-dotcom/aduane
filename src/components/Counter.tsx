import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {IButtonProps} from '@src/utilis/types';

const Counter = (props: IButtonProps) => {
    console.log("prop-------",props)
  return (
    <View>
        <Text style={{color: 'black',color:'grey'}}>{props.counter}</Text>
    </View>
  );
};

export default Counter;
