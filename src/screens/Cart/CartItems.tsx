import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CartItem from '@src/components/CartItem';
import FallbackText from '@src/components/FallBackText';
import Friend from '@src/components/Friend';
import Loader from '@src/components/Loader';
import {
  addQuantityToCart,
  emptyCart,
  removeItemFromCart,
  subtractQuantityToCart,
  sumCartTotal,
  setDeliveryAddress,
  setCartFromNotification,
  setFriendData,
  setRestaurantLocation,
  setItemId,
} from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { Form, isIOS, shadow } from '@src/utilis';
import {
  payForFriendFood,
  showAllUsersList,
  getSharedOrders,
  removeSharedOrder,
} from '@src/utilis/APIs';
import { IFriend, NavigationProps } from '@src/utilis/types';

const CartItems = ({ navigation }: NavigationProps) => {
  const { user } = useAppSelector(({ USER }) => USER);
  const { cart, cartTotal, restaurantDetail, itemId, friendData } = useAppSelector(
    ({ CART, APPSTATE }) => ({ ...CART, ...APPSTATE }),
  );
  const dispatch = useAppDispatch();
  const tabBarHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  const [isProdShowing, setIsProdShowing] = useState(false);
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState(0);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [shareCart, setshareCart] = useState(null)
  const [orderShare_id, setorderShare_id] = useState("")
  const [singlePro, setsinglePro] = useState()
  const [myCart, setmyCart] = useState([])


  // const array2 = [...myCart];
  // const idsToRemove = array2.map(item => item.id);

  const idsToRemove = new Set(myCart?.map(item => item.id));

  // Use filter to remove items from the first array that match the ids
  const filteredArray1 = (cart || []).filter(item => !idsToRemove.has(item.id));
  console.log("check the array ", filteredArray1)

  const token = user?.api_token;



  useEffect(() => {
    _showAllUsersList();
    if (product) {
      calculateQty(product);
    }
  }, [cart]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getSharedOrders();
    });

    return unsubscribe;
  }, [navigation, shareCart, myCart]);







  const calculateQty = prod => {
    const item = cart.find((item: any) => item.id === prod.id);
    if (item) {
      setQty(parseInt(item.qty));
    }
  };

  const _showAllUsersList = async () => {
    try {
      const res = await showAllUsersList(token);
      if (res && res.status === 'success') {
        setAllUsers(res.userdata);
      }
    } catch (err) { }
  };

  const _payForFriendFood = async (item: IFriend) => {
    try {
      setLoader(true);
      const data = {
        share_id: item.id,
        cart: cart,
        restaurant: restaurantDetail,
        address: user?.address,
      };
      const res = await payForFriendFood({ data, token });

      setTimeout(() => {
        setLoader(false);
      }, 100);
      if (res && res.status === 'success') {
        // emptyCart()(dispatch);
        Alert.alert(
          '',
          `Order shared successfully!`,
          [
            {
              text: 'OK',
              onPress: () => { },
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      }
    } catch (err) {
      setTimeout(() => {
        setLoader(false);
      }, 100);
    }
  };
  // let y = (product.subtotal - (((product?.discount == 0 ? product?.discount_percent : product?.discount) / 100) * product.subtotal) * product?.count_increment);


  const _updatePluscount = (item) => {
    const productObject = {
      ...item,
      quantity: parseInt(item.quantity) + 1,

    };
    setsinglePro(productObject)

  }
  const _updateMinuecount = (item) => {
    const productObject = {
      ...item,
      quantity: parseInt(item.quantity) - 1,

    };
    setsinglePro(productObject)


  }

  const filterSearch = (text: string) => {
    const newData = allUsers.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
    setFilterData(newData);
  };

  const productDetails = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isProdShowing}
      onRequestClose={() => {
        setIsProdShowing(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginHorizontal: 15,
        }}>
        <View
          style={{
            height: isIOS ? hp(50) : hp(55),
          }}>
          <ImageBackground
            style={{
              height: 135,
              width: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: 'hidden',
            }}
            source={{ uri: product.thumbnail }}>
            <TouchableOpacity
              onPress={() => setIsProdShowing(false)}
              style={{
                height: 20,
                width: 20,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: 'grey',
              }}>
              <Entypo name={'cross'} size={15} color={'white'} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                {product.title}
              </Text>
              {product?.discount_percent || product.discount != 0 ? <Text style={{ color: 'grey', marginTop: 10 }}>{product?.discount_percent ? `${product?.discount_percent}% discount` : product.discount ? `GHC ${product.discount} discount` : null}</Text> : null}
            </View>

            <Text numberOfLines={3} style={{ marginTop: 3, color: 'grey' }}>
              {product.description}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: 10 }}>Total:</Text>
              <Text style={{ marginTop: 10, color: 'grey' }}>
                GHC {product.subtotal}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'grey',
                marginTop: 5,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text>Count: {singlePro?.quantity}</Text>
              <View
                style={{
                  height: 25,
                  width: 75,
                  backgroundColor: 'red',
                  flexDirection: 'row',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: '50%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}>
                  <TouchableOpacity
                    disabled={singlePro?.count_item_from == singlePro?.quantity ? true : false}
                    onPress={() => {
                      _updateMinuecount(singlePro)
                      // subtractQuantityToCart(product.id)(dispatch);
                      // sumCartTotal()(dispatch);
                    }}
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'white',
                      borderRadius: 1.5,
                    }}>
                    <AntDesign color={'white'} name="minus" size={15} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 25,
                    width: 1,
                    backgroundColor: 'white',
                  }}></View>
                <View
                  style={{
                    height: 30,
                    width: 0.5,
                    backgroundColor: 'white',
                  }}></View>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: '50%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}>
                  <TouchableOpacity
                    disabled={singlePro?.quantity == singlePro?.count_item_to ? true : false}
                    onPress={() => {
                      _updatePluscount(singlePro)
                      // addQuantityToCart(product.id)(dispatch);
                      // handlePress()
                      // sumCartTotal()(dispatch);
                    }}
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'white',
                      borderRadius: 1.5,
                      marginLeft: 2,
                    }}>
                    <AntDesign color={'white'} name="plus" size={15} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsProdShowing(false);
                navigation.navigate('Delivery', { shareCart: shareCart });
              }}
              style={{
                height: 40,
                marginTop: 10,
                backgroundColor: 'red',
                width: '100%',
                borderRadius: 10,
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{ color: 'white', marginLeft: 8 }}>
                Go to checkout
              </Text>
              <Text style={{ color: 'white', marginRight: 8 }}>
                GHC {singlePro?.subtotal * singlePro?.quantity}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ShowAllUsersList = () => (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAllUsers}
        onRequestClose={() => {
          setShowAllUsers(false);
        }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'white',
              height: hp(65),
              width: wp(100),
              paddingTop: 10,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginTop: 20,
              paddingHorizontal: 10,
              ...shadow,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
                My Friend is Paying
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAllUsers(false);
                  setSearchQuery('');
                }}
                style={{
                  height: 20,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: 'grey',
                }}>
                <Entypo name={'cross'} size={15} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                height: 45,
                flexDirection: 'row',
                paddingLeft: 20,
                width: '85%',
                left: 15,
                marginTop: 10,
                borderRadius: 20,
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'lightgrey',
              }}>
              <AntDesign name={'search1'} size={15} color={'#ccc'} />
              <View style={{ width: '90%', height: 40 }}>
                <TextInput
                  value={searchQuery}
                  onChangeText={text => {
                    setSearchQuery(text);
                    filterSearch(text);
                  }}
                  placeholder="Search"
                  placeholderTextColor="lightgrey"
                  style={{
                    marginLeft: 5,
                    color: 'black',
                    height: 40,
                  }}
                />
              </View>
            </View>

            <View>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: isIOS ? tabBarHeight + bottom : 0,
                }}
                data={filterData.length ? filterData : allUsers}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: IFriend }) => (
                  <Friend
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    email={item.email}
                    onPress={() => ShowAlert(item)}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={{ height: 20 }}></View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

  const ShowAlert = (item: IFriend) => {
    Alert.alert(
      '',
      `Do you want '${item.name}' to pay for Order?`,
      [
        {
          text: 'CLOSE',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            setShowAllUsers(false);
            _payForFriendFood(item);
          },
        },
      ],
      { cancelable: false },
    );
  };



  const _getSharedOrders = () => {
    getSharedOrders(token).then((res) => {
      if (res.my_data) {
        const mycart = res.my_data.cart
        setmyCart(mycart)
      }
      // const mycart = res.my_data.cart
      // setmyCart(mycart)

      setshareCart(res.data)
      setLoader(false)
      setorderShare_id(res.data.id)
      setItemId(res.data.id)(dispatch);
      const friendData = res.data.user_from;

      const restaurant = res.data.restaurant;
      // setCartFromNotification({ cart: newCartItems, restaurant })(dispatch);
      // setCartFromNotification({ cart: cart, restaurant })(dispatch);

      setFriendData(friendData)(dispatch);
      sumCartTotal()(dispatch);
      setDeliveryAddress(res.data.address)(dispatch);
      setRestaurantLocation({
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      })(dispatch)

    }).catch((error) => {
      console.log("check Error", error)

    })
  }

  // const _getSharedOrders = async () => {
  //   setLoader(true)
  //   try {
  //     const res = await getSharedOrders(token);
  //     if (res && res.status === 'success') {
  //       const mycart = res.my_data.cart
  //       setmyCart(mycart)  


  //       setLoader(false)
  //       setorderShare_id(res.data.id)
  //       setItemId(res.data.id)(dispatch);
  //       const friendData = res.data.user_from;

  //       const restaurant = res.data.restaurant;
  //       // setCartFromNotification({ cart: newCartItems, restaurant })(dispatch);
  //       // setCartFromNotification({ cart: cart, restaurant })(dispatch);

  //       setFriendData(friendData)(dispatch);
  //       sumCartTotal()(dispatch);
  //       setDeliveryAddress(res.data.address)(dispatch);
  //       setRestaurantLocation({
  //         latitude: restaurant.latitude,
  //         longitude: restaurant.longitude,
  //       })(dispatch)
  //     }
  //   } catch (err) {
  //     setLoader(false)

  //   }
  // };


  const _removeSharedOrder = async (id: string) => {
    try {
      const data = new FormData();
      data.append('share_id', itemId);
      const res = await removeSharedOrder({ data, token });
      if (res && res.status === 'success') {
        removeItemFromCart(id)(dispatch);
        setshareCart()
        sumCartTotal()(dispatch);
      }
    } catch (err) {

    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: tabBarHeight,
      }}>
      {loader && <Loader loader={loader} />}
      <View style={styles.topView}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cart</Text>
        <Image
          source={
            user?.image
              ? { uri: user?.image }
              : require('@src/images/placeholder.png')
          }
          style={styles.img}
        />
      </View>
      {!cart?.length && !shareCart?.cart?.length ? <FallbackText message="No products added in cart." /> : null}
      <View style={styles.bottomView}>
          <FlatList
            data={cart?cart:filteredArray1}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  onPress={() => {
                    setIsProdShowing(true);
                    setProduct(item);
                    setsinglePro(item)
                    calculateQty(item);
                  }}
                  onShare={() => setShowAllUsers(true)}
                  onRemove={() => {
                    if (item.isShared) {
                      _removeSharedOrder(item.id);
                    } else {
                      removeItemFromCart(item.id)(dispatch);
                      sumCartTotal()(dispatch);
                    }
                  }}
                />
              )
            }


            }
            keyExtractor={item => item.id}
          />

      </View>
      <View style={styles.bottomView}>
        <FlatList
          data={shareCart?.cart}
          renderItem={({ item }) => {
            return (
              <CartItem
                item={item}
                onPress={() => {
                  setIsProdShowing(true);
                  setProduct(item);
                  setsinglePro(item)
                  calculateQty(item);
                }}
                onShare={() => setShowAllUsers(true)}
                onRemove={() => {
                  if (item.isShared) {
                    _removeSharedOrder(item.id);
                  } else {
                    removeItemFromCart(item.id)(dispatch);
                    sumCartTotal()(dispatch);
                  }
                }}
              />
            )
          }
          }
          keyExtractor={item => item.id}
        />
      </View>
      {productDetails()}
      {ShowAllUsersList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  bottomView: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  flatView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default CartItems;
