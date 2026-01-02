import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer  from '../ReduxToolKit/Products.jsx'
import userInformation from '../ReduxToolKit/UserData.jsx'


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userInformation, 
  product: productReducer ,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(Store);

export default Store;
