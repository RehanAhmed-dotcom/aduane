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
import {RadioButton} from 'react-native-paper';
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

const DetailsCheckout = ({navigation}) => {
  const list = [
    'Aduane Specials',
    'Popular Items',
    'Chicken',
    'Beverages',
    'Desserts',
    'Meal',
  ];

  const [underLine, setUnderLine] = useState('Aduane Specials');
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const [count, setCount] = useState(0);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setUnderLine(item)}
        style={{
          marginRight: 15,
          borderBottomColor: underLine == item ? '#ccc' : 'white',
          borderBottomWidth: 1,
        }}>
        <Text style={{fontSize: 10}}>{item}</Text>
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconblack}>
        <Icon name="left" size={15} color="white" />
      </TouchableOpacity>
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
            <Text style={{color: 'grey'}}>Subway Fast-food</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../images/icon_heart_active.png')}
                style={{height: 15, width: 15}}
              />
              <Image
                source={require('../../images/icon_share.png')}
                style={{height: 20, width: 20, marginLeft: 15, borderRadius: 5}}
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
            <Text style={{marginLeft: 15, color: 'grey'}}>Rating 4.0</Text>
            <Image
              source={require('../../images/black.png')}
              style={{height: 15, width: 15, marginLeft: 5}}
            />
            <Text style={{color: 'grey'}}> (500+)</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon2 name="clock" size={15} />
            <Text style={{marginLeft: 15, color: 'grey'}}>
              08:00am - 05:00pm
            </Text>
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
                <Text style={{fontSize: 12, color: 'grey'}}>Fees</Text>
              </View>
              <View style={{alignItems: 'center', marginLeft: 10}}>
                <Text>13</Text>
                <Text style={{fontSize: 12, color: 'grey'}}>Min</Text>
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{underLine}</Text>

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
              <View style={{marginTop: isIOS ? 10 : 0}}>
                <Text style={{fontSize: 14}}>Simple</Text>
                <Text style={{color: 'grey', marginTop: 5}}>
                  Never frozen natural beef 130g, cheddar cheese,
                </Text>
                <Text style={{color: 'grey'}}>
                  lettuce "iceberg", tomatoes, pickels, mustard Special
                </Text>
              </View>
              <Text style={{fontSize: 14, marginTop: 15}}>How much?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>GHC{count}.00</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => count > 0 && setCount(count - 1)}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 25,
                        width: 35,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        backgroundColor: 'red',
                      }}>
                      <Icon4 name="minus-square-o" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setCount(count + 1)}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 25,
                        width: 35,
                        marginLeft: 1,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        backgroundColor: 'red',
                      }}>
                      <Icon4 name="plus-square-o" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{color: 'grey', fontSize: 12}}>0 calories</Text>
              </View>
              <Text style={{fontSize: 16, marginTop: 10}}>Recommedations</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Delivery')}
                style={{
                  backgroundColor: 'red',
                  padding: 15,
                  flexDirection: 'row',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Go to checkout
                </Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  GHC19.23
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value="first"
                    color="red"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                  />
                  <Text style={{fontSize: 12, marginLeft: 0, color: 'grey'}}>
                    Simple (130 calories)
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: isIOS ? 15 : 0,
                  }}>
                  <Icon4
                    onPress={() => count1 > 0 && setCount1(count1 - 1)}
                    name="minus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text
                    style={{paddingHorizontal: 4, color: 'grey', fontSize: 12}}>
                    GHC {count1}.0
                  </Text>
                  <Icon4
                    onPress={() => setCount1(count1 + 1)}
                    name="plus-square-o"
                    size={20}
                    color="red"
                  />
                </View>
              </View>
              <Text style={{fontSize: 16, marginTop: 10, marginLeft: 10}}>
                Recommendations
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value="first"
                    color="red"
                    status={checked1 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked1(!checked1)}
                  />
                  <Text style={{fontSize: 12, marginLeft: 0, color: 'grey'}}>
                    Simple (130 calories)
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon4
                    onPress={() => count2 > 0 && setCount2(count2 - 1)}
                    name="minus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text style={{paddingHorizontal: 4, color: 'grey'}}>
                    {count2}
                  </Text>
                  <Icon4
                    onPress={() => setCount2(count2 + 1)}
                    name="plus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text
                    style={{paddingHorizontal: 4, color: 'grey', fontSize: 12}}>
                    GHC 5.00
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value="first"
                    color="red"
                    status={checked2 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked2(!checked2)}
                  />
                  <Text style={{fontSize: 12, marginLeft: 0, color: 'grey'}}>
                    Simple (130 calories)
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon4
                    onPress={() => count3 > 0 && setCount3(count3 - 1)}
                    name="minus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text style={{paddingHorizontal: 4, color: 'grey'}}>
                    {count3}
                  </Text>
                  <Icon4
                    onPress={() => setCount3(count3 + 1)}
                    name="plus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text
                    style={{paddingHorizontal: 4, color: 'grey', fontSize: 12}}>
                    GHC 5.00
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  //   borderBottomWidth: 0.5,
                  //   borderBottomColor: '#ccc',
                  //   marginBottom: 15,
                  backgroundColor: 'pink',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value="first"
                    color="red"
                    status={checked3 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked3(!checked3)}
                  />
                  <Text style={{fontSize: 12, marginLeft: 0, color: 'grey'}}>
                    Simple (130 calories)
                  </Text>
                </View>
                <Text style={{color: 'white', fontSize: 10}}>NOT AVALIBLE</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon4
                    onPress={() => count4 > 0 && setCount4(count4 - 1)}
                    name="minus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text style={{paddingHorizontal: 4, color: 'grey'}}>
                    {count4}
                  </Text>
                  <Icon4
                    onPress={() => setCount4(count4 + 1)}
                    name="plus-square-o"
                    size={20}
                    color="red"
                  />
                  <Text
                    style={{paddingHorizontal: 4, color: 'grey', fontSize: 12}}>
                    GHC 5.00
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 0.5,
                  marginTop: 10,
                }}></View>
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
                <Text style={{color: 'grey'}}>Count:0</Text>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('DetailsCount')}
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 100,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white'}}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <FlatList
              data={save}
              renderItem={renderItem1}
              keyExtractor={item => item.id}
            /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsCheckout;

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
