import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import Entypo from 'react-native-vector-icons/Entypo';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CategoriesList from '@src/components/CategoriesList';
import Button from '@src/components/Button';
import Loader from '@src/components/Loader';
import Restaurant from '@src/components/Restaurant';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { isIOS, isAndroid, shadow } from '@src/utilis';
import {
  restaurantsList,
  searchRestaurantByName,
  toggleFavorite,
  userEditProfile,
} from '@src/utilis/APIs';

import type { IRestaurant, NavigationProps } from '@src/utilis/types';
import {
  enableAndroidLocation,
  requestLocationPermission,
} from '@src/utilis/androidPermissions';
import {
  setRecData, setRecomendation, setRecUpdatedData,
  setRequiredItems,
  userLoggedIn
} from '@src/redux';
import { _getToken } from '@src/utilis/NotificationHelper';

const Home = ({ navigation }: NavigationProps) => {
  const { user } = useAppSelector(({ USER }) => USER);
  const { cart, recomendationSave } = useAppSelector(
    ({ CART, APPSTATE }) => ({ ...CART, ...APPSTATE }),
  );

  const [nearMeData, setNearMeData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [pickUpData, setPickUpData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loader, setLoader] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [response, setResponse] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [addressErr, setAddressErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [date, setDateTime] = useState('');
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const token = user?.api_token;

  useEffect(() => {
    _getToken();
    _restaurantsList();

  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRecomendation(false)(dispatch)
      setRecData(null)(dispatch)
      setRecUpdatedData(null)(dispatch)
      setRequiredItems(null)(dispatch)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isAndroid) {
      (async () => {
        await requestLocationPermission();
      })();
    }

    getPosition();
  }, []);

  useEffect(() => {
    if (position.latitude && position.longitude) {
      _userEditProfile();
    }
  }, [position]);


  const _restaurantsList = async (a) => {
    if (a == "1") {
      filterByCategory()
      setRefreshing(true)
      try {
        // setLoader(true);
        setRefreshing(true)
        const res = await restaurantsList(token);
        // setLoader(false);
        setRefreshing(false)
        if (res && res.status === 'success') {
          setResponse(res);
          setNearMeData(res.near_me.data);
          setFavoriteData(res.favorite.data);
          setTrendingData(res.trending.data);
          setPickUpData(res.pick_near.data);
        }
      } catch (error) {
        // setLoader(false);
        setRefreshing(false)
      }
    } else {
      try {
        setLoader(true);
        const res = await restaurantsList(token);
        setLoader(false);
        if (res && res.status === 'success') {
          setResponse(res);
          setNearMeData(res.near_me.data);
          setFavoriteData(res.favorite.data);
          setTrendingData(res.trending.data);
          setPickUpData(res.pick_near.data);
        }
      } catch (error) {
        setLoader(false);
      }
    }

  };

  const _searchRestaurantByName = async word => {
    try {
      const res = await searchRestaurantByName({ word, token });
      if (res && res.status === 'success') {
        setFilterData(res.data);
      }
    } catch (error) { }
  };

  const _toggleFavorite = async (id: number) => {
    try {
      const data = new FormData();
      data.append('restaurant_id', id);
      const res = await toggleFavorite({ data, token });
      if (res && res.status === 'success') {
        _restaurantsList();
      }
    } catch (error) { }
  };

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => {
        enableAndroidLocation();
      },
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 15000,
      },
    );
  };

  const _userEditProfile = async () => {
    try {
      const data = new FormData();
      data.append('latitude', position.latitude);
      data.append('longitude', position.longitude);
      data.append('city', city);
      data.append('address', address);
      const res = await userEditProfile({ data, token });
      setLoader(false);
      if (res && res.status === 'success') {
        userLoggedIn(res.userdata)(dispatch);
      }
    } catch (err) { }
  };

  const _validate = () => {
    if (!address.trim()) {
      setAddressErr(true);
      return false;
    } else if (!city.trim()) {
      setCityErr(true);
      return false;
    }
    setIsEditable(false);
    setLoader(true);
    _userEditProfile();
    return true;
  };

  const filterFun = (data, categoryId) => {
    const filteredData = data.filter(item =>
      item.category_list.find(id => id == categoryId),
    );
    return filteredData;
  };

  const fun = () => {
    let selectedProducts = [];
    if (selectedProducts.length) {
      const foundProduct = selectedProducts.find(
        product => product.category === 'annies',
      );
      const foundItem = foundProduct.products.find(item => item.id === 'p3');
      if (!foundItem) {
        selectedProducts.push({
          category: 'annies',
          products: [
            {
              id: 'p3',
              title: 'product three',
            },
          ],
        });
      }
    } else {
      selectedProducts.push({
        category: 'annies',
        products: [
          {
            id: 'p9',
            title: 'product three',
          },
        ],
      });
    }
  };

  const showDate = () => {
    //Get Current Date
    // var date = new Date().getDate();

    // //Get Current Month
    // var month = new Date().getMonth() + 1;

    // //Get Current Year
    // var year = new Date().getFullYear();

    //Get Current Time Hours
    var hours = new Date().getHours();

    //Get Current Time Minutes
    var min = new Date().getMinutes();

    //Get Current Time Seconds
    var sec = new Date().getSeconds();

    var finalObject = hours + ':' + min + ':' + sec;

    setDateTime(finalObject);
  };

  const filterByCategory = (categoryId: string) => {
    setNearMeData(filterFun(response.near_me.data, categoryId));
    setFavoriteData(filterFun(response.favorite.data, categoryId));
    setTrendingData(filterFun(response.trending.data, categoryId));
    setPickUpData(filterFun(response.pick_near.data, categoryId));
  };

  const Form = isIOS ? KeyboardAvoidingView : View;

  const editAddressModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isEditable}
      onRequestClose={() => {
        setIsEditable(false);
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
                onPress={() => setIsEditable(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text>Change My Location</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                value={address}
                onChangeText={text => setAddress(text)}
                placeholder="Change address"
                placeholderTextColor="grey"
                style={{
                  borderBottomColor: addressErr ? 'red' : 'grey',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <TextInput
                value={city}
                onChangeText={text => setCity(text)}
                placeholder="City"
                placeholderTextColor="grey"
                style={{
                  borderBottomColor: cityErr ? 'red' : 'grey',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>

            <Button
              name="Done"
              onPress={() => {
                _validate();
              }}
            />
          </View>
        </View>
      </Form>
    </Modal>
  );

  return (
    <>
      {!isSearching ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#FAFAFA',
            paddingHorizontal: 15,
            paddingBottom: tabBarHeight,
          }}>
          {Loader && <Loader loader={loader} />}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <View style={{ marginLeft: isIOS ? 10 : 0 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Hello, {user?.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    color: 'grey',
                    flexWrap: 'wrap',
                    right: 10,
                    width: 200
                  }}
                >
                  {user?.address
                    .replace(user?.hall_name, '')
                    .replace(user?.room_no, '')
                    .trim()}
                  , {user?.city}
                </Text>
                <AntDesign
                  onPress={() => setIsEditable(true)}
                  name="edit"
                  color="black"
                  size={20}
                />
              </View>
            </View>
            <Image
              source={
                user?.image
                  ? { uri: user?.image }
                  : require('@src/images/placeholder.png')
              }
              style={{
                height: 30,
                width: 30,
                marginRight: isIOS ? 10 : 0,
                borderRadius: 30,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setIsSearching(true)}
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                height: 40,
                marginLeft: 10,
                borderRadius: 25,
                paddingHorizontal: 15,
                width: '80%',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <AntDesign name="search1" color="black" size={13} />
              <View style={{ width: '90%' }}>
                <Text style={{ marginLeft: 5, color: 'lightgrey' }}>Search</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <Image
                source={require('@src/images/icon_Filter.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginRight: isIOS ? 10 : 0,
                }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => showDate()}>
              <Text>Get time and date</Text>
            </TouchableOpacity> */}
          </View>
          <View style={{ marginTop: 20 }}>
            <CategoriesList
              onTapCat={(catId: string) => {
                filterByCategory(catId),
                  showDate();
              }}
              refresh={refreshing}
            />
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing}
                onRefresh={() => {
                  _restaurantsList("1")


                }} />
            }

            showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20 }}>
              {nearMeData.length > 0 ? (
                <Text
                  style={{
                    marginLeft: isIOS ? 10 : 0,
                    fontSize: 12,
                  }}>
                  Near Me
                </Text>
              ) : null}
              <View style={{ marginTop: 10 }}>
                <FlatList
                  data={nearMeData}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <Restaurant
                      restaurant={item}
                      isNearMe
                      onPress={() =>
                        navigation.navigate('Details', { restaurant: item })
                      }
                    />
                  )}
                  keyExtractor={(item: IRestaurant) => `${item.id}`}
                />
              </View>
              {favoriteData.length ? (
                <Text
                  style={{
                    marginTop: isIOS ? 20 : 10,
                    marginLeft: isIOS ? 10 : 0,
                    fontSize: 12,
                  }}>
                  {user?.city} Favorite
                </Text>
              ) : null}
              <View style={{ marginTop: isIOS ? -10 : 0 }}>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 10 }}
                  data={favoriteData}

                  renderItem={({ item }) => {
                    return (
                      <Restaurant

                        restaurant={item}
                        isFavorite
                        addFavorite={() => _toggleFavorite(item.id)}
                        onPress={() => {
                          if (item.is_receiving_order != false) {
                            navigation.navigate('Details', { restaurant: item });
                          }
                        }}
                        onRemoveFavorite={() => _toggleFavorite(item.id)}
                      />
                    );
                  }}
                  keyExtractor={(item: IRestaurant) => `${item.id}`}
                />
              </View>

              <Text
                style={{
                  marginTop: isIOS ? 20 : 10,
                  marginLeft: isIOS ? 10 : 0,
                  fontSize: 12,
                }}>
                Trending Foods
              </Text>
              <View style={{ marginTop: isIOS ? -10 : 0 }}>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 10 }}
                  data={trendingData}
                  renderItem={({ item }) => (
                    <Restaurant
                      restaurant={item}
                      onPress={() => {
                        if (item.is_receiving_order != false) {
                          navigation.navigate('Details', { restaurant: item });
                        }
                      }}
                      isFavorite
                      addFavorite={() => _toggleFavorite(item.id)}
                      onRemoveFavorite={() => _toggleFavorite(item.id)}
                    />
                  )}
                  keyExtractor={(item: IRestaurant) => `${item.id}`}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: isIOS ? 10 : 0,
                }}>
                Pickup Near Me
              </Text>
              <View style={{ marginTop: 5 }}>
                <FlatList
                  data={pickUpData}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <Restaurant
                      restaurant={item}
                      onPress={() =>
                        navigation.navigate('Details', { restaurant: item })
                      }
                      isPickUp
                    />
                  )}
                  keyExtractor={(item: IRestaurant) => `${item.id}`}
                />
              </View>
            </View>
            <View style={{ height: isIOS ? 50 : 30 }}></View>
          </ScrollView>
          {editAddressModal()}
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#FAFAFA',
            paddingHorizontal: 15,
            paddingBottom: tabBarHeight,
          }}>
          <Form style={{ flex: 1 }} behavior="padding">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginHorizontal: isIOS ? 10 : 0,
              }}>
              <AntDesign
                onPress={() => setIsSearching(false)}
                name="leftcircle"
                size={30}
              />
              <Image
                source={
                  user?.image
                    ? { uri: user?.image }
                    : require('@src/images/placeholder.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                height: 40,
                marginLeft: 10,
                borderRadius: 25,
                paddingHorizontal: 15,
                width: '90%',
                alignItems: 'center',
                marginTop: 20,
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <AntDesign name="search1" color="black" size={13} />
              <View style={{ width: '90%' }}>
                <TextInput
                  autoFocus
                  value={search}
                  onChangeText={text => {
                    setSearch(text);
                    _searchRestaurantByName(text);
                  }}
                  placeholder="Search"
                  placeholderTextColor="lightgrey"
                  style={{ marginLeft: 5, color: 'black', flex: 1 }}
                />
              </View>
            </View>

            <FlatList
              contentContainerStyle={{
                marginTop: 20,
                paddingBottom: tabBarHeight,
                paddingHorizontal: isIOS ? 15 : 0,
              }}
              data={filterData}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item }) => (

                <Restaurant
                  isSearch
                  restaurant={item}
                  onPress={() =>
                    navigation.navigate('Details', { restaurant: item })
                  }
                  isPickUp
                />
              )}
              keyExtractor={(item: IRestaurant) => `${item.id}`}
            />
          </Form>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;
