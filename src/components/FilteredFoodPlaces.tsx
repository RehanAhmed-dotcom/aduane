import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {removeFilter} from '@src/redux/actions';
import {useAppDispatch, useAppSelector} from '@src/redux/hooks';
import {IRestaurant} from '@src/utilis/types';

import FilteredRestaurant from './FilteredRestaurant';
import {navigate} from '@src/navigator/navigationService';

export default function FilteredFoodPlaces(props: any) {
  const {filteredRestaurants, isFiltered} = useAppSelector(
    ({APPSTATE}) => APPSTATE,
  );

  const dispatch = useAppDispatch();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFiltered}
      onRequestClose={() => removeFilter()(dispatch)}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: hp(65),
            elevation: 4,
            paddingTop: 20,
            paddingHorizontal: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {filteredRestaurants.length} FoodPlace Available
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  removeFilter()(dispatch);
                  navigate('Filter');
                }}>
                <Image
                  source={require('@src/images/icon_Filter.png')}
                  style={{height: 30, marginRight: 10, width: 30}}
                />
              </Pressable>
              <TouchableOpacity onPress={() => removeFilter()(dispatch)}>
                <Image
                  source={require('@src/images/icon_cross_red.png')}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingBottom: 30}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredRestaurants}
              renderItem={({item}: {item: IRestaurant}) => (
                <FilteredRestaurant restaurant={item} />
              )}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
