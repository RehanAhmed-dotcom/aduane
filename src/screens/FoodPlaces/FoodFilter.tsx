import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const FoodFilter = ({navigation}) => {
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
  const save1 = [
    {
      id: '24345343',
      name: "Kyaa's Waakye",
      img: require('../../images/burger.jpg'),
    },
    {
      id: '234323423',
      name: "Kyaa's Waakye",
      img: require('../../images/withBottle.jpg'),
    },
    {
      id: '2343145647122',
      name: "Kyaa's Waakye",
      img: require('../../images/pizza.jpg'),
    },
    {
      id: '234314564347122',
      name: "Kyaa's Waakye",
      img: require('../../images/pizza.jpg'),
    },
    {
      id: '234314564725122',
      name: "Kyaa's Waakye",
      img: require('../../images/pizza.jpg'),
    },
    {
      id: '234314564712222',
      name: "Kyaa's Waakye",
      img: require('../../images/pizza.jpg'),
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.flatView}>
        <Image source={require('../../images/burger.jpg')} style={styles.img} />
        <View>
          <Text style={{paddingHorizontal: 5, fontSize: 12}}>
            Cloal Lounge & Grill
          </Text>
        </View>
        <View
          style={{borderWidth: 0.5, borderColor: '#ccc', marginTop: 3}}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <Text>Open At 8:00 AM</Text>
          <Image
            source={require('../../images/notification_fild_icon.png')}
            style={{width: 15, height: 15}}
          />
        </View>
      </View>
    );
  };
  const renderItem1 = ({item, index}) => {
    return (
      <View style={styles.flatView1}>
        <Image
          source={require('../../images/pizza.jpg')}
          style={{height: 150, borderRadius: 5, width: '100%'}}
        />
        <View style={styles.upperView}></View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconblack}>
          <Icon name="left" color="white" size={15} />
        </TouchableOpacity>
        <Image
          source={require('../../images/placeholder.png')}
          style={{
            height: 30,
            width: 30,
          }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={{marginRight: 5}}>BREAKFAST</Text>
          <Icon name="down" />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <FlatList
            data={save}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <View style={styles.filter}>
        <View style={styles.view}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            58 FoodPlace Avalible
          </Text>
          <View style={styles.view}>
            <Image
              source={require('../../images/icon_Filter.png')}
              style={{height: 30, marginRight: 10, width: 30}}
            />
            <Image
              source={require('../../images/icon_cross_red.png')}
              style={{height: 30, width: 30}}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={save1}
            // numColumns={2}
            //   horizontal={true}
            renderItem={renderItem1}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      {/* <View style={styles.bottomView}>
        <Text style={{paddingLeft: 10, fontSize: 18, fo ntWeight: 'bold'}}>
          All FoodPlaces Avalible
        </Text>
        <View style={{marginTop: 10, height: hp(60)}}>
          <FlatList
            data={save1}
            numColumns={2}
            //   horizontal={true}
            renderItem={renderItem1}
            keyExtractor={item => item.id}
          />
        </View>
      </View> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 15,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  iconblack: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatView: {
    width: wp(40),

    // backgroundColor: 'red',
    elevation: 2,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: hp(20),
  },
  upperView: {
    position: 'absolute',
    backgroundColor: 'red',
    // height: 80,
    width: '100%',
    top: 100,
  },
  filter: {
    paddingRight: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: hp(65),
    backgroundColor: 'white',
    paddingTop: 20,
    // left: 10,
    paddingLeft: 25,
    elevation: 5,
    marginTop: 20,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatView1: {
    // width: wp(40),
    // backgroundColor: 'red',
    // elevation: 2,
    // marginLeft: 10,
    marginTop: 10,
    // margin: 5,
    // marginRight: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    height: hp(30),
  },
  img: {
    height: hp(14),
    width: '100%',
    borderRadius: 10,
  },
  bottomView: {
    marginTop: 30,
  },
});
export default FoodFilter;
