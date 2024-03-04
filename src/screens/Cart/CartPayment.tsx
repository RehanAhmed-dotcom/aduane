import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';

const CartPayment = () => {
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
  ];
  const save1 = [
    {
      id: '2343',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
    },
    {
      id: '234323423',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
    },
    {
      id: '223434323423',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
    },
    {
      id: '223432344323423',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
    },
    {
      id: '2234343623423',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
    },
    {
      id: '223434624323423',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
    },
    {
      id: '2234343252653423',
      name: "Kyaa's Waakye",
      img: require('../../images/batchi.jpg'),
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
  const renderItem1 = ({item, index}) => {
    return (
      <View style={styles.flatView}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item.img}
            style={{height: 70, width: 100, borderRadius: 5}}
          />
          <View style={{marginLeft: 15}}>
            <Text style={{marginTop: 5, fontSize: 16, fontWeight: 'bold'}}>
              {item.name}
            </Text>
            <Text style={{fontSize: 12, color: '#ccc', marginTop: 2}}>
              byroncook@gmail.com
            </Text>
          </View>
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
      <View style={styles.CurveView}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.friend}>My Friend is Paying</Text>
          <View style={styles.cross}>
            <Icon1 name={'cross'} size={15} color={'white'} />
          </View>
        </View>
        <View style={styles.search}>
          <Icon name={'search1'} size={15} color={'#ccc'} />
          <Text style={{color: '#ccc', marginLeft: 10}}>Search</Text>
        </View>
        {/* <ScrollView> */}
        <View>
          <FlatList
            data={save1}
            renderItem={renderItem1}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{height: 20}}></View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 15,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  img: {
    height: 30,
    width: 30,
  },
  bottomView: {
    marginTop: 10,
    paddingHorizontal: 15,
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
  CurveView: {
    backgroundColor: 'white',
    elevation: 4,
    // marginTop: 20,
    height: hp(65),
    paddingTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  friend: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cross: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginTop: 20,
    backgroundColor: 'grey',
  },
  search: {
    backgroundColor: 'white',
    elevation: 2,
    height: 40,
    flexDirection: 'row',
    paddingLeft: 20,
    width: '85%',
    left: 15,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
});
export default CartPayment;
