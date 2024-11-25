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
import cartSlice from "@/stores/cartSlice";
import differenceSlice from "@/stores/difference-slice";
import userProfileslice from "@/stores/userProfileSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["stateSlice"],
  whitelist: ["userSlice", "categorySlice", "homeSlice", "cartSlice"],
};

const rootReducer = combineReducers({
  stateSlice: stateSlice,
  userSlice: userSlice,
  homeSlice: homeSlice,
  cartSlice: cartSlice,
  differenceSlice: differenceSlice,
  userProfileslice: userProfileslice,
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
