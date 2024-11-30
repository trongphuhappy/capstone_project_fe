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

import stateSlice from "@/stores/stateSlice";
import userSlice from "@/stores/userSlice";
import homeSlice from "@/stores/homeSlice";
import differenceSlice from "@/stores/difference-slice";
import userProfileslice from "@/stores/userProfileSlice";
import productSlice from "@/stores/productSlice";
import quickViewProductSlice from "@/stores/quickViewProductSlice";
import categorySlice from "@/stores/categorySlice";
import rentSlice from "@/stores/rentSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["stateSlice", "quickViewProductSlice", "rentSlice"],
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
