import { View, Text, Pressable, Platform, Alert, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/AntDesign'

import {
  addItemToCart,
  addQuantityToCart,
  emptyCart,
  restaurantDetails,
  setRestaurantLocation,
  subtractQuantityToCart,
  sumCartTotal,
  removeItemFromCart,
  setRecomendation,
  setTempData,
  setRecData,
  setRecUpdatedData,
  setRequiredItems
} from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';

export default function RecommendedProduct({
  item,
  restaurantDetail,
  restaurant,
  plusHandler,
  MinusHandler,
  Talent,
  Radio,
  dumyAr,
  funCall,
  is_fixed_price
}: any) {
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [tempdata, settempdata] = useState(item?.data)

  const { rec, allRecArr } = useAppSelector(
    ({ APPSTATE }) => APPSTATE,
  );


  // const [newState1, setnewState1] = useState(rec)
  // let res = dumyAr

  const [tempval, settempval] = useState()

  const [checkIds, setcheckIds] = useState([])

  const [requiredArr, setrequierdArr] = useState([])


  // console.log("++++++++++++++++++++", newState1)
  const [ids, setids] = useState(-1)

  const { cart } = useAppSelector(({ CART }) => CART);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setRecData(dumyAr)(dispatch)
    setRecUpdatedData(dumyAr)(dispatch)
  }, [dumyAr])







  //const { cart, cartTotal, restaurantDetail } = useAppSelector(({ CART }) => CART);
  // useEffect(() => {
  //   if (item.is_recommended_req) {
  //     setChecked(!checked);
  //     if (!checked) {
  //       setCount(item.count_item_from);
  //       if (restaurantDetail && restaurantDetail.id === restaurant.id) {
  //         if (item.is_fixed_price) {
  //           addItemToCart({
  //             ...item,
  //             qty: Number(item.count_item_from),
  //             subtotal: Number(item.fixed_price) * Number(item.count_item_from),
  //           })(dispatch);
  //           sumCartTotal()(dispatch);
  //           if (!restaurantDetail) {
  //             restaurantDetails(restaurant)(dispatch);
  //             setRestaurantLocation({
  //               latitude: restaurant.latitude,
  //               longitude: restaurant.longitude,
  //             })(dispatch);
  //           }
  //         } else {
  //           if (count === 0) {
  //             setCount(item.varied_price_from);
  //             addItemToCart({
  //               ...item,
  //               qty: item.varied_price_from,
  //               subtotal: item.varied_price_from,
  //             })(dispatch);
  //             sumCartTotal()(dispatch);
  //             if (!restaurantDetail) {
  //               restaurantDetails(restaurant)(dispatch);
  //               setRestaurantLocation({
  //                 latitude: restaurant.latitude,
  //                 longitude: restaurant.longitude,
  //               })(dispatch);
  //             }
  //           } else {
  //             addItemToCart({
  //               ...item,
  //               qty: item.varied_price_from,
  //               subtotal: item.varied_price_from,
  //             })(dispatch);
  //             sumCartTotal()(dispatch);
  //             if (!restaurantDetail) {
  //               restaurantDetails(restaurant)(dispatch);
  //               setRestaurantLocation({
  //                 latitude: restaurant.latitude,
  //                 longitude: restaurant.longitude,
  //               })(dispatch);
  //             }
  //           }
  //         }
  //       } else {
  //         if (item.is_fixed_price) {
  //           if (restaurantDetail && restaurantDetail.id === restaurant.id) {
  //             emptyCart()(dispatch);
  //           }

  //           // addItemToCart({
  //           //   ...item,
  //           //   qty: 1,
  //           //   subtotal: item.fixed_price,
  //           // })(dispatch);
  //           item.count_bar
  //             ? addItemToCart({
  //               ...item,
  //               qty: Number(item.count_item_from),
  //               subtotal:
  //                 Number(item.fixed_price) * Number(item.count_item_from),
  //             })(dispatch)
  //             : addItemToCart({
  //               ...item,
  //               qty: 1,
  //               subtotal: item.fixed_price,
  //             })(dispatch);
  //           sumCartTotal()(dispatch);
  //           restaurantDetails(restaurant)(dispatch);
  //           setRestaurantLocation({
  //             latitude: restaurant.latitude,
  //             longitude: restaurant.longitude,
  //           })(dispatch);
  //         } else {
  //           if (count === 0) {
  //             setCount(item.varied_price_from);
  //             emptyCart()(dispatch);
  //             addItemToCart({
  //               ...item,
  //               qty: item.varied_price_from,
  //               subtotal: item.varied_price_from,
  //             })(dispatch);
  //             // setCount(count + 1);
  //             // emptyCart()(dispatch);
  //             // addItemToCart({
  //             //   ...item,
  //             //   qty: 1,
  //             //   subtotal: 1,
  //             // })(dispatch);
  //             sumCartTotal()(dispatch);
  //             restaurantDetails(restaurant)(dispatch);
  //             setRestaurantLocation({
  //               latitude: restaurant.latitude,
  //               longitude: restaurant.longitude,
  //             })(dispatch);
  //           } else {
  //             emptyCart()(dispatch);
  //             addItemToCart({
  //               ...item,
  //               qty: item.varied_price_from,
  //               subtotal: item.varied_price_from,
  //             })(dispatch);
  //             sumCartTotal()(dispatch);
  //             restaurantDetails(restaurant)(dispatch);
  //             setRestaurantLocation({
  //               latitude: restaurant.latitude,
  //               longitude: restaurant.longitude,
  //             })(dispatch);
  //           }
  //         }
  //       }
  //     } else {
  //       removeItemFromCart(item.id)(dispatch);
  //       sumCartTotal()(dispatch);
  //       setCount(0);
  //     }
  //   }
  //   // return () => {
  //   //   removeItemFromCart(item.id)(dispatch);
  //   //   sumCartTotal()(dispatch);
  //   // };
  // }, [ids]);


  // const isPlusDisabled = item => {
  //   if (item.is_fixed_price) {
  //     return !checked || count >= item.count_item_to;
  //   } else {
  //     return !checked || count >= item.varied_price_to;
  //   }
  // };





  // console.log("||||||||",newState1)



  const _plusHandler = async (it) => {
    if (checkIds.length > 0) {
      let y = checkIds.findIndex(m => m == it);
      if (y != -1) {
        const newState = await tempdata.map(obj => {
          if (obj.id === it) {
            if (obj.quantity == 0) {
              settempval(obj.vprice_count_increment_rc)
              return { ...obj, quantity: (obj.quantity + 1) };
            }
            else {
              return { ...obj, quantity: (obj.quantity + 1), vprice_count_increment_rc: obj.vprice_count_increment_rc + tempval };
            }
          }
          return obj;
        });
        await settempdata(newState)
       setTempData(newState)(dispatch)
        const newStated1 = await rec.map(a => {
          if (a.id === it) {
            if (a.quantity == 0) {
              settempval(a.vprice_count_increment_rc)
              return { ...a, quantity: (a.quantity + 1) };
            }
            else {
              return { ...a, quantity: (a.quantity + 1), vprice_count_increment_rc: a.vprice_count_increment_rc + tempval };

            }
          }
          return a;
        });
        setRecData(newStated1)(dispatch)
      }
    }
  }


  const _Minus = (it) => {
    if (checkIds.length > 0) {
      let y = checkIds.findIndex(m => m == it);
      if (y !== -1) {
        const newState = tempdata.map(obj => {
          if (obj.id === it) {
            if (obj.quantity <= 1) {
              // Avoid division by zero and do not allow negative quantity
              return obj;
            }
            const updatedQuantity = obj.quantity - 1;
            const updatedVpriceCount = obj.vprice_count_increment_rc - (obj.vprice_count_increment_rc / obj.quantity);
            return { ...obj, quantity: updatedQuantity, vprice_count_increment_rc: updatedVpriceCount };
          }
          return obj;
        });
        settempdata(newState);
        // setTempData(newState)(dispatch)
        // Dispatch your updated state if needed
      }
    }
  }

  // const _Minus = (it) => {
  //   if (checkIds.length > 0) {
  //     let y = checkIds.findIndex(m => m == it);
  //     if (y != -1) {
  //       const newState = tempdata.map(obj => {
  //         if (obj.id === it) {
  //           setTempData(tempdata)(dispatch)
  //           return { ...obj, quantity: obj.quantity - 1, vprice_count_increment_rc: obj.vprice_count_increment_rc / obj.quantity };
  //         }
  //         return obj;
  //       });

  //       settempdata(newState)
  //       setTempData(newState)(dispatch)


  //       const newStated = rec.map(obj => {
  //         // 👇️ if id equals 2, update country property
  //         if (obj.id === it) {
  //           setTempData(tempdata)(dispatch)
  //           return { ...obj, quantity: obj.quantity - 1, vprice_count_increment_rc: obj.vprice_count_increment_rc / obj.quantity };
  //         }

  //         // 👇️ otherwise return the object as is
  //         return obj;
  //       });
  //       setRecData(newStated)(dispatch)

  //     }
  //   }
  // }


  const selectTalent = (it, itm) => {
    if (itm.is_recommended_req == true) {
      // GetRequired(itm.id)
      let arr = [...requiredArr]
      arr.push(itm.id)
      setrequierdArr(arr)
      setRequiredItems(arr)(dispatch)
      funCall(itm.id)
      // alert(itm)
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









  return item?.is_fixed_price == true ? (
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

          {/* New change */}
        </Text>
      </View>
    </View>
  ) : (
    <View>
      <View>
        <Text style={{ fontWeight: '600' }}>{item.category}</Text>
      </View>
      <FlatList
        data={tempdata}
        renderItem={({ item }) => {

          console.log("checkkk Itemmm", item)
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
                  status={checkradio(item.id) ? 'checked' : 'unchecked'}

                  onPress={() => {
                    setcheckIds(item.id)
                    setids(item.id)
                    selectTalent(item.id, item)
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 0,
                    color: 'grey',
                  }}>
                  {item.food_title}
                </Text>
                {item.is_recommended_req ? <View style={{
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

              {/* New changes according to cleint  */}

              {!item.is_fixed_price ? <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: Platform.OS === 'ios' ? 15 : 0,
                }}>
                <Pressable
                  style={{
                    marginRight: 7
                  }}
                  disabled={item.quantity == item.count_item_from ? true : false}
                  onPress={() => {
                    _Minus(item.id)
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
                  GHC {item.vprice_count_increment_rc.toFixed(1)}
                </Text>
                <Pressable
                  style={{ marginRight: 5 }}
                  disabled={item.quantity == item.count_item_to ? true : false}
                  onPress={() => {
                    _plusHandler(item.id)

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

                  {/* GHC {item.vprice_count_increment_rc} */}
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
                    disabled={item.quantity == item.count_item_from ? true : false}
                    onPress={() => {
                      _Minus(item.id)
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
                    {/* Hello */}
                    {item.quantity}
                    {/* GHC {item.vprice_count_increment_rc} */}
                  </Text>
                  <Pressable
                    style={{ marginRight: 5 }}
                    disabled={item.quantity == item.count_item_to ? true : false}
                    onPress={() => {
                      _plusHandler(item.id)

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

                    GHC {item.vprice_count_increment_rc}
                  </Text>
                </View>
              }

            </View>
          )
        }}
      />

      {/* {tempdata.map((res, index) => {
        // console.log("responce is here", res)
        const value = res.vprice_count_increment_rc.toFixed(2) * count;
        let result = Math.round(value * 10) / 10
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
              }}>
              <RadioButton.Android
                value="first"
                color="red"
                style={{ height: 20, width: 20 }}
                // status={res.is_recommended_req ? 'checked' : 'unchecked'}
                status={checkradio(res.id) ? 'checked' : 'unchecked'}
                onPress={() => {
                  // alert('id check',JSON.stringify(res.food_title))
                  setcheckIds(res.id)
                  setids(res.id)
                  selectTalent(res.id, res)

                  // sethandleCheckbox(res.id)
                  // if (!checked) {
                  //   setCount(1);
                  //   if (restaurantDetail && restaurantDetail.id === restaurant.id) {
                  //     if (res.is_fixed_price) {
                  //       addItemToCart({
                  //         ...res,
                  //         qty: Number(res.count_item_from),
                  //         subtotal:
                  //           Number(res.fixed_price) * Number(res.count_item_from),
                  //       })(dispatch);
                  //       // addItemToCart({
                  //       //   ...item,
                  //       //   qty: 1,
                  //       //   subtotal: item.fixed_price,
                  //       // })(dispatch);
                  //       sumCartTotal()(dispatch);
                  //       if (!restaurantDetail) {
                  //         restaurantDetails(restaurant)(dispatch);
                  //         setRestaurantLocation({
                  //           latitude: restaurant.latitude,
                  //           longitude: restaurant.longitude,
                  //         })(dispatch);
                  //       }
                  //     } else {
                  //       if (count === 0) {
                  //         setCount(count + 1);
                  //         addItemToCart({
                  //           ...res,
                  //           qty: 1,
                  //           subtotal: 1,
                  //         })(dispatch);
                  //         sumCartTotal()(dispatch);
                  //         if (!restaurantDetail) {
                  //           restaurantDetails(restaurant)(dispatch);
                  //           setRestaurantLocation({
                  //             latitude: restaurant.latitude,
                  //             longitude: restaurant.longitude,
                  //           })(dispatch);
                  //         }
                  //       } else {
                  //         addItemToCart({
                  //           ...res,
                  //           qty: count,
                  //           subtotal: count,
                  //         })(dispatch);
                  //         sumCartTotal()(dispatch);
                  //         if (!restaurantDetail) {
                  //           restaurantDetails(restaurant)(dispatch);
                  //           setRestaurantLocation({
                  //             latitude: restaurant.latitude,
                  //             longitude: restaurant.longitude,
                  //           })(dispatch);
                  //         }
                  //       }
                  //     }
                  //   } else {
                  //     if (res.is_fixed_price) {
                  //       emptyCart()(dispatch);
                  //       addItemToCart({
                  //         ...res,
                  //         qty: Number(res.count_item_from),
                  //         subtotal:
                  //           Number(res.fixed_price) * Number(res.count_item_from),
                  //       })(dispatch);
                  //       // addItemToCart({
                  //       //   ...item,
                  //       //   qty: 1,
                  //       //   subtotal: item.fixed_price,
                  //       // })(dispatch);
                  //       sumCartTotal()(dispatch);
                  //       restaurantDetails(restaurant)(dispatch);
                  //       setRestaurantLocation({
                  //         latitude: restaurant.latitude,
                  //         longitude: restaurant.longitude,
                  //       })(dispatch);
                  //     } else {
                  //       if (count === 0) {
                  //         setCount(count + 1);
                  //         emptyCart()(dispatch);
                  //         addItemToCart({
                  //           ...res,
                  //           qty: 1,
                  //           subtotal: 1,
                  //         })(dispatch);
                  //         sumCartTotal()(dispatch);
                  //         restaurantDetails(restaurant)(dispatch);
                  //         setRestaurantLocation({
                  //           latitude: restaurant.latitude,
                  //           longitude: restaurant.longitude,
                  //         })(dispatch);
                  //       } else {
                  //         emptyCart()(dispatch);
                  //         addItemToCart({
                  //           ...res,
                  //           qty: count,
                  //           subtotal: count,
                  //         })(dispatch);
                  //         sumCartTotal()(dispatch);
                  //         restaurantDetails(restaurant)(dispatch);
                  //         setRestaurantLocation({
                  //           latitude: restaurant.latitude,
                  //           longitude: restaurant.longitude,
                  //         })(dispatch);
                  //       }
                  //     }
                  //   }
                  // } else {
                  //   removeItemFromCart(res.id)(dispatch);
                  //   sumCartTotal()(dispatch);
                  //   setCount(0);
                  // }
                }}
              />
         
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 0,
                  color: 'grey',
                }}>
                {res.food_title}
              </Text>
              {res.is_recommended_req ? <View style={{
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginLeft:12,
                marginRight: Platform.OS === 'ios' ? 15 : 0,
              }}>
              <Pressable
                style={{
                  // backgroundColor:'red',
                  marginRight: 7

                }}
                disabled={isMinusDisabled(res)}
                onPress={() => {
                  if (ids == res.id) {
                    setCount(count - 1);
                    subtractQuantityToCart(res.id)(dispatch);
                    sumCartTotal()(dispatch);
                  }

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
              
                {res.quantity}

              </Text>
              <Pressable
                style={{ marginRight: 5 }}
                disabled={isPlusDisabled(res)}
                onPress={() => {
                  // if (checked) {
                  //   handleIncrement(index)
                  // } else {
                  //   console.log("nottihing")
                  // }

                  _BeveRagesHandle(res.id)
                  // setCount(count + 1);
                  // addQuantityToCart(res.id)(dispatch);
                  // sumCartTotal()(dispatch);

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

                GHC {result}
              </Text>
            </View>

          </View>
        )
      })} */}



    </View>

  );
}
