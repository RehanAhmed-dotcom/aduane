import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const CartOrder = () => {
  const save = [
    {
      id: '2343',
      name: "Kyaa's Waakye",
      img: require('../../images/burger.jpg'),
    },
    {
      id: '234323423',
      name: "Kyaa's Waakye",
      img: require('../../images/withBottle.jpg'),
    },
    {
      id: '23431122',
      name: "Kyaa's Waakye",
      img: require('../../images/pizza.jpg'),
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.flatView}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item.img}
            style={{height: 70, width: 100, borderRadius: 5}}
          />
          <View style={{marginLeft: 15}}>
            <Text style={{marginTop: 5}}>{item.name}</Text>
            <Text style={{fontSize: 12}}>Order Total: GHC 25:00</Text>
            <Text style={{fontSize: 12, color: '#ccc'}}>GHC 2.00 Delivery</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../images/icon_cart_share.png')}
            style={{height: 30, width: 30}}
          />
          <Icon name="delete" size={15} style={{marginTop: 10}} />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Cart</Text>
        <Image
          source={require('../../images/placeholder.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.bottomView}>
        <FlatList
          data={save}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.order}>
        <Image
          source={require('../../images/burger.jpg')}
          style={styles.image}
        />
        <View style={styles.cross}>
          <Icon1 name={'cross'} size={20} />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>My Order</Text>
          <Text style={{color: '#ccc', marginTop: 5}}>
            Never frozen natural beef 130g, chadder cheese,
          </Text>
          <Text style={{color: '#ccc', marginTop: 5}}>
            lettuce "iceberg", tomatoes, pickels, mustard special
          </Text>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>
            Total:<Text style={{fontWeight: 'normal'}}> GHC 19:00</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginTop: 10,
          }}></View>
        <View style={styles.count}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Count:</Text>
            <Text>3</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.redCounter}>
              <Icon2 name="minus-square-o" size={15} color="white" />
            </View>
            <View style={styles.redCounter1}>
              <Icon2 name="plus-square-o" size={15} color="white" />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white'}}>Go to checkout</Text>
          <Text style={{color: 'white'}}>GHC 19.23</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  topView: {
    flexDirection: 'row',
    marginTop: 20,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  img: {
    height: 30,
    width: 30,
  },
  bottomView: {
    marginTop: 10,
    // height: 50,
    // backgroundColor: 'red',
  },
  flatView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 50,
    marginTop: 20,
    // backgroundColor: 'blue',
  },
  order: {
    marginTop: 20,
  },
  image: {
    height: 125,
    width: '100%',
    borderRadius: 10,
    // zIndex: -1,
  },
  cross: {
    backgroundColor: 'grey',
    height: 25,
    width: 25,
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
  },
  count: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redCounter: {
    height: 30,
    width: 30,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redCounter1: {
    height: 30,
    width: 30,
    marginLeft: 2,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
export default CartOrder;
