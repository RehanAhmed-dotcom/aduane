import {Dispatch} from 'redux';
import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_FCM_TOKEN} from '../actionTypes';
import {IUser} from '@utilis/types';

const userLoggedIn = (payload: IUser) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_LOGGED_IN,
    payload,
  });
};

const userLoggedOut = () => (dispatch: Dispatch) => {
  dispatch({
    type: USER_LOGGED_OUT,
  });
};

const userFcmToken = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_FCM_TOKEN,
    payload,
  });
};

export {userLoggedIn, userLoggedOut, userFcmToken};
