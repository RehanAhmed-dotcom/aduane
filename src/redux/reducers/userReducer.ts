import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_FCM_TOKEN} from '../actionTypes';

const initialState = {
  user: null,
  fcm_token: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case USER_LOGGED_OUT: {
      return {
        ...state,
        user: null,
      };
    }
    case USER_FCM_TOKEN: {
      return {
        ...state,
        fcm_token: action.payload,
      };
    }
    default:
      return state;
  }
};
