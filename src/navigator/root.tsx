import 'react-native-gesture-handler';
import React from 'react';

import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import VerifyEmail from '../screens/Auth/VerifyEmail';
import SubmitEmail from '../screens/ForgotPassword/SubmitEmail';
import EnterCode from '../screens/ForgotPassword/EnterCode';
import UpdatePassword from '../screens/ForgotPassword/UpdatePassword';
import Splash from '../screens/Splash/Splash';
import ChangePassword from '../screens/ForgotPassword/ChangePassword';

import UpdateProfile from '../screens/Profile/UpdateProfile';

import CartPayment from '../screens/Cart/CartPayment';
import CartOrder from '../screens/Cart/CartOrder';

import FoodFilter from '../screens/FoodPlaces/FoodFilter';
import OrderHistory from '../screens/Order/OrderHistory';
import OrderPlaced from '../screens/Order/OrderPlaced';
import Filter from '../screens/Filter/Filter';

import Details from '../screens/Details/Details';
import DetailsCart from '../screens/Details/DetailsCart';
import DetailsCheckout from '../screens/Details/DetailsCheckout';
import DetailsCount from '../screens/Details/DetailsCount';
import Delivery from '../screens/Delivery/Delivery';
import Splash2 from '../screens/Splash2/Splash2';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './navigationService';

import TabNavigator from './bottomTabs';
import {useAppSelector} from '@src/redux/hooks';
import {RootStackParamList} from '@src/utilis/types';

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const {user} = useAppSelector(({USER}) => USER);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SubmitEmail" component={SubmitEmail} />
            <Stack.Screen name="EnterCode" component={EnterCode} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash2" component={Splash2} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

            <Stack.Screen name="CartPayment" component={CartPayment} />
            <Stack.Screen name="CartOrder" component={CartOrder} />

            <Stack.Screen name="FoodFilter" component={FoodFilter} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
            <Stack.Screen name="Filter" component={Filter} />

            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="DetailsCart" component={DetailsCart} />
            <Stack.Screen name="DetailsCheckout" component={DetailsCheckout} />
            <Stack.Screen name="DetailsCount" component={DetailsCount} />
            <Stack.Screen name="Delivery" component={Delivery} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
