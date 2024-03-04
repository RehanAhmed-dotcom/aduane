import {Dispatch} from 'redux';

import {
  DELIVERY_ADDRESS,
  DELIVERY_TYPE,
  IS_FILTERED,
  REMOVE_FILTER,
  RESET_PASS_EMAIL,
  CODE_VALUE,
  DELIVERY_TIME,
  DELIVERY_FEE,
  RESTAURANT_LOCATION,
  REMOVE_SHARED_ORDER,
  SAVE_RECOMENDATION,
  UPDATE_REC_DATA,
  REC_DATA,
  REQUIRED_ITEMS,
  IS_FIXED,
  ALL_REC,
} from '../actionTypes';

const setResetPassEmail = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_PASS_EMAIL,
    payload,
  });
};
const setCodeValue = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CODE_VALUE,
    payload,
  });
};

const filterRestaurants = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: IS_FILTERED,
    payload,
  });
};

const removeFilter = () => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_FILTER,
  });
};

const setDeliveryAddress = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: DELIVERY_ADDRESS,
    payload,
  });
};

const setDeliveryType = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELIVERY_TYPE,
    payload,
  });
};

const setDeliveryTime = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: DELIVERY_TIME,
    payload,
  });
};

const setDeliveryFee = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: DELIVERY_FEE,
    payload,
  });
};

const setRestaurantLocation = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: RESTAURANT_LOCATION,
    payload,
  });
};

const setItemId = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_SHARED_ORDER,
    payload,
  });
};
const setRecomendation = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SAVE_RECOMENDATION,
    payload,
  });
};

const setRecUpdatedData = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_REC_DATA,
    payload,
  });
};
const setRecData = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: REC_DATA,
    payload,
  });
};
const setRequiredItems = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: REQUIRED_ITEMS,
    payload,
  });
};
const setFixedValue = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: IS_FIXED,
    payload,
  });
};

const setAllrecom = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: ALL_REC,
    payload,
  });
};

export {
  filterRestaurants,
  removeFilter,
  setDeliveryAddress,
  setDeliveryType,
  setResetPassEmail,
  setCodeValue,
  setDeliveryTime,
  setDeliveryFee,
  setRestaurantLocation,
  setItemId,
  setRecomendation,
  setRecUpdatedData,
  setRecData,
  setRequiredItems,
  setFixedValue,
  setAllrecom
};
