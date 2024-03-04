import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-community/async-storage';
const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['APPSTATE', 'CART'],
  blacklist: ['APPSTATE'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
