import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { isIOS, shadow } from '@src/utilis';
import { isRestaurantClosed } from '@src/utilis/helpers';
import { useAppSelector } from '@src/redux/hooks';
import { getDistance } from '@src/utilis/APIs';

export default function Restaurant(props: any) {


  const { user } = useAppSelector(({ USER }) => USER);
  const [miles, setMiles] = useState(0);
  const [time, setTime] = useState<number | string>(20);
  const [delivery, setDelivery] = useState<string | number>(0);
  const [checkFee, setcheckFee] = useState<string | number>(0);
  const [isNotify, setIsNotify] = useState(
    !props.restaurant.is_off_notification,
  );
  const ratingArr = [1, 2, 3, 4, 5];

  useEffect(() => {
    _getDistance();
  }, []);

  useEffect(() => {
    _calculateDeliveryFee();
  }, [miles]);

  const isClosed = () => {
    return isRestaurantClosed(
      props.restaurant.open_at,
      props.restaurant.close_at,
    );
  };


  const _getDistance = async () => {
    const data = {
      user: {
        latitude: user?.latitude,
        longitude: user?.longitude,
      },
      restaurant: {
        latitude: props.restaurant.latitude,
        longitude: props.restaurant.longitude,
      },
    };
    try {
      const res = await getDistance(data);

      const meters = res.rows[0].elements[0].distance.value;
      const distance = meters / 1609.344;
      setMiles(distance);
      setTime((25 + 2 * distance).toFixed(0));
    } catch (error) { }
  };

  const _calculateDeliveryFee = () => {
    const fee = 0.65 * miles;
    setcheckFee(fee)
    console.log("feessss", fee)
    setDelivery(fee.toFixed(2));
  };

  return props.isNearMe ? (
    <TouchableOpacity onPress={props.onPress} style={styles.nearMe}>
      <Image
        source={{ uri: props.restaurant.thumbnail, cache: 'force-cache' }}
        style={styles.thumbnail}
      />
      {props.restaurant.is_receiving_order == false ? (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            height: '100%',
            borderRadius: 10,
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 10,
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 16,
              letterSpacing: 1,
            }}>
            Busy
          </Text>
        </View>
      ) : null}

      {isClosed() ?
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            height: '100%',
            borderRadius: 10,
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 10,
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
        </View>
        : props.restaurant.is_receiving_order === false ? <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            height: '100%',
            borderRadius: 10,
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 10,
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 16,
              letterSpacing: 1,
            }}>
            Busy
          </Text>
        </View> : null}

      <View style={styles.overlayContainer}>
        <Text style={{ color: 'black' }}>{props.restaurant.title}</Text>

        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {time} min | GHC {delivery} Delivery
        </Text>
      </View>
    </TouchableOpacity>
  ) : props.isFavorite ? (
    <TouchableOpacity onPress={props.onPress} style={styles.favorite}>
      <View style={styles.favThumbnailContainer}>
        <Image
          source={{ uri: props.restaurant.thumbnail, cache: 'force-cache' }}
          style={styles.favThumbnail}
        />
        {isClosed() ?
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0,0.8)',
              height: '100%',
              borderRadius: 10,
              width: '36%',
              zIndex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
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
          </View>
          : props.restaurant.is_receiving_order === false ? <View
            style={{
              backgroundColor: 'rgba(0, 0, 0,0.8)',
              height: '100%',
              borderRadius: 10,
              width: '36%',
              zIndex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textTransform: 'uppercase',
                fontSize: 16,
                letterSpacing: 1,
              }}>
              Busy
            </Text>
          </View> : null}
        <View style={{ height: 60 }}>

          <View>
            <Text style={{ paddingLeft: 16 }}>{props.restaurant.title}</Text>
          </View>
          <View style={styles.favRatingContainer}>
            {ratingArr.map((_, index) =>
              index >= props.restaurant.admin_rate ? (
                <Image
                  resizeMode="contain"
                  key={`rating-${index}`}
                  style={styles.favRatingImg}
                  source={require('@src/images/RedLite.png')}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  key={`rating-${index}`}
                  style={styles.favRatingImg}
                  source={require('@src/images/Red.png')}
                />
              ),
            )}

            <Text style={{ fontSize: 10, color: 'red', marginLeft: 3 }}>
              {parseFloat(props.restaurant.admin_rate).toFixed(1)}
            </Text>
          </View>
          {checkFee !=""? <View style={styles.favDelivery}>
            <EvilIcons name="clock" color="red" size={18} />
            <Text style={{ fontSize: 12, color: 'black' }}>
              {time} min | GHC {delivery} Delivery
            </Text>
          </View>:null}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: isIOS ? 10 : 0,
        }}>
        {!props.restaurant.is_favourite ? (
          <TouchableOpacity onPress={props.addFavorite}>
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
              <FontAwesome name="heart-o" size={15} color="#FF0808" />
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.onRemoveFavorite}>
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
        )}
      </View>
    </TouchableOpacity>
  ) : props.isPickUp ? (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.pickUp,
        ...{ width: props.isSearch ? wp(43) : wp(40) },
      }}>
      <Image
        source={{ uri: props.restaurant.thumbnail, cache: 'force-cache' }}
        style={styles.pickUpThumbnail}
      />

      {isClosed() && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            // height: hp(14),
            borderRadius: 10,
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
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
        </View>
      )}
      <View>
        <Text style={styles.pickUpTitle}>{props.restaurant.title}</Text>
      </View>
      <View
        style={{ borderWidth: 0.5, borderColor: '#ccc', marginTop: 3 }}></View>
      <View style={styles.pickUpDelivery}>
        {/* <Text style={{color: 'grey', fontSize: 12}}>
          Pickup in {props.restaurant.min_delivery_time}utes
        </Text> */}
        <Text style={{ color: 'grey', fontSize: 12 }}>
          Pickup in {time} minutes
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.restaurant, ...props.containerStyles }}>
      <Image
        source={{ uri: props.restaurant?.thumbnail, cache: 'force-cache' }}
        style={styles.img}
      />

      {isClosed() && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',
            height: hp(14),
            borderRadius: 10,
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
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
        </View>
      )}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{props.restaurant?.title}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.subHeading}>
        {isClosed() ? (
          <Text numberOfLines={1} style={{ color: 'grey',paddingVertical:4,width:120,fontSize:13 }}>
            Open At {props.restaurant?.open_at}
          </Text>
        ) : (
          <Text numberOfLines={1} style={{ color: 'grey',paddingVertical:4,width:120,fontSize:13 }}>
            Closes At {props.restaurant?.close_at}
          </Text>
        )}
        {/* <Text style={{color: 'grey'}}>Open At {props.restaurant?.open_at}</Text> */}
        {isNotify ? (
          <Pressable
            onPress={() => {
              props.onBellPress();
              setIsNotify(!isNotify);
            }}>
            <Image
              source={require('@src/images/notification_fild_icon.png')}
              style={styles.icon}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              props.onBellPress();
              setIsNotify(!isNotify);
            }}>
            <Image
              source={require('@src/images/notification_icon_stroke.png')}
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  restaurant: {
    width: wp(40),
    marginTop: 10,
    marginHorizontal: wp(1.5),
    borderRadius: 10,
    backgroundColor: 'white',
    // height: hp(20.5),
    marginBottom: 5,
    ...shadow,
  },
  img: {
    height: hp(14),
    width: '100%',
    borderRadius: 10,
  },
  headingContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  heading: {
    paddingHorizontal: 5,
    fontSize: 14,
    margin: isIOS ? 5 : 0,
    color: 'grey',
  },
  hr: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 3,
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: isIOS ? 5 : 0,
  },
  icon: {
    width: 15,
    height: 15,
  },
  nearMe: {
    height: hp(17),
    width: wp(70),
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  thumbnail: {
    height: '100%',
    borderRadius: 10,
    width: '100%',
  },
  overlayContainer: {
    position: 'absolute',
    paddingLeft: 20,
    top: hp(12),
  },
  favorite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  favThumbnailContainer: {
    flexDirection: 'row',
    marginLeft: isIOS ? 10 : 0,
  },
  favThumbnail: {
    height: 60,
    width: 100,
    borderRadius: 10,
  },
  favTitle: {
    marginLeft: 15,
    marginTop: 5,
    fontSize: 12,
  },
  favRatingContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 3,

    alignItems: 'center',
  },
  favRatingImg: {
    width: 11,
    marginLeft: 3,
    height: 11,
  },
  favDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    width: 180,
    marginLeft: 10,
    marginTop: 8,
  },
  pickUp: {
    width: wp(40),
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: hp(20),
    ...shadow,
  },
  pickUpThumbnail: {
    height: hp(14),
    width: '100%',
    borderRadius: 10,
  },
  pickUpTitle: {
    paddingHorizontal: 5,
    fontSize: 12,
    margin: isIOS ? 5 : 0,
    color: 'grey',
  },
  pickUpDelivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: isIOS ? 5 : 0,
  },
});
