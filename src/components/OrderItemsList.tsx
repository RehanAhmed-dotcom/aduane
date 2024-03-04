import React from 'react';
import {FlatList, Text, View, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useAppDispatch, useAppSelector} from '@src/redux/hooks';
import {
  addQuantityToCart,
  subtractQuantityToCart,
  sumCartTotal,
} from '@src/redux/actions';

export default function OrderItemsList() {
  const {cart} = useAppSelector(({CART}) => CART);

  const dispatch = useAppDispatch();

  const isMinusDisabled = item => {
    if (item.is_fixed_price) {
      return item.count_bar && item.qty <= item.count_item_from;
    } else {
      return item.qty <= item.varied_price_from;
    }
  };

  const isPlusDisabled = item => {
    if (item.is_fixed_price) {
      return item.count_bar && item.qty >= item.count_item_to;
    } else {
      return item.qty + 1 >= item.varied_price_to;
    }
  };

  return (
    <FlatList
      data={cart}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Pressable
                disabled={isMinusDisabled(item)}
                onPress={() => {
                  subtractQuantityToCart(item.id)(dispatch);
                  sumCartTotal()(dispatch);
                }}>
                <FontAwesome name="minus-square-o" color="red" size={18} />
              </Pressable>
              <Text style={{fontSize: 12, paddingHorizontal: 5}}>
                {item.qty}
              </Text>
              <Pressable
                disabled={isPlusDisabled(item)}
                onPress={() => {
                  addQuantityToCart(item.id)(dispatch);
                  sumCartTotal()(dispatch);
                }}>
                <FontAwesome name="plus-square-o" color="red" size={18} />
              </Pressable>
              <Text style={{marginLeft: 5, color: '#373737'}}>
                {item.title}
              </Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              GHC {item.subtotal}
            </Text>
          </View>
        );
      }}
      keyExtractor={item => `${item.id}`}
    />
  );
}
