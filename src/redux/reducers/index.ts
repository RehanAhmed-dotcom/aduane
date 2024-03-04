import {combineReducers} from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  USER: userReducer,
  APPSTATE: appReducer,
  CART: cartReducer,
});
