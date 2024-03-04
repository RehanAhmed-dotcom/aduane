import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useAppSelector} from '@src/redux/hooks';

const OrderPlaced = ({navigation}) => {
  const {deliveryType, deliveryTime, coords} = useAppSelector(
    ({APPSTATE}) => APPSTATE,
  );

  const openGps = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${coords.latitude},${coords.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      // ios: `http://maps.apple.com/?daddr=${coords.latitude},${coords.longitude}`,
      // ios: `${scheme}${label}@${latLng}`,
      ios: `maps://app?daddr=${coords.latitude}+${coords.longitude}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../images/burger.jpg')}
        style={{flex: 1}}>
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Image
            source={require('../../images/icon_orderplace.png')}
            style={{height: 150, width: 150}}
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>Order Placed</Text>
          <Text
            style={{color: 'grey', marginTop: 20, textTransform: 'capitalize'}}>
            {deliveryType} in {deliveryTime} min
          </Text>
          {deliveryType === 'pickup' && (
            <Pressable
              onPress={openGps}
              style={{...styles.button, width: '80%', marginTop: 10}}>
              <Text style={{color: 'white', textTransform: 'uppercase'}}>
                Get Restaurant Location
              </Text>
            </Pressable>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.button}>
            <Text style={{color: 'white'}}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 40,
    width: 200,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OrderPlaced;
