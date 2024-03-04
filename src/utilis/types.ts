import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  TabNavigator: undefined;
  Home: undefined;
  Details: {restaurant: IRestaurant};
  Delivery: undefined;
  DetailsCheckout: undefined;
  Filter: undefined;
  Login: undefined;
  Splash: undefined;
  Register: undefined;
  SubmitEmail: undefined;
  EnterCode: undefined;
  UpdatePassword: undefined;
  ChangePassword: undefined;
  UpdateProfile: undefined;
  CartPayment: undefined;
  CartOrder: undefined;
  FoodFilter: undefined;
  OrderHistory: undefined;
  OrderPlaced: undefined;
  DetailsCart: undefined;
  DetailsCount: undefined;
  VerifyEmail: {phone: string; userdata: any};
};

type RouteProps = RouteProp<RootStackParamList, any>;
type DetailsRouteProps = RouteProp<RootStackParamList, 'Details'>;

type NavigationProp = StackNavigationProp<RootStackParamList, any>;

export type NavigationProps = {
  route: RouteProps;
  navigation: NavigationProp;
};

export type DetailsNavigationProps = {
  route: DetailsRouteProps;
  navigation: NavigationProp;
};

export type Error = {
  password?: string[];
  old_password?: string[];
};

export interface IRestaurant {
  id: number;
  restaurant_id?: number;
  title: string;
  thumbnail: string;
  open_at?: string;
  close_at?: string;
  address?: string;
  is_favourite?: boolean;
  cuisines?: string[];
  onPress?: () => void;
  toggleFavorite?: () => void;
  is_delivery?: boolean;
  is_pickup?: boolean;
  is_off_notification: boolean;
  latitude?: number;
  longitude?: number;
  admin_rate?: number;
}

export interface IButtonProps {
  name: string;
  onPress: () => void;
}

export interface ISubCategories {
  id: number;
  category_id: number;
  title: string;
  restaurant_id: number;
}

export interface IProduct {
  id: number;
  title: string;
  description?: string;
  thumbnail: string;
  fixed_calories: number;
  fixed_price: number;
  onPress?: () => void;
  availability?: string[];
  extra?: string;
  available_today?: boolean;
  is_fixed_cal: boolean;
  is_fixed_price: boolean;
  recommendation: null | [];
  count_bar: boolean;
  count_item_from?: number;
  count_item_to?: number;
}

export interface IFriend {
  id: string;
  name: string;
  email: string;
  image: string;
  onPress: () => void;
}
