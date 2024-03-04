import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

export default function Category(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      style={{
        ...styles.category,
        ...{
          backgroundColor: props.selected ? 'red' : 'white',
        },
      }}>
      <Image source={{uri: props.item.image}} style={styles.image} />

      <Text
        style={{
          ...styles.name,
          ...{color: props.selected ? 'white' : 'black'},
        }}>
        {props.item.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    height: 120,
    width: 80,
    elevation: 1,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 65,
  },
  name: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
});
