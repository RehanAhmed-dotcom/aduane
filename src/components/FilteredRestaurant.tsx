import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {navigate} from '@src/navigator/navigationService';
import {removeFilter} from '@src/redux';
import {useAppDispatch, useAppSelector} from '@src/redux/hooks';
import {getDistance, toggleFavorite} from '@src/utilis/APIs';
import {isRestaurantClosed} from '@src/utilis/helpers';
import {IRestaurant} from '@src/utilis/types';

export default function FilteredRestaurant({
  restaurant,
}: {
  restaurant: IRestaurant;
}) {
  const {user} = useAppSelector(({USER}) => USER);
  const token = user.api_token;

  const [isFavorite, setIsFavorite] = useState(restaurant.is_favourite);
  const [miles, setMiles] = useState(0);
  const [time, setTime] = useState<number | string>(20);
  const [delivery, setDelivery] = useState<string | number>(0);

  const dispatch = useAppDispatch();

  const ratingArr = [1, 2, 3, 4, 5];

  useEffect(() => {
    _getDistance();
  }, []);

  useEffect(() => {
    _calculateDeliveryFee();
  }, [miles]);

  const _toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      const data = new FormData();
      data.append('restaurant_id', restaurant.restaurant_id);

      const res = await toggleFavorite({data, token});
      if (res && res.status === 'success') {
      }
    } catch (error) {}
  };

  const _calculateDeliveryFee = () => {
    const fee = 0.65 * miles;
    setDelivery(fee.toFixed(2));
  };

  const _getDistance = async () => {
    const data = {
      user: {
        latitude: user?.latitude,
        longitude: user?.longitude,
      },
      restaurant: {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      },
    };
    try {
      const res = await getDistance(data);
      const meters = res.rows[0].elements[0].distance.value;
      const distance = meters / 1609.344;
      setMiles(distance);
      setTime((25 + 2 * distance).toFixed(0));
    } catch (error) {}
  };

  return (
    <TouchableOpacity
      onPress={() => {
        removeFilter()(dispatch);
        navigate('Details', {restaurant});
      }}
      style={styles.container}>
      {isRestaurantClosed(restaurant.open_at, restaurant.close_at) && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            height: hp(32),
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 16,
              letterSpacing: 1,
            }}>
            Closed
          </Text>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 16,
              letterSpacing: 1,
            }}>
            Open At {restaurant.open_at}
          </Text>
        </View>
      )}
      <Image source={{uri: restaurant.thumbnail}} style={styles.cover} />
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{restaurant.title}</Text>

          {isFavorite ? (
            <FontAwesome
              onPress={_toggleFavorite}
              name="heart"
              size={20}
              color="red"
            />
          ) : (
            <FontAwesome
              onPress={_toggleFavorite}
              name="heart-o"
              size={20}
              color="black"
            />
          )}
        </View>
        <View style={styles.delivery}>
          <Text style={{...styles.text, ...{marginTop: 10}}}>
            GHC {delivery} delivery
          </Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.text}>Cuisine</Text>
            <View style={styles.tagsContainer}>
              {restaurant.cuisines?.map((item: string, index: number) => (
                <View key={`cuisine-${index}`} style={styles.tags}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.line} />
          <View>
            <Text style={styles.text}>Delivery Time</Text>
            <Text style={{textAlign: 'center'}}>
              {parseFloat(time).toFixed(2)} min
            </Text>
          </View>
          <View style={styles.line} />

          <View>
            <Text style={styles.text}>Rating</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {ratingArr.map((_, index) =>
                index >= restaurant.admin_rate ? (
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
                {parseFloat(restaurant.admin_rate).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    height: hp(32),
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    marginBottom: 5,
    borderWidth: 0.3,
    borderColor: 'lightgrey',
  },
  cover: {
    height: 150,
    borderRadius: 5,
    width: '100%',
  },
  contentContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingTop: 10,
    width: '100%',
    paddingHorizontal: 15,
    top: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartIcon: {
    width: 25,
    height: 25,
  },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingBottom: 4,
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: 110,
  },
  tags: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    borderRadius: 15,
    paddingHorizontal: 5,
    marginRight: 3,
    marginBottom: 5,
  },
  tagText: {
    color: 'red',
    fontSize: 8,
  },
  line: {
    height: 30,
    width: 1,
    backgroundColor: 'grey',
    // marginLeft: 10,
    marginTop: -10,
  },
  text: {
    fontSize: 12,
    color: 'grey',
  },
});
