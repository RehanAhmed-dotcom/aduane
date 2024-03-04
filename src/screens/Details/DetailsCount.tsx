import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

import {isIOS} from '@src/utilis';

const DetailsCount = ({navigation}) => {
  const [count, setCount] = useState(0);
  const list = [
    'Aduane Specials',
    'Popular Items',
    'Chicken',
    'Beverages',
    'Desserts',
    'Meal',
  ];
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
  const [underLine, setUnderLine] = useState('Aduane Specials');
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setUnderLine(item)}
        style={{
          marginRight: 15,
          borderBottomColor: underLine == item ? '#ccc' : 'white',
          borderBottomWidth: 1,
        }}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };
  const renderItem1 = ({item}) => (
    <View
      style={{
        // height: hp(10),
        // width: wp(90),
        // flex
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        // elevation: 3,
        // paddingHorizontal: 10,
      }}>
      <Image
        source={item.img}
        style={{height: 100, borderRadius: 10, width: 120}}
      />
      <View style={{paddingLeft: 20, height: '100%'}}>
        <Text style={{color: 'black'}}>Lorem Menu</Text>
        <Text
          style={{
            color: 'grey',
            // fontSize: 16,
            // fontWeight: 'bold',
            marginTop: 15,
          }}>
          20 min | GHC 2.00 Delivery
        </Text>
        <Text style={{marginTop: 10}}>GHC 15.00</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Delivery')}
        style={{
          backgroundColor: 'red',
          padding: 15,
          flexDirection: 'row',
          borderRadius: 10,
          position: 'absolute',
          bottom: isIOS ? 15 : 0,
          width: '95%',
          zIndex: 1,
          marginHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          //   marginTop: 5,
        }}>
        <Text
          style={{
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          Go to Check out
        </Text>
        <Text style={{color: 'white'}}>GHC19.23</Text>
      </TouchableOpacity>
      <View style={styles.iconblack}>
        <Icon
          onPress={() => navigation.goBack()}
          name="left"
          size={15}
          color="white"
        />
      </View>
      <Image
        source={require('../../images/burger.jpg')}
        style={{
          height: hp(25),
          zIndex: 1,
          position: 'absolute',
          width: wp(100),
        }}
      />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: hp(20),
            //   zIndex: 1,
            //   backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Burger</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16, marginTop: 5, fontWeight: 'bold'}}>
              Singh Club - Sector 5000
            </Text>
            <Image
              source={require('../../images/notification_fild_icon.png')}
              style={{width: 20, marginRight: 20, height: 20}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <Text>Subway Fast-food</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../images/icon_heart_active.png')}
                style={{height: 15, width: 15}}
              />
              <Image
                source={require('../../images/icon_share.png')}
                style={{height: 20, width: 20, marginLeft: 20, borderRadius: 5}}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'grey',
              marginTop: 10,
            }}></View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon1 name="tag-faces" size={15} />
            <Text style={{marginLeft: 15}}>Rating 4.0</Text>
            <Image
              source={require('../../images/black.png')}
              style={{height: 15, width: 15, marginLeft: 5}}
            />
            <Text> (500 +)</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon2 name="clock" size={15} />
            <Text style={{marginLeft: 15}}>08:00am - 05:00pm</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 80,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ccc',
                }}>
                <Text style={{fontSize: 12}}>DELIVERY</Text>
              </View>
              <View
                style={{
                  width: 80,
                  height: 30,
                  marginLeft: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey',
                }}>
                <Text style={{fontSize: 12}}>PICKUP</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Text>GHC 0 </Text>
                <Text style={{fontSize: 12}}>Fees</Text>
              </View>
              <View style={{alignItems: 'center', marginLeft: 10}}>
                <Text>13</Text>
                <Text style={{fontSize: 12}}>min</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <FlatList
              data={list}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Aduane Specials
            </Text>
            <View>
              <Image
                source={require('../../images/burger.jpg')}
                style={{
                  height: 100,
                  width: '100%',
                  borderRadius: 10,
                  marginTop: isIOS ? 10 : 0,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  height: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginTop: 10,
                  width: 20,
                  backgroundColor: '#ccc',
                }}>
                <Icon3
                  name="cross"
                  size={15}
                  // style={{position: 'absolute', zIndex: 1}}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginTop: isIOS ? 10 : 0,
                  }}>
                  Simple
                </Text>
                <Text style={{color: 'grey'}}>
                  Never frozen natural beef 130g, cheddar cheese
                </Text>
                <Text style={{color: 'grey'}}>
                  lettuce "iceberg", tomatoes, pickels, mustard Special
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'grey',
                  paddingBottom: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'red'}}>GHC 19.23</Text>
                <View
                  style={{
                    backgroundColor: 'red',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 15,
                    padding: 5,
                  }}>
                  <Icon3 name="star" size={10} color="white" />
                  <Text style={{color: 'white', fontSize: 12}}>Popular</Text>
                </View>
                <Text style={{color: 'grey'}}>380 calories</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomColor: 'grey',
                  paddingBottom: 10,
                  marginTop: 5,
                  borderBottomWidth: 0.5,
                }}>
                <Text>Count:{count}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => count > 0 && setCount(count - 1)}
                    style={{
                      height: 30,
                      width: 40,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon4 name="minus-square-o" size={15} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setCount(count + 1)}
                    style={{
                      height: 30,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      width: 40,
                      marginLeft: 2,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon4 name="plus-square-o" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <FlatList
              data={save}
              renderItem={renderItem1}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsCount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 15,
  },
  iconblack: {
    height: 30,
    width: 30,
    marginTop: 20,
    zIndex: 2,
    borderRadius: 20,
    backgroundColor: 'pink',
    marginLeft: 15,
    // paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
