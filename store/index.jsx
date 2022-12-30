import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import TransactionReducer from "./reducers/transactionSlice";
import MenuReducer from "./reducers/menuSlice";
import UserReducer from "./reducers/userSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  menu: MenuReducer,
  user: UserReducer,
  transaction: TransactionReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
