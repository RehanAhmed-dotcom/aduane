import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { configureFonts, RadioButton } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStripe } from '@stripe/stripe-react-native';
import Button from '@src/components/Button';
import Loader from '@src/components/Loader';
import Friend from '@src/components/Friend';
import OrderItemsList from '@src/components/OrderItemsList';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { Form, isIOS, shadow } from '@src/utilis';
import {
  getRecommendedProduct,
  placeOrder,
  payForOrder,
  removeSharedOrder,
  payForFriendFood,
  showAllUsersList,
  confirmPayment
} from '@src/utilis/APIs';
import {
  emptyCart,
  setDeliveryAddress,
  setDeliveryType,
} from '@src/redux/actions';
import PaymentView from '@src/components/PaymentView';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
const Delivery = ({ navigation, route }: any) => {
  const shared = route?.params?.shared;
  const disc = route?.params?.disc;
  const shareCart = route?.params?.shareCart;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { user } = useAppSelector(({ USER }) => USER);
  const { cart, cartTotal, restaurantDetail } = useAppSelector(({ CART }) => CART);
  const {
    delivery_address,
    deliveryType,
    deliveryFee,
    deliveryTime,
    coords,
    itemId,
  } = useAppSelector(({ APPSTATE }) => APPSTATE);
  const token = user?.api_token;




  const dispatch = useAppDispatch();

  const [address, setAddress] = useState<string>(
    delivery_address ? delivery_address : user?.address,
  );
  const [guestName, setGuestName] = useState('');
  const [guestAddress, setGuestAddress] = useState('');
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [tip, setTip] = useState(undefined);
  const [comment, setComment] = useState('');
  const [loader, setLoader] = useState(false);
  const [recommendedProd, setRecommendedProd] = useState('');
  const [total, setTotal] = useState(0.0);
  const [orderSucceeded, setOrderSuccessed] = useState(false);
  const [payNow, setPayNow] = useState(shared ? true : false);
  const [orderId, setOrderId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('visa-card');
  const [paymentMethodModal, setPaymentMethodModal] = useState(true);
  const [cardDetailsModal, setCardDetailsModal] = useState(false);
  const [mobileMoneyModal, setMobileMoneyModal] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [savePhone, setSavePhone] = useState(false);
  const [paymentTitle, setPaymentTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


  const paystackWebViewRef = useRef();


  const initializePaymentSheet = async (responce) => {
    const { error } = await initPaymentSheet({
      customerId: responce.customer,
      customerEphemeralKeySecret: responce.ephemeralKey,
      paymentIntentClientSecret: responce.paymentIntent,
      merchantDisplayName: 'AduaneKey',
      allowsDelayedPaymentMethods: true,
      style: "alwaysDark",
    })
    if (!error) {
      openPaymentSheet(responce);
    }
  };
  const openPaymentSheet = async (responce) => {
    const { error } = await presentPaymentSheet();
    if (error) {
    } else {
      _confirmPayment(responce)
      // setIsPaid(true);
    }
  };

  const _payment = (id:string) => {
    const data = new FormData();
    data.append('order_id', id);
    payForOrder({ data, token }).then((responce) => {
      setOrderSuccessed(false);
      initializePaymentSheet(responce)
    }).catch((error) => {
      console.log("Error", error)
    })
  }
  const _confirmPayment = (res) => {
    const data = new FormData();
    data.append('amount', res.amount);
    data.append('payment_intent_id', res.payment_intent_id);
    data.append("customer_id", res.customer)
    data.append("order_id", orderId)
    confirmPayment({ data, token }).then((responce) => {
      if (responce) {
        Alert.alert(
          "Congratulation!",
          "Your payment has been added successfuly",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => navigation.navigate('OrderPlaced') }
          ]
        );
      }
    }).catch((err) => {
      console.log("errror", err)
    })
  };
  const tips = [
    { label: 'No tips', value: 0 },
    { label: 'GHC1', value: 1 },
    { label: 'GHC2', value: 2 },
    { label: 'GHC3', value: 3 },
  ];

  const filterSearch = (text: string) => {
    const newData = allUsers.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
    setFilterData(newData);
  };

  useEffect(() => {
    _getRecommendedProduct();
    _showAllUsersList();
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setPaymentMethodModal(true);
  //   }, 1000);
  // }, []);
  const _showAllUsersList = async () => {
    try {
      const res = await showAllUsersList(token);
      if (res && res.status === 'success') {
        setAllUsers(res.userdata);
      }
    } catch (err) { }
  };


  // useEffect(() => {
  //   shared != undefined ? _placeOrder() : null
  // }, [shared])

  useEffect(() => {
    if (deliveryType != 'pickup') {
      let totalAmount =
        parseFloat(cartTotal) +
        parseFloat(deliveryFee) +
        parseInt(tip === undefined ? 0 : tip);

      let ammount = recommendedProd
        ? (totalAmount + parseFloat(recommendedProd.subtotal)).toFixed(2)
        : totalAmount.toFixed(2);
      setTotal(parseFloat(ammount));
    } else {
      let ammount = recommendedProd
        ? (
          parseFloat(cartTotal) + parseFloat(recommendedProd.subtotal)
        ).toFixed(2)
        : parseFloat(cartTotal).toFixed(2);
      setTotal(parseFloat(ammount));
    }
  }, [recommendedProd, deliveryType, tip, cartTotal]);

  const _getRecommendedProduct = async () => {
    try {
      const data = new FormData();
      data.append('restaurant_id', restaurantDetail.id);
      cart.forEach(item => {
        data.append('cart_item[]', item.id);
      });
      const res = await getRecommendedProduct({ data, token });

      if (res && res.status === 'success') {
        setRecommendedProd({ ...res.data, qty: 0, subtotal: 0 });
      }
    } catch (error) { }
  };



  const _placeOrder = async () => {
    let cartItems = [];
    let cartRw = [];
    if (recommendedProd.qty > 0) {
      cartItems = cart.concat([recommendedProd]);
      cartItems.forEach(item =>
        cartRw.push({
          product_id: item.id,
          quantity: item.qty,
          price: item.subtotal,
        }),
      );
    } else {
      cartItems = [...cart];
      cartItems.forEach(item =>
        cartRw.push({
          product_id: item.id,
          quantity: item.qty,
          price: item.subtotal,
        }),
      );
    }

    try {
      setLoader(true);
      const data = {
        restaurant_id: restaurantDetail.restaurant_id,
        order_comment: comment,
        order_tip: tip === undefined ? 0 : tip,
        cart: cartRw,
        name: guestName,
        // share_id: shared_id,
        address: guestAddress,
      };


       const res = await placeOrder({ data, token });

        setLoader(false);

        if (res && res.status === 'success') {

          // setOrderSuccessed(true);
          
          setOrderId(res.order_id);
          setDeliveryAddress(undefined)(dispatch);
          // setTimeout(() => {}, 1000) 
          _payment(res.order_id);

        }
    }
    catch (error) {
      console.log("err{{{{{{{{{{", error)
      setLoader(false);
    }
  };

  const _placeOrder2 = async () => {
    try {

      const cartItems = [...shareCart.cart];
      let cartRw = [];
      cartItems.forEach(item =>
        cartRw.push({
          product_id: item.id,
          quantity: item.quantity,
          price: item.subtotal,
        }),
      );
      setLoader(true);
      const data = {

        restaurant_id: restaurantDetail.restaurant_id,
        order_comment: comment,
        order_tip: tip === undefined ? 0 : tip,
        cart: cartRw,
        name: guestName,
        share_id: shareCart.id,
        address: guestAddress,
      };


      const res = await placeOrder({ data, token });

      setLoader(false);

      if (res && res.status === 'success') {

        // setOrderSuccessed(true);
       
        setOrderId(res.order_id);
        setDeliveryAddress(undefined)(dispatch);
        _payment(res.order_id)
        // setTimeout(() => {}, 1000) 
      }
    }
    catch (error) {
      console.log("Callling Error", error.response)
      setLoader(false);
    }
  };

  const _removeSharedOrder = async () => {
    try {
      const data = new FormData();
      data.append('share_id', itemId);
      const res = await removeSharedOrder({ data, token });
      if (res && res.status === 'success') {
      }
    } catch (err) { }
  };

  const onPaymentFailure = () => {
    setPaymentStatus('Payment failed due to some issue');
    setTimeout(() => {
      setIsVisible(false);
      setPayNow(false);
    }, 2000);
  };

  const onCheckStatus = async (paymentResponse: any) => {
    let response = JSON.parse(paymentResponse);
    if (!response) {
    } else if (response.error) {
    } else {
      setPaymentStatus('Please wait while confirming your payment!');
      setIsVisible(true);

      let jsonResponse = JSON.parse(paymentResponse);
      // perform operation to check payment status

      const data = new FormData();
      data.append('tokenId', jsonResponse.token.id);
      data.append('order_id', orderId);
      try {
        const stripeResponse = await payForOrder({ data, token });

        if (stripeResponse.status === 'success') {
          const { stripedata } = stripeResponse;
          const { paid } = stripedata;

          if (paid === true) {
            setPaymentStatus(`Payment has been Successful.`);
            // _placeOrder()
            setTimeout(() => {
              setIsVisible(false);
              setPayNow(false);
              setGuestName('');
              setGuestAddress('');
              setComment('');
              setDeliveryAddress(undefined)(dispatch);
              emptyCart()(dispatch);
              // navigation.navigate('Home');
              navigation.navigate('OrderPlaced')
            }, 2000);
          } else {
            onPaymentFailure();
          }
        } else {
          onPaymentFailure();
        }
      } catch (error) {
        onPaymentFailure();
      }
    }
  };



  const PaymentStatusModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <>
        <Loader loader={isVisible} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 50,
          }}>
          <Text>{paymentStatus}</Text>
        </View>
      </>
    </Modal>
  );

  const PaymentModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={payNow}
      onRequestClose={() => {
        setPayNow(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Ionicons
          onPress={() => {
            setPayNow(false)
            navigation.navigate("Home")
          }}
          style={{
            marginLeft: 10,
            marginTop: 0,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            zIndex: 100,
          }}
          name="ios-arrow-back-sharp"
          size={30}
          color="#11005D"
        />
        <View
          style={{
            height: 200,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#11005D',
              marginTop: 30,
              fontWeight: '700',
              letterSpacing: 0.5,
            }}>
            Order Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
              width: '80%',
            }}>
            <Text style={{ color: '#373737' }}>Item subtotal</Text>
            <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 12 }}>
              GHC{' '}
              {recommendedProd
                ? (
                  parseFloat(cartTotal) + parseFloat(recommendedProd.subtotal)
                ).toFixed(2)
                : parseFloat(cartTotal).toFixed(2)}
            </Text>
          </View>
          {deliveryType === 'delivery' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                alignItems: 'center',
                width: '80%',
              }}>
              <Text style={{ color: '#373737' }}>Delivery</Text>
              <Text
                style={{ color: '#373737', fontWeight: 'bold', fontSize: 12 }}>
                GHC {deliveryFee}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
              width: '80%',
            }}>
            <Text style={{ color: '#373737' }}>Total</Text>
            <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 12 }}>
              GHC {total?.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* <PaymentView navigation={navigation} onCheckStatus={onCheckStatus} amount={total} /> */}
      </View>
    </Modal>
  );

  const AlertModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={orderSucceeded}
      onRequestClose={() => {
        setOrderSuccessed(false);
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,.2)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '80%',
            borderRadius: 10,
            padding: 15,
            ...shadow,
          }}>
          <View>
            <View>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                Order Placed
              </Text>
              <Text
                style={{
                  fontSize: 15,
                }}>
                Congratulations! Your order placed successfully.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // _payment()
                setOrderSuccessed(false);

                // setPayment(true)
                // setGuestName('');
                // setGuestAddress('');
                // setComment('');
                // setDeliveryAddress(undefined)(dispatch);
                // emptyCart()(dispatch);
                // setPayNow(true)
                // navigation.navigate('OrderPlaced');
              }}
              style={{
                alignSelf: 'flex-end',
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const myModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={cardDetailsModal}
      onRequestClose={() => {
        setCardDetailsModal(false);
      }}>
      <Form style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 20,
              paddingTop: 10,
              ...shadow,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Entypo
                name="circle-with-cross"
                color="grey"
                size={20}
                onPress={() => setCardDetailsModal(false)}
              />
            </View>
            <View>
              <Text>Enter your credit card details</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 40,
                width: '90%',
                borderRadius: 10,
                backgroundColor: '#ccc',
              }}>
              <TextInput
                placeholder="Cardholder Name"
                placeholderTextColor="grey"
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                height: 40,
                width: '90%',
                borderRadius: 10,
                backgroundColor: '#ccc',
              }}>
              <TextInput
                placeholder="Card Number"
                placeholderTextColor="grey"
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                height: 40,
                width: '90%',

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Expiry Date"
                placeholderTextColor="grey"
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  width: '40%',
                  backgroundColor: '#ccc',
                  borderRadius: 10,
                  height: 40,
                }}
              />
              <TextInput
                placeholder="CVV"
                placeholderTextColor="grey"
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  width: '30%',
                  backgroundColor: '#ccc',
                  borderRadius: 10,
                  height: 40,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {saveCard ? (
                <AntDesign
                  onPress={() => setSaveCard(false)}
                  size={25}
                  name="checkcircleo"
                  color="red"
                />
              ) : (
                <AntDesign
                  onPress={() => setSaveCard(true)}
                  name="checkcircle"
                  color="red"
                  size={25}
                />
              )}
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Save this card for the future payments?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCardDetailsModal(false)}
              style={{
                backgroundColor: 'red',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: hp(7),
                bottom: 20,
              }}>
              <Text style={{ color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Form>
    </Modal>
  );

  const locationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLocationModal}
      onRequestClose={() => {
        setIsLocationModal(false);
      }}>
      <Form style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 20,
              paddingTop: 10,
              ...shadow,
              paddingBottom: 20,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Entypo
                name="circle-with-cross"
                color="grey"
                size={20}
                onPress={() => setIsLocationModal(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text>Change My Location</Text>
              <AntDesign name="down" style={{ marginLeft: 10 }} />
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                value={address}
                onChangeText={text => setAddress(text)}
                placeholder="Change address"
                placeholderTextColor="grey"
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text>Delivery for another user</Text>
              <AntDesign name="down" style={{ marginLeft: 10 }} />
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                value={guestName}
                onChangeText={text => setGuestName(text)}
                placeholder="Name"
                placeholderTextColor="grey"
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                value={guestAddress}
                onChangeText={text => setGuestAddress(text)}
                placeholder="Address"
                placeholderTextColor="grey"
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
                width: '80%',
              }}>
              {restaurantDetail.is_delivery && (
                <TouchableOpacity
                  onPress={() => setDeliveryType('delivery')(dispatch)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton.Android
                    value="delivery"
                    color="red"
                    status={
                      deliveryType === 'delivery' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setDeliveryType('delivery')(dispatch)}
                  />
                  <Text style={{ color: 'black' }}>DELIVERY</Text>
                </TouchableOpacity>
              )}
              {restaurantDetail.is_pickup && (
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => setDeliveryType('pickup')(dispatch)}>
                  <RadioButton.Android
                    value="pickup"
                    color="red"
                    status={deliveryType === 'pickup' ? 'checked' : 'unchecked'}
                    onPress={() => setDeliveryType('pickup')(dispatch)}
                  />
                  <Text style={{ color: 'black' }}>PICKUP</Text>
                </TouchableOpacity>
              )}
            </View>
            <Button name="Done" onPress={() => setIsLocationModal(false)} />
          </View>
        </View>
      </Form>
    </Modal>
  );

  const ShowAllUsersList = () => (
    <SafeAreaView >
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAllUsers}
        style={{ backgroundColor: 'red', flex: 1 }}
        onRequestClose={() => {
          setShowAllUsers(false);
        }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',

          // justifyContent: 'flex-end'
        }}>
          <View
            style={{
              backgroundColor: 'white',
              height: hp(60),
              width: wp(100),
              paddingTop: 20,
              borderRadius: 15,
              // margin:5,
              // borderTopLeftRadius: 15,
              // borderTopRightRadius: 15,

              // marginTop: 20,
              paddingHorizontal: 10,
              // ...shadow,
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
                // contentContainerStyle={{
                //   paddingBottom: isIOS ? tabBarHeight + bottom : 0,
                // }}
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
      `Do you want'${item.name}' to pay for Order?`,
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
            // _placeOrder() //new line add today
          },
        },
      ],
      { cancelable: false },
    );
  };
  const myModal2 = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={paymentMethodModal}
      onRequestClose={() => {
        setPaymentMethodModal(false);
      }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: 'white',

            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 20,
            paddingTop: 10,
            ...shadow,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Entypo
              name="circle-with-cross"
              color="grey"
              size={20}
              onPress={() => setPaymentMethodModal(false)}
            />
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Payment method</Text>
          <TouchableOpacity
            onPress={() => setPaymentMethod('visa-card')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '85%',
              marginTop: 10,
            }}>
            {paymentMethod === 'visa-card' ? (
              <Ionicons
                color="red"
                name="md-checkmark-circle-sharp"
                size={15}
              />
            ) : (
              <View style={{ width: 15 }} />
            )}
            <View
              style={{
                borderRadius: 10,
                height: 40,
                backgroundColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingLeft: 15,
              }}>
              <Image
                source={require('../../images/icon_mastercard.png')}
                style={{ height: 30, width: 30 }}
              />
              <View style={{ marginLeft: 5 }}>
                <Text>MC......9345</Text>
                <Text style={{ fontSize: 12 }}>
                  Pay with MasterCard, Visa or Visa
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentMethod('vodafone');
              setPaymentTitle('Charged from mobile money');
              // setPaymentTitle('Vodafone Mobile Money');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '85%',
              marginTop: 10,
            }}>
            {paymentMethod === 'vodafone' ? (
              <Ionicons
                color="red"
                name="md-checkmark-circle-sharp"
                size={15}
              />
            ) : (
              <View style={{ width: 15 }} />
            )}

            <View
              style={{
                borderRadius: 10,
                height: 40,
                backgroundColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingLeft: 15,
              }}>
              <Icon name="mobile" size={25} />
              <View style={{ marginLeft: 5 }}>
                <Text>Vodafone Mobile Money</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentMethod('airtel');
              setPaymentTitle('Charged from mobile money');
              // setPaymentTitle('Airteltigo Money');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '85%',
              marginTop: 10,
            }}>
            {paymentMethod === 'airtel' ? (
              <Ionicons
                color="red"
                name="md-checkmark-circle-sharp"
                size={15}
              />
            ) : (
              <View style={{ width: 15 }} />
            )}
            <View
              style={{
                borderRadius: 10,
                height: 40,
                backgroundColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingLeft: 15,
              }}>
              <Icon name="mobile" size={25} />
              <View style={{ marginLeft: 5 }}>
                <Text>Airteltigo Money</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPaymentMethod('mtn');
              setPaymentTitle('Charged from mobile money');
              // setPaymentTitle('MTN Money');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '85%',
              marginTop: 10,
            }}>
            {paymentMethod === 'mtn' ? (
              <Ionicons
                color="red"
                name="md-checkmark-circle-sharp"
                size={15}
              />
            ) : (
              <View style={{ width: 15 }} />
            )}
            <View
              style={{
                borderRadius: 10,
                height: 40,
                backgroundColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingLeft: 15,
              }}>
              <Icon name="mobile" size={25} />
              <View style={{ marginLeft: 5 }}>
                <Text>MTN Money</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentMethod('mobile');
              //  setPaymentTitle('Charged from mobile money');
              // setPaymentTitle('Zeepay Money');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '85%',
              marginTop: 10,
            }}>
            {paymentMethod === 'mobile' ? (
              <Ionicons
                color="red"
                name="md-checkmark-circle-sharp"
                size={15}
              />
            ) : (
              <View style={{ width: 15 }} />
            )}
            <View
              style={{
                borderRadius: 10,
                height: 40,
                backgroundColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingLeft: 15,
              }}>
              <Image
                source={require('../../images/friend.png')}
                style={{ height: 20, width: 20, resizeMode: 'contain' }}
              />
              <View style={{ marginLeft: 5 }}>
                <Text>my friend is paying</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (paymentMethod === 'mobile') {
                setShowAllUsers(true),
                  setPaymentMethodModal(false);
                ShowAllUsersList();
              }
              setPaymentMethodModal(false);
              if (paymentMethod === 'visa-card') {
                setCardDetailsModal(false);
              } else if (paymentMethod === 'mobile') {
                ShowAllUsersList();
              }
              else if (paymentMethod === 'mtn') {
                paystackWebViewRef.current.startTransaction()
              }
              else {
                setMobileMoneyModal(true);
              }
            }}
            style={{
              backgroundColor: 'red',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: hp(5),
              bottom: 20,
            }}>
            <Text style={{ color: 'white' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const myModal3 = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={mobileMoneyModal}
      onRequestClose={() => {
        setMobileMoneyModal(false);
      }}>
      <Form style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 20,
              paddingTop: 10,
              ...shadow,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Entypo
                name="circle-with-cross"
                color="grey"
                size={20}
                onPress={() => setMobileMoneyModal(false)}
              />
            </View>
            <View>
              <Text>Mobile Money</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 40,
                width: '90%',
                borderRadius: 10,
                backgroundColor: '#ccc',
              }}
            >
              <TextInput
                placeholder="Name"
                placeholderTextColor="grey"
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                height: 40,
                width: '90%',
                borderRadius: 10,
                backgroundColor: '#ccc',
              }}>
              <TextInput
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                keyboardType="number-pad"
                placeholder="Phone Number"
                placeholderTextColor="grey"
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  height: 40,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => setSavePhone(!savePhone)}
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {savePhone ? (
                <Ionicons
                  onPress={() => setSavePhone(false)}
                  name="md-checkmark-circle-sharp"
                  color="red"
                  size={25}
                />
              ) : (
                <Ionicons
                  onPress={() => setSavePhone(true)}
                  size={25}
                  name={'md-checkmark-circle-outline'}
                  color="red"
                />
              )}
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Save this mobile number for future payments?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMobileMoneyModal(false)}
              // onPress={() =>}
              style={{
                backgroundColor: 'red',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: hp(10),
                bottom: 20,
              }}>
              <Text style={{ color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Form>
    </Modal>
  );




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
        emptyCart()(dispatch);
        Alert.alert(
          '',
          `Order shared successfully!`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate("Home")
                // setPayNow(true) 
              },
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



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {shared === undefined || false ? <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {loader && <Loader loader={loader} />}
        <View style={{ height: hp(30), width: wp(100) }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 5.614818,
              longitude: -0.205874,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: parseFloat(user?.latitude),
                longitude: parseFloat(user?.longitude),
              }}>
              <Image
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
                source={require('@src/images/location.png')}
              />
            </Marker>
            <Marker
              coordinate={{
                latitude: parseFloat(coords?.latitude),
                longitude: parseFloat(coords?.longitude),
              }}>
              <Image
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
                source={require('@src/images/marker.png')}
              />
            </Marker>
          </MapView>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 30,
            width: 30,
            marginTop: isIOS ? 50 : 20,
            zIndex: 2,
            borderRadius: 20,
            backgroundColor: 'grey',
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <AntDesign name="left" size={15} color="white" />
        </TouchableOpacity>
        <ScrollView>
          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <Text style={{ fontSize: 24 }}>Order type</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="bicycle" size={20} />
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: '#373737', textTransform: 'capitalize' }}>
                    {deliveryType} in {deliveryTime} min
                  </Text>
                  {/* <Text style={{color: '#373737'}}>
                  Delivery in {restaurantDetail.delivery_within}
                </Text> */}
                  {guestAddress ? (
                    <Text style={{ color: 'grey', fontSize: 12 }}>
                      {guestAddress}
                    </Text>
                  ) : (
                    <Text style={{ color: 'grey', fontSize: 12 }}>{address}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsLocationModal(true)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F5F5F5',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text style={{ color: 'black' }}>Change</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 24, marginTop: 10 }}>Order Items</Text>
            <OrderItemsList />
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Ionicons name="chatbubble-sharp" color="red" size={20} />
              <View style={{ marginLeft: 10 }}>
                <Text>Add a comment for the resturant</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>
                  (special requests, allergic, dietary limitaions etc.)
                </Text>
              </View>
            </View>
            <View style={{ borderWidth: 1, height: 65, marginTop: 3 }}>
              <TextInput
                value={comment}
                onChangeText={text => setComment(text)}
                style={{ textAlignVertical: 'top', color: 'black', fontSize: 12 }}
                multiline
                numberOfLines={3}
                selectionColor={'black'}
              />
            </View>
            {recommendedProd ? (
              <>
                <Text style={{ fontSize: 22, marginTop: 15 }}>Recommendation</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome
                      name="minus-square-o"
                      onPress={() => {
                        if (recommendedProd.qty > 0) {
                          if (recommendedProd.is_fixed_price) {
                            if (
                              recommendedProd.count_bar &&
                              recommendedProd.qty >
                              recommendedProd.count_item_from
                            ) {
                              setRecommendedProd({
                                ...recommendedProd,
                                qty: parseInt(recommendedProd.qty) - 1,
                                subtotal: recommendedProd.is_fixed_price
                                  ? parseFloat(recommendedProd.fixed_price) *
                                  (parseInt(recommendedProd.qty) - 1)
                                  : recommendedProd.subtotal - 1,
                              });
                            } else {
                              setRecommendedProd({
                                ...recommendedProd,
                                qty: 0,
                                subtotal: 0,
                              });
                            }
                          } else {
                            if (
                              recommendedProd.qty >
                              recommendedProd.varied_price_from
                            ) {
                              setRecommendedProd({
                                ...recommendedProd,
                                qty: recommendedProd.qty - 1,
                                subtotal: parseFloat(recommendedProd.qty) - 1,
                              });
                            } else {
                              setRecommendedProd({
                                ...recommendedProd,
                                qty: 0,
                                subtotal: 0,
                              });
                            }
                          }
                        }
                      }}
                      color="red"
                      size={18}
                    />
                    <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                      {recommendedProd.qty}
                    </Text>
                    <FontAwesome
                      name="plus-square-o"
                      onPress={() => {
                        if (recommendedProd.is_fixed_price) {
                          if (
                            recommendedProd.count_bar &&
                            recommendedProd.qty <= recommendedProd.count_item_to
                          ) {
                            setRecommendedProd({
                              ...recommendedProd,
                              qty: parseInt(recommendedProd.qty) + 1,
                              subtotal: recommendedProd.is_fixed_price
                                ? parseFloat(recommendedProd.fixed_price) *
                                (parseInt(recommendedProd.qty) + 1)
                                : recommendedProd.subtotal + 1,
                            });
                          }
                        } else {
                          if (
                            recommendedProd.qty <= recommendedProd.varied_price_to
                          ) {
                            setRecommendedProd({
                              ...recommendedProd,
                              qty: recommendedProd.qty + 1,
                              subtotal: recommendedProd.is_fixed_price
                                ? parseFloat(recommendedProd.fixed_price) *
                                (parseFloat(
                                  recommendedProd.calories_amount /
                                  recommendedProd.GHC,
                                ) *
                                  recommendedProd.qty)
                                : recommendedProd.subtotal + 1,
                            });
                          }
                        }
                      }}
                      color="red"
                      size={18}
                    />
                    <Text style={{ marginLeft: 5, color: '#373737' }}>
                      {recommendedProd.title}
                    </Text>
                  </View>
                  {recommendedProd.subtotal ? (
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                      GHC {recommendedProd.subtotal.toFixed(2)}
                    </Text>
                  ) : recommendedProd.is_fixed_price ? (
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                      GHC {recommendedProd.fixed_price.toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                      GHC {recommendedProd.varied_price_from.toFixed(2)}
                    </Text>
                  )}
                </View>
              </>
            ) : null}
            <Text style={{ fontSize: 22, marginTop: isIOS ? 15 : 0 }}>Payment</Text>
            {paymentMethod === 'visa-card' ? (
              <Pressable
                onPress={() => setPaymentMethodModal(true)}
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../images/icon_card.png')}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: '#373737' }}>MC.....9345</Text>
                    <Text style={{ color: 'grey', fontSize: 12 }}>
                      Charged from the selected card
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setPaymentMethodModal(true)}>
                  <Image
                    source={require('../../images/icon_mastercard.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setPaymentMethodModal(true)}
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="mobile" size={25} color={'red'} />
                  <View style={{ marginLeft: 15 }}>
                    <View style={{ marginLeft: 5 }}>
                      {phoneNumber ? (
                        <Text>{phoneNumber}</Text>
                      ) : (
                        <Text>+233 XXXXXX</Text>
                      )}
                      <Text style={{ color: 'grey', fontSize: 12 }}>
                        {paymentTitle}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
            {deliveryType !== 'pickup' && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Image
                    source={require('../../images/icon_donate.png')}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: '#373737' }}>
                      Tip the courier (Optional)
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      {tips.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => setTip(item.value)}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 18,
                            marginRight: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: tip == item.value ? 'red' : '#ccc',
                          }}
                          key={index + 'a'}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: tip == item.value ? 'white' : 'black',
                            }}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}
            <Text style={{ fontSize: 24, marginTop: isIOS ? 10 : 0 }}>
              Price in GHC, index. taxes
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#373737' }}>Item subtotal</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 12 }}>
                GHC{' '}
                {recommendedProd
                  ? (
                    parseFloat(cartTotal) + parseFloat(recommendedProd.subtotal)
                  ).toFixed(2)
                  : parseFloat(cartTotal).toFixed(2)}
              </Text>
            </View>
            {deliveryType === 'delivery' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#373737' }}>Delivery</Text>
                <Text
                  style={{ color: '#373737', fontWeight: 'bold', fontSize: 12 }}>
                  GHC {deliveryFee}
                </Text>

              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#373737' }}>Total</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 12 }}>
                {/* replace by "disc" */}
                {/* GHC {total?.toFixed(2)} */}

                {/* new value */}

                {disc}
              </Text>
            </View>
            <TouchableOpacity
              // disabled={true}
              onPress={() => {
                if (shareCart?.isShared == true) {
                  _placeOrder2();

                } else {
                  _placeOrder();

                }

              }}
              style={{
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 10,
                height: 50,
                marginTop: 20,
                marginBottom: 10,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <AntDesign name="right" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 18 }}>Slide to confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {myModal()}
        {locationModal()}
        {myModal2()}
        {myModal3()}
        {AlertModal()}
        {PaymentModal()}
        {PaymentStatusModal()}
        {paymentMethod === "mobile" ? ShowAllUsersList() : null}
        {/* {pay ? Paystackpayment() : null} */}


      </SafeAreaView> : <View>
        {PaymentModal()}

      </View>}

        <Paystack
          paystackKey="pk_test_d937229119ed204c122bec45aa2289affb0db945"
          billingEmail="mhaameansah@gmail.com"
          amount={total} // Set the amount in kobo (e.g., 50000 for NGN 500)
          currency={'GHS'}
        
          onCancel={(e) => {
            console.log("checkkk", e)
            // handle response here
          }}
          onSuccess={(res) => {
           navigation.navigate("Home")

          }}
          ref={paystackWebViewRef}
        />
    </View>
  );
};

export default Delivery;
