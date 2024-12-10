import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import stateSlice from "@/stores/state-slice";
import userSlice from "@/stores/user-slice";
import homeSlice from "@/stores/home-slice";
import differenceSlice from "@/stores/difference-slice";
import userProfileslice from "@/stores/user-profile-slice";
import productSlice from "@/stores/product-slice";
import quickViewProductSlice from "@/stores/quick-view-product-slice";
import categorySlice from "@/stores/category-slice";
import rentSlice from "@/stores/rent-slice";
import authSlice from "@/stores/auth-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["stateSlice", "quickViewProductSlice", "rentSlice", "authSlice"],
  whitelist: ["userSlice", "categorySlice", "homeSlice"],
};

const rootReducer = combineReducers({
  stateSlice: stateSlice,
  userSlice: userSlice,
  homeSlice: homeSlice,
  differenceSlice: differenceSlice,
  userProfileslice: userProfileslice,
  productSlice: productSlice,
  quickViewProductSlice: quickViewProductSlice,
  categorySlice: categorySlice,
  rentSlice: rentSlice,
  authSlice: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
