import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {isIOS} from '@src/utilis';
import {IRestaurant} from '@src/utilis/types';

export default function SaveItem(props: IRestaurant) {
  const ratingArr = [1, 2, 3, 4, 5];
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          flexDirection: 'row',
          marginLeft: isIOS ? 10 : 0,
        }}>
        <Image
          source={{uri: props.thumbnail}}
          style={{height: 70, width: 100, borderRadius: 5}}
        />
        <View>
          <Text style={{marginLeft: 15, marginTop: 5}}>{props.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 15,
              marginTop: 5,
              alignItems: 'center',
            }}>
            {ratingArr.map((_, index) =>
              index >= props.admin_rate ? (
                <Image
                  resizeMode="contain"
                  key={`rating-${index}`}
                  style={{
                    width: 11,
                    marginLeft: 3,
                    height: 11,
                  }}
                  source={require('@src/images/RedLite.png')}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  key={`rating-${index}`}
                  style={{
                    width: 11,
                    marginLeft: 3,
                    height: 11,
                  }}
                  source={require('@src/images/Red.png')}
                />
              ),
            )}
            <Text style={{fontSize: 12, color: 'red', marginLeft: 3}}>
              {parseFloat(props.admin_rate).toFixed(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginRight: isIOS ? 10 : 0,
        }}>
        <TouchableOpacity onPress={props.toggleFavorite}>
          <ImageBackground
            source={require('@src/images/background.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <FontAwesome name="heart" size={15} color="#FF0808" />
          </ImageBackground>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={props.toggleFavorite}
          style={{
            height: 30,
            width: 30,
            borderRadius: 12,
          }}>
          <Image
            source={require('@src/images/icon_heart.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
