import React from 'react';
import {Image, Text, View} from 'react-native';

export default function Order(props: any) {
  return (
    <View
      style={{
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: props.item.restaurant_image}}
          style={{width: 70, borderRadius: 10, height: 70}}
        />
        <View style={{marginLeft: 10, marginTop: 5}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {props.item.restaurant_name}
          </Text>
          <Text style={{color: 'grey', marginTop: 10}}>
            {props.item.first_product_name}
          </Text>
        </View>
      </View>
      <View style={{marginLeft: 10, marginTop: 5}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'red',
            textAlign: 'right',
          }}>
          GHC {props.item.amount}
        </Text>
        <Text style={{color: 'grey', marginTop: 10, fontSize: 10}}>
          {props.item.date}
        </Text>
      </View>
    </View>
  );
}
