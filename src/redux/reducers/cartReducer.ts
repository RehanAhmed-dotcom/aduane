import {
  ADD_QUANTITY,
  ADD_TO_CART,
  SUB_QUANTITY,
  REMOVE_FROM_CART,
  EMPTY_CART,
  CART_TOTAL,
  RESTAURANT_DETAILS,
  CART_FROM_NOTIFICATION,
  SET_FRIEND_DATA,
  TEMP_DATA,
  REC_DATA,
  UPDATE_REC_DATA,
} from '../actionTypes';

const initialState = {
  cart: [],
  temp:[],
  cartTotal: 0,
  restaurantDetail: '',
  friendData: null,
  
};

export default (state = initialState, action: any) => {

  switch (action.type) {
    case ADD_TO_CART: {
      let newArr = [];
      const item = state.cart.find(
        (item: any) => item.id === action.payload.id,
      );

      if (item) {
        newArr = state.cart.map((cartItem: any) =>
          cartItem.id === action.payload.id
            ? {
                ...cartItem,
                qty: cartItem.qty + 1,
                subtotal: cartItem.fixed_price * (cartItem.qty + 1),
              }
            : cartItem,
        );
      } else {
        newArr = [...state.cart];
        newArr.push(action.payload);
      }

      return {
        ...state,
        cart: newArr,
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
      case ADD_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item: any) =>
          item.id === action.payload
            ? {
                ...item,
                qty: item.qty + 1,
                subtotal: item.is_fixed_price
                  ? item.fixed_price * (item.qty + 1)
                  : item.subtotal + 1,
              }
            : item,
        ),
      };

    case SUB_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item: any) =>
          item.id === action.payload
            ? {
                ...item,
                qty: item.qty !== 1 ? item.qty - 1 : 1,
                subtotal:
                  item.qty !== 1
                    ? item.is_fixed_price
                      ? item.fixed_price * (item.qty - 1)
                      : item.subtotal - 1
                    : item.is_fixed_price
                    ? item.fixed_price
                    : item.subtotal,
              }
            : item,
        ),
      };

    case EMPTY_CART:
      return initialState;

    case CART_TOTAL:
      return {
        ...state,
        cartTotal: state.cart.reduce(
          (accumulator, item) => accumulator + item.subtotal,
          0,
        ),
      };

    case RESTAURANT_DETAILS:
      return {
        ...state,
        restaurantDetail: action.payload,
      };
      case TEMP_DATA: {
        return {
          ...state,
          temp: action.payload,
        };
      }
      
  

    case CART_FROM_NOTIFICATION:
      let cartItems = [];
      let restaurant = '';
      if (
        state.restaurantDetail.restaurant_id ===
        action.payload.restaurant.restaurant_id
      ) {
        cartItems = state.cart.concat(action.payload.cart);
        restaurant = state.restaurantDetail;
      } else {
        cartItems = action.payload.cart;
        restaurant = action.payload.restaurant;
      }
      return {
        ...state,
        cart: cartItems,
        restaurantDetail: restaurant,
      };
    case SET_FRIEND_DATA:
      return {
        ...state,
        friendData: action.payload,
      };

    default:
      return state;
  }
};
