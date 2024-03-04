import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

const DetailsCart = ({navigation}) => {
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
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
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
      <View style={styles.iconblack}>
        <Icon name="left" size={15} color="white" />
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
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Burger</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16, marginTop: 5, fontWeight: 'bold'}}>
              Singh Club - Sector 50
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
            <Text> (500+)</Text>
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
                style={{height: 100, width: '100%', borderRadius: 10}}
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
                <Icon3 name="cross" size={15} />
              </View>
              <View>
                <Text style={{fontWeight: 'bold'}}>Simple</Text>
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
                <Text>Count:0</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DetailsCheckout');
                  }}
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 100,
                  }}>
                  <Text style={{color: 'white'}}>Add to cart</Text>
                </TouchableOpacity>
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
export default DetailsCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconblack: {
    height: 30,
    width: 30,
    marginTop: 20,
    zIndex: 2,
    borderRadius: 20,
    backgroundColor: 'pink',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
