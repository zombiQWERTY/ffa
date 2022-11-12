import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { AuthApi, AuthSlice } from "../store/Auth";
import { CountriesApi } from "../store/Countries";
import {
  localStorageMiddleware,
  reHydrateStore,
} from "./localStorageMiddleware";

export const store = configureStore({
  reducer: {
    [AuthSlice.name]: AuthSlice.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [CountriesApi.reducerPath]: CountriesApi.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      localStorageMiddleware,
      AuthApi.middleware,
      CountriesApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
