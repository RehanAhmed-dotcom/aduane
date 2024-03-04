import {IRestaurant} from '@src/utilis/types';
import {Dispatch} from 'redux';

import {
  ADD_TO_CART,
  ADD_QUANTITY,
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

const addItemToCart = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload,
  });
};

const removeItemFromCart = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload,
  });
};

const addQuantityToCart = (payload: number) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_QUANTITY,
    payload,
  });
};

const subtractQuantityToCart = (payload: number) => (dispatch: Dispatch) => {
  dispatch({
    type: SUB_QUANTITY,
    payload,
  });
};

const emptyCart = () => (dispatch: Dispatch) => {
  dispatch({
    type: EMPTY_CART,
  });
};

const sumCartTotal = () => (dispatch: Dispatch) => {
  dispatch({
    type: CART_TOTAL,
  });
};

const restaurantDetails = (payload: IRestaurant) => (dispatch: Dispatch) => {
  dispatch({
    type: RESTAURANT_DETAILS,
    payload,
  });
};

const setCartFromNotification = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: CART_FROM_NOTIFICATION,
    payload,
  });
};

const setFriendData = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_FRIEND_DATA,
    payload,
  });
};

const setTempData = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: TEMP_DATA,
    payload,
  });
};




export {
  addItemToCart,
  removeItemFromCart,
  addQuantityToCart,
  subtractQuantityToCart,
  emptyCart,
  sumCartTotal,
  restaurantDetails,
  setCartFromNotification,
  setFriendData,
  setTempData,
  
};
