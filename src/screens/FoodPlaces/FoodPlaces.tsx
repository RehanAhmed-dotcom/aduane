import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import BackButton from '@src/components/BackButton';
import FilteredFoodPlaces from '@src/components/FilteredFoodPlaces';
import Loader from '@src/components/Loader';
import Restaurant from '@src/components/Restaurant';
import { useAppSelector } from '@src/redux/hooks';
import { isIOS } from '@src/utilis';
import {
  allFoodPlaces,
  mealTimePlaces,
  toggleRestaurantNotifiction,
} from '@src/utilis/APIs';

import type { IRestaurant, NavigationProps } from '@src/utilis/types';

const FoodPlaces = ({ navigation }: NavigationProps) => {
  const { user } = useAppSelector(({ USER }) => USER);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('breakfast');
  const [filteredMealTimePlaces, setFilteredMealTimePlaces] = useState([]);
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [loader, setLoader] = useState(false);

  const token = user?.api_token;

  const [items, setItems] = useState([
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _allFoodPlaces();
      const hours = new Date().getHours();
      if (hours > 2 && hours < 11) {
        setValue('breakfast');
      } else if (hours > 10 && hours < 18) {
        setValue('lunch');
      } else {
        setValue('dinner');
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    _mealTimePlaces();
  }, [value]);

  const tabBarHeight = useBottomTabBarHeight();

  const _mealTimePlaces = async () => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('mealtime', value);
      const res = await mealTimePlaces({ data, token });
      setLoader(false);
      if (res && res.status === 'success') {
        setFilteredMealTimePlaces(res.filterdata);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _allFoodPlaces = async () => {
    try {
      setLoader(true);
      const res = await allFoodPlaces(token);
      setLoader(false);
      if (res && res.status === 'success') {
        setFoodPlaces(res.foodplace);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _toggleRestaurantNotifiction = async id => {
    try {
      const data = new FormData();
      data.append('restaurant_id', id);

      const res = await toggleRestaurantNotifiction({ data, token });
      if (res && res.status === 'success') {
      }
    } catch (error) { }
  };

  const pickerStyle = isIOS ? { zIndex: 2 } : {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: tabBarHeight,
        backgroundColor: 'white',
        paddingHorizontal: wp(3),
      }}>
      {loader && <Loader loader={loader} />}
      <View style={styles.topView}>
        <BackButton />
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
      <View>
        <View style={{ margin: 10, ...pickerStyle }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <FlatList
          contentContainerStyle={{ zIndex: 1 }}
          data={filteredMealTimePlaces}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Restaurant
              restaurant={item}
              onPress={() => navigation.navigate('Details', { restaurant: item })}
              onBellPress={() =>
                _toggleRestaurantNotifiction(item.restaurant_id)
              }
            />
          )}
          keyExtractor={(item: IRestaurant) => item.id.toString()}
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}>
          All FoodPlaces Available
        </Text>
        <View style={{ marginTop: 10, height: hp(60) }}>
          <FlatList
            contentContainerStyle={{
              paddingBottom:isIOS ? hp(28) : hp(20),
              paddingHorizontal: isIOS ? 10 : 0,
            }}
            data={foodPlaces}
            numColumns={2}
            renderItem={({ item }) => (
              <Restaurant
                restaurant={item}
                containerStyles={{
                  width: wp(44),
                }}
                onPress={() =>
                  navigation.navigate('Details', { restaurant: item })
                }
                onBellPress={() =>
                  _toggleRestaurantNotifiction(item.restaurant_id)
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: IRestaurant) => item.id.toString()}
          />
        </View>
      </View>
      <FilteredFoodPlaces />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: isIOS ? 10 : 0,
  },
  bottomView: {
    marginTop: 30,
  },
});

export default FoodPlaces;
