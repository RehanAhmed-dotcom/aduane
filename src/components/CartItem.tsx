import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useAppSelector} from '@src/redux/hooks';

export default function CartItem(props: any) {

  const {friendData, cartTotal, deliveryFee} = useAppSelector(
    ({CART, APPSTATE}) => ({...CART, ...APPSTATE}),
  );


  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
      <TouchableOpacity onPress={props.onPress} style={{flexDirection: 'row'}}>
        <Image
          source={{uri: props.item.thumbnail}}
          style={{height: 70, width: 100, borderRadius: 5}}
        />
        <View style={{marginLeft: 15}}>
          {props.item.isShared ? (
            <Text style={{marginTop: 5}}>{friendData?.name} Order</Text>
          ) : (
            <Text style={{marginTop: 5}}>{props.item.title}</Text>
          )}
          {props.item.isShared ? (
            // <Text style={{fontSize: 12}}>Total: GHC {cartTotal}</Text>
            <Text style={{fontSize: 12}}>Total: GHC {props.item.subtotal}</Text>
          ) : (
            <Text style={{fontSize: 12}}>Order Total: GHC {cartTotal}</Text>

          )}
          {props.item.isShared && (
            <Text style={{fontSize: 12, color: 'black'}}>
              {friendData?.phoneno}
            </Text>
          )}
          {props.item.isShared && (
            <Text numberOfLines={1} style={{fontSize: 12,width:180, color: '#ccc'}}>
              {friendData?.address}
            </Text>
          )}
          {!props.item.isShared && (
            <Text style={{fontSize: 12, color: '#ccc'}}>
              GHC {deliveryFee} Delivery
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        {!props.item.isShared && (
          <TouchableOpacity onPress={props.onShare}>
            <Image
              source={require('@src/images/icon_cart_share.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        )}
        <AntDesign
          onPress={props.onRemove}
          name="delete"
          size={15}
          style={{marginTop: 10}}
        />
      </View>
    </View>
  );
}
