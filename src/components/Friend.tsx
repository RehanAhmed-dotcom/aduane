import {IFriend} from '@src/utilis/types';
import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

export default function Friend(props: IFriend) {
  return (
    <Pressable onPress={props.onPress} style={styles.flatView}>
      <View style={{flexDirection: 'row'}}>
        {props.image ? (
          <Image
            source={{uri: props.image}}
            style={{height: 70, width: 100, borderRadius: 5}}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={require('@src/images/icon_profile_inactive.png')}
            style={{height: 70, width: 100, borderRadius: 5}}
          />
        )}
        <View style={{marginLeft: 15}}>
          <Text style={{marginTop: 5, fontSize: 16, fontWeight: 'bold'}}>
            {props.name}
          </Text>
          <Text style={{fontSize: 12, color: '#ccc', marginTop: 2}}>
            {props.email}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flatView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
