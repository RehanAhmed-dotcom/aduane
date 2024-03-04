import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import type {NavigationProps} from '@src/utilis/types';

const Splash = ({navigation}: NavigationProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={require('@src/images/updatedSplash.png')}
        style={{flex: 1}}>
        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            source={require('@src/images/logo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
              width: 100,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Let's Eat</Text>
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
  first: {
    height: hp(15),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 10,
    color: 'white',
  },
  text1: {
    fontSize: 10,
    color: 'black',
  },
});
export default Splash;
