import React, {Fragment, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import Slider from '@react-native-community/slider';
import BackButton from '@src/components/BackButton';
import {filterRestaurants} from '@src/redux/actions';
import {useAppDispatch, useAppSelector} from '@src/redux/hooks';
import {isIOS} from '@src/utilis';
import {filteredRestaurantsList} from '@src/utilis/APIs';

const Filter = ({navigation}: any) => {
  const {user} = useAppSelector(({USER}) => USER);

  const dispatch = useAppDispatch();

  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [slideVal, setSlideVal] = useState(0.0);
  const [cuisine, setCuisine] = useState('');
  const [icon, setIcon] = useState();
  const [date, setDateTime] = useState('');
  // const [multiCuisines, setMultiCuisines] = useState([
  //   {id: 1, name: 'Local Food', isSelected: false},
  //   {id: 2, name: 'International', isSelected: false},
  //   {id: 3, name: 'Snacks', isSelected: false},
  //   {id: 4, name: 'Fast Food', isSelected: false},
  //   {id: 5, name: 'Pizza', isSelected: false},
  //   {id: 6, name: 'Chicken', isSelected: false},
  //   {id: 7, name: 'Seafood', isSelected: false},
  //   {id: 8, name: 'Vegetarian', isSelected: false},
  // ]);

  useEffect(() => {
    Icon.getImageSource('circle', 30, 'red').then(setIcon);
  }, []);

  const cuisines = [
    'Local Food',
    'International',
    'Snacks',
    'Fast Food',
    'Pizza',
    'Chicken',
    'Seafood',
    'Vegetarian',
  ];

  const sort = [
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Nearest Me', value: 'near_me'},
    {label: 'Cost High to Low', value: 'cost_high_to_low'},
    {label: 'Cost Low to High', value: 'cost_low_to_high'},
  ];
  const filter = ['Free Delivery', 'Open Now', 'Credit Cards', 'Mobile Money'];

  const _filteredRestaurantsList = async () => {
    try {
      const token = user.api_token;
      const data = new FormData();
      data.append('cuisines', cuisine);
      data.append('sort_by', sortBy);
      data.append('filter_by', filterBy);
      data.append('current_time', date);
      data.append('price', slideVal);
      const res = await filteredRestaurantsList({data, token});
      if (res && res.status === 'success') {
        setTimeout(() => {
          filterRestaurants(res.userdata)(dispatch);
        }, 1000);
        navigation.navigate('FoodPlaces');
      }
    } catch (error) {}
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topView}>
        <BackButton cross />
        <Text>Filters</Text>
        <TouchableOpacity
          onPress={() => {
            if (cuisine || sortBy || filterBy || slideVal) {
              _filteredRestaurantsList();
            }
          }}>
          <Text style={{color: 'red'}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <ScrollView>
        <View style={{paddingHorizontal: 10, marginTop: 20}}>
          <Text style={{color: 'grey'}}>CUISINES</Text>
          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            {cuisines.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setCuisine(item);
                  // const newCuisines = [...multiCuisines];
                  // newCuisines[index] = {
                  //   ...item,
                  //   isSelected: !item.isSelected,
                  // };
                  // setMultiCuisines(newCuisines);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: cuisine === item ? 'red' : 'grey',
                  borderRadius: 15,
                  marginLeft: 5,
                  marginTop: 10,
                  padding: 10,
                }}
                key={index + 'a'}>
                <Text
                  style={{
                    fontSize: 12,
                    color: cuisine === item ? 'red' : 'grey',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{color: 'grey', marginTop: 20}}>SORT BY</Text>
          {sort.map((item, index) => (
            <Fragment key={index + 'a'}>
              <TouchableOpacity
                onPress={() => setSortBy(item.value)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  height: 25,
                }}>
                <Text style={{color: sortBy == item.value ? 'red' : 'black'}}>
                  {item.label}
                </Text>
                {sortBy == item.value && (
                  <Icon name="check" size={20} color="red" />
                )}
              </TouchableOpacity>
              <View style={styles.line} />
            </Fragment>
          ))}
          <Text style={{color: 'grey', marginTop: 20}}>FILTER</Text>
          {filter.map((item, index) => (
            <Fragment key={index + 'a'}>
              <TouchableOpacity
                onPress={() => {
                  setFilterBy(item);
                  showDate();
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 25,
                  marginTop: 10,
                }}>
                <Text style={{color: filterBy == item ? 'red' : 'black'}}>
                  {item}
                </Text>
                {filterBy == item && (
                  <Icon name="check" size={20} color="red" />
                )}
              </TouchableOpacity>
              <View style={styles.line} />
            </Fragment>
          ))}
          <Text style={{color: 'grey', marginTop: 20}}>PRICE</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <Text>GHC 0</Text>
            <Text>GHC {slideVal}</Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 10}}>
            <Image
              style={{
                position: 'absolute',
                height: 28,
                width: 28,
                top: 5,
                left: 2,
                zIndex: 10,
              }}
              source={require('../../images/oval.png')}
            />

            <Slider
              style={{
                width: '100%',
                height: 40,
                left: isIOS ? -12 : 0,
              }}
              value={slideVal}
              maximumValue={500}
              minimumValue={0}
              minimumTrackTintColor="red"
              maximumTrackTintColor="grey"
              step={1}
              onValueChange={value => setSlideVal(value)}
              thumbImage={require('../../images/oval.png')}
            />
          </View>
          {/* <RangeSlider
            // type="range" // ios only
            min={0}
            max={100}
            // selectedMinimum={20} // ios only
            selectedMaximum={60} // ios only
            tintColor="#ecf0f1"
            handleColor="#f368e0"
            handlePressedColor="#f368e0"
            tintColorBetweenHandles="#ff9ff3"
            // onChange={onChange}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  line: {
    borderColor: 'grey',
    borderWidth: 0.5,
    marginTop: 10,
    width: '100%',
  },
});

export default Filter;
