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
import categorySlice from "@/stores/categorySlice";
import homeSlice from "@/stores/homeSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["stateSlice"],
};

const rootReducer = combineReducers({
  stateSlice: stateSlice,
  userSlice: userSlice,
  categorySlice: categorySlice,
  homeSlice: homeSlice,
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
