import React from 'react';
import {Text, Image, Platform} from 'react-native';

import Home from '../screens/Home/Home';
import FoodPlaces from '../screens/FoodPlaces/FoodPlaces';
import Saves from '../screens/Saves/Saves';
import CartItems from '../screens/Cart/CartItems';
import Profile from '../screens/Profile/Profile';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopLeftRadius: 21,
          position: 'absolute',
          bottom: Platform.OS === 'android' ? 4 : 0,
          borderTopRightRadius: 21,
          backgroundColor: 'white',
        },
      }}
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => <Text style={{color: 'grey'}}>Home</Text>,
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              source={
                focused
                  ? require('../images/icon_home_active.png')
                  : require('../images/icon_home_inactive.png')
              }
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FoodPlaces"
        component={FoodPlaces}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: 'grey'}}>FoodPlace</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              source={
                focused
                  ? require('../images/icon_foodplace_active.png')
                  : require('../images/icon_foodplace_inactive.png')
              }
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartItems"
        component={CartItems}
        options={{
          tabBarLabel: ({focused}) => <Text style={{color: 'grey'}}>Cart</Text>,
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              source={
                focused
                  ? require('../images/icon_cart_active.png')
                  : require('../images/icon_cart_inactive.png')
              }
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saves"
        component={Saves}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: 'grey'}}>Saves</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              source={
                focused
                  ? require('../images/icon_heart_active.png')
                  : require('../images/icon_heart_inactive.png')
              }
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: 'grey'}}>Profile</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              source={
                focused
                  ? require('../images/icon_profile_active.png')
                  : require('../images/icon_profile_inactive.png')
              }
              style={{height: 20, width: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
