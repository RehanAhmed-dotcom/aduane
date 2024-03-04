import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  ToastAndroid,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useScrollToTop } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackButton from '@src/components/BackButton';
import Product from '@src/components/Product';
import { RadioButton } from 'react-native-paper';

import {
  addItemToCart,
  addQuantityToCart,
  emptyCart,
  restaurantDetails,
  setDeliveryFee,
  setDeliveryTime,
  setDeliveryType,
  setRestaurantLocation,
  subtractQuantityToCart,
  sumCartTotal,
  setRequiredItems,
  setRecomendation
} from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { isIOS } from '@src/utilis';
import {
  getDistance,
  subCategoriesList,
  subCategoryProducts,
  toggleFavorite,
  toggleRestaurantNotifiction,
} from '@src/utilis/APIs';
import { isRestaurantClosed } from '@src/utilis/helpers';

import type {
  DetailsNavigationProps,
  IProduct,
  ISubCategories,
} from '@src/utilis/types';

const Details = ({ navigation, route }: DetailsNavigationProps) => {
  const { restaurant } = route.params;


  const { user } = useAppSelector(({ USER }) => USER);
  const { cart, cartTotal, restaurantDetail, temp, } = useAppSelector(({ CART }) => CART);
  const { deliveryType, deliveryTime, deliveryFee, recomendationSave, requiredItems } = useAppSelector(
    ({ APPSTATE }) => APPSTATE,
  );
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { height } = useWindowDimensions();
  const token = user.api_token;
  const [isFav, setIsFav] = useState<boolean | undefined>(
    restaurant.is_favourite,
  );
  const [category, setCategory] = useState<ISubCategories | undefined>(
    undefined,
  );
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [products, setProducts] = useState([]);
  const [filProducts, setFilProducts] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [loader, setLoader] = useState(false);
  const [qty, setQty] = useState(0);
  let listviewRef = useRef<FlatList>(null);
  const [first, setfirst] = useState({})
  const [idsList, setidsList] = useState([])
  const [btn, setbtn] = useState(false)
  const [btn2, setbtn2] = useState(false)

  const [checked, setChecked] = useState(false);
  const [ids, setids] = useState(-1)
  const [checkIds, setcheckIds] = useState([])
  const [requiredArr, setrequierdArr] = useState([])
  const [productData, setProductData] = useState(product?.recommendation || []);
  const [variedPrcieFrom, setVariedPriceFrom] = useState(0);
  const [miles, setMiles] = useState(0);
  const [oneCaloryPrice, setOneCaloryPrice] = useState(0);
  const [findReq, setfindReq] = useState()
  const [checkOutresult, setcheckOutresult] = useState(0)
  const [subCategories, setSubCategories] = useState([]);
  const [underLine, setUnderLine] = useState('');
  const [singlePro, setsinglePro] = useState()
  const [chkBtn, setchkBtn] = useState(true)

  useEffect(() => {
    setProductData(product?.recommendation || []);
  }, [product]);


  const array1 = requiredItems;
  const array2 = idsList;
  const [isNotify, setIsNotify] = useState<boolean>(
    restaurant.is_off_notification,
  );

  useEffect(() => {
    _subCategoriesList();
    // emptyCart()(dispatch)
    _getDistance();
  }, []);

  useEffect(() => {
    if (product) {
      calculateQty(product);
    }

  }, [cart]);




  useEffect(() => {
    if (category) {
      _subCategoryProducts(category);
    }
    emptyCart()(dispatch)
  }, [category]);

  useEffect(() => {
    _calculateDeliveryFee();
    setDeliveryTime((25 + 2 * miles).toFixed(0))(dispatch);
  }, [deliveryType, miles]);

  const _subCategoriesList = async () => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('restaurant_id', restaurant.restaurant_id);
      const res = await subCategoriesList({ data, token });
      setLoader(false);
      if (res && res.status === 'success') {
        setSubCategories(res.categories);
        if (res.categories.length) {
          setUnderLine(res.categories[0].title);
          setCategory(res.categories[0]);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };


  const _subCategoryProducts = async (item: ISubCategories) => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('restaurant_id', item.restaurant_id);
      data.append('category_id', item.id);
      const res = await subCategoryProducts({ data, token });
      setLoader(false);
      if (res && res.status === 'success') {
        setProducts(res.products);
        // setdumyArr(res.products)


      }
    } catch (error) {
      console.log("Errorrrr", error)
      setLoader(false);
    }
  };

  const _toggleFavorite = async () => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('restaurant_id', restaurant.id);

      const res = await toggleFavorite({ data, token });
      setLoader(false);
      if (res && res.status === 'success') {
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _toggleRestaurantNotifiction = async () => {
    setIsNotify(!isNotify);
    try {
      const data = new FormData();
      data.append('restaurant_id', restaurant.id);
      const res = await toggleRestaurantNotifiction({ data, token });
      if (res && res.status === 'success') {
      }
    } catch (error) { }
  };

  const calculateQty = (prod: IProduct) => {
    const item = cart.find((item: any) => item.id === prod.id);
    if (item) {
      setQty(item.quantity);
    } else {
      setQty(0);
    }
  };

  const updateQty = (newQty) => {

    const updatedItem = {
      ...newQty, // Spread the properties of the existing item

   

      quantity: isNaN(newQty.quantity) ? newQty.quantity : (parseInt(newQty.quantity) + 1),
      // quantity: isNaN(newQty.quantity) ? newQty.quantity : (parseInt(newQty.quantity) + 1),

      qty: newQty.count_item_from
    };
    setsinglePro(updatedItem);

  };

  const _FixedPricePlusHandler = (prod: IProduct) => {
    updateQty(prod);
  };

  const updateQty2 = (newQty) => {
    const updatedItem = {
      ...newQty, // Spread the properties of the existing item
      quantity: isNaN(newQty.quantity) ? newQty.quantity : (parseInt(newQty.quantity) - 1)
    };
    // setQty(updatedItem.quantity)
    setsinglePro(updatedItem);

  };
  const _FixedPriceMinusHandler = (prod: IProduct) => {
    updateQty2(prod);



    // const item = cart.find((item: any) => item.id === prod.id);
    // if (item) {
    //   setQty(item.quantity);
    // } else {
    //   setQty(0);
    // }
  };



  const onSelect = (item: any) => {
    const newProducts = products.filter((prod: any) => prod.id !== item.id);
    setIsSelected(true);
    setFilProducts(newProducts);
    setProduct(item);
    setfirst({})
    setbtn(false)
    setcheckIds([])
    setbtn2(false)
    // settempdata(item.data)
    // setdumyArr(item.all_recommendation)
    setidsList(item.required_recommended_list)
    setVariedPriceFrom(parseFloat(item.varied_price_from));
    setOneCaloryPrice(parseFloat(item.calories_amount / item.GHC));
    calculateQty(item);
    setsinglePro(item)
    onPressTouch();
    // emptyCart()(dispatch) 
  };

  const _calculateDeliveryFee = () => {
    if (deliveryType === 'pickup') {
      setDeliveryFee(0)(dispatch);
    } else {
      const totalDistance = 0.65 * miles;
      setDeliveryFee(totalDistance.toFixed(1))(dispatch);
    }
  };

  const _getDistance = async () => {
    const data = {
      user: {
        latitude: user?.latitude,
        longitude: user?.longitude,
      },
      restaurant: {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      },
    };
    try {
      const res = await getDistance(data);
      const meters = res.rows[0].elements[0].distance.value;
      const distance = meters / 1609.344;
      setMiles(distance);
    } catch (error) { }
  };



  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });

    // emptyCart()(dispatch)
    sumCartTotal()(dispatch)
  };
  let y = (cartTotal -
    (((product?.discount == 0 ? product?.discount_percent : product?.discount) / 100) * cartTotal) * product?.count_increment.toFixed(2));
  let x = (y + parseInt(deliveryFee) - product?.discount).toFixed(1)



  useEffect(() => {
    const newArr = product?.recommendation?.map((item) => item.data)
    setfindReq(newArr?.flat())

  }, [product])




  //................Funcitons start....



  const selectTalent = (it, itm) => {
    if (itm.is_recommended_req == true) {
      let arr = [...requiredArr]
      arr.push(itm.id)
      setrequierdArr(arr)
      setRequiredItems(arr)(dispatch)

    }
    setChecked(!checked);
    if (checkIds.length > 0) {
      let y = checkIds.findIndex(m => m == it);
      if (y != -1) {
        let arr6 = [...checkIds];
        arr6.splice(y, 1);
        setcheckIds(arr6);



      } else {
        setcheckIds([...checkIds, it]);
      }
    }


    else {
      setcheckIds([...checkIds, it]);
    }

  };

  const checkradio = it => {
    if (checkIds.length != 0) {
      let y = checkIds.findIndex(item => item == it);
      if (y != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };


  const _plusHandler = (itemId) => {
    if (checkIds.length > 0) {
    const updatedProductData = productData.map((item) => {
      if (item.data) {
        // let temp = 0
        const updatedData = item.data.map((itm) => {
          if (itm.id === itemId.id) {
            const quantity = itm.quantity + 1;
            const vpriceIncrement = quantity * itm.vprice_count_increment_rc;
            const result = vpriceIncrement
            setfirst((prevFirst) => ({
              ...prevFirst,
              [itm.id]: prevFirst[itm.id] ? prevFirst[itm.id] + itm.vprice_count_increment_rc : result,
            }));
            return {
              ...itm,
              quantity: quantity,
              v_price: vpriceIncrement,
            };
          }
          return itm;
        });
        return {
          ...item,
          data: updatedData,

        };
      }

      return item;
    });
    setProductData(updatedProductData);
  }
  };

  const _Minus = (itemId) => {
    if (checkIds.length > 0) {
    const updatedProductData = productData.map((item) => {
      if (item.data) {
        const updatedData = item.data.map((itm) => {
          if (itm.id === itemId.id) {

            const quantity = itm.quantity - 1;

            const vpriceIncrement = quantity * itm.vprice_count_increment_rc;
            const result = vpriceIncrement
            setfirst((prevFirst) => ({
              ...prevFirst,
              [itm.id]: prevFirst[itm.id] ? prevFirst[itm.id] - itm.vprice_count_increment_rc : result,
            }));
            return {
              ...itm,
              quantity: quantity,
              v_price: vpriceIncrement,

            };
          }
          return itm;
        });
        return {
          ...item,
          data: updatedData,
        };
      }
      return item;
    });
    setProductData(updatedProductData);
  }
  }


  useEffect(() => {
    _updateCount(first)

  }, [first])


  const _updateCount = (a) => {
    const sum = Object.values(a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const roundedSum = parseFloat(sum.toFixed(2));
    setcheckOutresult(roundedSum);
  }



  const _checkRequiredItems = (arr1, arr2) => {
    if (productData.length > 0) {
      if (arr1 == null && arr2.length > 0) {
        ToastAndroid.show('Select the required field', ToastAndroid.SHORT);
      }
      else {
        const commonValues = arr1.filter(value => arr2.includes(value));
        if (commonValues) {
          setbtn(true)
          setchkBtn(false)

          // setchkBtn(true)
        }
      }
    }
    else {
      setbtn2(true)

    }

  }




  return (
    <SafeAreaView
      style={{ ...styles.container, ...{ marginTop: isIOS ? top : 0 } }}>
      {restaurantDetail &&
        restaurantDetail.id === restaurant.id &&
        cart.length && product && btn ? (
        <TouchableOpacity
          // disabled={recomendationSave == true ? false : true}
          onPress={() => {
            navigation.navigate('Delivery', { disc: variedPrcieFrom ? variedPrcieFrom + checkOutresult : checkOutresult })
            // setRecomendation(false)(dispatch)
          }}
          style={{
            backgroundColor: 'red',
            padding: 15,
            flexDirection: 'row',
            borderRadius: 10,
            marginBottom: 10,
            position: 'absolute',
            bottom: isIOS ? bottom : 0,
            width: '95%',
            zIndex: 1,
            marginHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>Go to checkout---  </Text>
          <Text style={{ color: 'white' }}>

            {/* GHC {product.fixed_price ? product.fixed_price : variedPrcieFrom ? variedPrcieFrom + checkOutresult : checkOutresult} */}
            GHC {variedPrcieFrom ? variedPrcieFrom + checkOutresult : checkOutresult + product.fixed_price * singlePro.quantity}

          </Text>
        </TouchableOpacity>
      ) : btn2 ? <TouchableOpacity
        // disabled={recomendationSave == true ? false : true}
        onPress={() => {
          navigation.navigate('Delivery', { disc: product?.fixed_price * singlePro.quantity })
          // setRecomendation(false)(dispatch)
        }}
        style={{
          backgroundColor: 'red',
          padding: 15,
          flexDirection: 'row',
          borderRadius: 10,
          marginBottom: 10,
          position: 'absolute',
          bottom: isIOS ? bottom : 0,
          width: '95%',
          zIndex: 1,
          marginHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white' }}>Go to checkout  </Text>
        <Text style={{ color: 'white' }}>
          GHC {product?.fixed_price * singlePro.quantity}
        </Text>
      </TouchableOpacity> : null
      }

      <BackButton
        style={{
          zIndex: 2,
          marginTop: 20,
          backgroundColor: 'pink',
          marginLeft: isIOS ? 13 : 20,
        }}
      />
      <Image
        source={{ uri: restaurant.thumbnail }}
        style={{
          height: hp(25),
          zIndex: 1,
          position: 'absolute',
          width: wp(100),
        }}
      />

      {isRestaurantClosed(restaurant.open_at, restaurant.close_at) && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0,0.8)',

            height: hp(25),
            zIndex: 1,
            position: 'absolute',
            width: wp(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 16,
              letterSpacing: 1,
            }}>
            Closed
          </Text>
        </View>
      )}
      <View style={{ marginBottom: isIOS ? 0 : 55 }}>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: hp(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {restaurant.title}
              </Text>
              {restaurant.is_receiving_order === false ? (
                <View>
                  <Image
                    source={require('../../images/busy.png')}
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 10,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              ) : null}
            </View>

            <Pressable onPress={() => _toggleRestaurantNotifiction()}>
              {!isNotify ? (
                <Image
                  source={require('../../images/notification_fild_icon.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              ) : (
                <Image
                  source={require('../../images/notification_icon_stroke.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              )}
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,

              justifyContent: 'space-between',
            }}>
            <Text style={{ color: 'grey' }}>{restaurant.address}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isFav ? (
                <FontAwesome
                  onPress={() => {
                    setIsFav(!isFav);
                    _toggleFavorite();
                  }}
                  name="heart"
                  size={20}
                  color="red"
                />
              ) : (
                <FontAwesome
                  onPress={() => {
                    setIsFav(!isFav);
                    _toggleFavorite();
                  }}
                  name="heart-o"
                  size={20}
                  color="black"
                />
              )}
              {/* <Image
                resizeMode="contain"
                source={require('../../images/icon_heart_active.png')}
                style={{height: 15, width: 15}}
              /> */}
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'grey',
              marginTop: 10,
            }}
          />
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <MaterialIcons name="tag-faces" size={15} />
            <Text style={{ marginLeft: 15, color: 'grey' }}>
              Rating {restaurant.admin_rate?.toFixed(1)}
            </Text>
            <Image
              resizeMode="contain"
              source={require('../../images/black.png')}
              style={{ height: 15, width: 15, marginLeft: 5 }}
            />
            {/* <Text style={{color: 'grey'}}> (500 +)</Text> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <EvilIcons name="clock" size={15} />
            <Text
              style={{
                marginLeft: 15,
                color: 'grey',
              }}>
              {restaurant.open_at} - {restaurant.close_at}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              paddingBottom: 5,
              // backgroundColor:'red',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                // alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setDeliveryType('delivery')(dispatch);
                }}
                style={{
                  width: 80,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    deliveryType === 'delivery' ? 'grey' : '#CCC',
                }}>
                <Text style={{ fontSize: 10, color: deliveryType === 'delivery' ? 'white' : '#000' }}>DELIVERY</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDeliveryType('pickup')(dispatch);
                }}
                style={{
                  width: 80,
                  height: 30,
                  marginLeft: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: deliveryType === 'pickup' ? 'grey' : '#CCC',
                }}>
                <Text style={{ fontSize: 10, color: deliveryType === 'pickup' ? 'white' : '#000' }}>PICKUP</Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{}}>GHC {deliveryFee} </Text>
                {/* <Text style={{}}>GHC {restaurant.delivery_fee} </Text> */}
                <Text style={{ fontSize: 10, color: 'grey' }}>Fees</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginLeft: 10,
                  justifyContent: 'center',
                }}>
                <Text>{deliveryTime}</Text>
                {/* <Text>
                  {restaurant.delivery_within
                    .replace(/\s/g, '')
                    .replace(/min/g, '')}
                </Text> */}
                <Text style={{ fontSize: 10, color: 'grey' }}>Min</Text>
              </View>
            </View>
          </View>
          {isRestaurantClosed(restaurant.open_at, restaurant.close_at) ? (
            <View
              style={{
                height: hp(50),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  letterSpacing: 1,
                }}>
                Menu is closed till {restaurant.open_at}
              </Text>
            </View>
          ) : (
            <ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                // backgroundColor:'red',
                paddingBottom: height > 700 ? hp(55) : hp(65),
              }}>
              <View style={{ flex: 1 }}>
                <View style={{ marginTop: 10 }}>

                  {subCategories &&
                    <FlatList
                      data={subCategories}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      ref={listviewRef}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => {
                            // listviewRef.current?.scrollToIndex({
                            //   index: 0,
                            //   animated: true,
                            // });
                            setUnderLine(item.title);
                            setCategory(item);
                            setProduct(undefined);
                            setVariedPriceFrom(0);
                            setFilProducts([]);
                            setIsSelected(false);
                          }}
                          style={{
                            marginRight: 15,
                            borderBottomColor:
                              underLine == item.title ? '#ccc' : 'white',
                            borderBottomWidth: 1,
                          }}>
                          <Text style={{ fontSize: 10 }}>{item.title}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => `${item.id}`}
                    />
                  }

                </View>

                {loader ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator color="red" size="large" />
                  </View>
                ) : (
                  <>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: '600' }}>
                        {underLine}
                      </Text>
                      {!loader && !products.length && (
                        <View style={styles.loaderContainer}>
                          <Text>No products found from this category.</Text>
                        </View>
                      )}
                      {product ? (
                        <View>
                          <Image
                            source={{ uri: product.thumbnail }}
                            style={{
                              height: 100,
                              width: '100%',
                              borderRadius: 10,
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
                            <Entypo
                              name="cross"
                              size={15}
                              onPress={() => {
                                setProduct(undefined);
                                setVariedPriceFrom(0);
                                setFilProducts([]);
                                setIsSelected(false);
                              }}
                            />
                          </View>
                          <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '600', marginTop: 10 }}>
                                {product.title}
                              </Text>
                              {product?.discount_percent || product.discount != 0 ?
                                <Text style={{ color: 'grey', marginTop: 10 }}>{product?.discount_percent ?
                                  `${product?.discount_percent}% discount`
                                  : product.discount ? `GHC ${product.discount} discount` : null}</Text> : null}
                            </View>
                            <Text style={{ color: 'grey', marginTop: 5 }}>
                              {product.description}
                            </Text>
                          </View>

                          {product.is_fixed_cal || product.is_fixed_price ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                borderBottomWidth: 0.5,
                                borderBottomColor: 'grey',
                                paddingBottom: 5,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={{ color: 'red', marginTop: 10 }}>
                                GHC {product.fixed_price}

                                {/* Discount section has been commented according to client requirement in this spot */}

                                {/* GHC  {product.fixed_price - (((product?.discount == 0 ? product?.discount_percent : product?.discount) / 100) * product.fixed_price)} */}
                              </Text>
                              {/* <View
                                style={{
                                  backgroundColor: 'red',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  borderRadius: 15,
                                  padding: 5,
                                  marginTop: 10,
                                }}>
                                <Entypo name="star" size={10} color="white" />
                                <Text style={{color: 'white', fontSize: 12}}>
                                  Popular
                                </Text>
                              </View> */}
                              <Text style={{ color: 'grey', marginTop: 10 }}>
                                {product.fixed_calories} calories
                              </Text>
                            </View>
                          ) : (
                            <>
                              <Text style={{
                                fontSize: 14,
                                fontWeight: '600',
                                marginTop: 15
                              }}>
                                How much?
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingTop: 10,
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text style={{ color: 'red' }}>
                                    {/* GHC  {variedPrcieFrom.toFixed(1) -
                                      (((product?.discount == 0 ? product?.discount_percent :
                                        product?.discount) / 100) * variedPrcieFrom.toFixed(1))} */}

                                    GHC {variedPrcieFrom.toFixed(1)}
                                  </Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginLeft: 10,
                                    }}>
                                    <TouchableOpacity
                                      disabled={

                                        // variedPrcieFrom == product.varied_price_from
                                        variedPrcieFrom <=
                                          product.varied_price_from ? true : false
                                      }
                                      onPress={() => {
                                        setVariedPriceFrom(
                                          // variedPrcieFrom - 1,
                                          variedPrcieFrom - product.vprice_count_increment
                                        );
                                        subtractQuantityToCart(product.id)(
                                          dispatch,
                                        );
                                        sumCartTotal()(dispatch);
                                      }}
                                      style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 25,
                                        width: 35,
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        backgroundColor: 'red',
                                      }}>
                                      <FontAwesome
                                        name="minus-square-o"
                                        size={20}
                                        color="white"
                                      />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      disabled={
                                        // variedPrcieFrom == product.varied_price_to
                                        variedPrcieFrom + product.vprice_count_increment >=
                                        product.varied_price_to
                                      }
                                      onPress={() => {
                                        setVariedPriceFrom(
                                          // variedPrcieFrom + 1,
                                          variedPrcieFrom + product.vprice_count_increment,
                                        );
                                        addQuantityToCart(product.id)(dispatch);
                                        sumCartTotal()(dispatch);
                                      }}
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
                                      <FontAwesome
                                        name="plus-square-o"
                                        size={20}
                                        color="white"
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <Text style={{ color: 'grey', fontSize: 12 }}>
                                  {(oneCaloryPrice * variedPrcieFrom).toFixed(
                                    1,
                                  )}{' '}
                                  calories
                                </Text>
                              </View>
                            </>
                          )}

                          {productData.length > 0 ? (
                            <View>
                              <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                top: 15
                              }}>
                                Recommendation
                              </Text>
                            </View>
                          ) : <View>
                            <Text style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              top: 15
                            }}>
                              Fixed
                            </Text>
                          </View>}
                          {productData && (
                            <>
                              {productData.map((item) => {
                                // settempdata(item.data)
                                return (
                                  <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                      <Text style={{ fontSize: 16, marginTop: 10 }}>

                                      </Text>
                                    </View>
                                    {/* <RecommendedProduct
                                      item={item}
                                      funCall={() => fun1(array2, "a")}
                                      dumyAr={dumyArr}
                                      restaurantDetail={restaurantDetail}
                                      restaurant={restaurant}
                                    /> */}

                                    <View>
                                      {item?.is_fixed_price == true ?
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                          }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <RadioButton.Android
                                              value="first"
                                              color="red"
                                              style={{ height: 10, width: 10 }}
                                              status={checked ? 'checked' : 'unchecked'}
                                              onPress={() => {
                                                // if (!item.is_recommended_req) {
                                                if (item.is_recommended_req) {
                                                  setRecomendation(true)(dispatch)
                                                  setChecked(!checked);
                                                  if (!checked) {
                                                    setCount(item.count_item_from);
                                                    if (restaurantDetail && restaurantDetail.id === restaurant.id) {
                                                      if (item.is_fixed_price) {
                                                        addItemToCart({
                                                          ...item,
                                                          qty: Number(item.count_item_from),
                                                          subtotal:
                                                            Number(item.fixed_price) * Number(item.count_item_from),
                                                        })(dispatch);
                                                        // addItemToCart({
                                                        //   ...item,
                                                        //   qty: 1,
                                                        //   subtotal: item.fixed_price,
                                                        // })(dispatch);
                                                        sumCartTotal()(dispatch);
                                                        if (!restaurantDetail) {
                                                          restaurantDetails(restaurant)(dispatch);
                                                          setRestaurantLocation({
                                                            latitude: restaurant.latitude,
                                                            longitude: restaurant.longitude,
                                                          })(dispatch);
                                                        }
                                                      } else {
                                                        if (count === 0) {
                                                          setCount(count + 1);
                                                          addItemToCart({
                                                            ...item,
                                                            qty: 1,
                                                            subtotal: 1,
                                                          })(dispatch);
                                                          sumCartTotal()(dispatch);
                                                          if (!restaurantDetail) {
                                                            restaurantDetails(restaurant)(dispatch);
                                                            setRestaurantLocation({
                                                              latitude: restaurant.latitude,
                                                              longitude: restaurant.longitude,
                                                            })(dispatch);
                                                          }
                                                        } else {
                                                          addItemToCart({
                                                            ...item,
                                                            qty: count,
                                                            subtotal: count,
                                                          })(dispatch);
                                                          sumCartTotal()(dispatch);
                                                          if (!restaurantDetail) {
                                                            restaurantDetails(restaurant)(dispatch);
                                                            setRestaurantLocation({
                                                              latitude: restaurant.latitude,
                                                              longitude: restaurant.longitude,
                                                            })(dispatch);
                                                          }
                                                        }
                                                      }
                                                    } else {
                                                      if (item.is_fixed_price) {
                                                        if (
                                                          restaurantDetail &&
                                                          restaurantDetail.id === restaurant.id
                                                        ) {
                                                          emptyCart()(dispatch);
                                                        }

                                                        // addItemToCart({
                                                        //   ...item,
                                                        //   qty: 1,
                                                        //   subtotal: item.fixed_price,
                                                        // })(dispatch);
                                                        item.count_bar
                                                          ? addItemToCart({
                                                            ...item,
                                                            qty: Number(item.count_item_from),
                                                            subtotal:
                                                              Number(item.fixed_price) *
                                                              Number(item.count_item_from),
                                                          })(dispatch)
                                                          : addItemToCart({
                                                            ...item,
                                                            qty: 1,
                                                            subtotal: item.fixed_price,
                                                          })(dispatch);
                                                        // emptyCart()(dispatch);
                                                        // addItemToCart({
                                                        //   ...item,
                                                        //   qty: 1,
                                                        //   subtotal: item.fixed_price,
                                                        // })(dispatch);
                                                        sumCartTotal()(dispatch);
                                                        restaurantDetails(restaurant)(dispatch);
                                                        setRestaurantLocation({
                                                          latitude: restaurant.latitude,
                                                          longitude: restaurant.longitude,
                                                        })(dispatch);
                                                      } else {
                                                        if (count === 0) {
                                                          setCount(count + 1);
                                                          emptyCart()(dispatch);
                                                          addItemToCart({
                                                            ...item,
                                                            qty: 1,
                                                            subtotal: 1,
                                                          })(dispatch);
                                                          sumCartTotal()(dispatch);
                                                          restaurantDetails(restaurant)(dispatch);
                                                          setRestaurantLocation({
                                                            latitude: restaurant.latitude,
                                                            longitude: restaurant.longitude,
                                                          })(dispatch);
                                                        } else {
                                                          emptyCart()(dispatch);
                                                          addItemToCart({
                                                            ...item,
                                                            qty: count,
                                                            subtotal: count,
                                                          })(dispatch);
                                                          sumCartTotal()(dispatch);
                                                          restaurantDetails(restaurant)(dispatch);
                                                          setRestaurantLocation({
                                                            latitude: restaurant.latitude,
                                                            longitude: restaurant.longitude,
                                                          })(dispatch);
                                                        }
                                                      }
                                                    }
                                                  } else {
                                                    removeItemFromCart(item.id)(dispatch);
                                                    sumCartTotal()(dispatch);
                                                    setCount(0);
                                                  }
                                                }
                                              }}
                                            />
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                marginLeft: 0,
                                                color: 'grey',
                                              }}>
                                              {item.food_title}
                                              {/* {item.title} */}
                                            </Text>
                                          </View>

                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <Pressable
                                              disabled={!checked}
                                              onPress={() => {
                                                count > item.count_item_from && setCount(count - 1);
                                                count > item.count_item_from &&
                                                  subtractQuantityToCart(item.id)(dispatch);
                                                count > item.count_item_from && sumCartTotal()(dispatch);
                                              }}>
                                              <FontAwesome name="minus-square-o" size={20} color="red" />
                                            </Pressable>
                                            <Text
                                              style={{
                                                paddingHorizontal: 4,
                                                color: 'grey',
                                              }}>
                                              {count}
                                            </Text>
                                            <Pressable
                                              disabled={!checked || count >= item.count_item_to}
                                              onPress={() => {
                                                setCount(count + 1);
                                                addQuantityToCart(item.id)(dispatch);
                                                sumCartTotal()(dispatch);
                                              }}>
                                              <FontAwesome name="plus-square-o" size={20} color="red" />
                                            </Pressable>
                                            <Text
                                              style={{
                                                paddingHorizontal: 4,
                                                color: 'grey',
                                                fontSize: 12,
                                              }}>
                                              {/* GHC {item.fixed_price.toFixed(2)} */}
                                              GHC {item.vprice_count_increment_rc.toFixed(2) * count}
                                            </Text>
                                          </View>
                                        </View> :
                                        <View>
                                          <View>
                                            <Text style={{ fontWeight: '600' }}>{item.category}</Text>
                                          </View>
                                          {item.data?.map((itm) => {
                                            return (
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  justifyContent: 'space-between',
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    right: 8
                                                  }}>
                                                  <RadioButton.Android
                                                    value="first"
                                                    color="red"
                                                    status={checkradio(itm.id) ? 'checked' : 'unchecked'}

                                                    onPress={() => {
                                                      setcheckIds(itm.id)
                                                      setids(itm.id)
                                                      selectTalent(itm.id, itm)
                                                    }}
                                                  />
                                                  <Text
                                                    style={{
                                                      fontSize: 12,
                                                      marginLeft: 0,
                                                      color: 'grey',
                                                    }}>
                                                    {itm.food_title}
                                                  </Text>
                                                  {itm.is_recommended_req ? <View style={{
                                                    flexDirection: 'row',
                                                    marginLeft: 5,
                                                    alignItems: 'center'
                                                  }}>
                                                    <Text style={{ fontSize: 12, color: 'black' }}>(Required)</Text>
                                                  </View> : <View style={{
                                                    flexDirection: 'row',
                                                    marginLeft: 5,
                                                    alignItems: 'center'
                                                  }}>
                                                    <Text style={{ fontSize: 12, color: 'black' }}>(Optional)</Text>
                                                  </View>}
                                                </View>

                                                {!itm.is_fixed_price ? <View
                                                  style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginRight: Platform.OS === 'ios' ? 15 : 0,
                                                  }}>
                                                  <Pressable
                                                    style={{
                                                      marginRight: 7
                                                    }}
                                                    disabled={itm.quantity <= itm.count_item_from ? true : false}
                                                    onPress={() => {
                                                      _Minus(itm)
                                                    }}>
                                                    <FontAwesome name="minus-square-o" size={20} color="red" />
                                                  </Pressable>
                                                  <Text
                                                    style={{
                                                      paddingHorizontal: 4,
                                                      color: 'grey',
                                                      textAlign: 'center',
                                                      right: 3,
                                                      fontSize: 12,
                                                    }}>
                                                    GHC {itm.v_price ? itm.v_price : itm.vprice_count_increment_rc}

                                                  </Text>
                                                  <Pressable
                                                    style={{ marginRight: 5 }}
                                                    disabled={itm.quantity == item.count_item_to ? true : false}
                                                    onPress={() => {
                                                      _plusHandler(itm)

                                                    }}>
                                                    <FontAwesome name="plus-square-o" size={20} color="red" />
                                                  </Pressable>
                                                  <Text
                                                    style={{
                                                      paddingHorizontal: 4,
                                                      color: 'grey',
                                                      fontSize: 12,
                                                      // width:60
                                                    }}>
                                                  </Text>
                                                </View> :
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                      alignItems: 'center',
                                                      marginRight: Platform.OS === 'ios' ? 15 : 0,
                                                    }}>
                                                    <Pressable
                                                      style={{
                                                        marginRight: 7
                                                      }}
                                                      disabled={itm.quantity <= itm.count_item_from ? true : false}
                                                      onPress={() => {
                                                        _Minus(itm)
                                                      }}>
                                                      <FontAwesome name="minus-square-o" size={20} color="red" />
                                                    </Pressable>
                                                    <Text
                                                      style={{
                                                        paddingHorizontal: 4,
                                                        color: 'grey',
                                                        textAlign: 'center',
                                                        right: 3,
                                                        fontSize: 12,
                                                      }}>
                                                      {itm.quantity == 0 ? 1 : itm.quantity }
                                                    </Text>
                                                    <Pressable
                                                      style={{ marginRight: 5 }}
                                                      disabled={itm.quantity == itm.count_item_to ? true : false}
                                                      onPress={() => {
                                                        _plusHandler(itm)

                                                      }}>
                                                      <FontAwesome name="plus-square-o" size={20} color="red" />
                                                    </Pressable>
                                                    <Text
                                                      style={{
                                                        paddingHorizontal: 4,
                                                        color: 'grey',
                                                        fontSize: 12,
                                                        // width:60
                                                      }}>

                                                      GHC {itm.v_price ? itm.v_price : itm.vprice_count_increment_rc}
                                                    </Text>
                                                  </View>
                                                }

                                              </View>
                                            )
                                          })}
                                        </View>
                                      }
                                    </View>
                                  </View>
                                )
                              })}
                            </>
                          )}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              borderBottomColor: 'grey',
                              paddingBottom: 10,
                              marginTop: 12,
                              borderBottomWidth: 0.5,
                            }}>
                            {product?.is_fixed_price && !productData.length > 0 ? (
                              <Text>Count: {singlePro?.quantity}</Text>
                            ) : (
                              <View />
                            )}
                            {singlePro.quantity > 0 && btn2 ? (
                              <>
                                {singlePro?.is_fixed_price ? (
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
                                        disabled={singlePro.quantity == singlePro.count_item_from ? true : false}
                                        onPress={() => {
                                          _FixedPriceMinusHandler(singlePro)
                                          // if (product.count_bar) {
                                          //   product.count_item_from &&
                                          //     qty >
                                          //     Number(
                                          //       product.count_item_from,
                                          //     ) &&
                                          //     subtractQuantityToCart(
                                          //       product.id,
                                          //     )(dispatch);
                                          // } else {
                                          //   qty > 1 &&
                                          //     subtractQuantityToCart(
                                          //       product.id,
                                          //     )(dispatch);
                                          // }

                                          // sumCartTotal()(dispatch);
                                        }}
                                        style={{
                                          borderWidth: 1.5,
                                          borderColor: 'white',
                                          borderRadius: 1.5,
                                        }}>
                                        <AntDesign
                                          color={'white'}
                                          name="minus"
                                          size={15}
                                        />
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

                                        disabled={
                                          singlePro?.quantity == singlePro.count_item_to ? true : false}
                                        onPress={() => _FixedPricePlusHandler(singlePro)}
                                        // disabled={
                                        //   product.count_bar &&
                                        //   qty >= product.count_item_to


                                        // }
                                        // onPress={() => {
                                        //   addQuantityToCart(product.id)(
                                        //     dispatch,
                                        //   );
                                        //   sumCartTotal()(dispatch);

                                        //   // if(product.count_bar &&
                                        //   //   qty >= product.count_item_to){
                                        //   //     Alert.alert("Thanks")
                                        //   //   }
                                        // }}


                                        style={{
                                          borderWidth: 1.5,
                                          borderColor: 'white',
                                          borderRadius: 1.5,
                                          marginLeft: 2,
                                        }}>
                                        <AntDesign
                                          color={'white'}
                                          name="plus"
                                          size={15}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : (
                                  <View />
                                )}
                              </>
                            ) :
                              !btn ?
                                <TouchableOpacity
                                  onPress={() => {
                                    _checkRequiredItems(array1, array2)

                                    if (
                                      restaurantDetail &&
                                      restaurantDetail.id === restaurant.id
                                    ) {
                                      if (product.is_fixed_price) {
                                        addItemToCart({
                                          ...product,
                                          // qty:count,
                                          quantity: Number(product.count_item_from > 0 ? product.count_item_from : product.count_increment),
                                          subtotal:
                                            Number(product.fixed_price) *
                                            Number(product.count_item_from),
                                        })(dispatch);
                                        product.count_bar
                                          ? addItemToCart({
                                            ...product,
                                            // qty: 1,
                                            qty: Number(
                                              product.count_item_from

                                            ),
                                            subtotal:
                                              Number(product.fixed_price) *
                                              Number(product.count_item_from)
                                            // +  Number(product.count_increment),
                                          })(dispatch)
                                          : addItemToCart({
                                            ...product,
                                            qty: 1,
                                            subtotal: product.fixed_price,
                                          })(dispatch);
                                        sumCartTotal()(dispatch);
                                        if (!restaurantDetail) {
                                          restaurantDetails(restaurant)(dispatch);
                                          setRestaurantLocation({
                                            latitude: restaurant.latitude,
                                            longitude: restaurant.longitude,
                                          })(dispatch);
                                        }
                                      } else {
                                        if (variedPrcieFrom === 0) {
                                          setVariedPriceFrom(variedPrcieFrom + 1);
                                          addItemToCart({
                                            ...product,
                                            qty: 1,
                                            subtotal: 1,
                                          })(dispatch);
                                          sumCartTotal()(dispatch);
                                          if (!restaurantDetail) {
                                            restaurantDetails(restaurant)(
                                              dispatch,
                                            );
                                            setRestaurantLocation({
                                              latitude: restaurant.latitude,
                                              longitude: restaurant.longitude,
                                            })(dispatch);
                                          }
                                        } else {
                                          addItemToCart({
                                            ...product,
                                            qty: variedPrcieFrom,
                                            subtotal: variedPrcieFrom,
                                          })(dispatch);
                                          sumCartTotal()(dispatch);
                                          if (!restaurantDetail) {
                                            restaurantDetails(restaurant)(
                                              dispatch,
                                            );
                                            setRestaurantLocation({
                                              latitude: restaurant.latitude,
                                              longitude: restaurant.longitude,
                                            })(dispatch);
                                          }
                                        }
                                      }
                                    } else {
                                      if (product.is_fixed_price) {
                                        emptyCart()(dispatch);
                                        product.count_bar
                                          ? addItemToCart({
                                            ...product,
                                            qty: Number(
                                              product.count_item_from,
                                            ),
                                            subtotal:
                                              Number(product.fixed_price) *
                                              Number(product.count_item_from),
                                          })(dispatch)
                                          : addItemToCart({
                                            ...product,
                                            qty: 1,
                                            subtotal: product.fixed_price,
                                          })(dispatch);
                                        sumCartTotal()(dispatch);
                                        restaurantDetails(restaurant)(dispatch);
                                        setRestaurantLocation({
                                          latitude: restaurant.latitude,
                                          longitude: restaurant.longitude,
                                        })(dispatch);
                                      } else {
                                        if (variedPrcieFrom === 0) {
                                          setVariedPriceFrom(variedPrcieFrom + 1);
                                          emptyCart()(dispatch);
                                          addItemToCart({
                                            ...product,
                                            qty: 1,
                                            subtotal: 1,
                                          })(dispatch);
                                          sumCartTotal()(dispatch);
                                          restaurantDetails(restaurant)(dispatch);
                                          setRestaurantLocation({
                                            latitude: restaurant.latitude,
                                            longitude: restaurant.longitude,
                                          })(dispatch);
                                        } else {
                                          emptyCart()(dispatch);
                                          addItemToCart({
                                            ...product,
                                            qty: variedPrcieFrom,
                                            subtotal: variedPrcieFrom,
                                          })(dispatch);
                                          sumCartTotal()(dispatch);
                                          restaurantDetails(restaurant)(dispatch);
                                          setRestaurantLocation({
                                            latitude: restaurant.latitude,
                                            longitude: restaurant.longitude,
                                          })(dispatch);
                                        }
                                      }
                                    }
                                  }}
                                  style={{
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 30,
                                    width: 100,
                                    marginTop: 5,
                                    borderRadius: 5,
                                  }}>
                                  <Text style={{ color: 'white' }}>
                                    Add to cart
                                  </Text>
                                </TouchableOpacity> :

                                <View style={{
                                  flexDirection: 'row',
                                  //  backgroundColor: 'red',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '100%'
                                }}>
                                  <Text>Count:{singlePro?.quantity}</Text>
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
                                        disabled={singlePro.quantity == singlePro.count_item_from ? true : false}
                                        onPress={() => {
                                          _FixedPriceMinusHandler(singlePro)
                                          // if (product.count_bar) {
                                          //   product.count_item_from &&
                                          //     qty >
                                          //     Number(
                                          //       product.count_item_from,
                                          //     ) &&
                                          //     subtractQuantityToCart(
                                          //       product.id,
                                          //     )(dispatch);
                                          // } else {
                                          //   qty > 1 &&
                                          //     subtractQuantityToCart(
                                          //       product.id,
                                          //     )(dispatch);
                                          // }

                                          // sumCartTotal()(dispatch);
                                        }}
                                        style={{
                                          borderWidth: 1.5,
                                          borderColor: 'white',
                                          borderRadius: 1.5,
                                        }}>
                                        <AntDesign
                                          color={'white'}
                                          name="minus"
                                          size={15}
                                        />
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

                                        disabled={
                                          singlePro?.quantity == singlePro.count_item_to ? true : false}
                                        onPress={() => _FixedPricePlusHandler(singlePro)}
                                        // disabled={
                                        //   product.count_bar &&
                                        //   qty >= product.count_item_to


                                        // }
                                        // onPress={() => {
                                        //   addQuantityToCart(product.id)(
                                        //     dispatch,
                                        //   );
                                        //   sumCartTotal()(dispatch);

                                        //   // if(product.count_bar &&
                                        //   //   qty >= product.count_item_to){
                                        //   //     Alert.alert("Thanks")
                                        //   //   }
                                        // }}


                                        style={{
                                          borderWidth: 1.5,
                                          borderColor: 'white',
                                          borderRadius: 1.5,
                                          marginLeft: 2,
                                        }}>
                                        <AntDesign
                                          color={'white'}
                                          name="plus"
                                          size={15}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>



                            }



                          </View>
                        </View>
                      ) : null}

                      <FlatList
                        ref={listviewRef}
                        data={isSelected ? filProducts : products}
                        renderItem={({ item }: { item: IProduct }) => (



                          <Product
                            id={item.id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            fixed_price={item.fixed_price}
                            fixed_calories={item.fixed_calories}
                            onPress={() => onSelect(item)}
                            availability={item.availability}
                            extra={item.extra}
                            available_today={item.available_today}
                            is_fixed_cal={item.is_fixed_cal}
                            recommendation={item.recommendation}
                            is_fixed_price={item.is_fixed_price}
                          />
                        )}
                        keyExtractor={item => `${item.id}`}
                      />
                    </View>
                  </>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 30,
  },
  loaderContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
