import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {IProduct} from '@src/utilis/types';

export default function Product(props: IProduct) {
  let weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][
    new Date().getDay()
  ];


  return (
    <TouchableOpacity
      disabled={!props.available_today}
      onPress={props.onPress}
      style={{
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <Image
        source={{uri: props.thumbnail}}
        style={{height: 80, borderRadius: 10, width: 120}}
      />
      {!props.available_today && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            height: 80,
            zIndex: 1,
            position: 'absolute',
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            overflow: 'hidden',
            top: 5,
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 12,
              letterSpacing: 0.1,
            }}>
            Not Available
          </Text>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 14,
              letterSpacing: 1,
            }}>
            Today
          </Text>
        </View>
      )}
      <View style={{paddingLeft: 20, height: '100%'}}>
        <Text style={{color: 'black', marginTop: 5}}>{props.title}</Text>
        {props.is_fixed_cal ? (
          <Text
            style={{
              color: 'grey',
              marginTop: 5,
            }}>
            {props.fixed_calories} calories
          </Text>
        ) : (
          <Text
            style={{
              color: 'grey',
              marginTop: 5,
            }}>
            Calories vary
          </Text>
        )}
        {props.is_fixed_price ==false? <Text style={{marginTop: 8}}>Price Vary {props.fixed_price}</Text>:<Text style={{marginTop: 8}}>GHC {props.fixed_price}</Text>}
      </View>
    </TouchableOpacity>
  );
}
