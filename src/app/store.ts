import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit";
import { AuthApi, AuthSlice } from "../store/Auth";
import { CountriesApi } from "../store/Countries";
import { ApplicationStorage } from "./ApplicationStorage";
import { storageMiddleware } from "./storageMiddleware";

// We are using localStorage for persistent store and sessionStorage for handling page refreshing
export const AppStorage = new ApplicationStorage();

export const rootReducer = combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [CountriesApi.reducerPath]: CountriesApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        storageMiddleware,
        AuthApi.middleware,
        CountriesApi.middleware,
      ]),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
